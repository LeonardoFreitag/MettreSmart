import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components/native';

export const Background = styled(LinearGradient).attrs({
    colors: ['black', '#696969']
})`
    flex: 1;
`;

export const Container0 = styled.KeyboardAvoidingView`
    flex: 1;
    align-items: center;
    justify-content: center;
`;

export const Container = styled.KeyboardAvoidingView`
    flex: 1;
    align-items: center;
    justify-content: center;
    padding: 10px;
`;

export const ContainerHorizontal = styled.View`
    flex: 1;
    flex-direction: row;
    padding: 10px;
    padding-bottom: 20px;
    align-content: flex-start;
`;

export const ContainerHorizontal2 = styled.View`
    /* flex: 1; */
    flex-direction: row;
    /* padding: 10px; */
    /* padding-bottom: 100px; */
`;

export const ContainerJustify = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
`;

export const TextoLogo = styled.Text`
    font-size: 20px;
    font-weight: bold;
    color: #b8860b; 
    margin-bottom: 5px;
`;

export const TextoBasico = styled.Text`
    font-size: 15px;
    color: #b8860b; 
    margin-top: 3px;
    margin-left: 3px;
    text-align: justify;
    width: 100%;
`;

export const TextoBasico2 = styled.Text`
    font-size: 15px;
    color: #b8860b; 
    margin-top: 3px;
    margin-left: 3px;
    text-align: justify;
    width: 50%;
`;

export const SubmitButton = styled.TouchableOpacity`
    align-items: center;
    justify-content: center;
    background-color: #b8860b;
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
    font-size: 15px;
    border-radius: 7px;
    width: 100%;
    margin-bottom: 5px;
    margin-top: 1px;
    padding: 10px;
`;

export const Input2 = styled.TextInput`
    background: #FFF;
    color: #222;
    font-size: 15px;
    border-radius: 7px;
    width: 50%;
    margin-bottom: 5px;
    margin-top: 1px;
    margin-right: 1px;
    padding: 10px;
`;
