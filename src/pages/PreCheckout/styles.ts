import styled from 'styled-components';

export const Container = styled.div`
  width: 90%;
  max-width: 500px;
  min-height: 90vh;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  flex: 1;

  Form {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-items: center;
`;

export const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 8px;
  font-family: 'Roboto Regular';
`;

export const Logo = styled.img`
  width: 40px;
  margin-bottom: 8px;
  margin-top: 8px;
  margin-right: 16px;
`;

export const SwitchArea = styled.div`
  margin-top: 4px;
  margin-bottom: 4px;
  border-radius: 4px;
  display: flex;
  width: 100%;
  align-items: center;
  background-color: #2b70a8;
  padding: 16px;
`;

export const LabelSwitch = styled.h2`
  margin-left: 16px;
  color: #fff;
  font-family: 'Roboto Regular';
`;

export const Boddy = styled.div`
  background-color: silver;
  width: 100%;
  max-width: 700px;
  min-height: 60vh;
  border-radius: 4px;
  flex-direction: column;
  align-content: flex-start;
  overflow: scroll;
  padding: 8px 16px 16px 16px;
  margin-top: 2px;
  margin-bottom: 2px;
`;

export const Footer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  Button + Button {
    margin-left: 8px;
  }
`;

export const PaymentArea = styled.div`
  margin-top: 4px;
  width: 100%;
  align-items: flex-start;
`;

export const AddressArea = styled.div`
  /* margin-top: 8px; */
  width: 100%;
  align-items: flex-start;
`;

export const Label = styled.h3`
  font-size: 16px;
  margin-bottom: 2px;
  margin-top: 4px;
  font-family: 'Roboto Regular';
`;

export const LabelTotal = styled.h3`
  font-size: 16px;
  margin-bottom: 2px;
  margin-top: 4px;
  color: #fff;
  text-align: right;
  font-family: 'Roboto Regular';
`;

export const TotalArea = styled.div`
  width: 100%;
  align-items: center;
  justify-content: center;
  background-color: #2b70a8;
  border-radius: 4px;
  margin-bottom: 4px;
  margin-top: 4px;
  padding: 16px;
`;
