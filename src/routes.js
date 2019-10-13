import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import SignIn from '~/pages/SignIn';

export default (isSigned = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Sign: createSwitchNavigator({
          SignIn,
        }),
      },
      { initialRouteName: isSigned ? 'App' : 'Sign' }
    )
  );
