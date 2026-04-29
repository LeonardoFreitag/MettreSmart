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
`;

export const Logo = styled.img`
  width: 90px;
  margin-bottom: 8px;
  margin-top: 8px;
`;

export const Title = styled.h1`
  font-size: 22px;
  font-family: 'Roboto Regular';
  color: #333;
  letter-spacing: 1px;
  margin-bottom: 12px;
`;

export const Boddy = styled.div`
  width: 100%;
  max-width: 700px;
  flex: 3;
  flex-direction: column;
  align-content: flex-start;
  padding: 4px 0;
  margin-bottom: 8px;
  overflow: scroll;
  min-height: 40vh;
`;

export const TotalArea = styled.div`
  width: 100%;
  background: #f0faf0;
  border: 1px solid #c3e6cb;
  border-radius: 8px;
  padding: 12px 16px;
  margin-bottom: 8px;
`;

export const TotalText = styled.p`
  font-size: 20px;
  font-weight: bold;
  color: #28a745;
  font-family: 'Roboto Regular';
`;

export const AddMoreButton = styled.button`
  width: 100%;
  height: 44px;
  border-radius: 4px;
  border: 2px solid #dc1637;
  background: transparent;
  color: #dc1637;
  font-size: 14px;
  font-weight: 600;
  font-family: 'Roboto Regular';
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: 8px;
  transition: background 0.2s, color 0.2s;

  svg {
    width: 16px;
    height: 16px;
  }

  &:hover {
    background: #dc1637;
    color: #fff;
  }
`;

export const Footer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: 16px;
`;

export const BackButton = styled.button`
  flex: 1;
  height: 48px;
  border-radius: 4px;
  border: 2px solid #aaa;
  background: transparent;
  color: #666;
  font-size: 14px;
  font-weight: 500;
  font-family: 'Roboto Regular';
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  transition: border-color 0.2s, color 0.2s;

  svg {
    width: 16px;
    height: 16px;
  }

  &:hover {
    border-color: #888;
    color: #444;
  }
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

export const TotalTextArea = styled.div`
  flex: 1;
`;
