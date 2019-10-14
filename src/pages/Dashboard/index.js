import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ToastAndroid } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Background from '~/components/Background';
import Header from '~/components/Header';
import DateSelector from '~/components/DateSelector';
import api from '~/services/api';

import {
  Container,
  MeetupsList,
  Meetup,
  Title,
  EmptyListText,
  Banner,
  MeetupInfo,
  InfoText,
  InfoTextLine,
  InfoIcon,
  SubscribeButton,
} from './styles';

export default function Dashboard() {
  const [meetups, setMeetups] = useState([]);
  const [date, setDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [listEnded, setListEnded] = useState(false);

  async function loadMeetups() {
    setLoading(true);
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
        console.tron.log(merged);
        setMeetups(merged);
      } else {
        setListEnded(true);
      }
    } catch (err) {
      ToastAndroid.showWithGravity(
        'There was an error while fetching the meetups.',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
    }
    setLoading(false);
  }
  useEffect(() => {
    setListEnded(false);
    setPage(1);
    loadMeetups();
  }, [date]);// eslint-disable-line

  async function loadMore() {
    if (!listEnded && !refreshing && !loading) {
      console.tron.log('loading more');
      setPage(page + 1);
      setRefreshing(true);
      loadMeetups();
    }
  }

  function refresh() {
    console.tron.log('refreshing');
    setPage(1);
    loadMeetups();
  }

  return (
    <Background>
      <Header />
      <DateSelector enabled={!loading} onChange={setDate} date={date} />
      <Container>
        <MeetupsList
          onEndReachedThreshold={0.2}
          ListEmptyComponent={() => (
            <EmptyListText>No meetups found</EmptyListText>
          )}
          FooterComponent={() => <ActivityIndicator color="#fff" size={25} />}
          onEndReached={loadMore}
          onRefresh={refresh}
          refreshing={refreshing}
          data={meetups}
          initialNumToRender={10}
          keyExtractor={meetup => String(meetup.id)}
          renderItem={({ item: meetup }) => (
            <Meetup>
              <Banner source={{ uri: meetup.url }} />
              <MeetupInfo>
                <Title>{meetup.title}</Title>
                <InfoTextLine>
                  <InfoIcon size={14} color="#999" name="event" />
                  <InfoText>{meetup.formattedDate}</InfoText>
                </InfoTextLine>
                <InfoTextLine>
                  <InfoIcon size={14} color="#999" name="place" />
                  <InfoText>{meetup.localization}</InfoText>
                </InfoTextLine>
                <InfoTextLine>
                  <InfoIcon size={14} color="#999" name="person" />
                  <InfoText>
                    Organizer: {meetup.User ? meetup.User.name : ''}
                  </InfoText>
                </InfoTextLine>
                <SubscribeButton onPress={() => {}}>Subscribe</SubscribeButton>
              </MeetupInfo>
            </Meetup>
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
