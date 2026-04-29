import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { RootState } from '../../store/ducks/combineReducers';
import getValidationErrors from '../../utils/getValidationErrors';

// import logo from '../../assets/order-food.png';

import {
  Container,
  Logo,
  Boddy,
  Footer,
  Title,
  Label,
  AmountArea,
} from './styles';

import Button from '../../components/Button';
import Input from '../../components/Input';
import { createCallLoadStorage } from '../../store/ducks/callLoadStorage/actions';
import { createItem } from '../../store/ducks/items/actions';
import { ItemModel } from '../../models/ItemModel';
import { useToast } from '../../hooks/toast';

interface FormData {
  amount: number;
  comments: string;
}

const ProductDetail: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const [amount, setAmount] = useState<string>('1');

  const provider = useSelector((state: RootState) => state.provider.data);
  const request = useSelector((state: RootState) => state.request.data);
  const items = useSelector((state: RootState) => state.item.data);

  const history = useHistory();
  const dispatch = useDispatch();

  const itemSelected = useSelector(
    (state: RootState) => state.itemSelected.data,
  );

  useEffect(() => {
    const loadStorage = () => {
      if (!provider.id) {
        dispatch(createCallLoadStorage({ call: 'PRODUCTDETAIL' }));
        history.push('/loadstorage');
      }
    };
    loadStorage();
  }, [dispatch, history, provider.id]);

  function handleBack() {
    history.push('/products');
  }

  function handleDecrease() {
    let a = Number(amount);
    if (a > 1) {
      a -= 1;
    }
    setAmount(a.toString());
  }

  function handleIncrease() {
    let a = parseFloat(amount);
    a += 1;
    setAmount(a.toString());
  }

  const handleSubmit = useCallback(
    async (data: FormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          amount: Yup.number().required('Quantidade é obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const idItem = Math.floor(Math.random() * (1000 - 1) + 1);

        const newItem: ItemModel = {
          id: String(idItem),
          idRequest: request.id,
          code: itemSelected.code,
          description: itemSelected.description,
          unity: itemSelected.unity,
          amount: data.amount,
          price: itemSelected.price,
          total: data.amount * itemSelected.price,
          comments: data.comments,
          combined: 'N',
          flavors: [],
        };

        dispatch(createItem(newItem));

        const storeItems: ItemModel[] = [];
        items.forEach(item => {
          storeItems.push({
            id: item.id,
            idRequest: item.idRequest,
            code: item.code,
            description: item.description,
            unity: item.unity,
            amount: item.amount,
            price: item.price,
            total: item.total,
            comments: item.comments,
            combined: item.combined,
            flavors: item.flavors,
          });
        });
        storeItems.push({
          id: String(idItem),
          idRequest: request.id,
          code: itemSelected.code,
          description: itemSelected.description,
          unity: itemSelected.unity,
          amount: data.amount,
          price: itemSelected.price,
          total: data.amount * itemSelected.price,
          comments: data.comments,
          combined: 'N',
          flavors: [],
        });
        localStorage.setItem('items', JSON.stringify(storeItems));

        // gerar o pedido e salvar no firebase
        history.push('/request');

        addToast({
          type: 'success',
          title: 'Item adicionado',
          description: 'Item adicionado com sucesso!',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);

          // return;
        }
        addToast({
          type: 'error',
          title: 'Erro ao tentar adicionar o ítem.',
          description:
            'Ocorreu um erro ao tentar adicionar o ítem, veja se a quantidade está definida corretamente.',
        });
      }
    },
    [
      addToast,
      dispatch,
      history,
      itemSelected.code,
      itemSelected.description,
      itemSelected.price,
      itemSelected.unity,
      items,
      request.id,
    ],
  );

  return (
    <>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Container>
          <Logo className="logoProductDetail" src={provider.logo} alt="Logo" />
          <Boddy>
            <Title>{itemSelected.description}</Title>
            {/* <Title>Picanha com fritas</Title> */}
            <Label>Quantidade</Label>
            <Input
              fontSize="24px"
              align="center"
              name="amount"
              maxLength={150}
              value={amount}
              onChange={a => setAmount(a.target.value)}
            />
            <AmountArea>
              <Button
                onClick={() => handleDecrease()}
                colorButton="#ff7f50"
                fontSize="32px"
              >
                -
              </Button>
              <Button
                onClick={() => handleIncrease()}
                colorButton="#008000"
                fontSize="32px"
              >
                +
              </Button>
            </AmountArea>
            <Label>Observações</Label>
            <Input
              fontSize="16px"
              align="justify"
              name="comments"
              // onChange={o => setComments(o.target.value)}
            />
          </Boddy>

          <Footer>
            <Button onClick={() => handleBack()}>Voltar</Button>
            {provider.open !== 'S' ? (
              <Button
                type="button"
                colorButton="#999"
                disabled
                title="Estabelecimento fechado no momento"
              >
                Fechado
              </Button>
            ) : (
              <Button type="submit">Avançar</Button>
            )}
          </Footer>
        </Container>
      </Form>
    </>
  );
};

export default ProductDetail;
