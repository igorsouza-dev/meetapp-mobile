import React, { useEffect, useState } from 'react';
import { ToastAndroid, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Background from '~/components/Background';
import Header from '~/components/Header';
import DateSelector from '~/components/DateSelector';
import MeetupCard from '~/components/MeetupCard';

import api from '~/services/api';

import { Container, MeetupsList, EmptyListText } from './styles';

export default function Dashboard() {
  const [meetups, setMeetups] = useState([]);
  const [date, setDate] = useState(new Date());
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [listEnded, setListEnded] = useState(false);

  async function loadMeetups() {
    try {
      const response = await api.get('meetups', {
        params: {
          date,
          page,
        },
      });
      setRefreshing(false);

      const responseMeetups = response.data.map(meetup => {
        const formattedDate = format(
          parseISO(meetup.date),
          "dd 'de' MMMM', às' hh'h'",
          {
            locale: pt,
          }
        );
        return { ...meetup, formattedDate };
      });

      if (page === 1) {
        setMeetups(responseMeetups);
      } else if (responseMeetups.length) {
        const merged = [...meetups, responseMeetups];
        setMeetups(merged);
      } else {
        setListEnded(true);
      }
    } catch (err) {
      ToastAndroid.showWithGravity(
        'There was an error while fetching the meetups.',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
    }
  }
  useEffect(() => {
    setRefreshing(true);
    setListEnded(false);
    setMeetups([]);
    setPage(1);
    loadMeetups();
  }, [date]);// eslint-disable-line

  function loadMore() {
    if (!listEnded && !refreshing && meetups.length >= 2) {
      setRefreshing(true);
      setPage(page + 1);
      loadMeetups();
    }
  }

  function refresh() {
    setPage(1);
    setListEnded(false);
    loadMeetups();
  }
  async function handleSubscribeMeetup(id) {
    setRefreshing(true);
    try {
      await api.post(`subscriptions/${id}`);
      ToastAndroid.showWithGravity(
        'Subscribed successfully',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
      setRefreshing(false);
    } catch (err) {
      let message =
        'There was an error while trying to subscribe to this meetup';
      if (err.response) {
        if (err.response.data) {
          message = err.response.data.error;
        }
      }
      Alert.alert('Subscription failed!', message);
      setRefreshing(false);
    }
  }
  return (
    <Background>
      <Header />
      <DateSelector enabled={!refreshing} onChange={setDate} date={date} />
      <Container>
        <MeetupsList
          onEndReachedThreshold={0.2}
          ListEmptyComponent={() =>
            !refreshing && <EmptyListText>No meetups found</EmptyListText>
          }
          onEndReached={loadMore}
          onRefresh={refresh}
          refreshing={refreshing}
          data={meetups}
          initialNumToRender={10}
          keyExtractor={meetup => String(meetup.id)}
          renderItem={({ item: meetup }) => (
            <MeetupCard
              canSubscribe
              meetup={meetup}
              onSubscribe={handleSubscribeMeetup}
            />
          )}
        />
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
