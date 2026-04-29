import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getDay } from 'date-fns';
import { offeredToday } from '../../utils/offeredToday';
import firebase from '../../services/firebaseConfig';
import { GroupModel } from '../../models/GroupModel';
import { createProvider } from '../../store/ducks/provider/actions';
import { ProviderModel } from '../../models/ProviderModel';
import {
  createProduct,
  cleanProduct,
} from '../../store/ducks/products/actions';
import { ProductModel } from '../../models/ProductModel';
import { createGroup, cleanGroup } from '../../store/ducks/groups/actions';
import { createEdge, cleanEdge } from '../../store/ducks/edge/actions';
import { cleanPayment, createPayment } from '../../store/ducks/payment/actions';
import { PaymentModel } from '../../models/PaymentModel';
import { createNeigh, cleanNeigh } from '../../store/ducks/neigh/actions';
import { NeighModel } from '../../models/NeighModel';
// import { createCoords } from '../../store/ducks/coords/actions';

import { Container, Logo, Title, SubTitle } from './styles';
import { CustomerModel } from '../../models/CustomerModel';
import { createCustomer } from '../../store/ducks/customer/actions';
import logo from '../../assets/order-food.png';
import { EdgeModel } from '../../models/EdgeModel';

interface ParamTypes {
  idProvider: string;
}

const Provider: React.FC = () => {
  const { idProvider } = useParams<ParamTypes>();
  const providerAuthEmail = process.env.REACT_APP_PROVIDER_AUTH_EMAIL;
  const providerAuthPassword = process.env.REACT_APP_PROVIDER_AUTH_PASSWORD;

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    const mwCustomer: CustomerModel = JSON.parse(
      String(localStorage.getItem('MW-CUSTOMER')),
    ) as CustomerModel;
    if (mwCustomer) dispatch(createCustomer(mwCustomer));

    async function loadProvide() {
      localStorage.clear();

      if (!providerAuthEmail || !providerAuthPassword) {
        alert(
          'Credenciais não configuradas. Defina REACT_APP_PROVIDER_AUTH_EMAIL e REACT_APP_PROVIDER_AUTH_PASSWORD no .env.',
        );
        return;
      }

      try {
        await firebase
          .auth()
          .signInWithEmailAndPassword(providerAuthEmail, providerAuthPassword);

        const [providerSnap, productsSnap, paymentSnap, neighSnap] =
          await Promise.all([
            firebase
              .firestore()
              .collection('providers')
              .where('id', '==', idProvider)
              .get(),
            firebase
              .firestore()
              .collection('products')
              .orderBy('description')
              .where('idProvider', '==', idProvider)
              .where('active', '==', 'S')
              .get(),
            firebase
              .firestore()
              .collection('formPayment')
              .orderBy('formPayment')
              .where('idProvider', '==', idProvider)
              .get(),
            firebase
              .firestore()
              .collection('neighborhood')
              .orderBy('name')
              .where('idProvider', '==', idProvider)
              .where('active', '==', 'S')
              .get(),
          ]);

        // Provider
        providerSnap.forEach(item => {
          const providerData: ProviderModel = {
            id: idProvider,
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
          dispatch(createProvider(providerData));
          localStorage.setItem('provider', JSON.stringify(providerData));
        });

        // Products & Groups
        dispatch(cleanProduct({} as ProductModel));
        dispatch(cleanEdge({} as EdgeModel));
        const allGroups: GroupModel[] = [];

        productsSnap.forEach(item => {
          const newItem: ProductModel = {
            id: item.data().id,
            idProvider,
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
          }

          const alreadyAdded = allGroups.some(
            g => g.group === item.data().subgroup,
          );
          if (!alreadyAdded && item.data().edge !== 'S' && offeredToday(newItem)) {
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
        allGroups.forEach(g =>
          dispatch(
            createGroup({
              id: g.id,
              group: g.group,
              fractioned: g.fractioned,
              fractions: g.fractions,
              web_borda_subgrupo: g.web_borda_subgrupo,
            } as GroupModel),
          ),
        );

        // Payments
        dispatch(cleanPayment({} as PaymentModel));
        paymentSnap.forEach(item =>
          dispatch(
            createPayment({
              id: item.data().id,
              formPayment: item.data().formPayment,
              change: item.data().change,
            } as PaymentModel),
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
            } as NeighModel),
          ),
        );

        history.push('/');
      } catch (err) {
        alert(`Erro ao carregar dados: ${err}`);
      }
    }

    loadProvide();
  }, [dispatch, history, idProvider, providerAuthEmail, providerAuthPassword]);

  return (
    <Container>
      <Logo className="imgLogin" src={logo} alt="Logo" />
      <Title>Mettre Smart</Title>
      <SubTitle>Carregando informações...</SubTitle>
    </Container>
  );
};

export default Provider;
