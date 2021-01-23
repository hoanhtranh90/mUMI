/* eslint-disable no-param-reassign */
import _ from 'lodash';
import { Alert } from 'react-native';
import { Toast } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import NavigationService from '../utils/NavigationService';
import { getErrorMessage } from '../constants/errorMessages';
import { selectors } from './app';
import { ACTION_CODE } from 'eoffice/constants/administrative';
export default ({ actions = {}, process = () => {}, ...options }) => payload => async (
  dispatch,
  getState,
  objDeps
) => {
  const execute = async () => {
    const { startAction, successAction, failedAction } = actions;
    if (_.isFunction(startAction)) {
      dispatch(startAction(payload));
    }
    try {
      const result = await process({ payload, dispatch, getState });
      if (_.isFunction(successAction)) {
        dispatch(successAction({ result, params: payload }));
      }

      let onSuccess;
      if (options && options.onSuccess) {
        ({ onSuccess } = options);
      }
      if (_.isFunction(onSuccess)) {
        onSuccess({ dispatch, getState, params: payload, result, ...objDeps });
      }
      if (options?.successMessage) {
        Toast.show({
          duration: 3000,
          text: options.successMessage,
          type: 'success',
        });
      }

      return result;
    } catch (error) {
      let onError;
      let onOffline;
      if (error.message === 'Network Error') {
        return null;
      }
      if (error.message === 'Mất kết nối mạng') {
        ({ onOffline } = options);
        onOffline();
        return null;
      }
      if (options && options.onError) {
        if (error.request.status === 401) {
          AsyncStorage.removeItem('userToken');
          AsyncStorage.removeItem('otpToken');
          NavigationService.navigate('Auth');
          options.errorMessage = 'Hết phiên làm việc, vui lòng đăng nhập lại!';
        }
        ({ onError } = options);
      }
      if (_.isFunction(onError)) {
        onError();
      }

      // show error message on error
      let customMessage;
      if (error.response?.data) {
        const {
          response: { data },
        } = error;
        if (data.message === 'BusinessErrorException') {
          const { errors } = data;

          if (data.errors[0].errorCode === 'signCA.error') {
            options.errorMessage = 'Ký số không thành công';
          }
          if (_.isFunction(options?.getCustomMessage)) {
            customMessage = options.getCustomMessage({ errors, payload, dispatch, getState });
          } else {
            customMessage = getErrorMessage(errors[0].errorCode);
          }
        }
      } else if (!selectors.isOnlineSelector(getState())) {
        customMessage = 'Mất kết nối mạng';
      }

      Alert.alert('Thông báo', customMessage || options?.errorMessage || 'Lỗi không xác định', [
        { text: 'Đóng', style: 'destructive' },
      ]);

      if (_.isFunction(failedAction)) {
        dispatch(failedAction({ error }));
      }

      return null;
    }
  };

  if (options.requireConfirm) {
    if (Object.values(ACTION_CODE).includes(payload.actionCode)) {
      return buildAlert(getMessage(payload), options.confirmMessage, execute);
    }
    return buildAlert(options.confirmTitle, options.confirmMessage, execute);
  }

  return execute();
};

function buildAlert(title, msg, execute) {
  ``;
  return Alert.alert(title || 'Xác nhận', msg || '', [
    { text: 'Đồng ý', onPress: () => execute(), style: 'default' },
    { text: 'Huỷ', onPress: () => {}, style: 'cancel' },
  ]);
}

function getMessage(payload) {
  switch (payload.actionCode) {
    case ACTION_CODE.PHE_DUYET:
      return `Bạn có muốn phê duyệt yêu cầu ${getNameRequest(payload)}`;
    case ACTION_CODE.TU_CHOI:
      return `Bạn có muốn từ chối yêu cầu ${getNameRequest(payload)}`;
    case ACTION_CODE.CAP_NHAT:
      return `Bạn có muốn cập nhật yêu cầu ${getNameRequest(payload)}`;
    case ACTION_CODE.HUY_YEU_CAU:
      return `Bạn có muốn huỷ yêu cầu ${getNameRequest(payload)}`;
    default:
      return `Bạn có muốn thực hiện yêu cầu ${getNameRequest(payload)}`;
  }
}

function getNameRequest(payload) {
  if (payload.carRequest) {
    return 'đặt xe?';
  } else if (payload.veMayBayRequest) {
    return 'đặt vé máy bay?';
  } else {
    return '';
  }
}
