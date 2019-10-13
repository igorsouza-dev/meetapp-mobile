import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Header from '~/components/Header';
import Background from '~/components/Background';

import {
  Container,
  Form,
  FormInput,
  SubmitButton,
  Separator,
  LogoutButton,
} from './styles';

import { signOut } from '~/store/modules/auth/actions';
import { updateProfileRequest } from '~/store/modules/user/actions';

export default function Profile() {
  const dispatch = useDispatch();

  const profile = useSelector(state => state.user.profile);
  const loading = useSelector(state => state.user.loading);

  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const mailRef = useRef();
  const oldPasswordRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  useEffect(() => {
    setOldPassword('');
    setPassword('');
    setConfirmPassword('');
  }, [profile]);

  function handleSubmit() {
    dispatch(
      updateProfileRequest({
        name,
        email,
        oldPassword,
        password,
        confirmPassword,
      })
    );
  }

  function handleSignOut() {
    dispatch(signOut());
  }
  return (
    <Background>
      <Header />
      <Container>
        <Form>
          <FormInput
            icon="person-outline"
            autoCorrect={false}
            placeholder="Insert your full name"
            returnKeyType="next"
            onSubmitEditing={() => mailRef.current.focus()}
            value={name}
            onChangeText={setName}
          />
          <FormInput
            icon="mail-outline"
            keyboardType="email-address"
            autoCorrect={false}
            placeholder="Insert your e-mail"
            ref={mailRef}
            returnKeyType="next"
            onSubmitEditing={() => oldPasswordRef.current.focus()}
            value={email}
            autoCapitalize="none"
            onChangeText={setEmail}
          />
          <Separator />
          <FormInput
            icon="lock-outline"
            secureTextEntry
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Your current password"
            onSubmitEditing={() => passwordRef.current.focus()}
            ref={oldPasswordRef}
            returnKeyType="next"
            value={oldPassword}
            onChangeText={setOldPassword}
          />
          <FormInput
            icon="lock-outline"
            secureTextEntry
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Your new password"
            onSubmitEditing={() => confirmPasswordRef.current.focus()}
            ref={passwordRef}
            returnKeyType="next"
            value={password}
            onChangeText={setPassword}
          />
          <FormInput
            icon="lock-outline"
            secureTextEntry
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Confirm your password"
            ref={confirmPasswordRef}
            returnKeyType="send"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            onSubmitEditing={handleSubmit}
          />
          <SubmitButton onPress={handleSubmit} loading={loading}>
            Save profile
          </SubmitButton>
          <LogoutButton onPress={handleSignOut}>Sign Out</LogoutButton>
        </Form>
      </Container>
    </Background>
  );
}

Profile.navigationOptions = {
  tabBarLabel: 'My Profile',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="person" color={tintColor} size={20} />
  ),
};
