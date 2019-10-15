import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Button from '~/components/Button';

export const Meetup = styled.View`
  border-radius: 4px;
  background: #fff;
  margin-bottom: 15px;

  opacity: ${props => (props.past ? 0.8 : 1)};
`;

export const Title = styled.Text`
  font-weight: bold;
  color: #333;
  font-size: 18px;
`;

export const Banner = styled.Image`
  height: 150px;
  background: rgba(0, 0, 0, 0.7);
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
`;

export const MeetupInfo = styled.View`
  padding: 25px;
`;

export const InfoIcon = styled(Icon)``;

export const InfoText = styled.Text`
  margin-top: 10px;
  margin-left: 10px;
  font-size: 14px;
  color: #999;
`;

export const InfoTextLine = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-end;
  text-align: center;
`;

export const SubscribeButton = styled(Button)`
  margin-top: 15px;
  margin-bottom: 5px;
`;

export const UnsubscribeButton = styled(Button)`
  margin-top: 15px;
  margin-bottom: 5px;
  background: #d44059;
`;
