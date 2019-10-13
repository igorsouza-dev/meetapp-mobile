import React from 'react';
import { Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Background from '~/components/Background';

import { Container } from './styles';

export default function Profile() {
  return (
    <Background>
      <Container>
        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 20 }}>
          Profile
        </Text>
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
