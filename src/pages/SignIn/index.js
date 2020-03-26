import React, { useState } from 'react';
import { Platform } from 'react-native';
import getRealm from '../../services/realm';
import {
    Background, Container, TextoLogo, Logo, AreaInput, Input,
    SubmitButton, SubmitText, SignUpLink, SignUpText
} from './styles';
import { useSelector, useDispatch } from 'react-redux';

export default function SignIn({ navigation }) {
    const user = useSelector(state => state.auth);
    const dispath = useDispatch();


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [users, setUsers] = useState([]);


    function handleUser(userlogin) {
        dispath({
            type: 'STORE_USER',
            id: userlogin.id,
            name: userlogin.name,
            cnpj: userlogin.cnpj,
            email: userlogin.email,
            password: userlogin.password,
            active: userlogin.active,
            idCustomer: userlogin.idCustomer,
        });
    };


    async function handleLogin() {
        if (email !== '' && password !== '') {
            try {
                const realm = await getRealm();
                let data = realm.objects('User');
                setUsers(data[0]);
                if (data[0].email == email.trim() && data[0].password == password) {
                    handleUser(data[0]);
                    navigation.navigate('Main');
                } else {
                    alert('Login/senha não conferem!');
                };
            }
            catch (err) {
                alert(err);
            };
        } else {
            alert('Informe Login/Senha');
        }
    };

    return (
        <Background>
            <Container behavior={Platform.OS === 'ios' ? 'padding' : ''} enabled>
                <Logo source={require('../../assets/SignIn.png')} />
                <TextoLogo>
                    MettreSmart
                </TextoLogo>

                <AreaInput>
                <Input
                    placeholder="Email"
                    autoCorrect={false}
                    autoCapitalize="none"
                    value={email}
                    onChangeText={(email) => setEmail(email)}
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

            <SubmitButton onPress={handleLogin}>
                <SubmitText>Acessar</SubmitText>
            </SubmitButton>

            <SignUpLink onPress={() => navigation.navigate('SignUp')}>
                <SignUpText>
                    Criar minha conta
                    </SignUpText>
            </SignUpLink>

            </Container>
        </Background>
    )
}