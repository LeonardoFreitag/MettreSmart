import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 32px 24px;
  background: #f8f9fa;
  text-align: center;
`;

export const Icone = styled.div`
  font-size: 48px;
  margin-bottom: 16px;
`;

export const Titulo = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #212529;
  margin-bottom: 10px;
`;

export const Descricao = styled.p`
  font-size: 14px;
  color: #6c757d;
  max-width: 280px;
  line-height: 1.6;
`;
