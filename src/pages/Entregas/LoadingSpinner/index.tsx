import React from 'react';
import { Wrapper, Spinner, Label } from './styles';

const LoadingSpinner: React.FC = () => (
  <Wrapper>
    <Spinner />
    <Label>Carregando entregas...</Label>
  </Wrapper>
);

export default LoadingSpinner;
