import React, { useState, useEffect } from 'react';
import { Platform, button, ActivityIndicator, Modal, Alert } from 'react-native';
import getRealm from '../../../services/realm';
import { format, toDate } from 'date-fns';
import {
    Background, Container, ContainerHorizontal, TextoLogo, TextoBasico,
    ContainerJustify, SubmitButton, SubmitText, Input, List,
    GroupItem, ItemText, ListGroups, ListComments, ListProducts,
    TouchItem, TouchGroup, TextGroup, TouchComments, SubmitButtonModal,
    TextComments, ContainerTwoButton, ButtonTwoButton, TouchProducts,
    TextProducts, InputAmount, ButtonInc, ButtonDec, TextInc, TextTotal,
    ButtonFourButton, ContainerBotton, ContainerModal, InputAmountModal,
    ButtonIncModal, ButtonDecModal, ContainerHorizontalModal,
    InputCustomerModal, ContainerBottonRight
} from './styles';
import { useSelector, useDispatch } from 'react-redux';
import DMF from '../../../Dmf';

export default function Sales({ navigation }) {

    const dispatch = useDispatch();
    const cashier = useSelector(state => state.cashier);
    const user = useSelector(state => state.user);
    const show = useSelector(state => state.show);

    const products = useSelector(state => state.products);
    const [productsByGroup, setProductsByGrupo] = useState([]);
    const [productSelected, setProductSelected] = useState({});

    const comments = useSelector(state => state.comments);
    const [commentsByGroup, setCommentsByGrupo] = useState([]);

    const groups = useSelector(state => state.groups);
    const [groupSelected, setGroupSelected] = useState({});

    const sale = useSelector(state => state.sale);
    const saleItems = useSelector(state => state.saleItems);


    const [modalVisible, setModalVisible] = useState(false);
    const [itemEdit, setItemEdit] = useState({});

    const [modalVisibleStandby, setModalVisibleStandby] = useState(false);

    const [saleItemsList, setSaleItemsList] = useState([]);
    const [comment, setComment] = useState('');
    const [commentEdit, setCommentEdit] = useState('');

    const [totalSale, setTotalSale] = useState('0,00');

    const [amount, setAmount] = useState('1');
    const [amountEdit, setAmountEdit] = useState('1');

    const [customer, setCustomer] = useState('');

    const [modalFinalize, setModalFinalize] = useState(false);

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

    function imp(text) {
        try {
            let iRet = DMF.imprimirTextoDmf(text, user.printerName);
            // alert('Impressão efetuada!');
        } catch (e) {
            alert('Erro ao executar método: ' + e);
        }
    }

    function handleConfirmStandby() {
        if (!show.selling) {
            navigation.navigate('Standby');
        } else {
            setModalVisibleStandby(true);
            setCustomer(sale.customer);
        }
    };

    function handleReceivement() {
        if (show.selling) {
            navigation.navigate('Receivement');
        };
    };

    function handleCancelStandby() {
        setModalVisibleStandby(false);
    };

    function handleStandby() {
        printProduction();
        setModalFinalize(true);
    }
    async function handleFinalizeStandby() {
        try {
            printStandby();
            const realm = await getRealm();

            if (show.selling) {
                let saleStandby = {
                    id: sale.id,
                    idCashier: sale.idCashier,
                    date: sale.date,
                    subtotal: sale.subtotal,
                    discount: sale.discount,
                    total: sale.total,
                    status: 'STANDBY',
                    customer: customer
                };
                realm.write(() => {
                    realm.create('Sales', saleStandby, 'modified');
                });

                saleItems.forEach((item) => {
                    realm.write(() => {
                        realm.create('SalesItems', item, 'modified');
                    });
                });
                dispatch({ type: 'CLEAR_SALE' });
                dispatch({ type: 'CLEAR_SALEITEMS' });
                await dispatch({
                    type: 'STORE_SHOW',
                    selling: false,
                    showGroups: false,
                    showProducts: false,
                    showComments: false,
                    showAmount: false,
                });
                setModalVisibleStandby(false);
                setModalFinalize(false);
            } else {
                navigation.navigate('Standby');
            }
        }
        catch (erro) {
            alert(erro);
        }
    };

    async function handleSale() {
        // pega o novo código
        const realm = await getRealm();
        const data = realm.objects('Sales');
        let newId = data.length + 1;

        // let newId = (new Date()).getTime();
        await dispatch({ type: 'CLEAR_SALE' });
        await dispatch({
            type: 'STORE_SALE',
            id: newId.toString(),
            idCashier: cashier.id,
            date: (new Date()).getTime(),
            subtotal: 0,
            discount: 0,
            total: 0,
            status: 'OPEN'
        });

        await dispatch({
            type: 'STORE_SHOW',
            selling: true,
            showGroups: true,
            showProducts: false,
            showComments: false,
            showAmount: false,
        });
        // setSelling(true);
        // setShowGroups(true);
        // alert(groups.length);
    };

    function ItemListItems({ data }) {
        return (
            <TouchItem onPress={() => handleEditItem(data)}>
                <ItemText>{data.code} - {data.product} R$ {data.price.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+\,)/g, "$1.")} x {}
                    {data.amount}  R$ {data.total.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+\,)/g, "$1.")}</ItemText>
                <ItemText>{data.comments}</ItemText>
            </TouchItem>
        );
    };

    async function handleSelectGroup(data) {
        setProductsByGrupo([]);
        setGroupSelected(data);
        let prods = [];
        products.forEach((item) => {
            if (item.group == data.group) {
                prods.push(item);
            };
        });
        setProductsByGrupo(prods);
        await dispatch({
            type: 'STORE_SHOW',
            selling: true,
            showGroups: false,
            showProducts: true,
            showComments: false,
            showAmount: false,
        });

        // setShowGroups(false);
        // setShowProducts(true);
    };


    async function handleSelectProduct(data) {
        setProductSelected(data);
        setCommentsByGrupo([]);
        let com = [];
        comments.forEach((item) => {
            if (item.group == data.group) {
                com.push(item);
            };
        });
        setCommentsByGrupo(com);
        await dispatch({
            type: 'STORE_SHOW',
            selling: true,
            showGroups: false,
            showProducts: false,
            showComments: false,
            showAmount: true,
        });
    };

    function ItemListGroups({ data }) {
        return (
            <TouchGroup onPress={() => handleSelectGroup(data)}>
                <TextGroup>{data.group}</TextGroup>
            </TouchGroup>
        );
    };

    function handleSelecComment(data) {
        let o = '';
        if (comment != '') {
            o = comment + '; ' + data.comment;
        } else {
            o = data.comment;
        }
        setComment(o);
    };

    function handleClearComment() {
        setComment('');
    };

    async function handleBackProducts() {
        setComment('');
        await dispatch({
            type: 'STORE_SHOW',
            selling: true,
            showGroups: false,
            showProducts: true,
            showComments: false,
            showAmount: false,
        });
        // setShowComments(false);
        // setShowProducts(true);
    };

    function ItemListProducts({ data }) {
        return (
            <TouchProducts onPress={() => handleSelectProduct(data)}>
                <TextProducts>Código: {data.code} - </TextProducts>
                <TextProducts>{data.product} - </TextProducts>
                <TextProducts>{data.unity} - </TextProducts>
                <TextProducts>R$ {data.price.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+\,)/g, "$1.")}</TextProducts>
            </TouchProducts>
        );
    };

    async function handleBackToGroups() {
        await dispatch({
            type: 'STORE_SHOW',
            selling: true,
            showGroups: true,
            showProducts: false,
            showComments: false,
            showAmount: false,
        });

        // setShowProducts(false);
        // setShowGroups(true);
    };

    function ItemListComments({ data }) {
        return (
            <TouchComments onPress={() => handleSelecComment(data)}>
                <TextComments>{data.comment}</TextComments>
            </TouchComments>
        );
    };

    function handleContinue() {
        //dispatch({type: 'CLEAR_SALEITEMS'});
        let total = 0;
        saleItems.forEach((item) => {
            total = total + item.total;
        });
        total = total + (parseFloat(amount) * productSelected.price);

        let newId = (new Date()).getTime();
        dispatch({
            type: 'STORE_SALEITEMS',
            id: newId.toString(),
            idCashier: sale.idCashier,
            idSale: sale.id,
            code: productSelected.code,
            product: productSelected.product,
            unity: productSelected.unity,
            amount: parseFloat(amount),
            price: productSelected.price,
            total: (parseFloat(amount) * productSelected.price),
            comments: comment,
            isCanceled: false,
        });

        dispatch({
            type: 'STORE_SALE',
            id: sale.id,
            idCashier: sale.idCashier,
            date: sale.date,
            subtotal: total,
            discount: sale.discount,
            total: total - sale.discount,
            status: sale.status,
        });

        dispatch({
            type: 'STORE_SHOW',
            selling: true,
            showGroups: true,
            showProducts: false,
            showComments: false,
            showAmount: false,
        });
        setAmount('1');
        setComment('');
    };

    function handleAmountInc() {
        let am = parseFloat(amount) + 1;
        setAmount(am.toString());
    };

    function handleAmountIncModal() {
        let am = parseFloat(amountEdit) + 1;
        setAmountEdit(am.toString());
    };

    function handleAmountDec() {
        if (amount > 1) {
            let am = parseFloat(amount) - 1;
            setAmount(am.toString());
        };
    };

    function handleAmountDecModal() {
        if (amountEdit > 1) {
            let am = parseFloat(amountEdit) - 1;
            setAmountEdit(am.toString());
        };
    };

    async function handleAmountConfirm() {
        await dispatch({
            type: 'STORE_SHOW',
            selling: true,
            showGroups: false,
            showProducts: false,
            showComments: true,
            showAmount: false,
        });
    };

    function handleExit() {
        navigation.navigate('Main');
    };

    function handleCancel() {
        if (show.selling) {
            Alert.alert(
                'Atenção',
                'Cancelar venda?',
                [
                    {
                        text: 'Cancelar',
                        style: 'cancel'
                    },
                    {
                        text: 'Continuar',
                        onPress: () => finalizeCancel()
                    }
                ]
            )
        };
    };

    async function finalizeCancel() {
        dispatch({ type: 'CLEAR_SALE' });
        dispatch({ type: 'CLEAR_SALEITEMS' });
        await dispatch({
            type: 'STORE_SHOW',
            selling: false,
            showGroups: false,
            showProducts: false,
            showComments: false,
            showAmount: false,
        });
        setModalVisibleStandby(false);
        setModalFinalize(false);
    };

    function handleModalConfirm() {
        let newList = [];
        saleItems.forEach((item) => {
            if (item.id != itemEdit.id) {
                newList.push(item);
            } else {
                let ni = {
                    id: item.id,
                    idCashier: item.idCashier,
                    idSale: item.idSale,
                    code: item.code,
                    product: item.product,
                    unity: item.unity,
                    amount: parseFloat(amountEdit),
                    price: item.price,
                    total: (parseFloat(amountEdit) * item.price),
                    comments: commentEdit
                };
                newList.push(ni);
            };
        });
        dispatch({ type: 'CLEAR_SALEITEMS' });
        let total = 0;
        newList.forEach((item) => {
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
            total = total + item.total;
        });
        dispatch({
            type: 'STORE_SALE',
            id: sale.id,
            idCashier: sale.idCashier,
            date: sale.date,
            subtotal: total,
            discount: sale.discount,
            total: total - sale.discount,
            status: sale.status,
        });

        setModalVisible(false);
    };

    function handleModalDelete() {
        let newList = [];
        saleItems.forEach((item) => {
            if (item.id != itemEdit.id) {
                newList.push(item);
            };
        });
        dispatch({ type: 'CLEAR_SALEITEMS' });
        let total = 0;
        newList.forEach((item) => {
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
            total = total + item.total;
        });
        dispatch({
            type: 'STORE_SALE',
            id: sale.id,
            idCashier: sale.idCashier,
            date: sale.date,
            subtotal: total,
            discount: sale.discount,
            total: total - sale.discount,
            status: sale.status,
        });

        setModalVisible(false);
    };

    function handleEditItem(data) {
        // alert(data.amount);
        setAmountEdit(data.amount.toString());
        setCommentEdit(data.comments);
        setItemEdit(data);
        setModalVisible(true);
    };

    function printProduction() {
        let space = ' ';
        imp('================================================');
        imp(FormatText(user.name, 48, 'C', ' '));
        imp('                  PRODUCAO                      ');
        imp('------------------------------------------------')
        imp('Identificador       : ' + sale.id);
        imp('Horario             : ' + format((new Date()).getTime(), "dd/MM/yyyy' - 'HH:mm:ss").toString());
        imp('================================================')
        imp('QTDE.   PRODUTO                                 ');
        imp('------------------------------------------------')
        saleItems.forEach((item) => {
            imp(FormatText(item.amount, 8, 'D', ' ') +
                FormatText(item.product, 40, 'D', ' '));
            if (item.comments != '') {
                imp(' -> ' +
                    FormatText(item.comments, 44, 'D', ' '));
            }
        });
        imp('------------------------------------------------');
        imp('\n\n\n\n');
    };

    function printStandby() {
        imp('================================================');
        imp(FormatText(user.name, 48, 'C', ' '));
        imp(FormatText('PEDIDO EM ESPERA', 48, 'C', ' '));
        imp('------------------------------------------------')
        imp('Identificador       : ' + sale.id);
        imp('Horario             : ' + format((new Date()).getTime(), "dd/MM/yyyy' - 'HH:mm:ss").toString());
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
                imp(' -> ' + item.comments);
            }
        });
        imp('------------------------------------------------');
        // imp(FormatText('TOTAL PRODUTOS:', 33, 'E', ' ') +
        //     FormatText(sale.subtotal.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+\,)/g, "$1."), 15, 'E', ' '));
        // imp(FormatText('DESCONTO:', 33, 'E', ' ') +
        //     FormatText(sale.discount.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+\,)/g, "$1."), 15, 'E', ' '));
        imp(FormatText('TOTAL PEDIDO:', 33, 'E', ' ') +
            FormatText(sale.total.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+\,)/g, "$1."), 15, 'E', ' '));
        // imp(FormatText('FORMA DE PAGAMENTO', 48, 'D', '-'));
        // let totalPayments = 0;
        // payments.forEach((item) => {
        //     let vlr = parseFloat(item.value);
        //     imp(FormatText(item.paymentForm, 33, 'E', ' ') +
        //         FormatText(vlr.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+\,)/g, "$1."), 15, 'E', ' '));
        //     totalPayments = totalPayments + vlr;
        // });
        // imp(FormatText('PGTO. TOTAL:', 33, 'E', ' ') +
        //     FormatText(totalPayments.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+\,)/g, "$1."), 15, 'E', ' '));
        // imp(FormatText('TROCO:', 33, 'E', ' ') +
        //     FormatText(changeMoney.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+\,)/g, "$1."), 15, 'E', ' '));
        imp('\n\n\n\n');
        imp(FormatText('-', 40, 'D', '-'));
        imp(FormatText(customer, 48, 'D', ' '));
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


    function listSales() {
        navigation.navigate('ListSales');
    };

    return (
        <Background>
            <Container behavior={Platform.OS === 'ios' ? 'padding' : ''} enabled>
                <TextoLogo>
                    VENDAS
                </TextoLogo>

                <ContainerHorizontal>
                    <Container>
                        {(!show.selling) && <SubmitButton onPress={handleSale}>
                            <SubmitText> Vender </SubmitText>
                        </SubmitButton>}

                        {(show.selling) && <TextoLogo>
                            Venda: {sale.id}
                        </TextoLogo>}

                        <TextoBasico> Itens da venda </TextoBasico>
                        <List
                            keyExtractor={item => item.id}
                            data={saleItems}
                            renderItem={({ item }) => (
                                <ItemListItems
                                    data={item}
                                />
                            )}
                        />

                        <TextTotal>
                            VALOR TOTAL: R$ {sale.total.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+\,)/g, "$1.")}
                        </TextTotal>
                        <ContainerBotton>
                            <ButtonFourButton onPress={handleCancel}>
                                <SubmitText>Cancelar</SubmitText>
                            </ButtonFourButton>
                            <ButtonFourButton onPress={handleConfirmStandby}>
                                <SubmitText>{(show.selling) ? "Colocar em espera" : "Buscar na espera"}</SubmitText>
                            </ButtonFourButton>
                            <ButtonFourButton onPress={handleReceivement}>
                                <SubmitText>Receber</SubmitText>
                            </ButtonFourButton>
                            <ButtonFourButton onPress={handleExit}>
                                <SubmitText>Sair</SubmitText>
                            </ButtonFourButton>
                        </ContainerBotton>


                        <Modal animationType="slide" visible={modalVisible} transparent={true}>
                            <ContainerModal>
                                <TextoLogo>
                                    Alterar Ítem Vendido
                                </TextoLogo>

                                <TextoBasico>
                                    Quantidade:
                                </TextoBasico>
                                <InputAmountModal
                                    placeholder="1"
                                    autoCorrect={false}
                                    autoCapitalize="none"
                                    value={amountEdit}
                                    keyboardType="numeric"
                                    onChangeText={(value) => setAmountEdit(value)}
                                />
                                <TextoBasico>
                                    Observações:
                                </TextoBasico>
                                <InputAmountModal
                                    placeholder="Obsevações"
                                    autoCorrect={false}
                                    autoCapitalize="words"
                                    value={commentEdit}
                                    keyboardType="default"
                                    onChangeText={(comment) => setCommentEdit(comment)}
                                />

                                <ContainerHorizontalModal>
                                    <ButtonDecModal onPress={handleAmountDecModal}>
                                        <TextInc>-</TextInc>
                                    </ButtonDecModal>
                                    <ButtonIncModal onPress={handleAmountIncModal}>
                                        <TextInc>+</TextInc>
                                    </ButtonIncModal>
                                </ContainerHorizontalModal>
                                <SubmitButtonModal onPress={handleModalConfirm}>
                                    <SubmitText>Confirmar</SubmitText>
                                </SubmitButtonModal>
                                <SubmitButtonModal onPress={handleModalDelete}>
                                    <SubmitText>Excluir</SubmitText>
                                </SubmitButtonModal>

                            </ContainerModal>
                        </Modal>

                        <Modal animationType="slide" visible={modalVisibleStandby} transparent={true}>
                            <ContainerModal>
                                <TextoLogo>
                                    Standby
                                </TextoLogo>

                                <TextoBasico>
                                    Identifique cliente:
                                </TextoBasico>
                                <InputCustomerModal
                                    autoFocus={true}
                                    placeholder="Identificação do cliente..."
                                    autoCorrect={false}
                                    autoCapitalize="words"
                                    value={customer}
                                    keyboardType="default"
                                    onChangeText={(customer) => setCustomer(customer)}
                                />

                                <SubmitButtonModal onPress={handleStandby}>
                                    <SubmitText>Confirmar</SubmitText>
                                </SubmitButtonModal>
                                <SubmitButtonModal onPress={handleCancelStandby}>
                                    <SubmitText>Voltar</SubmitText>
                                </SubmitButtonModal>

                            </ContainerModal>
                        </Modal>




                    </Container>

                    <Container>

                        {(show.selling && show.showGroups) && <TextoLogo>
                            Grupos
                        </TextoLogo>}
                        {(show.selling && show.showGroups) && <ListGroups
                            keyExtractor={item => item.id}
                            data={groups}
                            renderItem={({ item }) => (
                                <ItemListGroups
                                    data={item}
                                />
                            )}
                        />}


                        {(show.selling && show.showProducts) && <TextoLogo>
                            PRODUTOS ({groupSelected.group})
                        </TextoLogo>}
                        {(show.selling && show.showProducts) && <ListProducts
                            keyExtractor={item => item.id}
                            data={productsByGroup}
                            renderItem={({ item }) => (
                                <ItemListProducts
                                    data={item}
                                />
                            )}
                        />}
                        {(show.selling && show.showProducts) && <SubmitButton onPress={handleBackToGroups}>
                            <SubmitText>Voltar para grupos</SubmitText>
                        </SubmitButton>}


                        {(show.selling && show.showAmount) && <TextoLogo>
                            Quantidade
                        </TextoLogo>}
                        {(show.selling && show.showAmount) && <InputAmount
                            placeholder="1"
                            autoCorrect={false}
                            autoCapitalize="none"
                            value={amount}
                            keyboardType="numeric"
                            onChangeText={(value) => setAmount(value)}
                        />}
                        {(show.selling && show.showAmount) && <ContainerHorizontal>
                            <ButtonDec onPress={handleAmountDec}>
                                <TextInc>-</TextInc>
                            </ButtonDec>
                            <ButtonInc onPress={handleAmountInc}>
                                <TextInc>+</TextInc>
                            </ButtonInc>
                        </ContainerHorizontal>}
                        {(show.selling && show.showAmount) && <SubmitButton onPress={handleAmountConfirm}>
                            <SubmitText>Continuar</SubmitText>
                        </SubmitButton>}
                        {(show.selling && show.showAmount) && <SubmitButton onPress={handleBackProducts}>
                            <SubmitText>Voltar para produtos</SubmitText>
                        </SubmitButton>}





                        {(show.selling && show.showComments) && <TextoLogo>
                            Observações
                        </TextoLogo>}
                        {(show.selling && show.showComments) && <ListComments
                            keyExtractor={item => item.id}
                            numColumns={2}
                            data={commentsByGroup}
                            renderItem={({ item }) => (
                                <ItemListComments
                                    data={item}
                                />
                            )}
                        />}

                        {(show.selling && show.showComments) && <Input
                            placeholder="Obsevações"
                            autoCorrect={false}
                            autoCapitalize="words"
                            value={comment}
                            keyboardType="default"
                            onChangeText={(comment) => setComment(comment)}
                        />}
                        {(show.selling && show.showComments) && <SubmitButton onPress={handleClearComment}>
                            <SubmitText>Limpar Observações</SubmitText>
                        </SubmitButton>}
                        <ContainerTwoButton>
                            {(show.selling && show.showComments) && <ButtonTwoButton onPress={handleBackProducts}>
                                <SubmitText>Voltar</SubmitText>
                            </ButtonTwoButton>}
                            {(show.selling && show.showComments) && <ButtonTwoButton onPress={handleContinue}>
                                <SubmitText>Continuar</SubmitText>
                            </ButtonTwoButton>}
                        </ContainerTwoButton>

                        <Modal animationType="slide" visible={modalFinalize} transparent={true}>
                            <ContainerModal>
                                <TextoLogo>
                                    DESTAQUE O PEDIDO DE PRODUÇÃO
                                </TextoLogo>

                                <SubmitButtonModal onPress={handleFinalizeStandby}>
                                    <SubmitText>ok</SubmitText>
                                </SubmitButtonModal>

                            </ContainerModal>
                        </Modal>
                        {(!show.selling) && <ContainerBottonRight>
                            <SubmitButton onPress={listSales}>
                                <SubmitText> Listar vendas </SubmitText>
                            </SubmitButton>
                        </ContainerBottonRight>}
                    </Container>
                </ContainerHorizontal>

            </Container>
        </Background>
    )
}