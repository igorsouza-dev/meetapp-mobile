import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
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

export default function SignUp({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const emailRef = useRef();
  const passwordRef = useRef();
  function handleSignUp() {}
  return (
    <Background>
      <Container>
        <Logo />
        <Form>
          <FormInput
            icon="person-outline"
            autoCorrect={false}
            placeholder="Insert your full name"
            value={name}
            onChangeText={setName}
            returnKeyType="next"
            onSubmitEditing={() => emailRef.current.focus()}
          />
          <FormInput
            icon="mail-outline"
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Insert your e-mail"
            value={email}
            onChangeText={setEmail}
            returnKeyType="next"
            ref={emailRef}
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
            onSubmitEditing={handleSignUp}
          />
          <SubmitButton onPress={handleSignUp}>Sign Up</SubmitButton>
        </Form>
        <SignLink onPress={() => navigation.navigate('SignIn')}>
          <SignLinkText>Already have an account</SignLinkText>
        </SignLink>
      </Container>
    </Background>
  );
}

SignUp.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
