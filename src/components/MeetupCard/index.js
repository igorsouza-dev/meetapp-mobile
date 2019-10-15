import React from 'react';

import {
  Meetup,
  Title,
  Banner,
  MeetupInfo,
  InfoIcon,
  InfoText,
  InfoTextLine,
  SubscribeButton,
  UnsubscribeButton,
} from './styles';

export default function MeetupCard({
  meetup,
  onSubscribe,
  onUnsubscribe,
  canSubscribe,
  canUnsubscribe,
}) {
  return (
    <Meetup past={meetup.past}>
      <Banner source={{ uri: meetup.File ? meetup.File.url : '' }} />
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
          <InfoText>Organizer: {meetup.User ? meetup.User.name : ''}</InfoText>
        </InfoTextLine>
        {!meetup.past && canSubscribe && (
          <SubscribeButton onPress={() => onSubscribe(meetup.id)}>
            Subscribe
          </SubscribeButton>
        )}
        {!meetup.past && canUnsubscribe && (
          <UnsubscribeButton onPress={() => onUnsubscribe(meetup.id)}>
            Unsubscribe
          </UnsubscribeButton>
        )}
      </MeetupInfo>
    </Meetup>
  );
}
