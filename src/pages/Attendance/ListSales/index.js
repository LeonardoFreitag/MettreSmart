import React, { useState, useEffect } from 'react';
import { Platform, button, ActivityIndicator, Modal, Alert } from 'react-native';
import getRealm from '../../../services/realm';
import { format, toDate } from 'date-fns';
import {
    Background, Container, TextoLogo, TextoBasico, ContainerJustify,
    SubmitButton, SubmitText, ContainerHorizontal, ContainerModal,
    ContainerForm, TextNovo, Input, ModalButton, List, TouchItem,
    ItemText, ButtonCancel, ButtonPrint, SubmitButtonModal, TouchItemCancel
} from './styles';
import { useSelector, useDispatch } from 'react-redux';
import DMF from '../../../Dmf';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function ListSales({ navigation }) {

    const cashier = useSelector(state => state.cashier);
    const user = useSelector(state => state.user);

    const [modalFinalize, setModalFinalize] = useState(false);
    const [modalPrint, setModalPrint] = useState(false);
    const [modalCancel, setModalCancel] = useState(false);
    const [selling, setSelling] = useState(false);
    const [salesList, setSalesList] = useState([]);
    const [saleItemsList, setSaleItemsLies] = useState([]);
    const [receivementList, setReceivementList] = useState([]);
    const [cancelList, setCancelList] = useState([]);

    const [sale, setSale] = useState();
    const [saleItems, setSaleItems] = useState([]);
    const [payments, setPayments] = useState([]);
    const [idCancel, setIdCancel] = useState('');

    useEffect(() => {
        async function loadReceivement() {
            const realm = await getRealm();
            const data = realm.objects('Receivement');
            setReceivementList(data);
        };
        async function loadSaleItems() {
            const realm = await getRealm();
            const data = realm.objects('SalesItems');
            setSaleItemsLies(data);
        };
        // const dataItems = await realm.objects('SalesItems').filtered(filterItems);
        // const dataPayments = await realm.objects('Receivement').filtered(filterItems);

        async function loadSales() {
            const realm = await getRealm();
            const filter = 'status != "' + 'STANDBY' + '"';
            const data = realm.objects('Sales').filtered(filter);
            setSalesList(data);
        };
        loadReceivement();
        loadSaleItems();
        loadSales();
    }, []);

    function imp(text) {
        try {
            let iRet = DMF.imprimirTextoDmf(text, user.printerName);
        } catch (e) {
            alert('Erro ao executar método: ' + e);
        }
    }

    function handleSales() {
        navigation.navigate('Sales');
    };

    async function handlePrintConfirm(data) {
        try {
            setSale(data);
            let listItems = [];
            saleItemsList.forEach((item) => {
                if (item.idSale == data.id) {
                    listItems.push(item);
                };
            });
            await setSaleItems(listItems);
    
            let listRec = [];
            receivementList.forEach((item) => {
                if (item.idSale == data.id) {
                    listRec.push(item);
                }
            });
            await setPayments(listRec);
            setModalPrint(true);   
        }
        catch(erro) {
            alert(erro);
        }
    };

    function handlePrint() {
        try {           
            printProduction();
            setModalPrint(false);
            setModalFinalize(true);
        }
        catch (erro) {
            alert(erro);
        }
    };

    function handleFinalize() {
        printRequest();
        setModalFinalize(false);
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
                imp(' -> ' + item.comments);
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
        let changeMoney = totalPayments - sale.total;
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


    async function handleCallCancel(data) {
        setSale(data);
        let listItems = [];
        saleItemsList.forEach((item) => {
            if (item.idSale == data.id) {
                listItems.push(item);
            };
        });
        await setSaleItems(listItems);

        setModalCancel(true);
    };

    function handleCancelModalPrint() {
        setModalPrint(false);
    };

    async function handleCancel() {
        // alert(sale.id);
        try {
            const realm = await getRealm();
            realm.write(() => {
                realm.create('Sales', {id: sale.id, status: 'CANCEL'}, 'modified');
            });

            saleItems.forEach((i) => {
                realm.write(() => {
                    realm.create('SalesItems', {id: i.id, isCanceled: true}, 'modified');
                });   
            });

            const filterReceiv = 'idSale = "' + sale.id + '"';
            const delReceiv = realm.objects('Receivement').filtered(filterReceiv);

            realm.write(() => {
                realm.delete(delReceiv);
            });
    
            const filter = 'status != "' + 'STANDBY' + '"';
            const data = realm.objects('Sales').filtered(filter);
            setSalesList(data);         
            setModalCancel(false);
        }
        catch(erro) {
            alert(erro);
        };
    };

    function handleBack() {
        setModalCancel(false);
    }

    function ItemListItems({ data }) {
        if (data.status == 'CLOSE') {
            return (
                <TouchItem>
                    <ContainerHorizontal>
                        <Container>
                            <ItemText>Id: {data.id}   Data: {format(data.date, 'dd/MM/yyyy hh:mm')}</ItemText>
                            <ItemText>Vlr. Total: R$ {data.total.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+\,)/g, "$1.")}</ItemText>
                        </Container>
                        <ButtonCancel onPress={() => handlePrintConfirm(data)}>
                            <SubmitText>
                                <Icon name="print" size={24} color={'black'} />
                            </SubmitText>
                        </ButtonCancel>
                        <ButtonPrint onPress={() => handleCallCancel(data)}>
                            <SubmitText>
                                <Icon name="trash" size={24} color={'black'} />
                            </SubmitText>
                        </ButtonPrint>
                    </ContainerHorizontal>
                </TouchItem>
            );   
        } else {
            return (
                <TouchItemCancel>
                    <ContainerHorizontal>
                        <Container>
                            <ItemText>Id: {data.id}   Data: {format(data.date, 'dd/MM/yyyy hh:mm')}</ItemText>
                            <ItemText>Vlr. Total: R$ {data.total.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+\,)/g, "$1.")}</ItemText>
                        </Container>
                        <ButtonCancel onPress={() => handlePrintConfirm(data)}>
                            <SubmitText>
                                <Icon name="print" size={24} color={'black'} />
                            </SubmitText>
                        </ButtonCancel>
                        <ButtonPrint onPress={() => handleCallCancel(data)}>
                            <SubmitText>
                                <Icon name="trash" size={24} color={'black'} />
                            </SubmitText>
                        </ButtonPrint>
                    </ContainerHorizontal>
                </TouchItemCancel>
            );   
        }

    };

    return (
        <Background>
            <ContainerHorizontal>
                <Container behavior={Platform.OS === 'ios' ? 'padding' : ''} enabled>
                    <TextoLogo>
                        {user.name}
                    </TextoLogo>
                    <TextoBasico>
                        {user.phone}
                    </TextoBasico>
                    <SubmitButton onPress={handleSales}>
                        <SubmitText>Voltar</SubmitText>
                    </SubmitButton>
                </Container>
                <Container>
                    <TextoLogo> Vendas finalizadas </TextoLogo>
                    <List
                        keyExtractor={item => item.id}
                        data={salesList}
                        renderItem={({ item }) => (
                            <ItemListItems
                                data={item}
                            />
                        )}
                    />
                </Container>

                <Modal animationType="slide" visible={modalCancel} transparent={true}>
                    <ContainerModal>
                        <TextoLogo>
                            Confirma cancelamento
                        </TextoLogo>

                        <SubmitButtonModal onPress={handleCancel}>
                            <SubmitText>Cancelar venda</SubmitText>
                        </SubmitButtonModal>
                        <SubmitButtonModal onPress={handleBack}>
                            <SubmitText>Voltar</SubmitText>
                        </SubmitButtonModal>

                    </ContainerModal>
                </Modal>


                <Modal animationType="slide" visible={modalPrint} transparent={true}>
                    <ContainerModal>
                        <TextoLogo>
                            Confirma impressão
                        </TextoLogo>

                        <SubmitButtonModal onPress={handlePrint}>
                            <SubmitText>Imprime</SubmitText>
                        </SubmitButtonModal>
                        <SubmitButtonModal onPress={handleCancelModalPrint}>
                            <SubmitText>Voltar</SubmitText>
                        </SubmitButtonModal>

                    </ContainerModal>
                </Modal>


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
        </Background>
    )
}