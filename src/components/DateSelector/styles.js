import styled from 'styled-components/native';

export const Container = styled.View`
  padding: 0 30px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  margin: 15px;
`;

export const Button = styled.TouchableOpacity`
  background: transparent;
  padding: 10px;
  height: 40px;
  width: 40px;

  justify-content: center;
  align-items: center;
`;

export const DateText = styled.Text`
  font-weight: bold;
  color: #fff;
  font-size: 20px;
`;
