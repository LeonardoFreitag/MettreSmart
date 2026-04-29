import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaSearch } from 'react-icons/fa';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import logo from '../../assets/order-food.png';

import { RootState } from '../../store/ducks/combineReducers';

import {
  Container,
  Header,
  Title,
  Logo,
  FindArea,
  Boddy,
  Footer,
  Label,
} from './styles';

import Buttom from '../../components/Button';
import { NeighModel } from '../../models/NeighModel';

import Input from '../../components/Input';

import NeighItem from './NeighItem';
import { updateRequest } from '../../store/ducks/request/actions';
import { createCallLoadStorage } from '../../store/ducks/callLoadStorage/actions';

const Neighborhood: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();
  const dispatch = useDispatch();
  const request = useSelector((state: RootState) => state.request.data);
  const provider = useSelector((state: RootState) => state.provider.data);

  const neigh = useSelector((state: RootState) => state.neigh.data);
  const [optionsNeigh, setOptionsNeigh] = useState<NeighModel[]>(() => {
    const newListNeigh: NeighModel[] = [];
    neigh.forEach(item => {
      newListNeigh.push({
        id: item.id,
        code: item.code,
        name: item.name,
        city: item.city,
        feeDelivery: item.feeDelivery,
        ibge: item.ibge,
        idProvider: item.idProvider,
        uf: item.uf,
      });
    });
    return newListNeigh;
  });

  useEffect(() => {
    const loadStorage = () => {
      if (!provider.id) {
        dispatch(
          createCallLoadStorage({
            call: 'NEIGHBORHOOD',
          }),
        );
        history.push('/loadstorage');
      }
    };
    loadStorage();
  }, [dispatch, history, provider.id]);

  const handleBack = useCallback(() => {
    history.push('/precheckout');
  }, [history]);

  const handleSelectNeigh = useCallback(
    (option: NeighModel) => {
      const newRequest = {
        ...request,
        feeDelivery: option.feeDelivery,
        neigh: option.name,
      };
      dispatch(updateRequest(newRequest));
      localStorage.setItem('request', JSON.stringify(newRequest));
      history.push('/checkout');
    },
    [dispatch, history, request],
  );

  const handleTypingFilter = useCallback(
    data => {
      const filter: string = data.value;
      // console.log(filter.toUpperCase());
      const filterUpper = filter.toUpperCase();
      const filterList = neigh.filter(opt => opt.name.includes(filterUpper));
      // console.log(filterList);
      setOptionsNeigh(filterList);
    },
    [neigh],
  );

  return (
    <>
      <Form
        ref={formRef}
        onSubmit={handleSelectNeigh}
        initialData={{
          paymentForm: '',
        }}
      >
        <Container>
          <Header>
            {/* <Logo src={provider.logo} alt="Logo" /> */}
            <Logo src={logo} alt="Logo" />
            <Title>Finalizando pedido</Title>
          </Header>
          <FindArea>
            <Label>Localize seu bairro:</Label>
            <Input
              fontSize="14px"
              align="justify"
              name="find"
              icon={FaSearch}
              onChange={e => handleTypingFilter(e.target)}

              // onKeyUp={e => handleTypingFilter(e.key)}
            />
          </FindArea>
          <Boddy>
            {optionsNeigh.map(item => (
              <NeighItem
                data={item}
                key={item.id}
                handleNeighSelect={() => handleSelectNeigh(item)}
              />
            ))}
          </Boddy>
          <Footer>
            <Buttom onClick={handleBack}>Voltar</Buttom>
          </Footer>
        </Container>
      </Form>
    </>
  );
};

export default Neighborhood;
