import AsyncStorage from '@react-native-community/async-storage';
import {STATUS_CODE} from "../../../constants/administrative";
const KEY_REQUEST = "LIST_REQUEST";

let listRequest = [
    {
      typeRequest: "An Ninh",
      title: "Điều bảo vệ lãnh đạo TCT",
      content: "Yêu cầu 3 đặc công bảo vệ giám đốc công tác",
      place: "5/82 Duy Tân",
      time: new Date(),
      status: STATUS_CODE.HOANTHANH,
    },
    {
      typeRequest: "Cây xanh",
      title: "Mua cây xanh ủng hộ",
      content: "Mỗi người mua 2 cây",
      place: "5/82 Duy Tân",
      time: new Date(),
      status: STATUS_CODE.HUY,
    },
    {
      typeRequest: "Kỹ thuật",
      title: "Đứt dây mạng",
      content: "Lắp dây mạng tầng 2",
      place: "5/82 Duy Tân",
      time: new Date(),
      status: STATUS_CODE.DANGXULY,
    },
  ];

export const getData = async () =>{
  try {
    const value = listRequest;
    if (value) {
      return listRequest;
    } else {
      // await AsyncStorage.setItem(KEY_REQUEST, JSON.stringify(listRequest));
      return listRequest;
    }
  }catch (e) {
    console.log(e)
  }
}

export const addItem = async item => {
  try {
    const value = await AsyncStorage.getItem(KEY_REQUEST);
    if (value) {
      listRequest = JSON.parse(value);
      listRequest.push(item);
      // await AsyncStorage.setItem(KEY_REQUEST, JSON.stringify(listRequest));
    } else {
      return
    }
  } catch (e) {
    console.log(e)
  }
}
