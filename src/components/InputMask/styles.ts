import styled, { css } from 'styled-components';

interface ContainerProps {
  isFocused: boolean;
  isErrored: boolean;
  isFilled: boolean;
}

export const Container = styled.div`
  background: white;
  border-radius: 4px;
  /* padding: 16px; */
  width: 100%;

  border: 0;

  display: flex;
  align-items: center;
  color: #989898;

  & + div {
    margin-top: 8px;
  }
`;

export const Content = styled.div<ContainerProps>`
  background: white;
  border-radius: 4px;
  padding: 10px;
  width: 100%;

  border: 1px solid #e5e5e5;
  border-color: #e5e5e5;
  color: #989898;

  display: flex;
  align-items: center;

  ${props =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

  ${props =>
    props.isFocused &&
    css`
      color: #253a59;
      border-color: #253a59;
    `}

  ${props =>
    props.isFilled &&
    css`
      color: #253a59;
    `}

  h5 {
    flex: 1;
  }

  input {
    flex: 1;
    background: transparent;
    border: 0;

    &::placeholder {
      color: #989898;
    }
  }
  svg {
    margin-right: 16px;
  }
`;
