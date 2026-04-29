import React, { useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { offeredToday } from '../../utils/offeredToday';
import firebase from '../../services/firebaseConfig';
import { GroupModel } from '../../models/GroupModel';
import { createProvider } from '../../store/ducks/provider/actions';
import { ProviderModel } from '../../models/ProviderModel';
import {
  cleanProduct,
  createProduct,
} from '../../store/ducks/products/actions';
import {
  cleanProductFilter,
  createProductFilter,
} from '../../store/ducks/productsFilter/actions';
import { ProductModel } from '../../models/ProductModel';
import { createGroup, cleanGroup } from '../../store/ducks/groups/actions';
import { cleanPayment, createPayment } from '../../store/ducks/payment/actions';
import { PaymentModel } from '../../models/PaymentModel';
import { createNeigh, cleanNeigh } from '../../store/ducks/neigh/actions';
import { NeighModel } from '../../models/NeighModel';
import { RootState } from '../../store/ducks/combineReducers';
// import { CustomerModel } from '../../models/CustomerModel';
// import { createCustomer } from '../../store/ducks/customer/actions';
import { createRequest } from '../../store/ducks/request/actions';
import { FlavorModel } from '../../models/FlavorModel';
import { createFlavor } from '../../store/ducks/flavors/actions';
import { ItemModel } from '../../models/ItemModel';
import { createItem } from '../../store/ducks/items/actions';
import { createItemSelected } from '../../store/ducks/itemSelected/actions';
import { createGroupSelected } from '../../store/ducks/groupSelected/actions';
import { createFlavorSelected } from '../../store/ducks/flavorSelected/actions';
// import { createCoords } from '../../store/ducks/coords/actions';
import { useToast } from '../../hooks/toast';

import { Container, Logo, Title, SubTitle } from './styles';

import logo from '../../assets/order-food.png';
import { cleanEdge, createEdge } from '../../store/ducks/edge/actions';
import { EdgeModel } from '../../models/EdgeModel';

const LoadStorage: React.FC = () => {
  const history = useHistory();
  const callStorage = useSelector(
    (state: RootState) => state.callLoadStorage.data,
  );
  const dispatch = useDispatch();
  const { addToast } = useToast();
  const ranRef = useRef(false);

  useEffect(() => {
    if (ranRef.current) return;
    ranRef.current = true;

    async function init() {
      const storeProvider = JSON.parse(
        String(localStorage.getItem('provider')),
      );
      if (!storeProvider) {
        history.push('/');
        return;
      }

      const id: string = storeProvider.id;

      // Leituras de localStorage (síncronas) — sem dependência entre si
      const storeRequest = JSON.parse(String(localStorage.getItem('request')));
      const storeItems: ItemModel[] = JSON.parse(
        String(localStorage.getItem('items')),
      );
      const storeGroupSelected = JSON.parse(
        String(localStorage.getItem('gselected')),
      );
      const flavorSelected = JSON.parse(
        String(localStorage.getItem('flavorSelected')),
      );
      const storeFlavors: FlavorModel[] = JSON.parse(
        String(localStorage.getItem('flavors')),
      );
      const storeItemSelected = JSON.parse(
        String(localStorage.getItem('iselected')),
      );

      // Despacha dados do localStorage para o Redux
      if (storeRequest) {
        dispatch(
          createRequest({
            id: storeRequest.id,
            idCustomer: storeRequest.idCustomer,
            idProvider: storeRequest.idProvider,
            dateRequest: parseFloat(storeRequest.dateRequest),
            totalProducts: parseFloat(storeRequest.totalProducts),
            feeDelivery: parseFloat(storeRequest.feeDelivery),
            totalRequest: parseFloat(storeRequest.totalRequest),
            status: storeRequest.status,
            addressDifferent: storeRequest.addressDifferent,
            comeGet: storeRequest.comeGet,
            address: storeRequest.address,
            number: storeRequest.number,
            neigh: storeRequest.neigh,
            complement: storeRequest.complement,
            formPayment: storeRequest.formPayment,
            cellPhone: storeRequest.cellPhone,
            change: storeRequest.change,
            comments: storeRequest.comments,
          }),
        );
      }

      if (storeItems?.length > 0) {
        storeItems.forEach(item => {
          let totalLoaded = item.total;
          const listFlavors: FlavorModel[] = [];
          if (item.combined === 'S') {
            totalLoaded = 0;
            item.flavors.forEach(f => {
              totalLoaded += f.total;
              listFlavors.push(f);
            });
          }
          dispatch(
            createItem({ ...item, total: totalLoaded, flavors: listFlavors }),
          );
        });
      }

      if (storeGroupSelected) {
        dispatch(createGroupSelected(storeGroupSelected));
      }

      if (flavorSelected) {
        dispatch(
          createFlavorSelected({
            ...flavorSelected,
            priceEdge: parseFloat(flavorSelected.priceEdge),
          }),
        );
      }

      if (storeFlavors?.length > 0) {
        storeFlavors.forEach(f => dispatch(createFlavor(f)));
      }

      if (storeItemSelected) {
        dispatch(createItemSelected(storeItemSelected));
      }

      // Carrega dados do Firebase em paralelo
      try {
        const [providerSnap, productsSnap, paymentSnap, neighSnap] =
          await Promise.all([
            firebase
              .firestore()
              .collection('providers')
              .where('id', '==', id)
              .get(),
            firebase
              .firestore()
              .collection('products')
              .orderBy('description')
              .where('idProvider', '==', id)
              .where('active', '==', 'S')
              .get(),
            firebase
              .firestore()
              .collection('formPayment')
              .orderBy('formPayment')
              .where('idProvider', '==', id)
              .get(),
            firebase
              .firestore()
              .collection('neighborhood')
              .orderBy('name')
              .where('idProvider', '==', id)
              .where('active', '==', 'S')
              .get(),
          ]);

        // Provider
        providerSnap.forEach(item => {
          const newProvider: ProviderModel = {
            id,
            logo: item.data().logo,
            email: item.data().email,
            password: item.data().password,
            cnpj: item.data().cnpj,
            fantasy: item.data().fantasy,
            feeDelivery: item.data().feeDelivery,
            feeDeliveryMode: item.data().feeDeliveryMode,
            ray: item.data().ray,
            open: item.data().open,
            singleEdge: item.data().singleEdge,
          };
          dispatch(createProvider(newProvider));
          localStorage.setItem('provider', JSON.stringify(newProvider));
        });

        // Products, Edges & Groups
        dispatch(cleanEdge({} as EdgeModel));
        dispatch(cleanProductFilter({} as ProductModel));
        dispatch(cleanProduct({} as ProductModel));
        const allGroups: GroupModel[] = [];

        productsSnap.forEach(item => {
          const newItem: ProductModel = {
            id: item.data().id,
            idProvider: id,
            code: item.data().code,
            description: item.data().description,
            unity: item.data().unity,
            price: item.data().price,
            group: item.data().group,
            subgroup: item.data().subgroup,
            active: item.data().active,
            fractioned: item.data().fractioned,
            fractions: item.data().fractions,
            edge: item.data().edge,
            additional: item.data().additional,
            portionSize: item.data().portionSize,
            web_img_64: item.data().web_img_64,
            web_borda_subgrupo: item.data().web_borda_subgrupo,
            monday: item.data().monday,
            monday_start: item.data().monday_start,
            monday_stop: item.data().monday_stop,
            tuesday: item.data().tuesday,
            tuesday_start: item.data().tuesday_start,
            tuesday_stop: item.data().tuesday_stop,
            wednesday: item.data().wednesday,
            wednesday_start: item.data().wednesday_start,
            wednesday_stop: item.data().wednesday_stop,
            thursday: item.data().thursday,
            thursday_start: item.data().thursday_start,
            thursday_stop: item.data().thursday_stop,
            friday: item.data().friday,
            friday_start: item.data().friday_start,
            friday_stop: item.data().friday_stop,
            saturday: item.data().saturday,
            saturday_start: item.data().saturday_start,
            saturday_stop: item.data().saturday_stop,
            sunday: item.data().sunday,
            sunday_start: item.data().sunday_start,
            sunday_stop: item.data().sunday_stop,
          };

          if (item.data().edge === 'S') {
            dispatch(
              createEdge({
                codeEdge: item.data().id,
                edge: item.data().description,
                priceEdge: item.data().price,
                subgroup: item.data().web_borda_subgrupo,
              } as EdgeModel),
            );
          } else {
            dispatch(createProduct(newItem));
            if (
              storeGroupSelected &&
              newItem.subgroup === storeGroupSelected.group
            ) {
              dispatch(createProductFilter(newItem));
            }
          }

          const alreadyAdded = allGroups.some(
            g => g.group === item.data().subgroup,
          );
          if (
            !alreadyAdded &&
            item.data().edge !== 'S' &&
            offeredToday(newItem)
          ) {
            allGroups.push({
              id: item.data().id,
              group: item.data().subgroup,
              fractioned: item.data().fractioned,
              fractions: item.data().fractions,
              web_borda_subgrupo: item.data().web_borda_subgrupo,
            });
          }
        });

        dispatch(cleanGroup({} as GroupModel));
        [...allGroups]
          .sort((a, b) => a.group.localeCompare(b.group))
          .forEach(g => dispatch(createGroup(g)));

        // Payments
        dispatch(cleanPayment({} as PaymentModel));
        paymentSnap.forEach(item =>
          dispatch(
            createPayment({
              id: item.data().id,
              formPayment: item.data().formPayment,
              change: item.data().change,
            }),
          ),
        );

        // Neighborhoods
        dispatch(cleanNeigh({} as NeighModel));
        neighSnap.forEach(item =>
          dispatch(
            createNeigh({
              id: item.data().id,
              code: item.data().code,
              idProvider: item.data().idProvider,
              name: item.data().name,
              feeDelivery: item.data().feeDelivery.replace(',', '.'),
              city: item.data().city,
              uf: item.data().uf,
              ibge: item.data().ibge,
            }),
          ),
        );
      } catch {
        addToast({
          type: 'error',
          title: 'Erro ao carregar dados',
          description: 'Não foi possível carregar os dados. Tente novamente.',
        });
      }

      // Navegação após carregamento completo
      const route: Record<string, string> = {
        LOGIN: '/',
        REQUEST: '/request',
        GROUPS: '/groups',
        PRODUCTS: '/products',
        COMBINEDPRODUCTS: '/combinedProducts',
        COMBINEDORDER: '/combinedOrder',
        COMBINEDEDGE: '/combinedEdge',
        PRODUCTDETAIL: '/productDetail',
        CHECKOUT: '/checkout',
        PRECHECKOUT: '/checkout',
        NEIGHBORHOOD: '/checkout',
      };
      history.push(route[callStorage.call] ?? '/');
    }

    init();
  }, [addToast, callStorage.call, dispatch, history]);

  return (
    <Container>
      <Logo className="imgLogin" src={logo} alt="Logo" />
      <Title>Mettre Smart</Title>
      <SubTitle>Carregando informações...</SubTitle>
    </Container>
  );
};

export default LoadStorage;
