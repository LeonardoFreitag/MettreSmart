import React, { useEffect, useCallback, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/ducks/combineReducers';
import DataItem from './DataItem';
// import logo from '../../assets/order-food.png';

import {
  Container,
  Logo,
  Title,
  Boddy,
  TotalArea,
  TotalTextArea,
  TotalText,
  Footer,
} from './styles';

import Button from '../../components/Button';
import { FlavorModel } from '../../models/FlavorModel';
import { createCallLoadStorage } from '../../store/ducks/callLoadStorage/actions';
import { deleteFlavor, updateFlavor } from '../../store/ducks/flavors/actions';
import { useToast } from '../../hooks/toast';

const CombinedOrder: React.FC = () => {
  const { addToast } = useToast();
  const history = useHistory();
  const dispatch = useDispatch();
  const provider = useSelector((state: RootState) => state.provider.data);
  const flavors = useSelector((state: RootState) => state.flavors.data);
  const groupSelected = useSelector(
    (state: RootState) => state.groupSelected.data,
  );

  const totalItem = useMemo(() => {
    let totalCombined = 0;
    flavors.forEach(i => {
      totalCombined += i.total;
    });
    return totalCombined;
  }, [flavors]);

  useEffect(() => {
    const loadStorage = () => {
      if (!provider.id) {
        dispatch(
          createCallLoadStorage({
            call: 'COMBINEDORDER',
          }),
        );
        history.push('/loadstorage');
      }
    };
    loadStorage();
  }, [dispatch, flavors, history, provider.id]);

  const handleFinalize = useCallback(() => {
    if (flavors.length > 0) {
      history.push('/combinedEdge');
    } else {
      addToast({
        type: 'error',
        title: 'Atenção',
        description: 'Você precisa selecionar pelo menos 1 sabor!',
      });
    }
  }, [addToast, flavors.length, history]);

  const handleDelete = useCallback(
    (data: FlavorModel) => {
      dispatch(deleteFlavor(data));
      const newList = flavors.filter(opt => opt.id !== data.id);
      const newListLength = newList.length;
      const updtdList: FlavorModel[] = [];
      newList.forEach(item => {
        dispatch(
          updateFlavor({
            ...item,
            amount: 1 / newListLength,
            totalFlavor: item.price / newListLength,
            totalEdge: item.priceEdge / newListLength,
            total: item.price / newListLength + item.priceEdge / newListLength,
          }),
        );
        updtdList.push({
          ...item,
          amount: 1 / newListLength,
          totalFlavor: item.price / newListLength,
          totalEdge: item.priceEdge / newListLength,
          total: item.price / newListLength + item.priceEdge / newListLength,
        });
      });
      if (updtdList.length > 0) {
        localStorage.setItem('flavors', JSON.stringify(updtdList));
      } else {
        localStorage.removeItem('flavors');
      }
    },
    [dispatch, flavors],
  );

  function handleaddFlavor() {
    if (flavors.length < groupSelected.fractions) {
      history.push('/combinedProducts');
    } else {
      // alert('Limite de sabores atingido!');
      addToast({
        type: 'info',
        title: 'Atenção',
        description: 'Limite de sabores atingido!',
      });
    }
  }

  return (
    <Container>
      {provider.logo !== '' && <Logo src={provider.logo} alt="Logo" />}
      <Title>SABORES ESCOLHIDOS</Title>
      <Boddy>
        {flavors.map(item => (
          <DataItem
            data={item}
            handleDelete={() => handleDelete(item)}
            key={item.id}
          />
        ))}
      </Boddy>
      <TotalArea>
        <TotalTextArea>
          <TotalText>
            {`Total: ${Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format(totalItem)}`}
          </TotalText>
        </TotalTextArea>
        <Button onClick={handleaddFlavor}>Mais um sabor</Button>
      </TotalArea>

      <Footer>
        <Button
          style={{ marginLeft: '5px' }}
          onClick={handleFinalize}
          colorButton="green"
        >
          Pronto! Próximo passo
        </Button>
      </Footer>
    </Container>
  );
};

export default CombinedOrder;
