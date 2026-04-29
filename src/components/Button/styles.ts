import styled from 'styled-components';
import { shade } from 'polished';

interface ContainerProps {
  colorButton: string;
  fontSize: string;
}

export const Container = styled.button<ContainerProps>`
  background: ${props => props.colorButton};
  height: 48px;
  border-radius: 4px;
  border: 0;
  color: white;
  width: 100%;
  font-weight: 500;
  font-size: ${props => props.fontSize};
  transition: background-color 0.2s;
  justify-content: center;
  align-items: center;
  font-family: 'Roboto Regular';

  svg {
    margin: 8px;
    width: 24px;
    height: 24px;
    align-self: center;
    justify-self: center;
  }

  &:hover {
    background: ${props => shade(0.2, props.colorButton)};
  }
`;
