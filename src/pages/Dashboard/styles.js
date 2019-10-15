import styled from 'styled-components/native';

export const Container = styled.View`
  padding: 30px;

  justify-content: center;
  align-items: center;
  align-self: stretch;
`;

export const MeetupsList = styled.FlatList`
  align-self: stretch;
  margin-bottom: 100px;
`;

export const EmptyListText = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #fff;
  text-align: center;
  align-self: center;
`;
