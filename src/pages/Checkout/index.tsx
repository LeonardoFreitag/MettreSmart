import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Switch from 'react-switch';
import {
  FiCreditCard,
  FiDollarSign,
  FiZap,
  FiCheck,
  FiEdit2,
  FiArrowLeft,
} from 'react-icons/fi';
import { FaShoppingCart } from 'react-icons/fa';

import firebase from '../../services/firebaseConfig';
import { RootState } from '../../store/ducks/combineReducers';
import { useToast } from '../../hooks/toast';
import { CustomerModel } from '../../models/CustomerModel';
import { NeighModel } from '../../models/NeighModel';
import { PaymentModel } from '../../models/PaymentModel';
import { updateCustomer } from '../../store/ducks/customer/actions';
import { updateRequest } from '../../store/ducks/request/actions';
import { createCallLoadStorage } from '../../store/ducks/callLoadStorage/actions';
import { fetchCep, matchNeighborhood } from '../../utils/fetchCep';
import Button from '../../components/Button';
import { RequestDTO } from './RequestDTO';
import {
  Container,
  Header,
  Logo,
  Title,
  StepIndicator,
  StepDot,
  FieldGroup,
  Label,
  StyledInput,
  StyledTextarea,
  StyledMaskInput,
  RowGroup,
  InfoText,
  PaymentGrid,
  PaymentCard,
  PaymentCardLabel,
  CheckBadge,
  SwitchArea,
  LabelSwitch,
  TotalArea,
  LabelTotal,
  Footer,
  BackButton,
  CartIconButton,
  CartBadge,
  Spinner,
  SpinnerBlue,
  CustomerCard,
  CustomerCardHeader,
  CustomerCardTitle,
  CustomerCardEditButton,
  CustomerCardRow,
  CustomerCardLabel,
  CustomerCardValue,
  NeighButton,
  ModalOverlay,
  ModalBox,
  ModalTitle,
  ModalSearch,
  NeighList,
  NeighCard,
  NeighCardInfo,
  NeighCardName,
  NeighCardMeta,
  NeighCardFee,
} from './styles';

type Step = 'phone' | 'address' | 'payment';

const formatBRL = (value: number) =>
  Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
    value,
  );

const getPaymentIcon = (paymentName: string) => {
  const lower = paymentName.toLowerCase();
  if (lower.includes('pix')) return <FiZap size={22} />;
  if (
    lower.includes('dinheiro') ||
    lower.includes('espécie') ||
    lower.includes('especie')
  )
    return <FiDollarSign size={22} />;
  return <FiCreditCard size={22} />;
};

