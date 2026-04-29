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
  width: 100%;
  max-width: 700px;
  flex: 3;
  flex-direction: column;
  align-content: flex-start;
  overflow-y: scroll;
  padding: 4px 0;
  margin-bottom: 8px;
`;

export const Logo = styled.img`
  width: 90px;
  margin-bottom: 8px;
  margin-top: 8px;
`;

export const SubTitle = styled.h2`
  font-size: 22px;
  margin-bottom: 12px;
  font-family: 'Roboto Regular';
  color: #333;
`;

export const Footer = styled.div`
  width: 100%;
  margin-bottom: 16px;
`;

export const BackButton = styled.button`
  width: 100%;
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
