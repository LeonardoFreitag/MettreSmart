import React, { useState, useCallback } from 'react';
import { FiCheck, FiTruck, FiRefreshCw } from 'react-icons/fi';
import firebase from '../../services/firebaseConfig';
import { RequestStatus } from '../../models/RequestStatusEnum';
import { ItemModel } from '../../models/ItemModel';
import Button from '../../components/Button';
import {
  Container,
  Header,
  Title,
  Subtitle,
  FieldGroup,
  Label,
  StyledInput,
  Footer,
  Spinner,
  SectionTitle,
  DeliveryCard,
  CardHeader,
  CardOrderId,
  StatusBadge,
  CardDivider,
  CardRow,
  CardLabel,
  CardValue,
  CardValueBold,
  CardPhoneLink,
  ItemsList,
  ItemRow,
  ConfirmButton,
  DeliveredBadge,
  EmptyText,
  CodeBadge,
  CodeBadgeActions,
  ChangeCodeButton,
  RefreshButton,
} from './styles';

interface DeliveryManField {
  code: string;
  name?: string;
}

interface DeliveryRequest {
  id: string;
  idCustomer: string;
  idProvider: string;
  dateRequest: number;
  totalProducts: number;
  feeDelivery: number;
  totalRequest: number;
  status: RequestStatus;
  address: string;
  number: string;
  neigh: string;
  complement?: string;
  formPayment: string;
  items: ItemModel[];
  comeGet: boolean;
  comments?: string;
  change?: number;
  deliveryMan?: DeliveryManField;
  dataCustomer?: {
    name: string;
    whats: string;
  };
}

const formatBRL = (value: number) =>
  Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
    value,
  );

