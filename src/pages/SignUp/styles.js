import styled from 'styled-components/native';
import { Platform } from 'react-native';
import Button from '~/components/Button';
import Input from '~/components/Input';

export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'padding',
})`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 30px;
`;

export const SubmitButton = styled(Button)`
  margin-top: 20px;
`;

export const Form = styled.View`
  align-self: stretch;
  margin-top: 50px;
`;

export const FormInput = styled(Input)`
  margin-bottom: 10px;
`;

export const SignLink = styled.TouchableOpacity`
  margin-top: 20px;
`;

export const SignLinkText = styled.Text`
  color: rgba(255, 255, 255, 0.6);
  font-size: 16px;
  font-weight: bold;
`;
