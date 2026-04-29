import styled from 'styled-components';

export const Container = styled.div`
  margin-right: 8px;
  margin-bottom: 8px;
`;

export const DetailText = styled.p`
  font-size: 10px;
  font-family: 'Roboto Regular';
`;

export const CardProduct = styled.div`
  background-color: #fff;
  border-radius: 4px;
  min-height: 150px;
  width: 100%;
  display: flex;
  flex: 1;
  flex-direction: column;
`;

export const Photo = styled.img`
  width: 100%;
`;

export const ProductDescription = styled.p`
  margin-top: 8px;
  margin-bottom: 8px;
  font-size: 24px;
  font-weight: bold;
  font-family: 'Roboto Regular';
`;

export const Footer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const PriceText = styled.p`
  color: green;
  height: 100%;
  font-size: 24px;
  font-weight: bold;
  font-family: 'Roboto Regular';
`;

export const PriceArea = styled.div`
  min-width: 50%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const Portion = styled.p`
  border: 1px solid #fff;
  background-color: #fff;
  flex-wrap: wrap;
  width: 100%;
  resize: none;
  font-family: 'Roboto Regular';
`;

export const TextArea = styled.div`
  padding: 8px;
`;
