import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.12);
  margin-bottom: 8px;
  overflow: hidden;
`;

export const AreaDescription = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

export const ProdutoDescriptionArea = styled.div`
  background-color: #dc1637;
  padding: 6px 10px;
`;

export const ProdutoDescription = styled.h2`
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  font-family: 'Roboto Regular';
`;

export const DetailArea = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  background-color: #fff;
  padding: 6px 10px;
`;

export const ContainerTrash = styled.div`
  display: flex;
  align-items: stretch;
  background-color: #f5f5f5;
  border-left: 1px solid #eee;
  min-width: 48px;
`;

export const PriceText = styled.p`
  width: 100%;
  text-align: right;
  font-size: 15px;
  font-weight: bold;
  color: #333;
  font-family: 'Roboto Regular';
`;

export const ObsText = styled.p`
  width: 100%;
  margin-top: 2px;
  font-size: 11px;
  color: #888;
  font-family: 'Roboto Regular';
  font-style: italic;
`;

export const FlavorsText = styled.p`
  width: 100%;
  margin-top: 4px;
  font-size: 12px;
  font-weight: bold;
  color: #555;
  font-family: 'Roboto Regular';
`;
