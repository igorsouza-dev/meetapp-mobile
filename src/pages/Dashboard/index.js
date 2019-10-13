import React from 'react';
import { Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Background from '~/components/Background';
import Header from '~/components/Header';

import { Container } from './styles';

export default function Dashboard() {
  return (
    <Background>
      <Header />
      <Container>
        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 20 }}>
          Dashboard
        </Text>
      </Container>
    </Background>
  );
}

Dashboard.navigationOptions = {
  title: 'Meetups',
  tabBarLabel: 'Meetups',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="format-list-bulleted" color={tintColor} size={20} />
  ),
};
