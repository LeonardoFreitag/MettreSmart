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

export const Boddy = styled.div`
  background-color: silver;
  width: 100%;
  max-width: 700px;
  min-height: 40vh;
  border-radius: 8px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  flex: 3;
  flex-direction: column;
  align-content: flex-start;
  overflow: scroll;
  padding: 8px 0px 8px 8px;
  margin-bottom: 4px;
`;

export const Logo = styled.img`
  width: 90px;
  margin-bottom: 8px;
  margin-top: 8px;
`;

export const SubTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 8px;
  font-family: 'Roboto Regular';
`;

export const Footer = styled.div`
  width: 100%;
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const CartButtonWrapper = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 8px;
`;

export const CartButton = styled.button`
  background: #28a745;
  border: none;
  border-radius: 4px;
  width: 100%;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s;

  svg {
    color: white;
    width: 28px;
    height: 28px;
  }

  &:hover {
    background: #218838;
  }
`;

export const CartBadge = styled.span`
  position: absolute;
  top: 8px;
  right: 12px;
  background: #dc1637;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  font-size: 11px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Roboto Regular';
`;

export const CancelLink = styled.button`
  background: none;
  border: none;
  color: #aaa;
  font-size: 12px;
  font-family: 'Roboto Regular';
  cursor: pointer;
  padding: 4px 8px;
  text-decoration: underline;
  transition: color 0.2s;

  &:hover {
    color: #888;
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const ModalBox = styled.div`
  background: white;
  border-radius: 12px;
  padding: 32px 24px;
  max-width: 340px;
  width: 90%;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`;

export const ModalEmoji = styled.p`
  font-size: 48px;
  margin: 0;
`;

export const ModalTitle = styled.h3`
  font-size: 18px;
  font-family: 'Roboto Regular';
  color: #333;
  margin: 0;
`;

export const ModalText = styled.p`
  font-size: 14px;
  font-family: 'Roboto Regular';
  color: #666;
  margin: 0;
  line-height: 1.5;
`;

export const ModalStayButton = styled.button`
  background: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  width: 100%;
  height: 48px;
  font-size: 15px;
  font-weight: 700;
  font-family: 'Roboto Regular';
  cursor: pointer;
  transition: background-color 0.2s;
  margin-top: 8px;

  &:hover {
    background: #218838;
  }
`;

export const ModalExitLink = styled.button`
  background: none;
  border: none;
  color: #bbb;
  font-size: 12px;
  font-family: 'Roboto Regular';
  cursor: pointer;
  text-decoration: underline;
  padding: 4px;

  &:hover {
    color: #999;
  }
`;