const formatDate = (timestamp: number) => {
  const d = new Date(timestamp);
  return d.toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const formatPhone = (whats: string) => {
  const d = whats.replace(/\D/g, '');
  if (d.length === 11)
    return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
  if (d.length === 10)
    return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return whats;
};

type PageStep = 'code' | 'list';

const DeliveryManPage: React.FC = () => {
  const [step, setStep] = useState<PageStep>('code');
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [deliveries, setDeliveries] = useState<DeliveryRequest[]>([]);
  const [confirmingId, setConfirmingId] = useState<string | null>(null);
  const [error, setError] = useState('');

  const handleSearch = useCallback(async () => {
    const trimmed = code.trim();
    if (!trimmed) {
      setError('Informe seu código de entregador.');
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      const snapshot = await firebase
        .firestore()
        .collection('requests')
        .where('deliveryMan.code', '==', trimmed)
        .get();

      const result: DeliveryRequest[] = snapshot.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as Omit<DeliveryRequest, 'id'>),
      }));

      result.sort((a, b) => b.dateRequest - a.dateRequest);
      setDeliveries(result);
      setStep('list');
    } catch {
      setError('Não foi possível buscar as entregas. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  }, [code]);

  const handleConfirmDelivery = useCallback(async (requestId: string) => {
    setConfirmingId(requestId);
    try {
      await firebase
        .firestore()
        .collection('requests')
        .doc(requestId)
        .update({ status: RequestStatus.Delivered });

      setDeliveries(prev =>
        prev.map(d =>
          d.id === requestId ? { ...d, status: RequestStatus.Delivered } : d,
        ),
      );
    } catch {
      // silently fail — the button remains enabled to retry
    } finally {
      setConfirmingId(null);
    }
  }, []);

  const pending = deliveries.filter(d => d.status === RequestStatus.Sent);
  const delivered = deliveries.filter(
    d => d.status === RequestStatus.Delivered,
  );

  const renderCard = (delivery: DeliveryRequest) => {
    const isDelivered = delivery.status === RequestStatus.Delivered;
    const isConfirming = confirmingId === delivery.id;
    const shortId = delivery.id.slice(-8).toUpperCase();
    const address = [
      delivery.address,
      delivery.number,
      delivery.complement,
      delivery.neigh,
    ]
      .filter(Boolean)
      .join(', ');

    return (
      <DeliveryCard key={delivery.id}>
        <CardHeader>
          <CardOrderId>{`Pedido #${shortId}`}</CardOrderId>
          <StatusBadge delivered={isDelivered}>
            {isDelivered ? 'Entregue' : 'A entregar'}
          </StatusBadge>
        </CardHeader>

        <CardRow>
          <CardLabel>Data</CardLabel>
          <CardValue>{formatDate(delivery.dateRequest)}</CardValue>
        </CardRow>

        {delivery.dataCustomer?.name && (
          <CardRow>
            <CardLabel>Cliente</CardLabel>
            <CardValueBold>{delivery.dataCustomer.name}</CardValueBold>
          </CardRow>
        )}

        {delivery.dataCustomer?.whats && (
          <CardRow>
            <CardLabel>Telefone</CardLabel>
            <CardValue>
              <CardPhoneLink href={`tel:${delivery.dataCustomer.whats}`}>
                {formatPhone(delivery.dataCustomer.whats)}
              </CardPhoneLink>
            </CardValue>
          </CardRow>
        )}

        <CardRow>
          <CardLabel>Endereço</CardLabel>
          <CardValue>{address || '—'}</CardValue>
        </CardRow>

        <CardDivider />

        {delivery.items?.length > 0 && (
          <>
            <CardRow>
              <CardLabel>Itens</CardLabel>
              <ItemsList>
                {delivery.items.map(item => (
                  <ItemRow key={item.id}>
                    {`${item.amount}x ${item.description}`}
                  </ItemRow>
                ))}
              </ItemsList>
            </CardRow>
            <CardDivider />
          </>
        )}

        <CardRow>
          <CardLabel>Pagamento</CardLabel>
          <CardValue>{delivery.formPayment}</CardValue>
        </CardRow>

        {delivery.change && delivery.change > 0 && (
          <CardRow>
            <CardLabel>Troco p/</CardLabel>
            <CardValue>{formatBRL(delivery.change)}</CardValue>
          </CardRow>
        )}

        <CardRow>
          <CardLabel>Taxa</CardLabel>
          <CardValue>{formatBRL(delivery.feeDelivery)}</CardValue>
        </CardRow>

        <CardRow>
          <CardLabel>Total</CardLabel>
          <CardValueBold>{formatBRL(delivery.totalRequest)}</CardValueBold>
        </CardRow>

        {delivery.comments ? (
          <CardRow>
            <CardLabel>Obs.</CardLabel>
            <CardValue>{delivery.comments}</CardValue>
          </CardRow>
        ) : null}

        {isDelivered ? (
          <DeliveredBadge>
            <FiCheck
              size={14}
              style={{ marginRight: 6, verticalAlign: 'middle' }}
            />
            Entrega confirmada
          </DeliveredBadge>
        ) : (
          <ConfirmButton
            type="button"
            disabled={isConfirming}
            onClick={() => handleConfirmDelivery(delivery.id)}
          >
            {isConfirming ? (
              <>
                Confirmando
                <Spinner />
              </>
            ) : (
              <>
                <FiCheck size={16} />
                Confirmar entrega
              </>
            )}
          </ConfirmButton>
        )}
      </DeliveryCard>
    );
  };

  return (
    <Container>
      <Header>
        <FiTruck size={28} color="#2b70a8" />
        <Title>Área do Entregador</Title>
      </Header>

      {step === 'code' && (
        <>
          <Subtitle>Informe seu código para visualizar suas entregas.</Subtitle>

          <FieldGroup>
            <Label>Seu código</Label>
            <StyledInput
              value={code}
              onChange={e => {
                setCode(e.target.value);
                setError('');
              }}
              placeholder="Ex: ENT001"
              autoCapitalize="characters"
              onKeyDown={e => {
                if (e.key === 'Enter') handleSearch();
              }}
            />
            {error && (
              <span style={{ fontSize: 12, color: '#dc3545', marginTop: 4 }}>
                {error}
              </span>
            )}
          </FieldGroup>

          <Footer>
            <Button
              colorButton={isLoading ? '#999' : 'green'}
              onClick={handleSearch}
              disabled={isLoading}
            >
              {isLoading ? 'Buscando' : 'Buscar entregas'}
              {isLoading && <Spinner />}
            </Button>
          </Footer>
        </>
      )}

      {step === 'list' && (
        <>
          <CodeBadge>
            <span>
              {'Código: '}
              <strong>{code}</strong>
            </span>
            <CodeBadgeActions>
              <RefreshButton
                type="button"
                disabled={isLoading}
                onClick={handleSearch}
                title="Atualizar entregas"
              >
                <FiRefreshCw size={15} />
              </RefreshButton>
              <ChangeCodeButton
                type="button"
                onClick={() => {
                  setStep('code');
                  setDeliveries([]);
                }}
              >
                Trocar código
              </ChangeCodeButton>
            </CodeBadgeActions>
          </CodeBadge>

          {pending.length > 0 && (
            <>
              <SectionTitle>{`A entregar (${pending.length})`}</SectionTitle>
              {pending.map(renderCard)}
            </>
          )}

          {delivered.length > 0 && (
            <>
              <SectionTitle>{`Entregues (${delivered.length})`}</SectionTitle>
              {delivered.map(renderCard)}
            </>
          )}

          {deliveries.length === 0 && (
            <EmptyText>
              Nenhuma entrega encontrada para o código informado.
            </EmptyText>
          )}
        </>
      )}
    </Container>
  );
};

export default DeliveryManPage;
