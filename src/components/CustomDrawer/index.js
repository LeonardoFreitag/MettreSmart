import React from 'react';
import { Platform } from 'react-native';

import { Background, Container, Logo, TextoBasico, ListaItens } from './styles';
import { useSelector } from 'react-redux';
import { DrawerItems } from 'react-navigation-drawer';


export default function CustomDrawer(props) {

    const user = useSelector(state => state.auth);

    return (
        <Background>
            <Container behavior={Platform.OS === 'ios' ? 'padding' : ''} enabled>
                <Logo source={require('../../assets/SignIn.png')}/>
                <TextoBasico>
                    Bem vindo!
                </TextoBasico>

                <ListaItens>
                    <DrawerItems {...props} />
                </ListaItens>

            </Container>
        </Background>
    )
}