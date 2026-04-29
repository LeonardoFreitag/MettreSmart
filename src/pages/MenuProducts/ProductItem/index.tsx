import React from 'react';
import { FaUtensils } from 'react-icons/fa';
import { ProductModel } from '../../../models/ProductModel';
import {
  Container,
  Photo,
  NoPhoto,
  NoPhotoInitial,
  CardProduct,
  ProductDescription,
  Footer,
  PriceArea,
  PriceText,
  Portion,
  TextArea,
  SelectButton,
} from './styles';

interface ProductItemProps {
  data: ProductModel;
  groupName: string;
  handleProductSelect: any;
}

const ProductItem: React.FC<ProductItemProps> = ({
  handleProductSelect,
  data,
  groupName,
}) => {
  return (
    <Container>
      <CardProduct>
        {data.web_img_64 ? (
          <Photo src={data.web_img_64} alt={data.description} />
        ) : (
          <NoPhoto>
            <NoPhotoInitial>{groupName}</NoPhotoInitial>
          </NoPhoto>
        )}
        <TextArea>
          <ProductDescription>{data.description}</ProductDescription>
          {data.portionSize ? <Portion>{data.portionSize}</Portion> : null}
          <Footer>
            <PriceArea>
              <PriceText>
                {Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(data.price)}
              </PriceText>
            </PriceArea>
            <SelectButton onClick={() => handleProductSelect(data)}>
              <FaUtensils />
              Selecionar
            </SelectButton>
          </Footer>
        </TextArea>
      </CardProduct>
    </Container>
  );
};

export default ProductItem;
