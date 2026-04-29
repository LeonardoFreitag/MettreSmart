import styled from 'styled-components';

export const Container = styled.div`
  width: 90%;
  max-width: 500px;
  height: 90vh;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  flex: 1;
`;

export const Title = styled.h1`
  font-size: 24px;
  margin: 16px 16px;
  font-family: 'Roboto Regular';
`;

export const Boddy = styled.div`
  background-color: silver;
  width: 100%;
  max-width: 700px;
  height: 40px;
  border-radius: 8px;
  flex: 3;
  flex-direction: column;
  align-content: flex-start;
  overflow: scroll;
  padding: 8px 0px 8px 8px;
  margin-bottom: 16px;
`;

export const Logo = styled.img`
  width: 90px;
  margin-bottom: 8px;
  margin-top: 8px;
`;

export const Footer = styled.div`
  width: 100%;
`;
