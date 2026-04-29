import styled from 'styled-components';

export const Container = styled.div`
  /* background: white; */
  border-radius: 10px;
  /* padding: 16px; */
  width: 100%;
  font-family: 'Roboto Regular';

  border: 0;

  display: flex;
  align-items: center;

  & + div {
    margin-top: 8px;
  }
  color: #989898;

  label {
    padding: 16px;
  }
`;

export const Content = styled.div`
  flex: 1;
  margin-bottom: 8px;
  display: flex;
  align-items: center;

  .css-2b097c-container {
    border: 0;
    flex: 1;

    .react-select__control css-yk16xz-control {
      border: 0;
    }
  }
`;
