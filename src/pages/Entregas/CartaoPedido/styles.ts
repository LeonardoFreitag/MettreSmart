import styled, { keyframes } from 'styled-components';

const spinBtn = keyframes`
  to { transform: rotate(360deg); }
`;

export const Card = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  transition: box-shadow 0.2s;
`;

export const CardTopo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

export const Numero = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: #212529;
`;

export const Linha = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 8px;
  padding: 4px 0;
  border-bottom: 1px solid #f0f0f0;

  &:last-of-type {
    border-bottom: none;
  }
`;

export const Label = styled.span`
  font-size: 12px;
  color: #6c757d;
  white-space: nowrap;
`;

export const Valor = styled.span`
  font-size: 13px;
  color: #212529;
  text-align: right;
`;

export const FoneLink = styled.a`
  font-size: 13px;
  color: #2b70a8;
  text-decoration: none;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`;

export const Divisor = styled.hr`
  border: none;
  border-top: 1px solid #e9ecef;
  margin: 12px 0;
`;

export const BotaoAcao = styled.button<{ variante: 'em_rota' | 'entregue' }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  margin-top: 14px;
  padding: 12px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s, opacity 0.2s;

  background: ${({ variante }) => (variante === 'entregue' ? '#198754' : '#2b70a8')};
  color: #fff;

  &:disabled {
    opacity: 0.65;
    cursor: not-allowed;
  }

  &:not(:disabled):active {
    opacity: 0.85;
  }
`;

export const SecaoItens = styled.div`
  margin: 8px 0 4px;
`;

export const ItemLinha = styled.div`
  font-size: 13px;
  color: #212529;
  padding: 2px 0;
  display: flex;
  gap: 6px;

  &::before {
    content: '•';
    color: #6c757d;
    flex-shrink: 0;
  }
`;

export const EntregueAviso = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  width: 100%;
  margin-top: 14px;
  padding: 12px;
  border-radius: 8px;
  background: #d1e7dd;
  color: #0a3622;
  font-size: 14px;
  font-weight: 600;
`;

export const SpinnerBtn = styled.span`
  display: inline-block;
  width: 14px;
  height: 14px;
  border: 2px solid rgba(255, 255, 255, 0.4);
  border-top-color: #fff;
  border-radius: 50%;
  animation: ${spinBtn} 0.65s linear infinite;
`;
