import React, { useState, useEffect } from 'react';
import { Platform, button, ActivityIndicator, ScrollView } from 'react-native';
import getRealm from '../../../services/realm';
// import { format, toDate } from 'date-fns';
import firebase from '../../../services/firebaseConnection';

import {
    Background, Container0, Container, TextoLogo, TextoBasico, ContainerJustify,
    SubmitButton, SubmitText, Input, ContainerHorizontal,
    ContainerHorizontal2, Input2, TextoBasico2
} from './styles';
import { useSelector, useDispatch } from 'react-redux';

export default function Users({ navigation }) {

    const dispatch = useDispatch();
    // const user = useSelector(state => state.user);
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [cnpj, setCnpj] = useState('');
    // const [birth, setBirth] = useState('');
    const [phone, setPhone] = useState('');
    const [cellphone, setCellPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAdderss] = useState('');
    const [number, setNumber] = useState('');
    const [neigh, setNeigh] = useState('');
    const [complement, setComplement] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    // const [dtreg, setDtReg] = useState('');
    const [printerName, setPrinterName] = useState('');
    const [editMode, setEditMode] = useState(false);


    useEffect(() => {
        async function loadUser() {
            const realm = await getRealm();
            let data = realm.objects('User');
            if (data.length > 0) {
                showData(data[0]);
                setEditMode(true);
            } else {
                setEditMode(false);
            };
        };
        loadUser();
    }, []);

    function showData(data) {
        setId(data.id);
        setName(data.name);
        setCnpj(data.cnpj);
        setPhone(data.phone);
        setCellPhone(data.cellphone);
        setEmail(data.email);
        setAdderss(data.address);
        setNumber(data.number);
        setNeigh(data.neigh);
        setComplement(data.complement);
        setZipcode(data.zipcode);
        setCity(data.city);
        setState(data.state);
        setPrinterName(data.printerName);
        setPassword(data.password);
    };

    async function handlePost() {
        try {
            const realm = await getRealm();
            let item = {
                id: id,
                name: name,
                cnpj: cnpj,
                phone: phone,
                cellphone: cellphone,
                email: email,
                address: address,
                number: number,
                neigh: neigh,
                complement: complement,
                zipcode: zipcode,
                city: city,
                state: state,
                printerName: printerName,
            };

            realm.write(() => {
                realm.create('User', item, 'modified');
            });

            dispatch({
                type: 'STORE_USER',
                id: id,
                name: name,
                cnpj: cnpj,
                phone: phone,
                cellphone: cellphone,
                email: email,
                address: address,
                number: number,
                neigh: neigh,
                complement: complement,
                zipcode: zipcode,
                city: city,
                state: state,
                printerName: printerName,
            });

            await firebase.auth().signInWithEmailAndPassword(email, password)
                .then(async () => {
                    let uid = firebase.auth().currentUser.uid;
                    await firebase.firestore().collection('customers').doc(uid).set({
                        id: uid,
                        name: name,
                        cnpj: cnpj,
                        // rg: rg,
                        // cpf: cpf,
                        // birth: birth,
                        phone: phone,
                        cellphone: cellphone,
                        email: email,
                        password: password,
                        address: address,
                        number: number,
                        neigh: neigh,
                        complement: complement,
                        zipcode: zipcode,
                        city: city,
                        state: state,
                        // dtreg: dtreg,
                        printerName: printerName
                    });
                })
                .catch((erro) => {
                    alert('Dados atualizados apenas localmente!' + erro);
                });
        }
        catch (erro) {
            alert(erro);
        };
    };

    function handleCancel() {
        navigation.navigate('Main');
    };

    return (
        <Background>
            <ScrollView>
                <Container>
                    <TextoLogo>
                        Usuário/Configurações
                </TextoLogo>
                    <ContainerHorizontal>
                        <Container>
                            <TextoBasico>Nome:</TextoBasico>
                            <Input placeholder="Nome..." autoCorrect={false} autoCapitalize="words"
                                value={name} keyboardType="default" onChangeText={(name) => setName(name)} />
                            <TextoBasico>CNPJ:</TextoBasico>
                            <Input placeholder="CNPJ..." autoCorrect={false} autoCapitalize="words"
                                value={cnpj} keyboardType="numeric" onChangeText={(cnpj) => setCnpj(cnpj)} />
                            <TextoBasico>Endereço:</TextoBasico>
                            <Input placeholder="Endereço..." autoCorrect={false} autoCapitalize="words"
                                value={address} keyboardType="default" onChangeText={(address) => setAdderss(address)} />

                            <ContainerHorizontal2>
                                <TextoBasico2>Telefone:</TextoBasico2>
                                <TextoBasico2>Celular:</TextoBasico2>
                            </ContainerHorizontal2>

                            <ContainerHorizontal2>
                                <Input2 placeholder="Fone..." autoCorrect={false} autoCapitalize="words"
                                    value={phone} keyboardType="name-phone-pad" onChangeText={(phone) => setPhone(phone)} />
                                <Input2 placeholder="Celular..." autoCorrect={false} autoCapitalize="words"
                                    value={cellphone} keyboardType="numeric" onChangeText={(cellphone) => setCellPhone(cellphone)} />
                            </ContainerHorizontal2>


                            <ContainerHorizontal2>
                                <TextoBasico2>Número:</TextoBasico2>
                                <TextoBasico2>Bairro:</TextoBasico2>
                            </ContainerHorizontal2>

                            <ContainerHorizontal2>
                                <Input2 placeholder="Número..." autoCorrect={false} autoCapitalize="words"
                                    value={number} keyboardType="default" onChangeText={(number) => setNumber(number)} />
                                <Input2 placeholder="Bairro..." autoCorrect={false} autoCapitalize="words"
                                    value={neigh} keyboardType="default" onChangeText={(neigh) => setNeigh(neigh)} />
                            </ContainerHorizontal2>

                            <SubmitButton onPress={handlePost}>
                                <SubmitText>Gravar</SubmitText>
                            </SubmitButton>


                        </Container>
                        <Container>
                            <TextoBasico>Complemento:</TextoBasico>
                            <Input placeholder="Complemento..." autoCorrect={false} autoCapitalize="words"
                                value={complement} keyboardType="default" onChangeText={(complement) => setComplement(complement)} />
                            <TextoBasico>Cidade:</TextoBasico>
                            <Input placeholder="Cidade..." autoCorrect={false} autoCapitalize="words"
                                value={city} keyboardType="default" onChangeText={(city) => setCity(city)} />

                            <ContainerHorizontal2>
                                <TextoBasico2>CEP:</TextoBasico2>
                                <TextoBasico2>Estado:</TextoBasico2>
                            </ContainerHorizontal2>
                            <ContainerHorizontal2>
                                <Input2 placeholder="CEP..." autoCorrect={false} autoCapitalize="words"
                                    value={zipcode} keyboardType="numeric" onChangeText={(zipcode) => setZipcode(zipcode)} />
                                <Input2 placeholder="Estado..." autoCorrect={false} autoCapitalize="words"
                                    value={state} keyboardType="default" onChangeText={(state) => setState(state)} />
                            </ContainerHorizontal2>
                            <TextoBasico>E-Mail:</TextoBasico>
                            <Input placeholder="E-Mail..." autoCorrect={false} autoCapitalize="words"
                                value={email} keyboardType="email-address" onChangeText={(email) => setEmail(email)} />
                            <TextoBasico>Nome impressora:</TextoBasico>
                            <Input placeholder="Nome da impressora..." autoCorrect={false} autoCapitalize="words"
                                value={printerName} keyboardType="default" onChangeText={(printerName) => setPrinterName(printerName)} />
                            <SubmitButton onPress={handleCancel}>
                                <SubmitText>Voltar</SubmitText>
                            </SubmitButton>
                        </Container>
                    </ContainerHorizontal>
                </Container>
            </ScrollView>
        </Background>
    )
}