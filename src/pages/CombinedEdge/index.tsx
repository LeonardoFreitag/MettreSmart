import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { RootState } from '../../store/ducks/combineReducers';
import Button from '../../components/Button';
import Input from '../../components/Input';
// import logo from '../../assets/order-food.png';
import { FlavorModel } from '../../models/FlavorModel';
import { EdgeModel } from '../../models/EdgeModel';

import ProductItem from './ProductItem';

import { Container, Boddy, Logo, Footer, Title, Label } from './styles';
import { createCallLoadStorage } from '../../store/ducks/callLoadStorage/actions';
import { createItem } from '../../store/ducks/items/actions';
import { cleanFlavor } from '../../store/ducks/flavors/actions';
import { ItemModel } from '../../models/ItemModel';

const CombinedEdge: React.FC = () => {
  const history = useHistory();
  const formRef = useRef<FormHandles>(null);

  const dispatch = useDispatch();

  const provider = useSelector((state: RootState) => state.provider.data);
  const edge = useSelector((state: RootState) => state.edge.data);
  const request = useSelector((state: RootState) => state.request.data);
  const flavors = useSelector((state: RootState) => state.flavors.data);
  const groupSelected = useSelector(
    (state: RootState) => state.groupSelected.data,
  );
  const products = useSelector((state: RootState) => state.product.data);
  const items = useSelector((state: RootState) => state.item.data);

  const [comments, setComments] = useState('');

  const [additional] = useState<EdgeModel[]>(() => {
    // carrega os sabores das bordas
    const edgeList: EdgeModel[] = [];
    edge.forEach(item => {
      // console.log(item);
      // console.log(groupSelected.group);
      if (String(item.subgroup) === '') {
        edgeList.push({
          codeEdge: item.codeEdge,
          edge: item.edge,
          priceEdge: item.priceEdge,
          subgroup: item.subgroup,
        });
      } else if (item.subgroup === groupSelected.group) {
        edgeList.push({
          codeEdge: item.codeEdge,
          edge: item.edge,
          priceEdge: item.priceEdge,
          subgroup: item.subgroup,
        });
      }
    });
    return edgeList;
  });

  const totalItem = useMemo(() => {
    let t = 0;
    const f = flavors;
    f.forEach(i => {
      t += i.total;
    });
    return t;
  }, [flavors]);

  useEffect(() => {
    function loadStorage() {
      if (!provider.id) {
        dispatch(
          createCallLoadStorage({
            call: 'COMBINEDEDGE',
          }),
        );
        history.push('/loadstorage');
      }
    }
    loadStorage();
  }, [dispatch, history, products, provider.id, flavors, groupSelected.group]);

  const handleSelect = useCallback(
    (data: EdgeModel) => {
      const amountFlavors = flavors.length;
      const listFlavors: FlavorModel[] = [];
      // let tFlavor = 0;
      let totalRequest = 0;
      flavors.forEach(item => {
        listFlavors.push({
          id: item.id,
          idRequest: item.idRequest,
          code: item.code,
          description: item.description,
          unity: item.unity,
          amount: 1 / amountFlavors,
          price: item.price,
          totalFlavor: item.price / amountFlavors,
          codeEdge: data.codeEdge,
          edge: data.edge,
          priceEdge: data.priceEdge,
          totalEdge: data.priceEdge / amountFlavors,
          total: item.price / amountFlavors + data.priceEdge / amountFlavors,
          comments: item.comments ? item.comments : '',
        });
        // tFlavor += item.price / amountFlavors;
        totalRequest =
          totalRequest +
          item.price / amountFlavors +
          data.priceEdge / amountFlavors;
      });

      const idItem = uuidv4();

      dispatch(
        createItem({
          id: idItem,
          idRequest: request.id,
          code: 'COMB',
          description: groupSelected.group,
          unity: 'UN',
          amount: 1,
          price: totalItem,
          total: totalRequest,
          comments: comments || '',
          combined: 'S',
          flavors: listFlavors,
        }),
      );

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
          comments: item.comments ? item.comments : '',
          combined: item.combined,
          flavors: item.flavors,
        });
      });
      storeItems.push({
        id: idItem,
        idRequest: request.id,
        code: groupSelected.id,
        description: groupSelected.group,
        unity: 'UN',
        amount: 1,
        price: totalItem,
        total: totalRequest,
        comments: comments || '',
        combined: 'S',
        flavors: listFlavors,
      });
      localStorage.setItem('items', JSON.stringify(storeItems));

      dispatch(cleanFlavor({} as FlavorModel));

      localStorage.removeItem('flavors');

      history.push('/request');
    },
    [
      comments,
      dispatch,
      flavors,
      groupSelected.group,
      groupSelected.id,
      history,
      items,
      request.id,
      totalItem,
    ],
  );

  const handleBack = useCallback(() => {
    history.push('/combinedOrder');
  }, [history]);

  const handleSubmit = useCallback(() => {
    const idItem = uuidv4();

    const newItem: ItemModel = {
      id: idItem,
      idRequest: request.id,
      code: 'COMB',
      description: groupSelected.group,
      unity: 'UN',
      amount: 1,
      price: totalItem,
      total: totalItem,
      comments: comments || '',
      combined: 'S',
      flavors,
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
        comments: item.comments ? item.comments : '',
        combined: item.combined,
        flavors: item.flavors,
      });
    });
    storeItems.push(newItem);
    localStorage.setItem('items', JSON.stringify(storeItems));

    dispatch(cleanFlavor({} as FlavorModel));

    localStorage.removeItem('flavors');

    history.push('/request');
  }, [
    comments,
    dispatch,
    flavors,
    groupSelected.group,
    history,
    items,
    request.id,
    totalItem,
  ]);

  return (
    <>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Container>
          <Logo src={provider.logo} alt="Logo" />
          <h3 style={{ marginTop: '5px' }}>Escolha borda para</h3>
          <Title style={{ marginTop: '5px', marginBottom: '5px' }}>
            {`${groupSelected.group}`}
          </Title>

          <Label>Observações</Label>
          <Input
            fontSize="12px"
            align="justify"
            name="comments"
            onChange={o => setComments(o.target.value)}
          />

          <Boddy>
            {additional.map(item => (
              <ProductItem
                data={item}
                handleSelect={handleSelect}
                key={item.codeEdge}
              />
            ))}
          </Boddy>

          <Footer>
            <Button onClick={() => handleBack()}>Voltar</Button>
            <Button type="submit">Sem borda</Button>
          </Footer>
        </Container>
      </Form>
    </>
  );
};

export default CombinedEdge;
