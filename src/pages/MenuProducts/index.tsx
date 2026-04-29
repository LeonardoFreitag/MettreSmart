import React, { useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FiArrowLeft } from 'react-icons/fi';
import { RootState } from '../../store/ducks/combineReducers';
import { ProductModel } from '../../models/ProductModel';

import { Logo, Container, SubTitle, Boddy, Footer, BackButton } from './styles';

import ProductItem from './ProductItem';

// import refeicao from '../../assets/refeicao.png';
import {
  cleanProductFilter,
  createProductFilter,
} from '../../store/ducks/productsFilter/actions';
import { ItemModel } from '../../models/ItemModel';
import { createItemSelected } from '../../store/ducks/itemSelected/actions';
import { createCallLoadStorage } from '../../store/ducks/callLoadStorage/actions';

import { useToast } from '../../hooks/toast';

const MenuProducts: React.FC = () => {
  const { addToast } = useToast();

  const dispatch = useDispatch();

  const provider = useSelector((state: RootState) => state.provider.data);
  const groupSelected = useSelector(
    (state: RootState) => state.groupSelected.data,
  );
  const productsFilter = useSelector(
    (state: RootState) => state.productFilter.data,
  );
  const products = useSelector((state: RootState) => state.product.data);
  const request = useSelector((state: RootState) => state.request.data);

  const history = useHistory();

  useEffect(() => {
    function loadStorage() {
      // console.log(groups);
      if (!provider.id) {
        dispatch(createCallLoadStorage({ call: 'PRODUCTS' }));
        history.push('/loadstorage');
      }
    }
    loadStorage();
  }, [dispatch, history, provider.id]);

  useEffect(() => {
    const filterProducts = () => {
      dispatch(cleanProductFilter({} as ProductModel));

      products.forEach(item => {
        if (item.subgroup === groupSelected.group) {
          dispatch(
            createProductFilter({
              id: item.id,
              idProvider: item.idProvider,
              code: item.code,
              description: item.description,
              unity: item.unity,
              price: item.price,
              group: item.group,
              subgroup: item.subgroup,
              active: item.active,
              additional: item.additional,
              edge: item.edge,
              fractioned: item.fractioned,
              fractions: item.fractions,
              portionSize: item.portionSize,
              web_img_64: item.web_img_64,
              web_borda_subgrupo: item.web_borda_subgrupo,
              monday: item.monday,
              monday_start: item.monday_start,
              monday_stop: item.monday_stop,
              tuesday: item.tuesday,
              tuesday_start: item.tuesday_start,
              tuesday_stop: item.tuesday_stop,
              wednesday: item.wednesday,
              wednesday_start: item.wednesday_start,
              wednesday_stop: item.wednesday_stop,
              thursday: item.thursday,
              thursday_start: item.thursday_start,
              thursday_stop: item.thursday_stop,
              friday: item.friday,
              friday_start: item.friday_start,
              friday_stop: item.friday_stop,
              saturday: item.saturday,
              saturday_start: item.saturday_start,
              saturday_stop: item.saturday_stop,
              sunday: item.sunday,
              sunday_start: item.sunday_start,
              sunday_stop: item.sunday_stop,
            }),
          );
        }
      });
    };
    filterProducts();
  }, [dispatch, groupSelected.group, products]);

  const handleProductDetail = useCallback(
    (data: ProductModel) => {
      if (provider.open === 'S') {
        const newItemSel: ItemModel = {
          id: data.id,
          idRequest: request.id,
          code: data.code,
          description: data.description,
          unity: data.unity,
          price: data.price,
          amount: 1,
          combined: groupSelected.fractioned,
          comments: '',
          flavors: [],
          total: 0,
        };
        dispatch(createItemSelected(newItemSel));
        localStorage.setItem('iselected', JSON.stringify(newItemSel));
        history.push('/productDetail');
      } else {
        addToast({
          type: 'info',
          title: 'Atenção',
          description:
            'Prezado cliente, estabelecimento não está aberto, tente novamente mais tarde.',
        });
      }
    },
    [
      addToast,
      dispatch,
      groupSelected.fractioned,
      history,
      provider.open,
      request.id,
    ],
  );

  const handleBack = useCallback(() => {
    history.push('/groups');
  }, [history]);

  return (
    <Container>
      <Logo src={provider.logo} alt="Logo" />
      <SubTitle>Que sabor vai te fazer feliz hoje?</SubTitle>
      <Boddy>
        {productsFilter.map(item => (
          <ProductItem
            data={item}
            key={item.id}
            groupName={groupSelected.group}
            handleProductSelect={() => handleProductDetail(item)}
          />
        ))}
      </Boddy>
      <Footer>
        <BackButton onClick={handleBack}>
          <FiArrowLeft />
          Voltar
        </BackButton>
      </Footer>
    </Container>
  );
};

export default MenuProducts;
