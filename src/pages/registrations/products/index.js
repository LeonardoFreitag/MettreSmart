import React, { useState, useEffect } from 'react';
import {
    Platform, button, ActivityIndicator, Keyboard, StyleSheet,
    ScrollView, Switch
} from 'react-native';
import getRealm from '../../../services/realm';
// import { format, toDate } from 'date-fns';

import {
    Background, Container, ContainerHorizontal, TextoLogo, TextoBasico,
    ContainerJustify, SubmitButton, SubmitText, Input, List,
    GroupItem, ItemText, ContainerPicker, TextoBasico3, Input3, InputValue,
    SubmitButton2
} from './styles';
import { useSelector, useDispatch } from 'react-redux';
import RNPickerSelect, { defaultStyles } from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Products({ navigation }) {

    const dispatch = useDispatch();
    const productsList = useSelector(state => state.products);
    const groups = useSelector(state => state.groups);

    const [editMode, setEditMode] = useState(false);
    const [id, setId] = useState('');
    const [code, setCode] = useState('');
    const [product, setProduct] = useState('');
    const [unity, setUnity] = useState('');
    const [cost, setCost] = useState('0,00');
    const [price, setPrice] = useState('0,00');
    const [group, setGroup] = useState('');
    const [groupList, setGroupList] = useState([]);
    const [printPlace, setPrintPlace] = useState(''); // cozinha / bar / copa
    const [printOut, setPrintOut] = useState(true);
    const [printPlaceList, setPrintPlaceList] = useState([
        { label: 'COZINHA', value: 'COZINHA' },
        { label: 'BAR', value: 'BAR' },
        { label: 'COPA', value: 'COPA' }
    ]);

    useEffect(() => {
        async function loadGroups() {
            const realm = await getRealm();
            let data = realm.objects('Groups');
            let g = [];
            data.forEach((items) => {
                g.push({
                    label: items.group,
                    value: items.group,
                });
            });
            setGroupList(g);
        };

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
                    printPlace: item.printPlace
                });
            });
            // alert(groups[0].group + '/' + groups[0].id);
        };
        loadGroups();
        loadProducts();
    }, []);

    async function handleRegister() {
        try {
            Keyboard.dismiss();

            const realm = await getRealm();

            let id = (new Date()).getTime();

            let item = {
                id: id.toString(),
                code: code,
                product: product,
                unity: unity,
                cost: parseFloat(cost),
                price: parseFloat(price),
                group: group,
                printOut: printOut,
                printPlace: printPlace
            };

            // alert(printOut + ' - ' + printPlace);

            realm.write(() => {
                realm.create('Products', item, 'modified');
            });

            if (editMode) {
                dispatch({type: 'CLEAR_PRODUCTS'});
            };

            dispatch({
                type: 'STORE_PRODUCTS',
                id: id.toString(),
                code: code,
                product: product,
                unity: unity,
                cost: cost,
                price: price,
                group: group,
                printOut: printOut,
                printPlace: printPlace
            });
            clearFields();
        }
        catch (erro) {
            alert(erro);
        };
    };

    function clearFields() {
        setId('');
        setCode('');
        setProduct('');
        setUnity('');
        setCost('0,00');
        setPrice('0,00');
        setGroup('');
        setPrintOut(true);
        setPrintPlace('');
    };
  

    function setCostUpdate(data) {
        let a = data.toString();
        let b = a.replace(',', '');
        let c = (b / 100).toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+\,)/g, "$1.");
        if (c == NaN) { c = 0 };
        setCost(c);
    };

    function setPriceUpdate(data) {
        let a = data.toString();
        let b = a.replace(',', '');
        let c = (b / 100).toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+\,)/g, "$1.");
        if (c == NaN) { c = 0 };
        setPrice(c);
    };

    function editData(data) {
        try {
            setId(data.id);
            setCode(data.code);
            setProduct(data.product);
            setUnity(data.unity);
            setCost(data.cost.toString());
            setPrice(data.price.toString());
            setGroup(data.group);
            setPrintOut(data.printOut);
            setPrintPlace(data.printPlace);   
            setEditMode(true);
        }
        catch(erro) {
            alert(erro);
        };
    };

    async function handleDelete() {
        try {
            const realm = await getRealm();
            let filtro = 'id = "' + id + '"';
            let itemDel = realm.objects('Products').filtered(filtro);
            realm.write(() => {
                realm.delete(itemDel);
            });
    
            let newList = [];
            productsList.forEach((item) => {
                if (item.id != id) {
                    newList.push(item);
                };
            });
    
            if (editMode) {
                dispatch({type: 'CLEAR_PRODUCTS'});
            };
    
            newList.forEach((item) => {
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
                    printPlace: item.printPlace
                });   
            });
    
            clearFields();
            setEditMode(false);   
        }
        catch(erro) {
            alert(erro);
        };
    };

    function handleCancel() {
        clearFields();
        setEditMode(false);   
    };

    function ItemList({ data }) {
        return (
            <GroupItem onPress={() => editData(data)}>
                <ItemText>{data.code} - {data.product} - {data.unity}</ItemText>
                <ItemText>Grupo: {data.group} - Custo R$: {data.cost} - Preço venda R$: {data.price}</ItemText>
                <ItemText>Imprime produção: {(data.printOut) ? "Sim" : "Não"} - Local impressão: {data.printPlace}</ItemText>
            </GroupItem>
        );
    };

    return (
        <Background>
            <Container behavior={Platform.OS === 'ios' ? 'padding' : ''} enabled>
                <TextoLogo>
                    Produtos
                </TextoLogo>

                <ContainerHorizontal>
                    <Container>
                        <TextoLogo>
                            Cadastro
                        </TextoLogo>

                        <TextoBasico>
                            Código cardápio:
                            </TextoBasico>
                        <Input
                            placeholder="Código..."
                            autoCorrect={false}
                            autoCapitalize="words"
                            value={code}
                            keyboardType="numeric"
                            onChangeText={(code) => setCode(code)}
                        />
                        <TextoBasico>
                            Produto:
                            </TextoBasico>
                        <Input
                            placeholder="Descrição..."
                            autoCorrect={false}
                            autoCapitalize="words"
                            value={product}
                            keyboardType="default"
                            onChangeText={(product) => setProduct(product)}
                        />

                        <ContainerHorizontal>
                            <TextoBasico3>
                                Unidade:
                            </TextoBasico3>
                            <TextoBasico3>
                                Custo R$:
                            </TextoBasico3>
                            <TextoBasico3>
                                Preço de Venda R$:
                            </TextoBasico3>
                        </ContainerHorizontal>

                        <ContainerHorizontal>
                            <Input3
                                placeholder="Unidade..."
                                autoCorrect={false}
                                autoCapitalize="words"
                                value={unity}
                                keyboardType="default"
                                onChangeText={(unity) => setUnity(unity)}
                            />
                            <InputValue
                                placeholder="Custo..."
                                autoCorrect={false}
                                autoCapitalize="words"
                                value={cost}
                                keyboardType="numeric"
                                onChangeText={(cost) => setCostUpdate(cost)}
                            />
                            <InputValue
                                placeholder="Preço de venda..."
                                autoCorrect={false}
                                autoCapitalize="words"
                                value={price}
                                keyboardType="numeric"
                                onChangeText={(price) => setPriceUpdate(price)}
                            />
                        </ContainerHorizontal>
                        <TextoBasico>
                            Grupo:
                        </TextoBasico>
                        <ContainerPicker>
                            <RNPickerSelect
                                placeholder={{
                                    label: 'Selecione o grupo...',
                                    value: group,
                                }}
                                style={{
                                    ...pickerSelectStyles,
                                    iconContainer: {
                                        top: 15,
                                        right: 15,
                                    },
                                }}
                                value={group}
                                onValueChange={(value) => setGroup(value)}
                                items={groupList}
                                Icon={() => {
                                    return <Icon name="arrow-down" size={24} color={"#b8860b"} />;
                                }}
                            />
                        </ContainerPicker>

                        <ContainerHorizontal>
                            <Switch
                                value={printOut}
                                onValueChange={(value) => setPrintOut(value)}
                                thumbColor="#ff9800"
                            />
                            <TextoBasico>
                                Impressão na produção: {(printOut) ? "Ativo" : "Inativo"}
                            </TextoBasico>
                        </ContainerHorizontal>

                        <TextoBasico>
                            Local impressão:
                        </TextoBasico>
                        <ContainerPicker>
                            <RNPickerSelect
                                placeholder={{
                                    label: 'Indique o local de impressão...',
                                    value: printPlace,
                                }}
                                style={{
                                    ...pickerSelectStyles,
                                    iconContainer: {
                                        top: 15,
                                        right: 15,
                                    },
                                }}
                                value={printPlace}
                                onValueChange={(value) => setPrintPlace(value)}
                                items={printPlaceList}
                                Icon={() => {
                                    return <Icon name="arrow-down" size={24} color={"#b8860b"} />;
                                }}
                            />
                        </ContainerPicker>

                        <SubmitButton onPress={handleRegister}>
                            <SubmitText>Cadastrar</SubmitText>
                        </SubmitButton>
                        {(editMode) && <ContainerHorizontal>
                            <SubmitButton2 onPress={handleDelete}>
                                <SubmitText>Excluir</SubmitText>
                            </SubmitButton2>
                            <SubmitButton2 onPress={handleCancel}>
                                <SubmitText>Cancelar</SubmitText>
                            </SubmitButton2>
                        </ContainerHorizontal>}

                    </Container>

                    <Container>
                        <TextoLogo>
                            Listagem
                        </TextoLogo>

                        <List
                            keyExtractor={item => item.id}
                            data={productsList}
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

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        fontSize: 16,
        borderRadius: 8,
        color: '#b8860b',
        paddingRight: 30, // to ensure the text is never behind the icon
        backgroundColor: '#252525',
    },
});