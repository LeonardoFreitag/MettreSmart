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

  h1 {
    margin-bottom: 20px;
  }
`;

export const Logo = styled.img`
  width: 90px;
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
  font-size: 32px;
  margin-bottom: 8px;
  font-family: 'Roboto Regular';
`;

export const SubTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 8px;
  font-family: 'Roboto Regular';
`;
