import styled from 'styled-components';

export const Container = styled.div`
  margin-right: 8px;
  margin-bottom: 8px;
  display: flex;
  width: 100%;
  background-color: #f1948a;
  border-radius: 4px;
  height: 50px;
`;

export const DetailText = styled.p`
  font-size: 10px;
`;

export const LabelArea = styled.div`
  display: flex;
  width: 80%;
  align-items: center;
  justify-content: center;

  h4 {
    color: #fff;
  }
`;

export const ButtonSelect = styled.button`
  width: 20%;
  align-items: center;
  justify-content: center;
  border: 0;
  background-color: #dc1637;
  border-radius: 4px;
`;