const Checkout: React.FC = () => {
  const { addToast } = useToast();
  const history = useHistory();
  const dispatch = useDispatch();
  const initializedRef = useRef(false);

  const provider = useSelector((state: RootState) => state.provider.data);
  const customer = useSelector((state: RootState) => state.customer.data);
  const request = useSelector((state: RootState) => state.request.data);
  const items = useSelector((state: RootState) => state.item.data);
  const formPayment = useSelector((state: RootState) => state.payment.data);
  const neighList = useSelector((state: RootState) => state.neigh.data);

  const [step, setStep] = useState<Step>('phone');
  const [isReturning, setIsReturning] = useState(false);

  // Passo 1 — Celular
  const [phone, setPhone] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  // Passo 2 — Endereço
  const [name, setName] = useState('');
  const [cep, setCep] = useState('');
  const [street, setStreet] = useState('');
  const [addressNumber, setAddressNumber] = useState('');
  const [complement, setComplement] = useState('');
  const [city, setCity] = useState('');
  const [uf, setUf] = useState('');
  const [bairro, setBairro] = useState('');
  const [isCepLoading, setIsCepLoading] = useState(false);
  const [neighSelected, setNeighSelected] = useState<NeighModel | null>(null);
  const [showNeighModal, setShowNeighModal] = useState(false);
  const [neighSearch, setNeighSearch] = useState('');

  // Passo 3 — Pagamento
  const [paymentSelected, setPaymentSelected] = useState('');
  const [hasChange, setHasChange] = useState(false);
  const [changeValue, setChangeValue] = useState('');
  const [comeGet, setComeGet] = useState(false);
  const [orderComments, setOrderComments] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isSavingAddress, setIsSavingAddress] = useState(false);

  // Guard: redireciona para loadStorage se provider não estiver carregado
  useEffect(() => {
    if (!provider.id) {
      dispatch(createCallLoadStorage({ call: 'CHECKOUT' }));
      history.push('/loadstorage');
    }
  }, [dispatch, history, provider.id]);

  // Detecta cliente recorrente lendo localStorage uma única vez ao montar
  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    const stored = localStorage.getItem('MW-CUSTOMER');
    if (!stored) return;

    try {
      const c = JSON.parse(stored) as CustomerModel;
      if (c.whats && c.name) {
        dispatch(updateCustomer(c));
        setIsReturning(true);
        setPhone(c.whats);
        setName(c.name);
        setCep(c.zipcode || '');
        setStreet(c.address || '');
        setAddressNumber(c.number || '');
        setComplement(c.complement || '');
        setBairro(c.neigh || '');
        setCity(c.city || '');
        setUf(c.uf || '');
        setStep('payment');
      }
    } catch {
      // localStorage corrompido — ignora e começa do zero
    }
  }, [dispatch]);

  // Busca o NeighModel salvo do cliente recorrente quando neighList carrega
  useEffect(() => {
    if (isReturning && bairro && neighList.length > 0 && !neighSelected) {
      const matched =
        neighList.find(n => n.name === bairro) ||
        matchNeighborhood(bairro, neighList) ||
        null;
      setNeighSelected(matched);
    }
  }, [isReturning, bairro, neighList, neighSelected]);

  // ── Handlers ──────────────────────────────────────────────────────────────

  const handleConfirmPhone = useCallback(async () => {
    const digits = phone.replace(/\D/g, '');
    if (digits.length < 10) {
      addToast({
        type: 'error',
        title: 'Número inválido',
        description: 'Digite um celular válido com DDD.',
      });
      return;
    }

    setIsSearching(true);
    const found: CustomerModel[] = [];

    try {
      const result = await firebase
        .firestore()
        .collection('customers')
        .where('whats', '==', digits)
        .get();

      result.forEach(doc => {
        found.push({
          id: doc.data().id,
          idProvider: doc.data().idProvider,
          name: doc.data().name,
          whats: digits,
          cpf: doc.data().cpf,
          zipcode: doc.data().zipcode,
          address: doc.data().address,
          number: doc.data().number,
          neigh: doc.data().neigh,
          feeDelivery: doc.data().feeDelivery,
          complement: doc.data().complement,
          city: doc.data().city,
          uf: doc.data().uf,
          comments: doc.data().comments,
          latitude: doc.data().latitude,
          longitude: doc.data().longitude,
          read: doc.data().read,
        });
      });
    } catch {
      addToast({
        type: 'error',
        title: 'Erro de conexão',
        description:
          'Não foi possível verificar seu cadastro. Tente novamente.',
      });
      setIsSearching(false);
      return;
    }

    setIsSearching(false);

    if (found.length > 0) {
      const c = found[0];
      dispatch(updateCustomer(c));
      setName(c.name || '');
      setCep(c.zipcode || '');
      setStreet(c.address || '');
      setAddressNumber(c.number || '');
      setComplement(c.complement || '');
      setBairro(c.neigh || '');
      setCity(c.city || '');
      setUf(c.uf || '');
      if (c.neigh && neighList.length > 0) {
        setNeighSelected(
          neighList.find(n => n.name === c.neigh) ||
            matchNeighborhood(c.neigh, neighList) ||
            null,
        );
      }
      setIsReturning(true);
      setStep('payment');
    } else {
      const ref = firebase.firestore().collection('customers').doc();
      dispatch(
        updateCustomer({
          ...customer,
          id: ref.id,
          whats: digits,
          name: '',
          address: '',
          number: '',
          neigh: '',
          feeDelivery: 0,
          complement: '',
          city: '',
          uf: '',
          read: false,
        }),
      );
      setStep('address');
    }
  }, [addToast, customer, dispatch, neighList, phone]);

  const handleCepChange = useCallback(
    async (value: string) => {
      setCep(value);
      const digits = value.replace(/\D/g, '');
      if (digits.length !== 8) return;

      setIsCepLoading(true);
      const data = await fetchCep(digits);
      setIsCepLoading(false);

      if (!data) {
        addToast({
          type: 'error',
          title: 'CEP não encontrado',
          description: 'Verifique o CEP informado e tente novamente.',
        });
        return;
      }

      setStreet(data.logradouro || '');
      setBairro(data.bairro || '');
      setCity(data.localidade || '');
      setUf(data.uf || '');

      const matched = matchNeighborhood(data.bairro, neighList);
      setNeighSelected(matched || null);
    },
    [addToast, neighList],
  );

  const handleConfirmAddress = useCallback(async () => {
    if (!name.trim()) {
      addToast({
        type: 'error',
        title: 'Nome obrigatório',
        description: 'Informe seu nome.',
      });
      return;
    }
    if (!street.trim()) {
      addToast({
        type: 'error',
        title: 'Endereço obrigatório',
        description: 'Informe o nome da sua rua.',
      });
      return;
    }
    if (!addressNumber.trim()) {
      addToast({
        type: 'error',
        title: 'Número obrigatório',
        description: 'Informe o número da residência.',
      });
      return;
    }
    if (!neighSelected) {
      addToast({
        type: 'error',
        title: 'Bairro obrigatório',
        description: 'Selecione o bairro de entrega.',
      });
      return;
    }

    if (isReturning && customer.id) {
      const updatedCustomer: CustomerModel = {
        id: customer.id,
        idProvider: provider.id,
        name,
        whats: phone.replace(/\D/g, ''),
        cpf: customer.cpf || '',
        zipcode: cep.replace(/\D/g, ''),
        address: street,
        number: addressNumber,
        complement: complement || '',
        neigh: neighSelected.name,
        feeDelivery: Number(neighSelected.feeDelivery),
        city: neighSelected.city || city,
        uf: neighSelected.uf || uf,
        comments: customer.comments || '',
        latitude: customer.latitude || 0,
        longitude: customer.longitude || 0,
        read: customer.read || false,
      };

      setIsSavingAddress(true);
      try {
        await firebase
          .firestore()
          .collection('customers')
          .doc(customer.id)
          .set(updatedCustomer);
        dispatch(updateCustomer(updatedCustomer));
        localStorage.setItem('MW-CUSTOMER', JSON.stringify(updatedCustomer));
        addToast({
          type: 'success',
          title: 'Dados atualizados!',
          description: 'Suas informações foram salvas com sucesso.',
        });
      } catch {
        addToast({
          type: 'error',
          title: 'Erro ao salvar',
          description: 'Não foi possível atualizar seus dados. Tente novamente.',
        });
        setIsSavingAddress(false);
        return;
      }
      setIsSavingAddress(false);
    }

    setStep('payment');
  }, [
    addToast,
    addressNumber,
    cep,
    city,
    complement,
    customer,
    dispatch,
    isReturning,
    name,
    neighSelected,
    phone,
    provider.id,
    street,
    uf,
  ]);

  const handleSelectPayment = useCallback((payment: PaymentModel) => {
    setPaymentSelected(payment.formPayment);
    setHasChange(payment.change === 'S');
    if (payment.change !== 'S') setChangeValue('');
  }, []);

  const feeDelivery = useMemo(() => {
    if (comeGet) return 0;
    if (neighSelected) return Number(neighSelected.feeDelivery);
    return Number(customer.feeDelivery || 0);
  }, [comeGet, customer.feeDelivery, neighSelected]);

  const totalRequest = useMemo(
    () => Number(request.totalProducts) + feeDelivery,
    [feeDelivery, request.totalProducts],
  );

  const handleSubmit = useCallback(async () => {
    if (!paymentSelected) {
      addToast({
        type: 'error',
        title: 'Pagamento obrigatório',
        description: 'Selecione a forma de pagamento.',
      });
      return;
    }
    if (!comeGet && !neighSelected) {
      addToast({
        type: 'error',
        title: 'Bairro não selecionado',
        description: 'Não foi possível determinar o bairro de entrega.',
      });
      return;
    }

    setIsSending(true);
    const digits = phone.replace(/\D/g, '');
    const change = changeValue
      ? Number(changeValue.replace(/\D/g, '')) / 100
      : 0;

    const newCustomer: CustomerModel = {
      id: customer.id,
      idProvider: provider.id,
      name,
      whats: digits,
      cpf: customer.cpf || '',
      zipcode: cep.replace(/\D/g, ''),
      address: street,
      number: addressNumber,
      neigh: neighSelected?.name || bairro,
      feeDelivery: neighSelected ? Number(neighSelected.feeDelivery) : 0,
      complement,
      city: city || neighSelected?.city || '',
      uf: uf || neighSelected?.uf || '',
      comments: customer.comments || '',
      latitude: 0,
      longitude: 0,
      read: customer.read || false,
    };

    const updatedRequest = {
      ...request,
      cellPhone: digits,
      formPayment: paymentSelected,
      change,
      comments: orderComments,
      feeDelivery,
      totalRequest,
      neigh: neighSelected?.name || bairro,
      address: street,
      number: addressNumber,
      complement,
      comeGet,
    };

    try {
      await firebase
        .firestore()
        .collection('customers')
        .doc(customer.id)
        .set(newCustomer);
      dispatch(updateCustomer(newCustomer));
      localStorage.setItem('MW-CUSTOMER', JSON.stringify(newCustomer));

      dispatch(updateRequest(updatedRequest));
      localStorage.setItem('request', JSON.stringify(updatedRequest));

      const sentData: RequestDTO = {
        id: request.id,
        idCustomer: customer.id,
        idProvider: provider.id,
        dateRequest: request.dateRequest,
        totalProducts: request.totalProducts,
        feeDelivery,
        totalRequest,
        status: request.status,
        address: street,
        number: addressNumber,
        idNeigh: neighSelected?.id || '',
        neigh: neighSelected?.name || bairro,
        complement,
        formPayment: paymentSelected,
        items,
        read: false,
        dataCustomer: newCustomer,
        comeGet,
        comments: orderComments,
        latitude: 0,
        longitude: 0,
        change,
      };

      await firebase
        .firestore()
        .collection('requests')
        .doc(request.id)
        .set(sentData);

      addToast({
        type: 'success',
        title: 'Pedido enviado!',
        description: 'Seu pedido foi enviado com sucesso!',
      });
      history.push('/success');
    } catch (error) {
      console.error('Erro ao enviar o pedido:', error);
      const firebaseError = error as { code?: string; message?: string };
      const code = firebaseError.code ?? 'desconhecido';
      const detail = firebaseError.message ?? String(error);
      addToast({
        type: 'error',
        title: `Erro ao enviar [${code}]`,
        description: detail,
        duration: 10000,
      });
    } finally {
      setIsSending(false);
    }
  }, [
    addToast,
    addressNumber,
    bairro,
    cep,
    changeValue,
    city,
    comeGet,
    complement,
    customer,
    dispatch,
    feeDelivery,
    history,
    items,
    name,
    neighSelected,
    orderComments,
    paymentSelected,
    phone,
    provider.id,
    request,
    street,
    totalRequest,
    uf,
  ]);

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <Container>
      <Header>
        {provider.logo && <Logo src={provider.logo} alt="Logo" />}
        <Title>Quase lá! Confirme seu pedido</Title>
        <CartIconButton
          type="button"
          onClick={() => { history.push('/request'); }}
          title="Meu carrinho"
        >
          <FaShoppingCart />
          {items.length > 0 && <CartBadge>{items.length}</CartBadge>}
        </CartIconButton>
      </Header>

      {!isReturning && (
        <StepIndicator>
          <StepDot
            active={step === 'phone'}
            done={step === 'address' || step === 'payment'}
          />
          <StepDot active={step === 'address'} done={step === 'payment'} />
          <StepDot active={step === 'payment'} done={false} />
        </StepIndicator>
      )}

      {/* ── PASSO 1: CELULAR ── */}
      {step === 'phone' && (
        <>
          <FieldGroup>
            <Label>Seu número de WhatsApp</Label>
            <StyledMaskInput
              mask="99 9 9999-9999"
              value={phone}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPhone(e.target.value)}
              placeholder="Ex: 11 9 9999-9999"
            />
            <InfoText>Vamos verificar se você já tem cadastro.</InfoText>
          </FieldGroup>

          <Footer>
            <Button
              colorButton={isSearching ? '#999' : 'green'}
              onClick={handleConfirmPhone}
              disabled={isSearching}
            >
              {isSearching ? 'Verificando' : 'Confirmar'}
              {isSearching && <Spinner />}
            </Button>
          </Footer>
        </>
      )}

      {/* ── PASSO 2: ENDEREÇO ── */}
      {step === 'address' && (
        <>
          <FieldGroup>
            <Label>Seu nome</Label>
            <StyledInput
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Como devemos chamar você?"
            />
          </FieldGroup>

          <FieldGroup>
            <Label>
              CEP
              {isCepLoading && <SpinnerBlue />}
            </Label>
            <StyledMaskInput
              mask="99999-999"
              value={cep}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleCepChange(e.target.value)}
              placeholder="00000-000"
            />
            <InfoText>
              O endereço será preenchido automaticamente ao digitar o CEP.
            </InfoText>
          </FieldGroup>

          <FieldGroup>
            <Label>Rua / Avenida</Label>
            <StyledInput
              value={street}
              onChange={e => setStreet(e.target.value)}
              placeholder="Nome da rua"
            />
          </FieldGroup>

          <RowGroup>
            <div style={{ flex: '0 0 38%' }}>
              <Label>Número</Label>
              <StyledInput
                value={addressNumber}
                onChange={e => setAddressNumber(e.target.value)}
                placeholder="Nº"
              />
            </div>
            <div style={{ flex: 1 }}>
              <Label>Complemento</Label>
              <StyledInput
                value={complement}
                onChange={e => setComplement(e.target.value)}
                placeholder="Apto, bloco... (opcional)"
              />
            </div>
          </RowGroup>

          <FieldGroup>
            <Label>Bairro de entrega</Label>
            <NeighButton
              type="button"
              data-placeholder={!neighSelected ? 'true' : 'false'}
              onClick={() => { setNeighSearch(''); setShowNeighModal(true); }}
            >
              <span>
                {neighSelected
                  ? `${neighSelected.name} — ${neighSelected.city}/${neighSelected.uf}`
                  : 'Selecione seu bairro'}
              </span>
              <FiEdit2 size={16} />
            </NeighButton>
            {neighSelected && (
              <InfoText>
                Taxa de entrega: {formatBRL(Number(neighSelected.feeDelivery))}
              </InfoText>
            )}
          </FieldGroup>

          <Footer>
            <BackButton onClick={() => setStep('phone')}>
              <FiArrowLeft />
              Voltar
            </BackButton>
            <Button
              colorButton={isSavingAddress ? '#999' : 'green'}
              onClick={handleConfirmAddress}
              disabled={isSavingAddress}
            >
              {isSavingAddress ? 'Salvando' : 'Continuar'}
              {isSavingAddress && <Spinner />}
            </Button>
          </Footer>
        </>
      )}

      {/* ── PASSO 3: PAGAMENTO ── */}
      {step === 'payment' && (
        <>
          {isReturning && name && (
            <CustomerCard>
              <CustomerCardHeader>
                <CustomerCardTitle>Seus dados cadastrais</CustomerCardTitle>
                <CustomerCardEditButton
                  type="button"
                  onClick={() => setStep('address')}
                >
                  <FiEdit2 size={11} />
                  Alterar dados
                </CustomerCardEditButton>
              </CustomerCardHeader>
              <CustomerCardRow>
                <CustomerCardLabel>Nome</CustomerCardLabel>
                <CustomerCardValue>{name}</CustomerCardValue>
              </CustomerCardRow>
              <CustomerCardRow>
                <CustomerCardLabel>WhatsApp</CustomerCardLabel>
                <CustomerCardValue>{phone}</CustomerCardValue>
              </CustomerCardRow>
              {cep && (
                <CustomerCardRow>
                  <CustomerCardLabel>CEP</CustomerCardLabel>
                  <CustomerCardValue>{cep}</CustomerCardValue>
                </CustomerCardRow>
              )}
              {street && (
                <CustomerCardRow>
                  <CustomerCardLabel>Endereço</CustomerCardLabel>
                  <CustomerCardValue>
                    {street}
                    {addressNumber ? `, ${addressNumber}` : ''}
                    {complement ? ` — ${complement}` : ''}
                  </CustomerCardValue>
                </CustomerCardRow>
              )}
              {(neighSelected?.name || bairro) && (
                <CustomerCardRow>
                  <CustomerCardLabel>Bairro</CustomerCardLabel>
                  <CustomerCardValue>
                    {neighSelected?.name || bairro}
                    {city || neighSelected?.city
                      ? ` — ${city || neighSelected?.city}/${
                          uf || neighSelected?.uf
                        }`
                      : ''}
                  </CustomerCardValue>
                </CustomerCardRow>
              )}
            </CustomerCard>
          )}

          <FieldGroup>
            <Label>Forma de pagamento</Label>
            <PaymentGrid>
              {formPayment.map(p => {
                const selected = paymentSelected === p.formPayment;
                return (
                  <PaymentCard
                    key={p.id}
                    isSelected={selected}
                    type="button"
                    onClick={() => handleSelectPayment(p)}
                  >
                    {selected && (
                      <CheckBadge>
                        <FiCheck size={10} />
                      </CheckBadge>
                    )}
                    {getPaymentIcon(p.formPayment)}
                    <PaymentCardLabel isSelected={selected}>
                      {p.formPayment}
                    </PaymentCardLabel>
                  </PaymentCard>
                );
              })}
            </PaymentGrid>
          </FieldGroup>

          {hasChange && (
            <FieldGroup>
              <Label>Troco para:</Label>
              <StyledInput
                value={changeValue}
                onChange={e => setChangeValue(e.target.value)}
                placeholder="R$ 0,00"
                inputMode="numeric"
              />
            </FieldGroup>
          )}

          <FieldGroup>
            <Label>Observações do pedido</Label>
            <StyledTextarea
              value={orderComments}
              onChange={e => setOrderComments(e.target.value)}
              placeholder="Alguma observação? (opcional)"
            />
          </FieldGroup>

          <TotalArea>
            <SwitchArea>
              <Switch
                onChange={setComeGet}
                checked={comeGet}
                onColor="#28a745"
              />
              <LabelSwitch>Retirar no balcão</LabelSwitch>
            </SwitchArea>
            <LabelTotal>
              Produtos:
              {formatBRL(request.totalProducts)}
            </LabelTotal>
            {comeGet ? (
              <LabelTotal>Retirada no balcão</LabelTotal>
            ) : (
              <LabelTotal>
                Entrega:
                {formatBRL(feeDelivery)}
              </LabelTotal>
            )}
            <LabelTotal>
              Total:
              {formatBRL(totalRequest)}
            </LabelTotal>
          </TotalArea>

          <Footer>
            <BackButton
              onClick={() => setStep(isReturning ? 'phone' : 'address')}
            >
              <FiArrowLeft />
              Voltar
            </BackButton>
            <Button
              colorButton={isSending ? '#999' : 'green'}
              onClick={handleSubmit}
              disabled={isSending}
            >
              {isSending ? 'Enviando' : 'Enviar pedido'}
              {isSending && <Spinner />}
            </Button>
          </Footer>
        </>
      )}
      {showNeighModal && (
        <ModalOverlay onClick={() => setShowNeighModal(false)}>
          <ModalBox onClick={e => e.stopPropagation()}>
            <ModalTitle>Selecione seu bairro</ModalTitle>
            <ModalSearch
              autoFocus
              placeholder="Buscar bairro..."
              value={neighSearch}
              onChange={e => setNeighSearch(e.target.value)}
            />
            <NeighList>
              {neighList
                .filter(n =>
                  n.name.toLowerCase().includes(neighSearch.toLowerCase()) ||
                  n.city.toLowerCase().includes(neighSearch.toLowerCase()),
                )
                .map(n => (
                  <NeighCard
                    key={n.id}
                    onClick={() => {
                      setNeighSelected(n);
                      setBairro(n.name);
                      setShowNeighModal(false);
                    }}
                  >
                    <NeighCardInfo>
                      <NeighCardName>{n.name}</NeighCardName>
                      <NeighCardMeta>{n.city} — {n.uf}</NeighCardMeta>
                    </NeighCardInfo>
                    <NeighCardFee>{formatBRL(Number(n.feeDelivery))}</NeighCardFee>
                  </NeighCard>
                ))}
            </NeighList>
          </ModalBox>
        </ModalOverlay>
      )}
    </Container>
  );
};

export default Checkout;
