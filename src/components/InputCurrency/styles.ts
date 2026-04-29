import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
  fontSize: string | undefined;
  align: string | undefined;
}

export const Container = styled.div`
  /* display: flex; */
  flex-direction: column;
  background: white;
  background-color: transparent;
  width: 100%;
  color: #989898;

  border: 0;

  h5 {
    flex: 1;
    width: 100%;
    text-align: justify;
    font-family: 'Roboto Regular';
  }

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



  input {
    flex: 1;
    background: transparent;
    font-size: ${props => (props.fontSize ? props.fontSize : '14px')};
    text-align: ${props => (props.align ? props.align : 'justify')};
    border: 0;
    font-family: 'Roboto Regular';

    &::placeholder {
      color: #989898;
    }
  }
  svg {
    margin-right: 16px;
  }
`;

export const Error = styled(Tooltip)`
  height: 18px;
  margin-left: 16px;
  svg {
    margin: 0;
  }

  span {
    background: #c53030;
    color: #fff;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
