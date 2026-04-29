import React from 'react';
import { FiTrash2 } from 'react-icons/fi';
import { ItemModel } from '../../../models/ItemModel';
import DataFlavor from './DataFlavor';

import {
  Container,
  ProdutoDescriptionArea,
  ProdutoDescription,
  AreaDescription,
  ContainerTrash,
  DetailArea,
  PriceText,
  ObsText,
  FlavorsText,
} from './styles';

import Button from '../../../components/Button';

interface DataItemProps {
  data: ItemModel;
  handleDelete: any;
}

const DataItem: React.FC<DataItemProps> = ({ handleDelete, data }) => {
  if (data.combined === 'S') {
    return (
      <Container>
        <AreaDescription>
          <ProdutoDescriptionArea>
            <ProdutoDescription>
              {`${data.amount} ${data.description}`}
            </ProdutoDescription>
          </ProdutoDescriptionArea>
          <DetailArea>
            <PriceText>
              {Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(data.total)}
            </PriceText>
            <ObsText>{`Obs.: ${data.comments}`}</ObsText>
            <FlavorsText>Sabores</FlavorsText>
            {data.flavors.map(item => (
              <DataFlavor data={item} key={item.id} />
            ))}
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
  }
  return (
    <Container>
      <AreaDescription>
        <ProdutoDescriptionArea>
          <ProdutoDescription>
            {`${data.amount} ${data.description}`}
          </ProdutoDescription>
        </ProdutoDescriptionArea>
        <DetailArea>
          <PriceText>
            {Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format(data.total)}
          </PriceText>
          {data.comments !== '' && (
            <ObsText>{`Obs.: ${data.comments}`}</ObsText>
          )}
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
