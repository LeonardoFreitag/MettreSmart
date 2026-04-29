import React from 'react';
import Button from '../../../components/Button';
import { ProductModel } from '../../../models/ProductModel';
import {
  Container,
  Photo,
  CardProduct,
  ProductDescription,
  Footer,
  PriceArea,
  PriceText,
  Portion,
  TextArea,
} from './styles';

interface ProductItemProps {
  data: ProductModel;
  handleProductSelect: any;
}

const ProductItem: React.FC<ProductItemProps> = ({
  handleProductSelect,
  data,
}) => {
  return (
    <Container>
      <CardProduct onClick={() => handleProductSelect(data)}>
        {data.web_img_64 && <Photo src={data.web_img_64} alt="Logo" />}
        <TextArea>
          <ProductDescription>{data.description}</ProductDescription>
          <Portion>{data.portionSize}</Portion>
          <Footer>
            <PriceArea>
              <PriceText>
                {Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(data.price)}
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
