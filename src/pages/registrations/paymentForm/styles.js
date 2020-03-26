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

export const TextoLogo = styled.Text`
    font-size: 25px;
    font-weight: bold;
    color: #ff9800; 
    margin-bottom: 5px;
`;

export const TextoBasico = styled.Text`
    font-size: 15px;
    color: #ff9800; 
    margin-top: 20px;
    align-self: flex-start;
`;

export const SubmitButton = styled.TouchableOpacity`
    align-items: center;
    justify-content: center;
    background-color: #ff9800;
    height: 45px;
    width: 100%;
    border-radius: 7px;
    margin-top: 10px; 
`;

export const SubmitText = styled.Text`
    color: black;
    font-size: 18px;
`;

export const Input = styled.TextInput`
    background: #FFF;
    color: #222;
    font-size: 17px;
    border-radius: 7px;
    width: 100%;
    margin-bottom: 15px;
    margin-top: 5px;
    padding: 10px;
`;

export const List = styled.FlatList.attrs({
    paddingHorizontal: 15,
    paddingVertical: 10
})`
    /* margin-top: 15px; */
    flex: 1;
    width: 98%;
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
