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

export const Logo = styled.img`
  width: 250px;
  margin-bottom: 8px;
  margin-top: 24px;
`;

export const DetailText = styled.p`
  font-size: 14px;
  margin: 16px 0 16px;
  text-align: center;
  font-family: 'Roboto Regular';
`;

export const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 8px;
  font-family: 'Roboto Regular';
`;

export const SubTitle = styled.h2`
  font-size: 16px;
  margin-bottom: 8px;
  font-family: 'Roboto Regular';
`;

export const BoxMap = styled.div`
  width: 300px;
  height: 180px;

  div {
    width: 300px;
    height: 200px;
  }
`;

export const Footer = styled.div`
  margin-top: 8px;
  width: 100%;
`;
