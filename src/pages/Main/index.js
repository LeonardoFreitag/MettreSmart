import React, { useState, useEffect } from 'react';
import { Platform, button, ActivityIndicator, Modal, Alert } from 'react-native';
import getRealm from '../../services/realm';
import { format, toDate } from 'date-fns';
import {
    Background, Container, TextoLogo, TextoBasico, ContainerJustify,
    SubmitButton, SubmitText, ContainerHorizontal, ContainerModal,
    ContainerForm, TextNovo, Input, ModalButton
} from './styles';
import { useSelector, useDispatch } from 'react-redux';
import DMF from '../../Dmf';

export default function Main({ navigation }) {

    const dispatch = useDispatch();
    const cashier = useSelector(state => state.cashier);
    const user = useSelector(state => state.user);
    const comments = useSelector(state => state.comments);
    const groups = useSelector(state => state.groups);
    const products = useSelector(state => state.products);
    const [modalVisible, setModalVisible] = useState(false);
    const [supply, setSuplly] = useState('0,00');


    useEffect(() => {
        async function loadProducts() {
            dispatch({
                type: 'CLEAR_PRODUCTS'
            });
            const realm = await getRealm();
            let allProducts = realm.objects('Products');
            allProducts.forEach((item) => {
                dispatch({
                    type: 'STORE_PRODUCTS',
                    id: item.id,
                    code: item.code,
                    product: item.product,
                    unity: item.unity,
                    cost: item.cost,
                    price: item.price,
                    group: item.group,
                    printOut: item.printOut,
                    printPlace: item.printPlace,
                });
            });
        };

        async function loadGroups() {
            dispatch({
                type: 'CLEAR_GROUPS'
            });
            const realm = await getRealm();
            let allGroups = realm.objects('Groups');
            allGroups.forEach((item) => {
                dispatch({
                    type: 'STORE_GRUOPS',
                    id: item.id,
                    group: item.group,
                });
            });
        };

        async function loadComments() {
            try {
                dispatch({
                    type: 'CLEAR_COMMENTS'
                });
                const realm = await getRealm();
                let allComments = realm.objects('Comments');
                allComments.forEach((item) => {
                    dispatch({
                        type: 'STORE_COMMENTS',
                        id: item.id,
                        comment: item.comment,
                        group: item.group
                    });
                });
                // alert(groups[0].group + '/' + groups[0].id);   
            }
            catch (erro) {
                alert(erro);
            }
        };

        async function loadUser() {
            const realm = await getRealm();
            const data = realm.objects('User');
            if (data.length > 0) {
                dispatch({
                    type: 'STORE_USER',
                    id: data[0].id,
                    name: data[0].name,
                    cnpj: data[0].cnpj,
                    phone: data[0].phone,
                    cellphone: data[0].cellphone,
                    email: data[0].email,
                    address: data[0].address,
                    number: data[0].number,
                    neigh: data[0].neigh,
                    complement: data[0].complement,
                    zipcode: data[0].zipcode,
                    city: data[0].city,
                    state: data[0].state,
                    printerName: data[0].printerName,
                });
            };
        };
        async function loadCashier() {
            const realm = await getRealm();
            const filter = 'isOpen = ' + true + '';
            const data = realm.objects('Cashier').filtered(filter);
            if (data.length > 0) {
                dispatch({
                    type: 'STORE_CASHIER',
                    id: data[0].id,
                    dateOpen: data[0].dateOpen,
                    supply: data[0].supply,
                    bleed: data[0].bleed,
                    dateClose: data[0].dateClose,
                    isOpen: data[0].isOpen,
                });
            };
        };
        loadProducts()
        loadUser();
        loadCashier()
        loadGroups();
        loadComments();
    }, []);

    function handleAttendance() { // rota de atendimento
        navigation.navigate('Sales');
    };

    function handleCloseConfirm() { // fechamento de caixa
        Alert.alert(
            'Atenção',
            'Confirma fechamento de caixa',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel'
                },
                {
                    text: 'Continuar',
                    onPress: () => closeCashier()
                }
            ]
        )
    };

    function imp(text) {
        try {
            let iRet = DMF.imprimirTextoDmf(text, user.printerName);
            // alert('Impressão efetuada!');
        } catch (e) {
            alert('Erro ao executar método: ' + e);
        }
    }

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

    async function closeCashier() {
        try {
            const realm = await getRealm();
            const tabProducts = realm.objects('Products');
            const tabPaymentForm = realm.objects('PaymentForms');
            const filterSales = 'status != "' + 'CANCEL' + '"';
            const tabSales = realm.objects('Sales').filtered(filterSales);
            const filterSaleItems = 'isCanceled = ' + false + '';
            const tabSalesItems = realm.objects('SalesItems').filtered(filterSaleItems);
            const tabReceivement = realm.objects('Receivement');
    
            let totalSales = 0;
            let totalDiscount = 0;
            tabSales.forEach((item) => {
                totalSales = totalSales + item.total;
                totalDiscount = totalDiscount + item.discount;
            });
    
            let totalReceivement = 0;
            tabReceivement.forEach((item) => {
                totalReceivement = totalReceivement + item.value;
            });


            let recByForm = [];
            tabPaymentForm.forEach((item) => {
                let filterByForm = 'paymentForm = "' + item.paymentForm + '"';
                let filterItems = tabReceivement.filtered(filterByForm);
                let sumTotal = 0;
                filterItems.forEach((itemFilter) => {
                    sumTotal = sumTotal + itemFilter.value;
                });
                recByForm.push({
                    paymentForm: item.paymentForm,
                    total: sumTotal
                });
            });


            let saleByProduct = [];
            tabProducts.forEach((item) => {
                let filterByProduct = 'code = "' + item.code + '"';
                let filterItems = tabSalesItems.filtered(filterByProduct);
                let sumTotal = 0;
                let sumAmount = 0;
                filterItems.forEach((itemFilter) => {
                    sumTotal = sumTotal + itemFilter.total;
                    sumAmount = sumAmount + itemFilter.amount;
                });
                saleByProduct.push({
                    product: item.product,
                    amount: sumAmount,
                    total: sumTotal
                });
            });


            const dtClose = (new Date()).getTime();
            imp('================================================')
            imp('           Fechamento de caixa                  ');
            imp('------------------------------------------------')
            imp('Identificador       : ' + cashier.id);
            imp('Abertura            : ' + format(cashier.dateOpen, "dd/MM/yyyy' - 'HH:mm:ss"));
            imp('Fechamento          : ' + format(dtClose, "dd/MM/yyyy' - 'HH:mm:ss"));
            imp('Suprimento          : ' + 'R$ ' + cashier.supply.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+\,)/g, "$1."));
            imp('Vendas              : ' + 'R$ ' + totalSales.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+\,)/g, "$1."));
            imp('Recebimentos        : ' + 'R$ ' + totalReceivement.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+\,)/g, "$1."));
            imp('Descontos           : ' + 'R$ ' + totalDiscount.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+\,)/g, "$1."));
            imp('================================================')
            imp('           Detalhes Recebimento                 ');
            imp('------------------------------------------------')
            recByForm.forEach((item) => {
                imp(FormatText(item.paymentForm, 30, 'D', ' ') + 
                    FormatText('R$ '+item.total.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+\,)/g, "$1."), 18, 'E', ' '));
            })  ;          
            imp('================================================')
            imp('            Total por produto                   '); 
            imp('------------------------------------------------')
            saleByProduct.forEach((item) => {
                imp(FormatText(item.product, 30, 'D', ' ') + 
                    FormatText(item.amount, 8, 'E', ' ') +
                    FormatText('R$ ' + item.total.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+\,)/g, "$1."), 10, 'E', ' '));
            });
            imp('================================================')
            imp('\n\n\n\n')

            // fecha o caixa
            const closedCashier = {
                id: cashier.id,
                dateOpen: cashier.dateOpen,
                supply: cashier.supply,
                bleed: 0,
                dateClose: dtClose,
                isOpen: false,    
            };
            realm.write(() => {
                realm.create('Cashier', closedCashier, 'modified');
            });

            // tansfere recebimentos
            tabReceivement.forEach((item) => {
                realm.write(() => {
                    realm.create('AcReceivement', item, 'modified');
                });
            });
            realm.write(() => {
                realm.delete(tabReceivement);
            });

            // transfere os items
            tabSalesItems.forEach((item) => {
                realm.write(() => {
                    realm.create('AcSalesItems', item, 'modified');
                });
            });
            realm.write(() => {
                realm.delete(tabSalesItems);
            });

            // transfere as vendas
            tabSales.forEach((item) => {
                realm.write(() => {
                    realm.create('AcSales', item, 'modified');
                });
            });
            const delSales = realm.objects('Sales');
            realm.write(() => {
                realm.delete(delSales);
            });

            dispatch({type: 'CLEAR_CASHIER'});
        }
        catch(erro) {
            alert(erro);
        }
    };

    function handleOpenCashier() {
        setModalVisible(true);
    };

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

    async function openCashier() {
        try {
            const realm = await getRealm();

            let newId = (new Date()).getTime();
            let item = {
                id: newId.toString(),
                dateOpen: newId,
                supply: parseFloat(supply),
                bleed: 0,
                dateClose: 0,
                isOpen: true
            };

            realm.write(() => {
                realm.create('Cashier', item, 'modified');
            });

            dispatch({
                type: 'STORE_CASHIER',
                id: item.id,
                dateOpen: item.dateOpen,
                supply: item.supply,
                bleed: item.bleed,
                dateClose: item.dateClose,
                isOpen: item.isOpen,
            });
            setModalVisible(false);
        }
        catch (erro) {
            alert(erro);
        };
    };

    function handleCancel() {
        setModalVisible(false);
    };


    function setSupplyUpdate(data) {
        let a = data.toString();
        let b = a.replace(',', '');
        let c = (b / 100).toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+\,)/g, "$1.");
        if (c == NaN) { c = 0 };
        setSuplly(c);
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

                <TextoLogo>
                    Caixa: {(cashier.isOpen) ? "Aberto" : "Fechado"}
                </TextoLogo>
                {(cashier.isOpen) && <TextoLogo>
                    Abertura: {format(cashier.dateOpen, "dd/MM/yyyy' - 'HH:mm:ss")}
                </TextoLogo>}


                <Modal animationType="slide" visible={modalVisible} transparent={true}>
                    <ContainerModal>
                        <TextoLogo>
                            Abertura de caixa
                        </TextoLogo>


                        <ContainerForm>
                            <TextNovo>
                                Valor do suprimento (troco):
                             </TextNovo>
                            <Input autoFocus={true} placeholder="0,00" autoCorrect={false} autoCapitalize="none" value={supply}
                                onChangeText={(value) => setSupplyUpdate(value)}
                                keyboardType="numeric" />
                        </ContainerForm>

                        <ModalButton onPress={handleConfirm}>
                            <SubmitText>Confirmar</SubmitText>
                        </ModalButton>
                        <ModalButton onPress={handleCancel}>
                            <SubmitText>Cancelar</SubmitText>
                        </ModalButton>
                    </ContainerModal>
                </Modal>


                <ContainerHorizontal>
                    {(cashier.isOpen) && <SubmitButton onPress={handleAttendance}>
                        <SubmitText>Atendimento</SubmitText>
                    </SubmitButton>}
                    {(cashier.isOpen) && <SubmitButton onPress={handleCloseConfirm}>
                        <SubmitText>Fechamento de caixa</SubmitText>
                    </SubmitButton>}
                    {(!cashier.isOpen) && <SubmitButton onPress={handleOpenCashier}>
                        <SubmitText>Abertura de caixa</SubmitText>
                    </SubmitButton>}
                </ContainerHorizontal>

                {/* <SubmitButton onPress={closeCashier}>
                    <SubmitText>Imprimir texto</SubmitText>
                </SubmitButton> */}

            </Container>
        </Background>
    )
}