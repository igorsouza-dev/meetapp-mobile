import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import CodePush from 'react-native-code-push';
import OneSignal from 'react-native-onesignal';

import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';

import '~/config/ReactotronConfig';
import { store, persistor } from './store';
import App from './App';

import config from '../config';

class Index extends Component {
  constructor(props) {
    super(props);
    OneSignal.init(config.oneSignalId);
    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);
  }

  componentWillUnmount() {
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('ids', this.onIds);
  }

  onReceived = data => {};

  onOpened = notification => {};

  onIds = id => {};

  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <StatusBar barStyle="light-content" backgroundColor="#22202C" />
          <App />
        </PersistGate>
      </Provider>
    );
  }
}

export default CodePush({
  checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME,
})(Index);
