/* global FormData */
import base64 from 'react-native-base64';
import { Platform } from 'react-native';
import config from 'eoffice/config.json';
import Axios from 'axios';
import axios from '../axios';
import { POSITION_NAME, STATUS } from '../../constants/documents';
import DeviceInfo from "react-native-device-info";
import RNFetchBlob from 'rn-fetch-blob'

export const login = ({ username, password }) => {

  const encoded = base64.encode(`${config.sso.clientId}:${config.sso.clientPass}`);
  const data = new FormData();
  data.append('username', username);
  data.append('password', password);
  return axios
    .post('/auth', data, {
      baseURL: config.sso.url,
      headers: {
        Authorization: `Basic ${encoded}`,
        'Content-Type': 'application/json',
      },
    })
    .then(res => {
      console.log(res)
      if (res.data.error) {
        throw new Error(res.data.error);
      }
      return res.data.id_token;
    })
    .catch(e => console.log(e));
};
// export async function  login({ username, password }) {
//   console.log("Login")
//   const encoded = base64.encode(`${config.sso.clientId}:${config.sso.clientPass}`);
// const res = await RNFetchBlob.config({
//   trusty: true,
// })
//   .fetch(
//     "POST",
//     `https://office.adfilex.vn/sso/auth`,
//     {
//       "Content-Type": "multipart/form-data",
//       Authorization: `Basic ${encoded}`,
//     },
//     [
//       { name: "username", data: "haptt" },
//       { name: "password", data: "haptt" },
//     ]
//   )
//   .then((ress) => {
//     console.log(ress)
//     return ress;
//   })
//   .catch((error) => {
//     console.log(error)
//     return error;
//   });
//   return res.json();
// }
export const checkVersion = async () => {
  const platform = Platform.OS === 'ios' ? 'ios' : 'android';
  const currentVersion = config.version[platform];
  const res = await axios.post(
    `/changeLog/${platform}?version=${currentVersion}`
  )
  return res.data;
}

export const generateOTP = async () => {
  await axios.post('/otp/generateOTP');
};

export const validateOTP = async ({ otp }) => {
  const otpToken = await axios
    .post('/otp/validateOTP', { otp })
    .then(res => (res.data ? res.data.token : null));
  return { otpToken };
};

export const getMe = async () => {
  const user = await axios.get('/user').then(res => res.data);
  let deptRoles = await axios
    .get('/userDeptRoleView', { params: { userId: user.id } })
    .then(res => {
      return res.data;
    });
  if (!deptRoles || !deptRoles.length) {
    throw new Error('userDeptRoleNotExist');
  }
  deptRoles = deptRoles.filter(
    deptRole =>
      deptRole.positionName !== POSITION_NAME.ADMIN &&
      deptRole.positionName !== POSITION_NAME.VAN_THU &&
      deptRole.status === STATUS.ACTIVE
  );
  return {
    ...user,
    deptRoles,
  };
};
export const getMe1 = token => {
  const instance = Axios.create({
    baseURL: `${config.baseUrl}`,
    timeout: 20000,
    headers: { Authorization: `Bearer ${token}` },
  });
  return instance.get(`user`);
};

export const getMenuItemConfig = roleId =>
  axios.get(`/menuConfig?status=active&page=0&size=1000&roleId=${roleId}`).then(res => {
    return res.data;
  });

export const getUnseenNotify = () => {
  const params = {
    os: Platform.OS,
    modelCode: DeviceInfo.getDeviceId(),
  }
  return axios.get(`vbNotification/countUnSeenByUser`, { params: params }).then(res => {
    return res.data;
  });
}



export const getUnseenNotifyByRole = () => {
  const params = {
    os: Platform.OS,
    modelCode: DeviceInfo.getDeviceId(),
  }
  return axios.get(`vbNotification/countUnSeen`, { params: params }).then(res => {
    return res.data;
  });
}


export const removeFcmToken = fcmToken =>
  axios.post(`/fcm/removeByToken?fcmToken=${fcmToken}`).then(res => {
    return res.data;
  });

export const insertFcmToken = fcmForm =>
  axios.post(`/fcm`, fcmForm).then(res => {
    return res.data;
  });

export const getMenuConfig = async () => {
  const instance = Axios.create({
    baseURL: `${config.baseUrl}`,
    timeout: 20000,
  });
  return instance.get('/menuConfig/?status=active&page=0&size=1000');
};
