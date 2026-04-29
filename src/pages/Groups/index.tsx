import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaShoppingCart } from 'react-icons/fa';
import { RootState } from '../../store/ducks/combineReducers';
import { GroupModel } from '../../models/GroupModel';

import {
  Logo,
  Container,
  SubTitle,
  Boddy,
  Footer,
  CartButton,
  CartButtonWrapper,
  CartBadge,
  CancelLink,
  ModalOverlay,
  ModalBox,
  ModalEmoji,
  ModalTitle,
  ModalText,
  ModalStayButton,
  ModalExitLink,
} from './styles';

import { createGroupSelected } from '../../store/ducks/groupSelected/actions';

import GroupItem from './GroupItem';
import { createCallLoadStorage } from '../../store/ducks/callLoadStorage/actions';

const MenuGroups: React.FC = () => {
  const dispatch = useDispatch();
  const [showCancelModal, setShowCancelModal] = useState(false);

  const groups = useSelector((state: RootState) => state.groups.data);
  const provider = useSelector((state: RootState) => state.provider.data);
  const items = useSelector((state: RootState) => state.item.data);

  const history = useHistory();

  useEffect(() => {
    function loadStorage() {
      if (!provider.id) {
        dispatch(createCallLoadStorage({ call: 'GROUPS' }));
        history.push('/loadstorage');
      }
    }
    loadStorage();
  }, [dispatch, history, provider.id]);

  const handleGroupSelect = useCallback(
    (data: GroupModel) => {
      dispatch(
        createGroupSelected({
          id: data.id,
          group: data.group,
          fractioned: data.fractioned,
          fractions: data.fractions,
          web_borda_subgrupo: data.web_borda_subgrupo,
        }),
      );
      localStorage.setItem(
        'gselected',
        JSON.stringify({
          id: data.id,
          group: data.group,
          fractioned: data.fractioned,
          fractions: data.fractions,
        }),
      );

      if (data.fractioned === 'S') {
        history.push('/combinedProducts');
      } else {
        history.push('/products');
      }
    },
    [dispatch, history],
  );

  const handleBack = useCallback(() => {
    history.push('/');
  }, [history]);

  const handleRequest = useCallback(() => {
    history.push('/request');
  }, [history]);

  return (
    <Container>
      <Logo className="logoGroup" src={provider.logo} alt="Logo" />
      <SubTitle>Selecione um grupo</SubTitle>
      <Boddy>
        {groups.map(item => (
          <GroupItem
            data={item}
            key={item.id}
            handleGroupSelect={() => handleGroupSelect(item)}
          />
        ))}
      </Boddy>
      <Footer>
        <CartButtonWrapper>
          <CartButton onClick={handleRequest} title="Meu pedido">
            <FaShoppingCart />
          </CartButton>
          {items.length > 0 && <CartBadge>{items.length}</CartBadge>}
        </CartButtonWrapper>
        <CancelLink onClick={() => setShowCancelModal(true)}>
          cancelar
        </CancelLink>
      </Footer>

      {showCancelModal && (
        <ModalOverlay>
          <ModalBox>
            <ModalEmoji>🍕</ModalEmoji>
            <ModalTitle>Espera! Sua barriga te implora...</ModalTitle>
            <ModalText>
              Você realmente vai embora com esse estômago vazio? Nossa cozinha
              já está de olho em você — e o cheiro está chegando!
            </ModalText>
            <ModalStayButton onClick={() => setShowCancelModal(false)}>
              Continuar pedindo!
            </ModalStayButton>
            <ModalExitLink onClick={handleBack}>
              vou passar fome mesmo...
            </ModalExitLink>
          </ModalBox>
        </ModalOverlay>
      )}
    </Container>
  );
};

export default MenuGroups;
