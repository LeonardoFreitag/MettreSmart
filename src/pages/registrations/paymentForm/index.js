import React, { useState, useEffect } from 'react';
import { Platform, button, ActivityIndicator, Keyboard } from 'react-native';
import getRealm from '../../../services/realm';
// import { format, toDate } from 'date-fns';

import {
    Background, Container, ContainerHorizontal, TextoLogo, TextoBasico,
    ContainerJustify, SubmitButton, SubmitText, Input, List,
    GroupItem, ItemText
} from './styles';
import { useSelector, useDispatch } from 'react-redux';

export default function PaymentForm({ navigation }) {
    const dispath = useDispatch();
    const paymentForms = useSelector(state => state.paymentForms);

    const [id, setId] = useState('');
    const [payForm, setPayForm] = useState('');
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        async function loadPayForms() {
            dispath({
                type: 'CLEAR_PAYMENTFORMS'
            });
            const realm = await getRealm();
            let allPay = realm.objects('PaymentForms');
            allPay.forEach((item) => {
                dispath({
                    type: 'STORE_PAYMENTFORMS',
                    id: item.id,
                    paymentForm: item.paymentForm,
                });
            });
            // alert(groups[0].group + '/' + groups[0].id);
        };
        loadPayForms();
    }, []);

    async function handleRegister() {
        try {
            Keyboard.dismiss();

            const realm = await getRealm();

            let newId = '';
            if (editMode) {
                newId = id;
            } else {
                newId = (new Date()).getTime().toString();
            };

            let item = {
                id: newId,
                paymentForm: payForm
            };

            realm.write(() => {
                realm.create('PaymentForms', item, 'modified');
            });

            if (editMode) {
                dispath({
                    type: 'CLEAR_PAYMENTFORMS'
                });
                let allPay = realm.objects('PaymentForms');
                allPay.forEach((item) => {
                    dispath({
                        type: 'STORE_PAYMENTFORMS',
                        id: item.id,
                        paymentForm: item.paymentForm,
                    });
                });
            } else {

                dispath({
                    type: 'STORE_PAYMENTFORMS',
                    id: item.id,
                    paymentForm: item.paymentForm,
                });
            };
            setEditMode(false);
            setPayForm('');
        }
        catch (erro) {
            alert(erro);
        };
    };

    function handleEdit(data) {
        setId(data.id);
        setPayForm(data.paymentForm);
        setEditMode(true);
    };

    async function handleDelete() {
        const realm = await getRealm();
        let filtro = 'id = "' + id + '"';
        let itemDel = realm.objects('PaymentForms').filtered(filtro);
        realm.write(() => {
            realm.delete(itemDel);
        });

        dispath({
            type: 'CLEAR_PAYMENTFORMS'
        });
        let allGroups = realm.objects('PaymentForms');
        allGroups.forEach((item) => {
            dispath({
                type: 'STORE_PAYMENTFORMS',
                id: item.id,
                paymentForm: item.paymentForm,
            });
        });
        setEditMode(false);
        setPayForm('');
        setId('');
    };

    function ItemList({ data }) {
        return (
            <GroupItem onPress={() => handleEdit(data)}>
                <ItemText>{data.paymentForm}</ItemText>
            </GroupItem>
        );
    };

    return (
        <Background>
            <Container behavior={Platform.OS === 'ios' ? 'padding' : ''} enabled>
                <TextoLogo>
                    Formas de pagamento
                </TextoLogo>

                <ContainerHorizontal>
                    <Container>
                        <TextoLogo>
                            Cadastro
                        </TextoLogo>
                        <TextoBasico>
                            Listagem:
                        </TextoBasico>
                        <Input
                            placeholder="Descrição..."
                            autoCorrect={false}
                            autoCapitalize="words"
                            value={payForm}
                            keyboardType="default"
                            onChangeText={(payForm) => setPayForm(payForm)}
                        />
                        <SubmitButton onPress={handleRegister}>
                            <SubmitText>Cadastrar</SubmitText>
                        </SubmitButton>
                        {(editMode) && <SubmitButton onPress={handleDelete}>
                            <SubmitText>Excluir</SubmitText>
                        </SubmitButton>}

                    </Container>

                    <Container>
                        <TextoLogo>
                            Listagem
                        </TextoLogo>

                        <List
                            keyExtractor={item => item.id}
                            data={paymentForms}
                            renderItem={({ item }) => (
                                <ItemList
                                    data={item}
                                />
                            )}
                        />

                    </Container>
                </ContainerHorizontal>

            </Container>
        </Background>
    )
}