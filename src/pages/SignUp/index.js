import React, { useState, useEffect } from 'react';
import { Platform, Keyboard, ActivityIndicator, Modal } from 'react-native';
import firebase from '../../services/firebaseConnection';
import getRealm from '../../services/realm';


import {
    Background, Container, TextoLogo, TextOrienta, AreaInput, Input,
    SubmitButton, SubmitText, SignUpLink, SignUpText, ContainerModal
} from './styles';

export default function SignUp({ navigation }) {


    const [name, setName] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [activity, setActivity] = useState(false);

    firebase.auth().signOut();


    async function saveUser(uid) {
        // alert('chamou save user');
        const data = {
            id: uid,
            name: name,
            cnpj: cnpj,
            rg: 'rg',
            cpf: 'cpf',
            birth: (new Date()).getTime(),
            phone: '9999999999',
            cellphone: '9999999999',
            email: email,
            password: password,
            address: 'endereço',
            number: '9999',
            neigh: 'bairro',
            complement: 'complemento',
            zipcode: '998888777',
            city: 'cidade',
            state: 'uf',
            dtreg: (new Date()).getTime(),
            printerName: 'printername'
            // photo: 'photo'
        };
        // alert('criou o tipo');
        const realm = await getRealm();
        // alert('chamou getrealm');

        realm.write(() => {
            realm.create('User', data);
        });
    }


    async function handleSubmit() {
        try {
            setActivity(true);
            if (name !== '' && cnpj !== '' && email !== '' && password !== '') {
                await firebase.auth().createUserWithEmailAndPassword(email, password)
                    .then(async () => {
                        let uid = firebase.auth().currentUser.uid;
                        await firebase.firestore().collection('customers').doc(uid).set({
                            id: uid,
                            name: name,
                            cnpj: cnpj,
                            rg: 'rg',
                            cpf: 'cpf',
                            birth: (new Date()).getTime(),
                            phone: '9999999999',
                            cellphone: '9999999999',
                            email: email,
                            password: password,
                            address: 'endereço',
                            number: '9999',
                            neigh: 'bairro',
                            complement: 'complemento',
                            zipcode: '998888777',
                            city: 'cidade',
                            state: 'uf',
                            dtreg: (new Date()).getTime(),
                            printerName: 'printerName'
                        });
                        await saveUser(uid);
                        setActivity(false);
                        Keyboard.dismiss;
                        navigation.navigate('SignIn')
                    });
            }

        }
        catch (erro) {
            if (erro.code == 'auth/email-already-in-use') {
                recoverAccount();
            } else {
                alert('Erro ao realizar cadastro: ' + erro);
                setActivity(false);
            };
        };
    }

    async function recoverAccount() {
        let userImport = [];
        const realm = await getRealm();
        await firebase.auth().signInWithEmailAndPassword(email, password)
            .then(async () => {
                let uid = firebase.auth().currentUser.uid;
                // alert(uid);
                firebase.firestore().collection('customers').orderBy('name').where("id", "==", uid)
                    .get()
                    .then((result) => {
                        alert(result);
                        result.forEach((doc) => {
                            userImport.push({
                                id: doc.data().id,
                                name: doc.data().name,
                                cnpj: doc.data().cnpj,
                                rg: doc.data().rg,
                                cpf: doc.data().cpf,
                                birth: doc.data().birth,
                                phone: doc.data().phone,
                                cellphone: doc.data().cellphone,
                                email: doc.data().email,
                                password: doc.data().password,
                                address: doc.data().address,
                                number: doc.data().number,
                                neigh: doc.data().neigh,
                                complement: doc.data().complement,
                                zipcode: doc.data().zipcode,
                                city: doc.data().city,
                                state: doc.data().state,
                                dtreg: doc.data().dtreg,
                                printerName: doc.data().printerName
                            });
                        });
                        try {
                            // alert(userImport[0].name);
                            let userCad = {
                                id: userImport[0].id,
                                name: userImport[0].name,
                                cnpj: userImport[0].cnpj,
                                rg: userImport[0].rg,
                                cpf: userImport[0].cpf,
                                birth: userImport[0].birth,
                                phone: userImport[0].phone,
                                cellphone: userImport[0].cellphone,
                                email: userImport[0].email,
                                password: userImport[0].password,
                                address: userImport[0].address,
                                number: userImport[0].number,
                                neigh: userImport[0].neigh,
                                complement: userImport[0].complement,
                                zipcode: userImport[0].zipcode,
                                city: userImport[0].city,
                                state: userImport[0].state,
                                dtreg: userImport[0].dtreg,
                                printerName: userImport[0].printerName
                            };
                            realm.write(() => {
                                realm.create('User', userCad, 'modified');
                            });
                            setActivity(false);
                            alert('Dados recuperador com sucesso!')
                        }
                        catch(erro) {
                            alert('erro salvar realm: ' + erro);
                            setActivity(false);
                        }
                    })
                    .catch((error) => {
                        alert('erro leitura firebase: ' + error);
                        setActivity(false);
                    });
            })
            .catch((erro) => {
                alert('erro no login firebase:' + erro);
                setActivity(false);
            });
    };

    function handleBack() {
        navigation.navigate('SignIn');
    };

    return (
        <Background>
            <Container behavior={Platform.OS === 'ios' ? 'padding' : ''} enabled>
                <TextoLogo>
                    MettreSmart
                </TextoLogo>

                <TextOrienta>
                    Informe os dados para começar...
                </TextOrienta>

                <Modal animationType="slide" visible={activity} transparent={false}>
                    <ContainerModal>
                    {(activity) && <ActivityIndicator size="large" color="#b8860b" />}
                    <TextoLogo>
                        Aguarde! Registrando seus dados...
                    </TextoLogo>
                    </ContainerModal>
                </Modal>

                <AreaInput>
                    <Input
                        placeholder="Nome"
                        autoCorrect={false}
                        // autoCapitalize="none"
                        value={name}
                        onChangeText={(name) => setName(name)}
                    />
                </AreaInput>

                <AreaInput>
                    <Input
                        placeholder="CNPJ do provedor de dados..."
                        autoCorrect={false}
                        autoCapitalize="none"
                        value={cnpj}
                        onChangeText={(cnpj) => setCnpj(cnpj)}
                        keyboardType="number-pad"
                    />
                </AreaInput>

                <AreaInput>
                    <Input
                        placeholder="Email"
                        autoCorrect={false}
                        autoCapitalize="none"
                        value={email}
                        onChangeText={(email) => setEmail(email)}
                        keyboardType="url"
                    />
                </AreaInput>

                <AreaInput>
                    <Input
                        placeholder="Senha"
                        autoCorrect={false}
                        autoCapitalize="none"
                        secureTextEntry={true}
                        value={password}
                        onChangeText={(password) => setPassword(password)}
                    />
                </AreaInput>

                <SubmitButton onPress={handleSubmit}>
                    <SubmitText>Cadastrar</SubmitText>
                </SubmitButton>

                <SubmitButton onPress={handleBack}>
                    <SubmitText>Voltar</SubmitText>
                </SubmitButton>


            </Container>
        </Background>
    )
}