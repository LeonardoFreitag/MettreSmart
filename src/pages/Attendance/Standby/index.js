import React, { useState, useEffect } from 'react';
import { Platform, button, ActivityIndicator, Modal, Alert } from 'react-native';
import getRealm from '../../../services/realm';
import { format, toDate } from 'date-fns';
import {
    Background, Container, TextoLogo, TextoBasico, ContainerJustify,
    SubmitButton, SubmitText, ContainerHorizontal, ContainerModal,
    ContainerForm, TextNovo, Input, ModalButton, List, TouchItem,
    ItemText
} from './styles';
import { useSelector, useDispatch } from 'react-redux';
import DMF from '../../../Dmf';

export default function Standby({ navigation }) {

    const dispatch = useDispatch();
    const cashier = useSelector(state => state.cashier);
    const user = useSelector(state => state.user);
    const [modalVisible, setModalVisible] = useState(false);
    const [selling, setSelling] = useState(false);
    const [salesList, setSalesList] = useState([]);

    useEffect(() => {
        async function loadSales() {
            const realm = await getRealm();
            const filter = 'status = "' + 'STANDBY' + '"';
            const data = realm.objects('Sales').filtered(filter);
            setSalesList(data);
        };
        loadSales();
    }, []);

    function impressaoTexto() {
        try {
            let iRet = DMF.imprimirTextoDmf("Teste de impressao com React Native")
            // alert('Impressão efetuada!');
        } catch (e) {
            alert('Erro ao executar método: ' + e);
        }
    }

    function handleConfirm() {
        Alert.alert(
            'Atenção',
            'Confirma abertura de caixa',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel'
                },
                {
                    text: 'Continuar',
                    onPress: () => openCashier()
                }
            ]
        )
    };


    // function setSupplyUpdate(data) {
    //     let a = data.toString();
    //     let b = a.replace(',', '');
    //     let c = (b / 100).toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+\,)/g, "$1.");
    //     if (c == NaN) { c = 0 };
    //     setSuplly(c);
    // };

    function handleSales() {
        navigation.navigate('Sales');
    };

    function handleConfirmReopen(data) {
        Alert.alert(
            'Atenção',
            'Confirma reaabertura da venda?',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel'
                },
                {
                    text: 'Continuar',
                    onPress: () => handleReopen(data)
                }
            ]
        )
    };

    async function handleReopen(data) {
        try {
            await dispatch({
                type: 'STORE_SALE',
                id: data.id,
                idCashier: data.idCashier,
                date: data.date,
                subtotal: data.subtotal,
                discount: data.discount,
                total: data.total,
                status: 'OPEN',
                customer: data.customer
            });
    
            const realm = await getRealm();
            const filter = 'idSale = "' + data.id + '"';
            const items = realm.objects('SalesItems').filtered(filter);
    
            items.forEach((item) => {
                dispatch({
                    type: 'STORE_SALEITEMS',
                    id: item.id,
                    idCashier: item.idCashier,
                    idSale: item.idSale,
                    code: item.code,
                    product: item.product,
                    unity: item.unity,
                    amount: item.amount,
                    price: item.price,
                    total: item.total,
                    comments: item.comments,
                    isCanceled: item.isCanceled
                });
            });
    
            await dispatch({
                type: 'STORE_SHOW',
                selling: true,
                showGroups: true,
                showProducts: false,
                showComments: false,
                showAmount: false,
            });
    
            navigation.navigate('Sales');  
        }
        catch(erro) {
            alert(erro);
        }
    };

    function ItemListItems({ data }) {
        return (
            <TouchItem onPress={() => handleConfirmReopen(data)}>
                <ItemText>Id: {data.id}   Data: {format(data.date, 'dd/MM/yyyy hh:mm')}   Vlr. Total: R$ {data.total.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+\,)/g, "$1.")}</ItemText>
                <ItemText>{data.customer}</ItemText>
            </TouchItem>
        );
    };

    return (
        <Background>
            <Container behavior={Platform.OS === 'ios' ? 'padding' : ''} enabled>
                <TextoLogo>
                    {user.name}
                </TextoLogo>
                <TextoBasico>
                    {user.phone}
                </TextoBasico>

                <TextoBasico> Vendas em espera </TextoBasico>
                <List
                    keyExtractor={item => item.id}
                    numColumns={2}
                    data={salesList}
                    renderItem={({ item }) => (
                        <ItemListItems
                            data={item}
                        />
                    )}
                />



                <SubmitButton onPress={handleSales}>
                    <SubmitText>Voltar</SubmitText>
                </SubmitButton>

            </Container>
        </Background>
    )
}