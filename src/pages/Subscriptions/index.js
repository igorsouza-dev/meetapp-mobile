import React, { useEffect, useState } from 'react';
import { Alert, ToastAndroid } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/MaterialIcons';

import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Background from '~/components/Background';
import Header from '~/components/Header';
import MeetupCard from '~/components/MeetupCard';

import api from '~/services/api';

import { Container, MeetupsList, EmptyListText } from './styles';

export function Subscriptions({ isFocused }) {
  const [subscriptions, setSubscriptions] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  async function loadSubscriptions() {
    setRefreshing(true);
    try {
      const response = await api.get('subscriptions');
      const responseSubscriptions = response.data.map(subscription => {
        const formattedDate = format(
          parseISO(subscription.Meetup.date),
          "dd 'de' MMMM 'de' yyyy', às' HH'h'",
          {
            locale: pt,
          }
        );
        const newMeetup = { ...subscription.Meetup, formattedDate };
        return { ...subscription, Meetup: newMeetup };
      });
      setSubscriptions(responseSubscriptions);
      setRefreshing(false);
    } catch (err) {
      Alert.alert(
        'Loading failed!',
        'There was an error while trying to load your subscriptions'
      );
      setRefreshing(false);
    }
  }
  useEffect(() => {
    loadSubscriptions();
  }, [isFocused]); //eslint-disable-line

  function refresh() {
    loadSubscriptions();
  }
  async function handleUnsubscribe(id) {
    setRefreshing(true);
    try {
      await api.delete(`subscriptions/${id}`);
      ToastAndroid.showWithGravity(
        'Unsubscribed from meetup',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
      const newSubscriptions = subscriptions.filter(
        subscription => subscription.id !== id
      );
      setSubscriptions(newSubscriptions);
      setRefreshing(false);
    } catch (err) {
      Alert.alert(
        'Unsubscribe error',
        'There was an error while trying to unsubscribe from meetup'
      );
      setRefreshing(false);
    }
  }
  return (
    <Background>
      <Header />
      <Container>
        <MeetupsList
          ListEmptyComponent={() =>
            !refreshing && <EmptyListText>No subscriptions found</EmptyListText>
          }
          onRefresh={refresh}
          refreshing={refreshing}
          data={subscriptions}
          keyExtractor={subscription => String(subscription.id)}
          renderItem={({ item: subscription }) => (
            <MeetupCard
              canUnsubscribe
              meetup={subscription.Meetup}
              onUnsubscribe={() => handleUnsubscribe(subscription.id)}
            />
          )}
        />
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
Subscriptions.propTypes = {
  isFocused: PropTypes.bool.isRequired,
};

export default withNavigationFocus(Subscriptions);
