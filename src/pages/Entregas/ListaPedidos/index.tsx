import React from 'react';
import { Pedido } from '../../../types/entregas.types';
import CartaoPedido from '../CartaoPedido';
import { Lista, MensagemVazia } from './styles';

interface Props {
  pedidos: Pedido[];
  idProvider: string;
}

const ListaPedidos: React.FC<Props> = ({ pedidos, idProvider }) => {
  if (pedidos.length === 0) {
    return <MensagemVazia>Nenhum pedido ativo no momento.</MensagemVazia>;
  }

  return (
    <Lista>
      {pedidos.map(pedido => (
        <CartaoPedido key={pedido.id} pedido={pedido} idProvider={idProvider} />
      ))}
    </Lista>
  );
};

export default ListaPedidos;
