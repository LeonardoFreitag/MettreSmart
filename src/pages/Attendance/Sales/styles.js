import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components/native';

export const Background = styled(LinearGradient).attrs({
    colors: ['black', '#696969']
})`
    flex: 1;
`;

export const Container = styled.KeyboardAvoidingView`
    flex: 1;
    align-items: center;
    justify-content: flex-start;
`;

export const ContainerJustify = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
`;

export const ContainerHorizontal = styled.View`
    flex: 1;
    flex-direction: row;
    padding: 20px;
`;

export const ContainerHorizontalModal = styled.View`
    flex-direction: row;
`;

export const ContainerBotton = styled.View`
    /* flex: 1; */
    flex-direction: row;
`;

export const ContainerTwoButton = styled.View`
    flex-direction: row;
`;

export const ContainerModal = styled.KeyboardAvoidingView`
    /* flex: 1; */
    height: 80%;
    width: 50%;
    align-items: center;
    justify-content: center;
    background-color: #010101;
    align-self: center;
    margin-top: 100px;
    border-radius: 10px;
    padding-bottom: 10px;
`;

export const TextoLogo = styled.Text`
    font-size: 25px;
    font-weight: bold;
    color: #ff9800; 
    margin-bottom: 5px;
`;

export const TextTotal = styled.Text`
    font-size: 20px;
    font-weight: bold;
    color: #ff9800; 
    margin-bottom: 1px;
`;

export const TextoBasico = styled.Text`
    font-size: 15px;
    color: #ff9800; 
    margin-top: 20px;
    align-self: center;
`;

export const SubmitButton = styled.TouchableOpacity`
    align-items: center;
    justify-content: center;
    background-color: #ff9800;
    height: 45px;
    width: 98%;
    border-radius: 7px;
    margin-top: 5px; 
`;

export const SubmitButtonModal = styled.TouchableOpacity`
    align-items: center;
    justify-content: center;
    background-color: #ff9800;
    height: 45px;
    width: 90%;
    border-radius: 7px;
    margin-top: 10px; 
`;

export const ButtonTwoButton = styled.TouchableOpacity`
    align-items: center;
    justify-content: center;
    background-color: #ff9800;
    height: 45px;
    width: 50%;
    border-radius: 7px;
    margin-top: 5px;    
    margin-right: 1px;
`;

export const ButtonFourButton = styled.TouchableOpacity`
    align-items: center;
    justify-content: center;
    background-color: #ff9800;
    height: 55px;
    width: 24%;
    border-radius: 7px;
    margin-top: 5px;    
    margin-right: 1px;
`;

export const ButtonInc = styled.TouchableOpacity`
    align-items: center;
    justify-content: center;
    background-color: green;
    height: 75px;
    width: 50%;
    border-radius: 7px;
    margin-top: 5px;    
    margin-right: 5px;
`;

export const ButtonIncModal = styled.TouchableOpacity`
    align-items: center;
    justify-content: center;
    background-color: green;
    height: 55px;
    width: 45%;
    border-radius: 7px;
    margin-top: 5px;    
    margin-right: 5px;
`;

export const ButtonDec = styled.TouchableOpacity`
    align-items: center;
    justify-content: center;
    background-color: red;
    height: 75px;
    width: 50%;
    border-radius: 7px;
    margin-top: 5px;    
    margin-right: 1px;
`;

export const ButtonDecModal = styled.TouchableOpacity`
    align-items: center;
    justify-content: center;
    background-color: red;
    height: 55px;
    width: 43%;
    border-radius: 7px;
    margin-top: 5px;    
    margin-right: 8px;
`;

export const SubmitText = styled.Text`
    color: black;
    font-size: 18px;
    text-align: center;
`;

export const TextInc = styled.Text`
    color: black;
    font-size: 45px;
    font-weight: bold;
`;

export const Input = styled.TextInput`
    background: #FFF;
    color: #222;
    font-size: 17px;
    border-radius: 7px;
    width: 100%;
    margin-bottom: 5px;
    margin-top: 5px;
    padding: 10px;
