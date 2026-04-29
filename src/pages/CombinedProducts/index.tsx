import React, { useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/ducks/combineReducers';
import Button from '../../components/Button';
import { ProductModel } from '../../models/ProductModel';
// import logo from '../../assets/order-food.png';

import { Logo, Title, Container, Boddy, Footer } from './styles';

import ProductItem from './ProductItem';

import { createCallLoadStorage } from '../../store/ducks/callLoadStorage/actions';
import {
  cleanProductFilter,
  createProductFilter,
} from '../../store/ducks/productsFilter/actions';
import { createFlavorSelected } from '../../store/ducks/flavorSelected/actions';
import { FlavorModel } from '../../models/FlavorModel';
import { createFlavor, cleanFlavor } from '../../store/ducks/flavors/actions';

import { useToast } from '../../hooks/toast';

const CombinedProducts: React.FC = () => {
  const { addToast } = useToast();
  const dispatch = useDispatch();

  const request = useSelector((state: RootState) => state.request.data);

  const groupSelected = useSelector(
    (state: RootState) => state.groupSelected.data,
  );
  const provider = useSelector((state: RootState) => state.provider.data);
  const products = useSelector((state: RootState) => state.product.data);
  const productsFilter = useSelector(
    (state: RootState) => state.productFilter.data,
  );
  const flavors = useSelector((state: RootState) => state.flavors.data);

  const history = useHistory();

  useEffect(() => {
    const loadStorage = () => {
      if (!provider.id) {
        dispatch(createCallLoadStorage({ call: 'COMBINEDPRODUCTS' }));
        history.push('/loadstorage');
      }
    };
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
              fractioned: item.fractioned,
              fractions: item.fractions,
              edge: item.edge,
              additional: item.additional,
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

  const handleProductSelect = useCallback(
    data => {
      if (provider.open === 'S') {
        if (provider.singleEdge === 'N') {
          const newFlavor: FlavorModel = {
            id: data.id,
            idRequest: data.idRequest,
            code: data.code,
            description: data.description,
            unity: data.unity,
            price: data.price,
            amount: 1,
            codeEdge: '',
            comments: '',
            edge: '',
            priceEdge: 0,
            total: 0,
            totalEdge: 0,
            totalFlavor: 0,
          };

          dispatch(createFlavorSelected(newFlavor));
          localStorage.setItem('flavorSelected', JSON.stringify(newFlavor));

          history.push('/combinedEdge');
        } else {
          const flavorsStorage: FlavorModel[] = [];
          const currentList = flavors;
          const amountFlavors = flavors.length + 1;
          dispatch(cleanFlavor({} as FlavorModel));

          if (currentList) {
            currentList.forEach(item => {
              const newFlavor: FlavorModel = {
                id: item.id,
                idRequest: item.idRequest,
                code: item.code,
                description: item.description,
                unity: item.unity,
                amount: 1 / amountFlavors,
                price: item.price,
                totalFlavor: item.price / amountFlavors,
                codeEdge: '',
                edge: '',
                priceEdge: 0,
                totalEdge: 0,
                total: item.price / amountFlavors,
                comments: '',
              };
              dispatch(createFlavor(newFlavor));
              flavorsStorage.push(newFlavor);
            });
          }
          // let totalAdd = 0;
          // additionalSel.forEach((i) => {
          //     totalAdd = totalAdd + (i.price / amountFlavors);
          // });
          const nFlavor: FlavorModel = {
            id: data.id,
            idRequest: request.id,
            code: data.code,
            description: data.description,
            unity: data.unity,
            amount: 1 / amountFlavors,
            price: data.price,
            totalFlavor: data.price / amountFlavors,
            codeEdge: '',
            edge: '',
            priceEdge: 0,
            totalEdge: 0,
            total: data.price / amountFlavors,
            comments: '',
          };
          dispatch(createFlavor(nFlavor));
          flavorsStorage.push(nFlavor);
          localStorage.setItem('flavors', JSON.stringify(flavorsStorage));
          history.push('/combinedCheckoutSingle');
        }
        history.push('/combinedOrder');
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
      flavors,
      history,
      provider.open,
      provider.singleEdge,
      request.id,
    ],
  );

  const handleBack = useCallback(() => {
    history.push('/groups');
  }, [history]);

  return (
    <Container>
      <Logo className="logoGroup" src={provider.logo} alt="Logo" />
      <Title>Selecione um produto</Title>
      <Boddy>
        {productsFilter.map(item => (
          <ProductItem
            data={item}
            key={item.id}
            handleProductSelect={() => handleProductSelect(item)}
          />
        ))}
      </Boddy>
      <Footer>
        <Button onClick={() => handleBack()} className="groupButton">
          Voltar
        </Button>
      </Footer>
    </Container>
  );
};

export default CombinedProducts;
