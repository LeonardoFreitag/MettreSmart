import React, { useState, useCallback } from 'react';
import { FiTruck, FiCheck } from 'react-icons/fi';
import { Pedido } from '../../../types/entregas.types';
import { RequestStatus } from '../../../models/RequestStatusEnum';
import { atualizarStatus } from '../../../services/entregasService';
import { useToast } from '../../../hooks/toast';
import StatusBadge from '../StatusBadge';
import {
  Card,
  CardTopo,
  Numero,
  Linha,
  Label,
  Valor,
  FoneLink,
  Divisor,
  SecaoItens,
  ItemLinha,
  EntregueAviso,
  BotaoAcao,
  SpinnerBtn,
} from './styles';

interface Props {
  pedido: Pedido;
  idProvider: string;
}

function formatarFone(fone: string): string {
  if (!fone) return '';
  const d = fone.replace(/\D/g, '');
  if (d.length === 13) return `+${d.slice(0, 2)} (${d.slice(2, 4)}) ${d.slice(4, 9)}-${d.slice(9)}`;
  if (d.length === 11) return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
  if (d.length === 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return fone;
}

const CartaoPedido: React.FC<Props> = ({ pedido }) => {
  const { addToast } = useToast();
  const [carregando, setCarregando] = useState(false);

  const entregue = pedido.status === RequestStatus.Delivered;
  const proximoStatus =
    pedido.status === RequestStatus.Sent
      ? RequestStatus.Delivered
      : RequestStatus.Sent;

  const handleAvancar = useCallback(async () => {
    setCarregando(true);
    try {
      await atualizarStatus(pedido.id, proximoStatus);
    } catch {
      addToast({
        type: 'error',
        title: 'Erro ao atualizar pedido',
        description: 'Não foi possível atualizar o status. Tente novamente.',
      });
      setCarregando(false);
    }
  }, [pedido.id, proximoStatus, addToast]);

  const labelBotao =
    pedido.status === RequestStatus.Sent ? 'Confirmar entrega' : 'Saí para entrega';

  return (
    <Card>
      <CardTopo>
        <Numero>{`#${pedido.numero}`}</Numero>
        <StatusBadge status={pedido.status} />
      </CardTopo>

      <Linha>
        <Label>Cliente</Label>
        <Valor>{pedido.cliente_nome}</Valor>
      </Linha>

      <Linha>
        <Label>Telefone</Label>
        <FoneLink href={`tel:${pedido.cliente_fone}`}>
          {formatarFone(pedido.cliente_fone)}
        </FoneLink>
      </Linha>

      <Linha>
        <Label>Endereço</Label>
        <Valor>{`${pedido.endereco}, ${pedido.bairro}`}</Valor>
      </Linha>

      <Linha>
        <Label>Hora de saída</Label>
        <Valor>{pedido.hora_saida}</Valor>
      </Linha>

      {pedido.items.length > 0 && (
        <>
          <Divisor />
          <Label>Itens do pedido</Label>
          <SecaoItens>
            {pedido.items.map(item => (
              <ItemLinha key={item.id}>
                {`${item.amount}x ${item.description}`}
                {item.combined === 'S' && item.flavors && item.flavors.length > 0 && (
                  <span style={{ color: '#6c757d', fontSize: 12 }}>
                    {` (${item.flavors.map(f => f.description).join(' / ')})`}
                  </span>
                )}
              </ItemLinha>
            ))}
          </SecaoItens>
        </>
      )}

      <Divisor />

      {entregue ? (
        <EntregueAviso>
          <FiCheck size={16} />
          Entrega confirmada
        </EntregueAviso>
      ) : (
        <BotaoAcao
          type="button"
          variante={proximoStatus === RequestStatus.Delivered ? 'entregue' : 'em_rota'}
          disabled={carregando}
          onClick={handleAvancar}
        >
          {carregando ? (
            <>
              <SpinnerBtn />
              Aguarde...
            </>
          ) : (
            <>
              {proximoStatus === RequestStatus.Delivered
                ? <FiCheck size={16} />
                : <FiTruck size={16} />}
              {labelBotao}
            </>
          )}
        </BotaoAcao>
      )}
    </Card>
  );
};

export default CartaoPedido;
