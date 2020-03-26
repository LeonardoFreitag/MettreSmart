import React, { useState, useEffect } from 'react';
import { Platform, button, ActivityIndicator, Keyboard } from 'react-native';
import getRealm from '../../../services/realm';
// import { format, toDate } from 'date-fns';

import {
    Background, Container, ContainerHorizontal, TextoLogo, TextoBasico,
    ContainerJustify, SubmitButton, SubmitText, Input, List,
    GroupItem, ItemText
} from './styles';
import { useSelector, useDispatch } from 'react-redux';

export default function Groups({ navigation }) {

    const dispatch = useDispatch();
    const groups = useSelector(state => state.groups);

    const [group, setGroup] = useState('');
    const [id, setId] = useState('');
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
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
            // alert(groups[0].group + '/' + groups[0].id);
        };
        loadGroups();
    }, []);

    async function handleRegister() {
        try {
            Keyboard.dismiss();

            const realm = await getRealm();

            let newId = '';
            if (editMode) {
                newId = id;
            } else {
                newId = (new Date()).getTime().toString();
            };

            let item = {
                id: newId,
                group: group
            };

            realm.write(() => {
                realm.create('Groups', item, 'modified');
            });

            if (editMode) {
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
                setEditMode(false);
            } else {
                dispatch({
                    type: 'STORE_GRUOPS',
                    id: item.id,
                    group: item.group,
                });
            }
            setGroup('');
        }
        catch (erro) {
            alert(erro);
        };
    };

    function handleEdit(data) {
        setId(data.id);
        setGroup(data.group);
        setEditMode(true);
    };

    async function handleDelete() {
        try {
            const realm = await getRealm();
            let filtro = 'id = "' + id + '"';
            let itemDel = realm.objects('Groups').filtered(filtro);
            realm.write(() => {
                realm.delete(itemDel);
            });


            if (editMode) {
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
                setEditMode(false);
            }
            setGroup('');
            setId('');
        }
        catch (erro) {
            alert(erro);
        };
    };

    function ItemList({ data }) {
        return (
            <GroupItem onPress={() => handleEdit(data)}>
                <ItemText>{data.group}</ItemText>
            </GroupItem>
        );
    }

    return (
        <Background>
            <Container behavior={Platform.OS === 'ios' ? 'padding' : ''} enabled>
                <TextoLogo>
                    GRUPOS DE PRODUTOS
                </TextoLogo>

                <ContainerHorizontal>
                    <Container>
                        <TextoLogo>
                            Cadastro
                        </TextoLogo>
                        <TextoBasico>
                            Grupo:
                        </TextoBasico>
                        <Input
                            placeholder="Nome do grupo..."
                            autoCorrect={false}
                            autoCapitalize="words"
                            value={group}
                            keyboardType="default"
                            onChangeText={(group) => setGroup(group)}
                        />
                        <SubmitButton onPress={handleRegister}>
                            <SubmitText>Cadastrar</SubmitText>
                        </SubmitButton>
                        {(editMode) && <SubmitButton onPress={handleDelete}>
                            <SubmitText>Excluir</SubmitText>
                        </SubmitButton>}

                    </Container>

                    <Container>
                        <TextoLogo>
                            Listagem
                        </TextoLogo>

                        <List
                            keyExtractor={item => item.id}
                            data={groups}
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