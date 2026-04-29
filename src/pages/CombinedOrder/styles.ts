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
  margin-top: 8px;
`;

export const Boddy = styled.div`
  background-color: silver;
  width: 100%;
  max-width: 700px;
  height: 40px;
  border-radius: 8px;
  flex: 2;
  flex-direction: column;
  align-content: flex-start;
  padding: 8px 8px 8px 8px;
  margin-bottom: 16px;
`;

export const Footer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  Button {
    margin-right: 4px;
  }
`;

export const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 32px;
  font-family: 'Roboto Regular';
`;

export const Label = styled.h3`
  font-size: 20px;
  margin-bottom: 4px;
  font-family: 'Roboto Regular';
`;

export const AmountArea = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 32px;

  Button {
    margin-right: 4px;
  }
`;

export const TotalArea = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  margin-bottom: 8px;

  Button {
    margin-right: 4px;
  }
`;

export const TotalTextArea = styled.div`
  min-width: 50%;
  margin-right: 4px;
`;

export const TotalText = styled.p`
  width: 100%;
  font-size: 18px;
  font-weight: bold;
  color: green;
  margin-left: 8px;
  font-family: 'Roboto Regular';
`;
