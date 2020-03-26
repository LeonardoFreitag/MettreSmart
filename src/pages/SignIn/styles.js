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

export const Logo = styled.Image`
    margin-bottom: 5px;
`;

export const TextoLogo = styled.Text`
    font-size: 50px;
    color: #ff9800; 
    margin-bottom: 20px;
`;

export const AreaInput = styled.View`
    flex-direction: row;
`;

export const Input = styled.TextInput`
    background: #FFF;
    color: #222;
    font-size: 17px;
    border-radius: 7px;
    width: 50%;
    margin-bottom: 15px;
    padding: 10px;
`;

export const SubmitButton = styled.TouchableOpacity`
    align-items: center;
    justify-content: center;
    background-color: #ff9800;
    height: 45px;
    width: 50%;
    border-radius: 7px;
    margin-top: 10px; 
`;

export const SubmitText = styled.Text`
    color: black;
    font-size: 18px;
`;

export const SignUpLink = styled.TouchableOpacity`
    margin-top: 20px;
`;

export const SignUpText = styled.Text`
    color: #ff9800;
`;

