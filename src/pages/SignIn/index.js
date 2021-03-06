import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { signInRequest } from '~/store/modules/auth/actions';

import {
  Container,
  Form,
  FormInput,
  SubmitButton,
  SignLink,
  SignLinkText,
} from './styles';
import Background from '~/components/Background';
import Logo from '~/components/Logo';

export default function SignIn({ navigation }) {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const passwordRef = useRef();
  function handleSignIn() {
    dispatch(signInRequest(email, password));
  }
  return (
    <Background>
      <Container>
        <Logo />
        <Form>
          <FormInput
            icon="mail-outline"
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Insert your e-mail"
            value={email}
            onChangeText={setEmail}
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current.focus()}
          />
          <FormInput
            icon="lock-outline"
            secureTextEntry
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Insert your password"
            value={password}
            ref={passwordRef}
            onChangeText={setPassword}
            returnKeyType="send"
            onSubmitEditing={handleSignIn}
          />
          <SubmitButton onPress={handleSignIn} loading={loading}>
            Sign In
          </SubmitButton>
        </Form>
        <SignLink onPress={() => navigation.navigate('SignUp')}>
          <SignLinkText>Create a free account</SignLinkText>
        </SignLink>
      </Container>
    </Background>
  );
}

SignIn.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
