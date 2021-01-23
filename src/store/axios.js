import _ from 'lodash';
import axios from 'axios';
import qs from 'qs';
import { Alert } from 'react-native';

import config from 'eoffice/config';
import { selectors } from './app';
import store from './index';

const alert = _.debounce(
  () => Alert.alert('Thông báo', `Mất kết nối mạng`, [{ text: 'Đóng', style: 'destructive' }]),
  3000,
  { leading: true, trailing: false }
);

const instance = axios.create({
  baseURL: config.baseUrl,
  paramsSerializer: params => qs.stringify(params, { arrayFormat: 'repeat' }),
  timeout: 300000,
});

instance.interceptors.response.use(
  res => res,
  error => {
    const state = store.getState();
    const isOnline = selectors.isOnlineSelector(state);

    if (error.message === 'Network Error' || !isOnline) {
      alert();
    }

    if (isOnline) {
      return Promise.reject(error);
    }

    return Promise.reject(new Error('Mất kết nối mạng'));
  }
);

export function setHeaders(headerConfig) {
  const newHeaders = {
    ...instance.defaults.headers.common,
    ...headerConfig,
  };

  instance.defaults.headers.common = _.pickBy(newHeaders, val => !!val);
}

export default instance;
