import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { FiPhone, FiMessageSquare, FiDollarSign } from 'react-icons/fi';
import getValidationErrors from '../../utils/getValidationErrors';
import { RootState } from '../../store/ducks/combineReducers';

import firebase from '../../services/firebaseConfig';

import {
  Container,
  Header,
  Title,
  Logo,
  Boddy,
  PaymentArea,
  Footer,
  AddressArea,
  Label,
  TotalArea,
  LabelTotal,
} from './styles';

import { useToast } from '../../hooks/toast';
import Buttom from '../../components/Button';
import Select from '../../components/Select';
import InputMask from '../../components/InputMask';
import Input from '../../components/Input';
import { updateRequest } from '../../store/ducks/request/actions';
import { createCallLoadStorage } from '../../store/ducks/callLoadStorage/actions';
import { CustomerModel } from '../../models/CustomerModel';
import { updateCustomer } from '../../store/ducks/customer/actions';
import InputCurrency from '../../components/InputCurrency';

interface IOptionsSelect {
  id: string;
  value: string;
  label: string;
  change: string;
}

interface FormData {
  paymentForm: string;
  cellPhone: string;
  comments: string;
  change?: string;
}

const PreCheckout: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  const history = useHistory();

  const dispatch = useDispatch();

  const coords = useSelector((state: RootState) => state.coords.data);
  const provider = useSelector((state: RootState) => state.provider.data);
  const customer = useSelector((state: RootState) => state.customer.data);
  const request = useSelector((state: RootState) => state.request.data);
  const formPayment = useSelector((state: RootState) => state.payment.data);
  const [optionsPayment, setOptionsPayment] = useState<IOptionsSelect[]>(
    [] as IOptionsSelect[],
  );
  const [paymentSelected, setPaymentSelected] = useState<IOptionsSelect>(
    {} as IOptionsSelect,
  );

  useEffect(() => {
    const newListPayment: IOptionsSelect[] = [];
    formPayment.forEach(item => {
      newListPayment.push({
        id: item.formPayment,
        value: item.formPayment,
        label: item.formPayment,
        change: item.change,
      });
    });
    setOptionsPayment(newListPayment);
  }, [formPayment]);

  useEffect(() => {
    const loadStorage = () => {
      if (!provider.id) {
        dispatch(
          createCallLoadStorage({
            call: 'PRECHECKOUT',
          }),
        );
        history.push('/loadstorage');
      }
    };
    loadStorage();
  }, [dispatch, history, provider.id]);

  const handleSubmit = useCallback(
    async (data: FormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          paymentForm: Yup.string().required('Selecione a forma de pagamento'),
          cellPhone: Yup.string().required('Número do celular é obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });
        const noSpecialCaracter = data.cellPhone.replace(/\D/g, '');

        const str = String(data.change);

        const changeConverted = str.replace(/\D/g, '');

        const newRequest = {
          ...request,
          formPayment: data.paymentForm,
          comments: data.comments,
          change: Number(changeConverted),
        };

        dispatch(updateRequest(newRequest));

        localStorage.setItem('request', JSON.stringify(newRequest));

        const locatedCustomer: CustomerModel[] = [];

        firebase
          .firestore()
          .collection('customers')
          .where('whats', '==', noSpecialCaracter)
          .get()
          .then(result => {
            result.forEach(element => {
              locatedCustomer.push({
                id: element.data().id,
                idProvider: element.data().idProvider,
                name: element.data().name,
                whats: noSpecialCaracter,
                cpf: element.data().cpf,
                zipcode: element.data().zipcode,
                address: element.data().address,
                number: element.data().number,
                neigh: element.data().neigh,
                feeDelivery: element.data().feeDelivery,
                complement: element.data().complement,
                city: element.data().city,
                uf: element.data().uf,
                comments: element.data().comments,
                latitude: element.data().latitude,
                longitude: element.data().longitude,
                read: element.data().read,
              });
            });
            if (locatedCustomer.length > 0) {
              dispatch(
                updateCustomer({
                  ...customer,
                  id: locatedCustomer[0].id,
                  name: locatedCustomer[0].name,
                  whats: noSpecialCaracter,
                  cpf: locatedCustomer[0].cpf,
                  zipcode: locatedCustomer[0].zipcode,
                  address: locatedCustomer[0].address,
                  number: locatedCustomer[0].number,
                  neigh: locatedCustomer[0].neigh,
                  feeDelivery: locatedCustomer[0].feeDelivery,
                  complement: locatedCustomer[0].complement,
                  city: locatedCustomer[0].city,
                  uf: locatedCustomer[0].uf,
                  comments: locatedCustomer[0].comments,
                  latitude: locatedCustomer[0].latitude,
                  longitude: locatedCustomer[0].longitude,
                  read: locatedCustomer[0].read,
                }),
              );
            } else {
              const ref = firebase.firestore().collection('customers').doc();
              dispatch(
                updateCustomer({
                  ...customer,
                  id: ref.id,
                  name: '',
                  whats: noSpecialCaracter,
                  cpf: '',
                  zipcode: '',
                  address: '',
                  number: '',
                  neigh: '',
                  feeDelivery: 0,
                  complement: '',
                  city: '',
                  uf: '',
                  comments: '',
                  latitude: coords.lat,
                  longitude: coords.lng,
                  read: false,
                }),
              );
            }
          })
          .finally(() => {
            // history.push('/checkout');
            history.push('/neighborhood');
          });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);

          // return;
        }
        addToast({
          type: 'error',
          title: 'Erro ao enviar o pedido!',
          description:
            'Ocorreu um erro ao enviar o pedido! Observe se todos os campos solicitador estão preenchidos.',
        });
      }
    },
    [addToast, coords.lat, coords.lng, customer, dispatch, history, request],
  );

  const handleBack = useCallback(() => {
    history.push('/request');
  }, [history]);

  const handleCheckPayment = useCallback(data => {
    setPaymentSelected(data as IOptionsSelect);
  }, []);

  return (
    <>
      <Form
        ref={formRef}
        onSubmit={handleSubmit}
        initialData={{
          paymentForm: optionsPayment.find(
            opt => opt.value === request.formPayment,
          ),
          cellPhone: customer.whats,
          comments: request.comments,
          change: request.change,
        }}
      >
        <Container>
          <Header>
            <Logo src={provider.logo} alt="Logo" />
            <Title>Finalizando o pedido</Title>
          </Header>
          <Boddy>
            <PaymentArea>
              <Label>Forma de pagamento</Label>
              <Select
                options={optionsPayment}
                name="paymentForm"
                placeholder="Forma de pagamento"
                onChange={handleCheckPayment}
                defaultValue={optionsPayment.find(
                  opt => opt.value === request.formPayment,
                )}
              />
              {paymentSelected.change === 'S' && (
                <>
                  <Label>Preciso de troco para:</Label>
                  <InputCurrency
                    fontSize="14px"
                    align="justify"
                    name="change"
                    icon={FiDollarSign}
                    mask="currency"
                  />
                </>
              )}
            </PaymentArea>
            <AddressArea>
              <Label>Número do seu celular</Label>
              <InputMask
                mask="99 9 9999-9999"
                icon={FiPhone}
                name="cellPhone"
                type="tel"
              />
              <Label>Observações</Label>
              <Input
                fontSize="14px"
                align="justify"
                name="comments"
                icon={FiMessageSquare}
              />
            </AddressArea>
          </Boddy>
          <TotalArea>
            <LabelTotal>
              {`Valor total dos produtos ${Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(request.totalProducts)}`}
            </LabelTotal>
          </TotalArea>
          <Footer>
            <Buttom onClick={handleBack}>Voltar</Buttom>
            <Buttom colorButton="green" type="submit">
              Continuar
            </Buttom>
          </Footer>
        </Container>
      </Form>
    </>
  );
};

export default PreCheckout;
