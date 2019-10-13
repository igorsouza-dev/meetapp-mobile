import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
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

  useEffect(() => {
    async function loadMeetups() {
      setLoading(true);
      const response = await api.get('meetups', {
        params: {
          date,
        },
      });
      setLoading(false);
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
      setMeetups(responseMeetups);
    }
    loadMeetups();
  }, [date]);

  async function loadMore() {
    setPage(page + 1);
    setRefreshing(true);
    const response = await api.get('meetups', {
      params: {
        date,
        page,
      },
    });
    setRefreshing(false);
    if (response.data) {
      setMeetups([...meetups, response.data]);
    }
  }

  function refresh() {
    setPage(1);
  }

  return (
    <Background>
      <Header />
      <DateSelector enabled={!loading} onChange={setDate} date={date} />
      <Container>
        {loading && <ActivityIndicator color="#fff" size={25} />}
        {!loading && (
          <MeetupsList
            onEndReachedThreshold={0.2}
            ListEmptyComponent={() => (
              <EmptyListText>No meetups found</EmptyListText>
            )}
            onEndReached={loadMore}
            onRefresh={refresh}
            refreshing={refreshing}
            data={meetups}
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
                  <SubscribeButton onPress={() => {}}>
                    Subscribe
                  </SubscribeButton>
                </MeetupInfo>
              </Meetup>
            )}
          />
        )}
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
