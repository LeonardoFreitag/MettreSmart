import React, { useState, useEffect } from 'react';
import {
    Platform, button, ActivityIndicator, Keyboard, Picker,
    StyleSheet
} from 'react-native';
import getRealm from '../../../services/realm';
// import { format, toDate } from 'date-fns';
import RNPickerSelect, { defaultStyles } from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
    Background, Container, ContainerHorizontal, TextoLogo, TextoBasico,
    ContainerJustify, SubmitButton, SubmitText, Input, List,
    CommentItem, ItemText, ContainerPicker
} from './styles';
import { useSelector, useDispatch } from 'react-redux';

export default function Comments({ navigation }) {

    const dispatch = useDispatch();
    const comments = useSelector(state => state.comments);
    const groups = useSelector(state => state.groups);

    const [id, setId] = useState('');
    const [comment, setComment] = useState('');
    const [group, setGroup] = useState('');
    const [grouList, setGroupList] = useState([]);
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        async function loadGroups() {
            try {
                dispatch({
                    type: 'CLEAR_GROUPS'
                });
                const realm = await getRealm();
                let allGroups = realm.objects('Groups');
                let ad = [];
                allGroups.forEach((item) => {
                    ad.push({
                        label: item.group,
                        value: item.group
                    });
                    dispatch({
                        type: 'STORE_GROUPS',
                        id: item.id,
                        group: item.group,
                    });
                });
                setGroupList(ad);
            }

            catch (erro) {
                alert(erro);
            };
        };

        async function loadComments() {
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
        };
        loadGroups();
        loadComments();
    }, []);

    async function handleRegister() {
        try {
            if ((comment != '') && (group != '')) {
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
                    comment: comment,
                    group: group
                };

                realm.write(() => {
                    realm.create('Comments', item, 'modified');
                });


                if (editMode) {
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
                } else {
                    dispatch({
                        type: 'STORE_COMMENTS',
                        id: item.id,
                        comment: item.comment,
                        group: item.group
                    });   
                }
                setComment('');
                setGroup('');
                setEditMode(false);
            }
        }
        catch (erro) {
            alert(erro);
        };
    };

    function handleEdit(data) {
        try{
            setId(data.id);
            setComment(data.comment);
            setGroup(data.group);
            setEditMode(true);   
        }
        catch(erro) {
            alert(erro);
        }
    };

    async function handleDelete() {
        try {
            const realm = await getRealm();
            let filtro = 'id = "' + id + '"';
            let itemDel = realm.objects('Comments').filtered(filtro);
            realm.write(() => {
                realm.delete(itemDel);
            });


            if (editMode) {
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
                setComment('');
                setId('');
                setEditMode(false);
            }
        }
        catch (erro) {
            alert(erro);
        };
    };

    function ItemList({ data }) {
        return (
            <CommentItem onPress={() => handleEdit(data)}>
                <ItemText>{data.comment} (Grupo: {data.group})</ItemText>
            </CommentItem>
        );
    }

    return (
        <Background>
            <Container behavior={Platform.OS === 'ios' ? 'padding' : ''} enabled>
                <TextoLogo>
                    OBSERVAÇÕES
                </TextoLogo>

                <ContainerHorizontal>
                    <Container>
                        <TextoLogo>
                            Cadastro
                        </TextoLogo>
                        <TextoBasico>
                            Descrição:
                        </TextoBasico>
                        <Input
                            placeholder="Nome do grupo..."
                            autoCorrect={false}
                            autoCapitalize="words"
                            value={comment}
                            keyboardType="default"
                            onChangeText={(comment) => setComment(comment)}
                        />


                        {/* <Picker
                            selectedValue={0}
                            style={styles.selectPicker}
                            onValueChange={(itemValue, itemIndex) => setGroup(itemValue)}
                        >
                            <Picker.Item label="Java" value="java" />
                            <Picker.Item label="JavaScript" value="js" />
                        </Picker> */}

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
                                items={grouList}
                                Icon={() => {
                                    return <Icon name="arrow-down" size={24} color={"#b8860b"} />;
                                }}
                            />
                        </ContainerPicker>
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
                            data={comments}
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