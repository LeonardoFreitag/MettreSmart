import React, { useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FiArrowLeft, FiShoppingBag } from 'react-icons/fi';
import { RootState } from '../../store/ducks/combineReducers';
import { ItemModel } from '../../models/ItemModel';
import DataItem from './DataItem';

import {
  Container,
  Logo,
  Title,
  Boddy,
  TotalArea,
  TotalText,
  AddMoreButton,
  Footer,
  BackButton,
} from './styles';

import Button from '../../components/Button';
import { createCallLoadStorage } from '../../store/ducks/callLoadStorage/actions';
import {
  updateRequest,
} from '../../store/ducks/request/actions';
import { RequestModel } from '../../models/RequestModel';
import { deleteItem } from '../../store/ducks/items/actions';
import { useToast } from '../../hooks/toast';

const Request: React.FC = () => {
  const dispatch = useDispatch();
  const request = useSelector((state: RootState) => state.request.data);
  const items = useSelector((state: RootState) => state.item.data);
  const provider = useSelector((state: RootState) => state.provider.data);
  const { addToast } = useToast();

  const history = useHistory();

  const updateTotalProducts = useCallback(() => {
    let total = 0;
    items.forEach(item => {
      total += item.total;
    });

    const newRequest: RequestModel = {
      ...request,
      totalProducts: total,
      totalRequest: total,
    };

    dispatch(updateRequest(newRequest));
    localStorage.setItem('request', JSON.stringify(newRequest));
  }, [dispatch, items, request]);

  useEffect(() => {
    const loadStorage = () => {
      if (!provider.id) {
        dispatch(
          createCallLoadStorage({
            call: 'REQUEST',
          }),
        );
        history.push('/loadstorage');
      } else {
        updateTotalProducts();
      }
    };
    loadStorage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCloseOrder = useCallback(() => {
    if (items.length > 0) {
      history.push('/checkout');
    } else {
      addToast({
        type: 'error',
        title: 'Seu pedido está vazio!',
        description:
          'Prezado cliente, seu pedido ainda não tem nenhum produto. Tente novamente.',
      });
    }
  }, [addToast, history, items.length]);

  const handleBack = useCallback(() => {
    history.push('/groups');
  }, [history]);

  const handleDelete = useCallback(
    (data: ItemModel) => {
      const newListItems = items.filter(opt => opt.id !== data.id);
      let total = 0;
      newListItems.forEach(item => {
        if (item.id !== data.id) {
          total += item.total;
        }
      });

      const newRequest: RequestModel = {
        ...request,
        totalProducts: total,
        totalRequest: total,
      };

      dispatch(updateRequest(newRequest));
      localStorage.setItem('request', JSON.stringify(newRequest));
      dispatch(deleteItem(data));
      localStorage.setItem('items', JSON.stringify(newListItems));
    },
    [dispatch, items, request],
  );

  return (
    <Container>
      {provider.logo !== '' && <Logo src={provider.logo} alt="Logo" />}
      <Title>MEU PEDIDO</Title>
      <Boddy>
        {items.map(item => (
          <DataItem
            data={item}
            handleDelete={() => handleDelete(item)}
            key={item.id}
          />
        ))}
      </Boddy>

      <TotalArea>
        <TotalText>
          {`Total: ${Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(request.totalRequest)}`}
        </TotalText>
      </TotalArea>

      <AddMoreButton onClick={handleBack}>
        <FiShoppingBag />
        Continuar comprando
      </AddMoreButton>

      <Footer>
        <BackButton onClick={handleBack}>
          <FiArrowLeft />
          Voltar
        </BackButton>
        <Button
          onClick={handleCloseOrder}
          colorButton="green"
          style={{ flex: 1 }}
        >
          Fechar meu pedido
        </Button>
      </Footer>
    </Container>
  );
};

export default Request;
