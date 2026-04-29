import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FiCheck, FiX } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Button from '../../components/Button';
import {
  Container,
  Logo,
  DetailText,
  SubDetailText,
  Timeline,
  TimelineStep,
  TimelineDotWrapper,
  TimelineDot,
  TimelineLine,
  TimelineContent,
  TimelineLabel,
  TimelineSubLabel,
} from './styles';
import { RootState } from '../../store/ducks/combineReducers';
import { RequestStatus } from '../../models/RequestStatusEnum';
import firebase from '../../services/firebaseConfig';

interface TimelineStepDef {
  status: RequestStatus;
  label: string;
  labelComeGet?: string;
  description: string;
  descriptionComeGet?: string;
}

const STEPS: TimelineStepDef[] = [
  {
    status: RequestStatus.Open,
    label: 'Pedido recebido',
    description: 'Aguardando confirmação do estabelecimento.',
  },
  {
    status: RequestStatus.Produced,
    label: 'Em preparo',
    description: 'O estabelecimento está preparando o seu pedido.',
  },
  {
    status: RequestStatus.Sent,
    label: 'Saiu para entrega',
    labelComeGet: 'Pronto para retirada',
    description: 'O pedido está a caminho.',
    descriptionComeGet: 'Seu pedido está pronto para você retirar.',
  },
  {
    status: RequestStatus.Delivered,
    label: 'Entregue',
    labelComeGet: 'Retirado',
    description: 'Pedido concluído. Bom apetite! 🍽️',
    descriptionComeGet: 'Pedido concluído. Bom apetite! 🍽️',
  },
];

const STATUS_ORDER: RequestStatus[] = [
  RequestStatus.Open,
  RequestStatus.Produced,
  RequestStatus.Sent,
  RequestStatus.Delivered,
];

const Success: React.FC = () => {
  const provider = useSelector((state: RootState) => state.provider.data);
  const request = useSelector((state: RootState) => state.request.data);
  const history = useHistory();

  const [liveStatus, setLiveStatus] = useState<RequestStatus>(
    (request.status as RequestStatus) || RequestStatus.Open,
  );

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    if (request.id) {
      unsubscribe = firebase
        .firestore()
        .collection('requests')
        .doc(request.id)
        .onSnapshot(snap => {
          if (snap.exists) {
            const data = snap.data();
            if (data?.status) {
              setLiveStatus(data.status as RequestStatus);
            }
          }
        });
    }

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [request.id]);

  const handleLogin = useCallback(() => {
    history.push('/');
  }, [history]);

  const shortId = request.id ? request.id.slice(-8).toUpperCase() : '—';
  const dateFormatted = request.dateRequest
    ? format(new Date(request.dateRequest), "dd/MM/yyyy 'às' HH:mm", {
        locale: ptBR,
      })
    : '';

  const isCanceled = liveStatus === RequestStatus.Canceled;
  const currentIndex = STATUS_ORDER.indexOf(liveStatus);

  return (
    <Container>
      <Logo src={provider.logo} alt="Logo" />
      <FiCheck color="#28a745" size={80} />
      <DetailText>Pedido enviado com sucesso!</DetailText>
      <SubDetailText>
        <strong>{`Pedido #${shortId}`}</strong>
      </SubDetailText>
      {dateFormatted && <SubDetailText>{dateFormatted}</SubDetailText>}

      <Timeline>
        {isCanceled ? (
          <TimelineStep active={false} done={false} canceled>
            <TimelineDotWrapper>
              <TimelineDot active={false} done={false} canceled>
                <FiX size={12} color="#fff" />
              </TimelineDot>
            </TimelineDotWrapper>
            <TimelineContent>
              <TimelineLabel active={false} done={false} canceled>
                Pedido cancelado
              </TimelineLabel>
              <TimelineSubLabel>
                Entre em contato com o estabelecimento.
              </TimelineSubLabel>
            </TimelineContent>
          </TimelineStep>
        ) : (
          STEPS.map((step, index) => {
            const done = currentIndex > index;
            const active = currentIndex === index;
            const isLast = index === STEPS.length - 1;
            const label =
              request.comeGet && step.labelComeGet
                ? step.labelComeGet
                : step.label;
            const description =
              request.comeGet && step.descriptionComeGet
                ? step.descriptionComeGet
                : step.description;

            return (
              <TimelineStep key={step.status} active={active} done={done}>
                <TimelineDotWrapper>
                  <TimelineDot active={active} done={done}>
                    {(done || active) && (
                      <FiCheck size={12} color={done ? '#fff' : '#28a745'} />
                    )}
                  </TimelineDot>
                  {!isLast && <TimelineLine done={done} />}
                </TimelineDotWrapper>
                <TimelineContent>
                  <TimelineLabel active={active} done={done}>
                    {label}
                  </TimelineLabel>
                  {(done || active) && (
                    <TimelineSubLabel>{description}</TimelineSubLabel>
                  )}
                </TimelineContent>
              </TimelineStep>
            );
          })
        )}
      </Timeline>

      <Button onClick={handleLogin}>OK</Button>
    </Container>
  );
};

export default Success;
