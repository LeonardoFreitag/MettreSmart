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
    justify-content: center;
`;

export const ContainerJustify = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
`;

export const TextoLogo = styled.Text`
    font-size: 25px;
    font-weight: bold;
    color: #b8860b; 
    margin-bottom: 5px;
`;

export const TextoBasico = styled.Text`
    font-size: 12px;
    color: #b8860b; 
    margin-bottom: 5px;
`;

export const SubmitButton = styled.TouchableOpacity`
    align-items: center;
    justify-content: center;
    background-color: #b8860b;
    height: 60px;
    width: 45%;
    border-radius: 7px;
    margin-top: 10px; 
    margin-right: 10px;
`;

export const ModalButton = styled.TouchableOpacity`
    align-items: center;
    justify-content: center;
    background-color: #b8860b;
    height: 60px;
    width: 90%;
    border-radius: 7px;
    margin-top: 10px; 
`;

export const SubmitText = styled.Text`
    color: black;
    font-size: 18px;
`;

export const ContainerHorizontal = styled.View`
    /* flex: 1; */
    flex-direction: row;
    /* padding: 5px; */
    padding-right: 5px;
    padding-left: 5px;
`;

export const ContainerModal = styled.KeyboardAvoidingView`
    /* flex: 1; */
    height: 350px;
    width: 50%;
    align-items: center;
    justify-content: center;
    background-color: #010101;
    align-self: center;
    margin-top: 100px;
    border-radius: 10px;
`;

export const ContainerForm = styled.View`
    /* flex: 1; */
    width: 92%;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 5px;
`;

export const TextNovo = styled.Text`
    font-size: 20px;
    color: #b8860b; 
    /* margin-top: 20px; */
`;

export const Input = styled.TextInput`
    background: white;
    color: #222;
    font-size: 25px;
    font-weight: bold;
    border-radius: 7px;
    width: 100%;
    margin-bottom: 2px;
    margin-top: 5px;
    padding: 10px;
    padding-right: 40px;
    height: 50px;
    text-align: center;
`;
