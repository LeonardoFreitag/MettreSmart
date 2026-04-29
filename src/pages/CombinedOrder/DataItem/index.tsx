import React, { useMemo } from 'react';
import { FiTrash2 } from 'react-icons/fi';
import {
  Container,
  ProdutoDescriptionArea,
  ProdutoDescription,
  AreaDescription,
  ContainerTrash,
  DetailArea,
  PriceText,
} from './styles';

import Button from '../../../components/Button';
import { FlavorModel } from '../../../models/FlavorModel';

interface DataItemProps {
  data: FlavorModel;
  handleDelete: any;
}

const DataItem: React.FC<DataItemProps> = ({ handleDelete, data }) => {
  const amountFrac = useMemo(() => {
    if (data.amount >= 0.3 && data.amount <= 0.35) {
      return '1/3';
    }
    if (data.amount === 0.25) {
      return '1/4';
    }
    if (data.amount === 0.5) {
      return '1/2';
    }
    return '1';
  }, [data.amount]);

  return (
    <Container>
      <AreaDescription>
        <ProdutoDescriptionArea>
          <ProdutoDescription>
            {`${amountFrac} ${data.description}`}
          </ProdutoDescription>
        </ProdutoDescriptionArea>
        <DetailArea>
          <PriceText>
            {Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format(data.total)}
          </PriceText>
          {/* <ObsText>{`Obs.: ${data.comments}`}</ObsText> */}
        </DetailArea>
      </AreaDescription>
      <ContainerTrash>
        <Button
          colorButton="#7e8488"
          onClick={() => handleDelete(data)}
          style={{ height: '100%' }}
        >
          <FiTrash2 />
        </Button>
      </ContainerTrash>
    </Container>
  );
};

export default DataItem;
