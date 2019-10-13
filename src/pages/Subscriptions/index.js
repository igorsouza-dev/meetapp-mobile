import React from 'react';
import { Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Background from '~/components/Background';
import Header from '~/components/Header';

import { Container } from './styles';

export default function Subscriptions() {
  return (
    <Background>
      <Header />
      <Container>
        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 20 }}>
          Subscriptions
        </Text>
      </Container>
    </Background>
  );
}

Subscriptions.navigationOptions = {
  tabBarLabel: 'Subscriptions',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="local-offer" color={tintColor} size={20} />
  ),
};
