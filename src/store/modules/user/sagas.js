import { takeLatest, all, put, call } from 'redux-saga/effects';
import { Alert, ToastAndroid } from 'react-native';

import api from '~/services/api';

import { updateProfileSuccess, updateProfileFailure } from './actions';

export function* updateProfile({ payload }) {
  const { name, email, ...rest } = payload.data;
  const profile = {
    name,
    email,
    ...(rest.oldPassword ? rest : {}),
  };
  try {
    const response = yield call(api.put, 'users', profile);
    ToastAndroid.show('Profile updated successfully!', ToastAndroid.SHORT);
    yield put(updateProfileSuccess(response.data));
  } catch (err) {
    let { message } = err;
    if (err.response) {
      if (err.response.data) {
        if (err.response.data.error) {
          message = err.response.data.error;
        }
      }
    }
    Alert.alert(
      '',
      `There was an error while updating your profile: ${message}`
    );
    yield put(updateProfileFailure());
  }
}

export default all([takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile)]);
