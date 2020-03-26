import React, { useState, useEffect } from 'react';
import { Platform, button, ActivityIndicator, Modal, Alert, ScrollView } from 'react-native';
import getRealm from '../../../services/realm';
import { format, toDate } from 'date-fns';
import {
    Background, Container, ContainerHorizontal, TextoLogo, TextoBasico,
    SubmitButton, SubmitText, Input, List,
    GroupItem, ItemText, ListGroups, ListComments, ListProducts,
    TouchItem, TouchGroup, TextGroup, TouchComments, SubmitButtonModal,
    TextComments, ContainerTwoButton, ButtonTwoButton, TouchProducts,
    TextProducts, InputAmount, ButtonInc, ButtonDec, TextInc, TextTotal,
    ButtonFourButton, ContainerBotton, ContainerModal, InputAmountModal,
    ButtonIncModal, ButtonDecModal, ContainerHorizontalModal,
    InputCustomerModal, TextoRigth, TextoLeft, ContainerForm,
    ListPayments, ItemListPayments, TouchPayment, PaymentTextRight,
    PaymentTextLeft
} from './styles';
import { useSelector, useDispatch } from 'react-redux';
import DMF from '../../../Dmf';

export default function Receivement({ navigation }) {

    const dispatch = useDispatch();


    const cashier = useSelector(state => state.cashier);
    const user = useSelector(state => state.user);

    const sale = useSelector(state => state.sale);
    const saleItems = useSelector(state => state.saleItems);

    const [modalVisible, setModalVisible] = useState(false);
    const [selling, setSelling] = useState(false);

    const [paymentForms, setPaymentForms] = useState([]);
    const [paymentFormSelected, setPaymentFormSelected] = useState({});
    const [paymentValue, setPaymentValue] = useState('0,00');
    const [modalPayment, setModalPayment] = useState(false);

    const [payments, setPayments] = useState([
        // { id: '1', paymentForm: 'Dinheiro', value: '10,00' },
        // { id: '1', paymentForm: 'Cartão Crédito', value: '12,00' },
        // { id: '1', paymentForm: 'Cartão Débito', value: '15,00' },
    ]);
    const [paymentsTotal, setPaymentsTotal] = useState(0);
    const [balance, setBalance] = useState(0);
    const [changeMoney, setChangeMoney] = useState(0);
    const [paidOutValue, setPaidOutValue] = useState('0,00');

    const [discount, setDiscount] = useState('0,00');
    const [modalDiscount, setModalDiscount] = useState(false);

    const [modalFinalize, setModalFinalize] = useState(false);

    useEffect(() => {
        async function loadPaymentForms() {
            try {
                const realm = await getRealm();
                const data = realm.objects('PaymentForms');
                // alert(data.length);
                let forms = [];
                data.forEach((item) => {
                    forms.push(item);
                });
                setPaymentForms(forms);
            }
            catch (erro) {
                alert(erro);
            }
        }
        loadPaymentForms();
    }, []);

    function imp(text) {
        try {
            let iRet = DMF.imprimirTextoDmf(text, user.printerName);
            // alert('Impressão efetuada!');
        } catch (e) {
            alert('Erro ao executar método: ' + e);
        }
    }

    function printProduction() {
        let space = ' ';
        imp('================================================');
        imp(FormatText(user.name, 48, 'C', ' '));
        imp(FormatText('PRODUCAO', 48, 'C', ' '));
        imp('------------------------------------------------')
        imp('Identificador       : ' + sale.id);
        imp('Horario             : ' + format(sale.date, "dd/MM/yyyy' - 'HH:mm:ss"));
        imp('================================================')
        imp('QTDE.   PRODUTO                                 ');
        imp('------------------------------------------------')
        saleItems.forEach((item) => {
            imp(FormatText(item.amount, 8, 'D', ' ') +
                FormatText(item.product, 40, 'D', ' '));
            if (item.comments != '') {
                imp(' -> ' + item.comments);
            }
        });
        imp('------------------------------------------------');
        imp('\n\n\n\n');
    };

    function printRequest() {
        imp('================================================');
        imp(FormatText(user.name, 48, 'C', ' '));
        imp(FormatText('PEDIDO', 48, 'C', ' '));
        imp('------------------------------------------------')
        imp('Identificador       : ' + sale.id);
        imp('Horario             : ' + format(sale.date, "dd/MM/yyyy' - 'HH:mm:ss"));
        imp('================================================')
        imp(FormatText('COD.', 10, 'D', ' ') +
            FormatText('PRODUTO', 38, 'D', ' '));
        imp(FormatText('QTDE.', 10, 'E', ' ') +
            FormatText('UN.', 8, 'D', ' ') +
            FormatText('VLR.UNIT.', 15, 'E', ' ') +
            FormatText('VLR.TOTAL', 15, 'E', ' '));
        imp('------------------------------------------------')
        saleItems.forEach((item) => {
            imp(FormatText(item.code, 10, 'D', ' ') +
                FormatText(item.product, 38, 'D', ' '));
            imp(FormatText(item.amount, 10, 'E', ' ') +
                FormatText(item.unity, 8, 'D', ' ') +
                FormatText(item.price.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+\,)/g, "$1."), 15, 'E', ' ') +
                FormatText(item.total.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+\,)/g, "$1."), 15, 'E', ' '));
                if (item.comments != '') {
                    imp(' -> ' + 
                        FormatText(item.comments, 44, 'D', ' '));
                }
            });
        imp('------------------------------------------------');
        imp(FormatText('TOTAL PRODUTOS:', 33, 'E', ' ') +
            FormatText(sale.subtotal.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+\,)/g, "$1."), 15, 'E', ' '));
        imp(FormatText('DESCONTO:', 33, 'E', ' ') +
            FormatText(sale.discount.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+\,)/g, "$1."), 15, 'E', ' '));
        imp(FormatText('TOTAL PEDIDO:', 33, 'E', ' ') +
            FormatText(sale.total.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+\,)/g, "$1."), 15, 'E', ' '));
        imp(FormatText('FORMA DE PAGAMENTO', 48, 'D', '-'));
        let totalPayments = 0;
        payments.forEach((item) => {
            let vlr = parseFloat(item.value);
            imp(FormatText(item.paymentForm, 33, 'E', ' ') +
                FormatText(vlr.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+\,)/g, "$1."), 15, 'E', ' '));
            totalPayments = totalPayments + vlr;
        });
        imp(FormatText('PGTO. TOTAL:', 33, 'E', ' ') +
            FormatText(totalPayments.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+\,)/g, "$1."), 15, 'E', ' '));
        imp(FormatText('TROCO:', 33, 'E', ' ') +
            FormatText(changeMoney.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+\,)/g, "$1."), 15, 'E', ' '));
        imp('------------------------------------------------');
        imp(FormatText('by House Tech Sistemas', 48, 'E', ' '));
        imp(FormatText('(65)2129-0009', 48, 'E', ' '));
        imp('\n\n\n\n');
    };

    function FormatText(Texto, Tamanho, Posicao, Caracter) {
        try {
            let text = Texto.toString();
            let textUpper = text.toUpperCase();
            let a = textUpper.replace(/[ÁÀÂÃÄ]/g, "A");
            let e = a.replace(/[ÉÈÊË]/g, "E");
            let i = e.replace(/[ÍÌÎÏ]/g, "I");
            let o = i.replace(/[ÔÕÓÒÖ]/g, "O");
            let u = o.replace(/[ÛÚÙÜ]/g, "U");
            let c = u.replace(/[Ç]/g, "C");
            let n = c.replace(/[Ñ]/g, "N");

            let add = (Tamanho - textUpper.length);

            let res = '';
            if (Posicao == 'D') {
                res = n + Caracter.repeat(add);
            } else if (Posicao == 'E') {
                res = Caracter.repeat(add) + n;
            } else if (Posicao == 'C') {
                let adLeft = Math.round(add / 2) - 1;
                let adRigth = Math.round(add / 2);
                res = (Caracter.repeat(adLeft) + n + Caracter.repeat(adRigth));
            };
            return res;
        }
        catch (erro) {
            alert(erro);
        }
    }

    function setDiscountUpdate(data) {
        let a = data.toString();
        let b = a.replace(',', '');
        let c = (b / 100).toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+\,)/g, "$1.");
        if (c == NaN) { c = 0 };
        setDiscount(c);
    };
    // function setSupplyUpdate(data) {
    //     let a = data.toString();
    //     let b = a.replace(',', '');
    //     let c = (b / 100).toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+\,)/g, "$1.");
    //     if (c == NaN) { c = 0 };
    //     setSuplly(c);
    // };

    function handleSales() {
            printProduction();
            setModalFinalize(true);
    };

    async function handleFinalize() {
        try {
            printRequest();
            if (paymentsTotal >= sale.total) {
                const realm = await getRealm();

                // salva a venda
                let varSale = {
                    id: sale.id,
                    idCashier: sale.idCashier,
                    date: sale.date,
                    subtotal: sale.subtotal,
                    discount: sale.discount,
                    total: sale.total,
                    status: 'CLOSE',
                    customer: sale.customer
                };
                realm.write(() => {
                    realm.create('Sales', varSale, 'modified');
                });

                // salva os itens da venda
                saleItems.forEach((item) => {
                    realm.write(() => {
                        realm.create('SalesItems', item, 'modified');
                    });
                });
                // salva os pagamentos
                payments.forEach((item) => {
                    let varItem = {
                        id: item.id,
                        idCashier: item.idCashier,
                        idSale: item.idSale,
                        paymentForm: item.paymentForm,
                        value: parseFloat(item.value),
                    };
                    realm.write(() => {
                        realm.create('Receivement', varItem, 'modified');
                    });
                });

                // imprime produção

                // imprime recibo

                // navega para a tela de vendas
                dispatch({ type: 'CLEAR_SALE' });
                dispatch({ type: 'CLEAR_SALEITEMS' });
                dispatch({
                    type: 'STORE_SHOW',
                    selling: false,
                    showGroups: false,
                    showProducts: false,
                    showComments: false,
                    showAmount: false,
                });


                navigation.navigate('Sales');
            }
        }
        catch (erro) {
            alert(erro);
        };
    }

    function handleSelectForm(data) {
        setPaymentValue('');
        setPaymentFormSelected(data);
        setModalPayment(true);
    };

    function ItemListItems({ data }) {
        return (
            <TouchItem onPress={() => handleSelectForm(data)}>
                <ItemText>{data.paymentForm}</ItemText>
            </TouchItem>
        );
    };


    function handleDeletePayment(data) {       
        let totalReceivement = 0;
        let newPayments = [];
        payments.forEach((item) => {
            if (item.id != data.id) {
                newPayments.push(item);
                totalReceivement = totalReceivement + parseFloat(item.value);
            };
        });
        setPayments(newPayments);

        let balanceValue = 0;
        balanceValue = parseFloat(sale.total) - totalReceivement;
        if (balanceValue < 0) {
            balanceValue = 0;
        };
        let changeMoneyValue = 0;
        changeMoneyValue = totalReceivement - parseFloat(sale.total);
        if (changeMoneyValue < 0) {
            changeMoneyValue = 0;
        };
        setPaymentsTotal(totalReceivement);
        setBalance(balanceValue);
        setChangeMoney(changeMoneyValue);
    };

    function ItemListPayments({ data }) {
        return (
            <TouchPayment onPress={() => handleDeletePayment(data)}>
                <ContainerForm>
                    <PaymentTextLeft>{data.paymentForm}</PaymentTextLeft>
                    <PaymentTextRight>R$ {data.value}</PaymentTextRight>
                </ContainerForm>
            </TouchPayment>
        );
    };


    function handleRegisterPayment() {
        if (parseFloat(paymentValue) > 0) {
            let totalReceivement = 0;
            let pay = [];
            let newId = (new Date()).getTime();
            payments.forEach((item) => {
                pay.push(item);
                totalReceivement = totalReceivement + parseFloat(item.value);
            });
            pay.push({
                id: newId.toString(),
                idCashier: sale.idCashier,
                idSale: sale.id,
                paymentForm: paymentFormSelected.paymentForm,
                value: paymentValue
            });
            totalReceivement = totalReceivement + parseFloat(paymentValue);
            let balanceValue = 0;
            balanceValue = parseFloat(sale.total) - totalReceivement;
            if (balanceValue < 0) {
                balanceValue = 0;
            };
            let changeMoneyValue = 0;
            changeMoneyValue = totalReceivement - parseFloat(sale.total);
            if (changeMoneyValue < 0) {
                changeMoneyValue = 0;
            };
    
            // alert(totalReceivement);
            setPaymentsTotal(totalReceivement);
            setBalance(balanceValue);
            setChangeMoney(changeMoneyValue);
    
            setPayments(pay);
            setModalPayment(false);
        }
    };

    function handleCancelPayment() {
        setModalPayment(false);
    };

    function handleDiscount() {
        if (sale.discount > 0) {
            setDiscount(sale.discount.toString());
        };
        setModalDiscount(true);
    };

    async function handleDiscountConfirm() {
        let t = sale.subtotal - parseFloat(discount);
        await dispatch({
            type: 'STORE_SALE',
            id: sale.id,
            idCashier: sale.idCashier,
            date: sale.date,
            subtotal: sale.subtotal,
            discount: parseFloat(discount),
            total: sale.total - parseFloat(discount),
            status: sale.status,
        });
        if (payments.length > 0) {
            let balanceValue = 0;
            balanceValue = t - paymentsTotal;
            if (balanceValue < 0) {
                balanceValue = 0;
            };
            let changeMoneyValue = 0;
            changeMoneyValue = paymentsTotal - t;
            if (changeMoneyValue < 0) {
                changeMoneyValue = 0;
            };
            setBalance(balanceValue);
            setChangeMoney(changeMoneyValue);
        };
        setModalDiscount(false);
    };

    async function handleDiscountCancel() {
        setDiscount('0,00');
        let t = sale.subtotal - parseFloat(discount);
        await dispatch({
            type: 'STORE_SALE',
            id: sale.id,
            idCashier: sale.idCashier,
            date: sale.date,
            subtotal: sale.subtotal,
            discount: 0,
            total: sale.subtotal,
            status: sale.status,
        });
        if (payments.length > 0) {
            let balanceValue = 0;
            balanceValue = t - paymentsTotal;
            if (balanceValue < 0) {
                balanceValue = 0;
            };
            let changeMoneyValue = 0;
            changeMoneyValue = paymentsTotal - t;
            if (changeMoneyValue < 0) {
                changeMoneyValue = 0;
            };
            setBalance(balanceValue);
            setChangeMoney(changeMoneyValue);
        };
        setModalDiscount(false);
    };

    function setPaymentValueUpdate(data) {
        let a = data.toString();
        let b = a.replace(',', '');
        let c = (b / 100).toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+\,)/g, "$1.");
        if (c == NaN) { c = 0 };
        setPaymentValue(c);
    };

    function handleBackSale() {
        navigation.navigate('Sales');
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

                <ContainerHorizontal>
                    {(!modalDiscount && !modalPayment) && <Container>

                        <TextoBasico> Formas de pagamento: </TextoBasico>
                        <List
                            keyExtractor={item => item.id}
                            data={paymentForms}
                            renderItem={({ item }) => (
                                <ItemListItems
                                    data={item}
                                />
                            )}
                        />

                        <SubmitButton onPress={handleDiscount}>
                            <SubmitText>Desconto</SubmitText>
                        </SubmitButton>
                        <SubmitButton onPress={handleBackSale}>
                            <SubmitText>Voltar</SubmitText>
                        </SubmitButton>
                        <SubmitButton onPress={handleSales}>
                            <SubmitText>Finalizar</SubmitText>
                        </SubmitButton>

                    </Container>}

                    {(modalDiscount) && <Container>
                        <TextoLogo>
                            Desconto:
                        </TextoLogo>

                        <TextoBasico>
                            Entre com o valor:
                        </TextoBasico>
                        <InputCustomerModal
                            placeholder="0,00"
                            autoCorrect={false}
                            autoCapitalize="none"
                            value={discount}
                            keyboardType="numeric"
                            onChangeText={(discount) => setDiscountUpdate(discount)}
                        />

                        <SubmitButtonModal onPress={handleDiscountConfirm}>
                            <SubmitText>Confirmar</SubmitText>
                        </SubmitButtonModal>
                        <SubmitButtonModal onPress={handleDiscountCancel}>
                            <SubmitText>Zerar desconto</SubmitText>
                        </SubmitButtonModal>
                    </Container>}

                    {(!modalDiscount && modalPayment) && <Container>
                        <TextoLogo>
                            Pagamento: {paymentFormSelected.paymentForm}
                        </TextoLogo>

                        <TextoBasico>
                            Entre com o valor:
                        </TextoBasico>
                        <InputCustomerModal
                            autoFocus={true}
                            placeholder="0,00"
                            autoCorrect={false}
                            autoCapitalize="none"
                            value={paymentValue}
                            keyboardType="numeric"
                            onChangeText={(pay) => setPaymentValueUpdate(pay)}
                        />

                        <SubmitButtonModal onPress={handleRegisterPayment}>
                            <SubmitText>Confirmar</SubmitText>
                        </SubmitButtonModal>
                        <SubmitButtonModal onPress={handleCancelPayment}>
                            <SubmitText>Voltar</SubmitText>
                        </SubmitButtonModal>
                    </Container>}



                    <Container>
                        <ContainerForm>
                            <TextoLeft>
                                Total Produtos:
                            </TextoLeft>
                            <TextoRigth>
                                {'  R$ '} {sale.subtotal.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+\,)/g, "$1.")}
                            </TextoRigth>
                        </ContainerForm>

                        <ContainerForm>
                            <TextoLeft>
                                Desconto:
                            </TextoLeft>
                            <TextoRigth>
                                {'  R$ '} {sale.discount.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+\,)/g, "$1.")}
                            </TextoRigth>
                        </ContainerForm>


                        <ContainerForm>
                            <TextoLeft>
                                Total Venda:
                            </TextoLeft>
                            <TextoRigth>
                                {'  R$ '} {sale.total.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+\,)/g, "$1.")}
                            </TextoRigth>
                        </ContainerForm>

                        <ContainerForm>
                            <TextoLeft>
                                Total Recebido:
                            </TextoLeft>
                            <TextoRigth>
                                {'  R$ '} {paymentsTotal.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+\,)/g, "$1.")}
                            </TextoRigth>
                        </ContainerForm>

                        <ContainerForm>
                            <TextoLeft>
                                Saldo a Receber:
                            </TextoLeft>
                            <TextoRigth>
                                {'  R$ '} {balance.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+\,)/g, "$1.")}
                            </TextoRigth>
                        </ContainerForm>

                        <ContainerForm>
                            <TextoLeft>
                                Valor do Troco:
                            </TextoLeft>
                            <TextoRigth>
                                {'  R$ '} {changeMoney.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+\,)/g, "$1.")}
                            </TextoRigth>
                        </ContainerForm>

                        <TextoBasico> Valores recebidos: </TextoBasico>
                        <ListPayments
                            keyExtractor={item => item.id}
                            data={payments}
                            renderItem={({ item }) => (
                                <ItemListPayments
                                    data={item}
                                />
                            )}
                        />

                    </Container>
                    <Modal animationType="slide" visible={modalFinalize} transparent={true}>
                            <ContainerModal>
                                <TextoLogo>
                                    DESTAQUE O PEDIDO DE PRODUÇÃO
                                </TextoLogo>

                                <SubmitButtonModal onPress={handleFinalize}>
                                    <SubmitText>ok</SubmitText>
                                </SubmitButtonModal>

                            </ContainerModal>
                        </Modal>

                </ContainerHorizontal>
            </Container>
        </Background>
    )
}