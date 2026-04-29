import React from 'react';
import { Wrapper, Restaurante, NomeEntregador, Contador } from './styles';

interface Props {
  nomeEntregador: string;
  nomeRestaurante: string;
  totalPedidos: number;
  pedidosEmRota: number;
}

const Header: React.FC<Props> = ({
  nomeEntregador,
  nomeRestaurante,
  totalPedidos,
  pedidosEmRota,
}) => (
  <Wrapper>
    <Restaurante>{nomeRestaurante}</Restaurante>
    <NomeEntregador>{nomeEntregador}</NomeEntregador>
    <Contador>
      {totalPedidos === 0
        ? 'Nenhum pedido ativo'
        : `${totalPedidos} pedido${totalPedidos > 1 ? 's' : ''} ativo${
            totalPedidos > 1 ? 's' : ''
          }`}
      {pedidosEmRota > 0 && ` · ${pedidosEmRota} em rota`}
    </Contador>
  </Wrapper>
);

export default Header;
