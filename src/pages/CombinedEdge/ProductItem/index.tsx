import React from 'react';
import Button from '../../../components/Button';
import { EdgeModel } from '../../../models/EdgeModel';
import {
  Container,
  CardProduct,
  ProductDescription,
  Footer,
  PriceArea,
  PriceText,
  TextArea,
} from './styles';

interface IProductItemProps {
  data: EdgeModel;
  handleSelect: any;
}

const ProductItem: React.FC<IProductItemProps> = ({ handleSelect, data }) => {
  return (
    <Container>
      <CardProduct onClick={() => handleSelect(data)}>
        <TextArea>
          <ProductDescription>{data.edge}</ProductDescription>
          <Footer>
            <PriceArea>
              <PriceText>
                {Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(data.priceEdge)}
              </PriceText>
            </PriceArea>
            <Button>Selecionar</Button>
          </Footer>
        </TextArea>
      </CardProduct>
    </Container>
  );
};

export default ProductItem;
