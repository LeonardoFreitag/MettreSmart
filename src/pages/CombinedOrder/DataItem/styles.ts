import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  background-color: #fae8d8;
  /* border-radius: 8px; */
  margin-top: 4px;
`;

export const AreaDescription = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

export const DetailArea = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  background-color: #fae8d8;
  padding: 4px;
`;

export const ProdutoDescriptionArea = styled.div`
  background-color: #2b70a8;
  padding: 4px;
`;

export const ProdutoDescription = styled.h2`
  /* border-radius: 4px; */
  background-color: #2b70a8;
  color: #fff;
  font-size: 16px;
  font-family: 'Roboto Regular';
`;

export const ContainerTrash = styled.div`
  background-color: #7e8488;
`;

export const PriceText = styled.h2`
  width: 100%;
  margin-bottom: 4px;
  text-align: right;
  font-size: 16px;
  font-family: 'Roboto Regular';
`;

export const ObsText = styled.h2`
  width: 100%;
  margin-bottom: 4px;
  font-size: 12px;
  font-family: 'Roboto Regular';
`;

export const FlavorsText = styled.h2`
  width: 100%;
  margin-bottom: 4px;
  font-size: 14px;
  font-family: 'Roboto Regular';
`;
