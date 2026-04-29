import styled from 'styled-components';

export const Wrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: #2b70a8;
  color: #fff;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const Restaurante = styled.p`
  font-size: 12px;
  opacity: 0.8;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const NomeEntregador = styled.h1`
  font-size: 18px;
  font-weight: 600;
`;

export const Contador = styled.p`
  font-size: 13px;
  opacity: 0.9;
  margin-top: 4px;
`;
