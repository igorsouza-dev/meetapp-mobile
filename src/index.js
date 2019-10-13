import React from 'react';
import { StatusBar } from 'react-native';
import '~/config/ReactotronConfig';
import App from './App';

export default function Index() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#22202C" />
      <App />
    </>
  );
}