`;

export const InputAmount = styled.TextInput`
    background: #FFF;
    color: #222;
    font-size: 25px;
    font-weight: bold;
    border-radius: 7px;
    width: 100%;
    margin-bottom: 5px;
    margin-top: 5px;
    padding: 10px;
    text-align: center;
`;

export const InputAmountModal = styled.TextInput`
    background: #FFF;
    color: #222;
    font-size: 15px;
    font-weight: bold;
    border-radius: 7px;
    width: 90%;
    margin-bottom: 5px;
    margin-top: 5px;
    padding: 10px;
    text-align: center;
`;

export const InputCustomerModal = styled.TextInput`
    background: #FFF;
    color: #222;
    font-size: 15px;
    font-weight: bold;
    border-radius: 7px;
    width: 90%;
    margin-bottom: 150px;
    margin-top: 5px;
    padding: 10px;
    text-align: center;
`;

export const List = styled.FlatList.attrs({
    paddingHorizontal: 15,
    paddingVertical: 10
})`
    /* margin-top: 15px; */
    flex: 1;
    width: 98%;
`;

export const ListGroups = styled.FlatList.attrs({
    paddingHorizontal: 15,
    paddingVertical: 10
})`
    /* margin-top: 15px; */
    flex: 1;
    width: 98%;
`;

export const ListProducts = styled.FlatList.attrs({
    paddingHorizontal: 15,
    paddingVertical: 10
})`
    /* margin-top: 15px; */
    flex: 1;
    width: 98%;
`;


export const ListComments = styled.FlatList.attrs({
    paddingHorizontal: 15,
    paddingVertical: 10
})`
    /* margin-top: 15px; */
    flex: 1;
    width: 98%;
`;

export const TouchItem = styled.TouchableOpacity`
    background-color: #333333;
    margin-bottom: 12px;
    padding: 7px;
    border-radius: 5px;
    z-index: 3;
    box-shadow: 2px 2px rgba(0, 0, 0, 0.2);
    border-width: 1px;
    border-color: #b8860b;
`;

export const GroupItem = styled.TouchableOpacity`
    background-color: #333333;
    margin-bottom: 12px;
    padding: 7px;
    border-radius: 5px;
    z-index: 3;
    box-shadow: 2px 2px rgba(0, 0, 0, 0.2);
`;

export const ItemText = styled.Text`
    font-size: 15px;
    font-weight: bold;
    color: #b8860b; 
    margin-top: 5px;
`;

export const TouchGroup = styled.TouchableOpacity`
    background-color: #333333;
    margin: 5px;
    padding-top: 18px;
    border-radius: 5px;
    z-index: 3;
    box-shadow: 2px 2px rgba(0, 0, 0, 0.2);
    height: 60px;
    align-items: center;
    border-width: 1px;
    border-color: #b8860b;
`;

export const TextGroup = styled.Text`
    font-size: 15px;
    font-weight: bold;
    color: #b8860b; 
`;

export const TouchProducts = styled.TouchableOpacity`
    flex-direction: row;
    background-color: #333333;
    margin: 5px;
    padding-top: 18px;
    padding-left: 30px;
    border-radius: 5px;
    z-index: 3;
    box-shadow: 2px 2px rgba(0, 0, 0, 0.2);
    height: 60px;
    align-items: flex-start;
    width: 98%;
    text-align: justify;
    border-width: 1px;
    border-color: #b8860b;
`;

export const TextProducts = styled.Text`
    font-size: 15px;
    font-weight: bold;
    color: #b8860b; 
    align-content: center;
`;


export const TouchComments = styled.TouchableOpacity`
    background-color: #333333;
    margin: 5px;
    padding-top: 18px;
    border-radius: 5px;
    z-index: 3;
    box-shadow: 2px 2px rgba(0, 0, 0, 0.2);
    height: 60px;
    align-items: center;
    width: 48%;
    border-width: 1px;
    border-color: #b8860b;
`;

export const TextComments = styled.Text`
    font-size: 15px;
    font-weight: bold;
    color: #b8860b; 
`;

export const ContainerBottonRight = styled.View`
    /* flex: 1; */
    flex-direction: row;
    align-content: flex-end;
`;
