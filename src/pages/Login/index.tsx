import React, { useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

import firebase from '../../services/firebaseConfig';

import { RootState } from '../../store/ducks/combineReducers';

import { createCallLoadStorage } from '../../store/ducks/callLoadStorage/actions';
import { CallLoadStorageModel } from '../../models/CallLoadStorageModel';

import Button from '../../components/Button';

import { Container, Logo, Title, SubTitle, DetailText, Footer } from './styles';

// import logo from '../../assets/order-food.png';

// import { useToast } from '../../hooks/toast';

import { createRequest } from '../../store/ducks/request/actions';
import { RequestModel } from '../../models/RequestModel';
import { RequestStatus } from '../../models/RequestStatusEnum';
import { cleanItem } from '../../store/ducks/items/actions';
import { ItemModel } from '../../models/ItemModel';
import { cleanFlavor } from '../../store/ducks/flavors/actions';
import { FlavorModel } from '../../models/FlavorModel';

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

const Login: React.FC = () => {
  // const { addToast } = useToast();
  const history = useHistory();
  const dispatch = useDispatch();
  const provider = useSelector((state: RootState) => state.provider.data);
  // const coords = useSelector((state: RootState) => state.coords.data);
  const customer = useSelector((state: RootState) => state.customer.data);

  useEffect(() => {
    const loadStorage = () => {
      if (!provider.id) {
        dispatch(
          createCallLoadStorage({ call: 'LOGIN' } as CallLoadStorageModel),
        );

        history.push('/loadstorage');
      }
    };
    loadStorage();
  }, [dispatch, history, provider.id]);

  const handleLogin = useCallback(() => {
    localStorage.removeItem('gselected');
    localStorage.removeItem('request');
    localStorage.removeItem('flavorSelected');
    localStorage.removeItem('iselected');
    localStorage.removeItem('items');

    const ref = firebase.firestore().collection('requests').doc();
    const newDate = new Date().getTime();
    const newRequest: RequestModel = {
      id: ref.id,
      idCustomer: customer ? customer.id : '',
      idProvider: provider.id,
      dateRequest: newDate,
      totalProducts: 0,
      feeDelivery: 0,
      totalRequest: 0,
      status: RequestStatus.Open,
      addressDifferent: false,
      comeGet: false,
      address: customer ? customer.address : '',
      number: customer ? customer.number : '',
      neigh: customer ? customer.neigh : '',
      complement: customer ? String(customer.complement) : '',
      formPayment: '',
      cellPhone: '',
      change: 0,
      comments: '',
    };
    dispatch(createRequest(newRequest));
    dispatch(cleanItem({} as ItemModel));
    dispatch(cleanFlavor({} as FlavorModel));
    localStorage.setItem('request', JSON.stringify(newRequest));

    history.push('/groups');
  }, [customer, dispatch, history, provider.id]);

  return (
    <Container className="login-container">
      <Logo className="imgLogin" src={provider.logo} alt="Logo" />
      <Title>Mettre Smart</Title>
      <SubTitle>Seja bem vindo!</SubTitle>
      {/* <Map
        center={[coords.lat, coords.lng]}
        zoom={coords.zoom}
        style={{ width: '100%', height: '50%' }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={[coords.lat, coords.lng]}>
          <Popup>Encontramos você!</Popup>
        </Marker>
      </Map> */}
      <Footer>
        {provider.open === 'S' ? (
          <DetailText style={{ color: 'green', fontWeight: 'bold' }}>
            Cardápio disponível
          </DetailText>
        ) : (
          <DetailText style={{ color: 'red', fontWeight: 'bold' }}>
            Somente visualização
          </DetailText>
        )}
        <Button className="button" type="button" onClick={handleLogin}>
          {provider.open === 'S' ? 'Vamos ao cardápio' : 'Ver cardápio'}
        </Button>
      </Footer>
    </Container>
  );
};

export default Login;
