import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  colorButton?: string;
  fontSize?: string;
}

const Button: React.FC<ButtonProps> = ({
  colorButton,
  fontSize,
  children,
  ...rest
}) => (
  <Container
    type="button"
    colorButton={colorButton || '#dc1637'}
    fontSize={fontSize || '14px'}
    {...rest}
  >
    {children && children}
  </Container>
);

export default Button;
