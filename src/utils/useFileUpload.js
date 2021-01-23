import { useReducer } from 'react';
import { Alert, Platform } from 'react-native';
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';
import ImagePicker from 'react-native-image-picker';
import { lookup } from 'react-native-mime-types';

import { FILE_UPLOAD_MAX_SIZE } from 'eoffice/constants/common';
import axios from '../store/axios';
import config from '../config';

const selectFile = isImageOnly =>
  new Promise((resolve, reject) => {
    if (Platform.OS === 'ios' && isImageOnly) {
      return ImagePicker.showImagePicker(
        {
          allowsEditing: true,
          title: 'Chọn ảnh',
        },
        res => {
          if (res.uri) {
            if (!res.fileName) {
              let fileName = res.uri.substring(res.uri.lastIndexOf('/'))
              res.fileName = fileName
            }
            resolve(res);
          } else {
            reject();
          }
        }
      );
    }

    return DocumentPicker.show(
      {
        filetype: [DocumentPickerUtil.allFiles()],
      },
      (err, res) => {
        if (err) {
          reject(err);
        } else {
          if (res.fileSize && res.fileSize / 1024 > FILE_UPLOAD_MAX_SIZE * 1024) {
            Alert.alert('Thông báo', `File tải lên không quá ${FILE_UPLOAD_MAX_SIZE}MB`, [
              { text: 'Đóng', style: 'destructive' },
            ]);
            reject();
          }
          resolve(res);
        }
      }
    );
  });

const uploadFile = async (file, additionalFields) => {
  // eslint-disable-next-line no-undef
  const data = new FormData();

  data.append('file', {
    name: file.fileName,
    type: lookup(file.fileName),
    uri: Platform.OS === 'android' ? file.uri : file.uri.replace('file://', ''),
  });

  Object.keys(additionalFields).forEach(key => {
    data.append(key, additionalFields[key]);
  });

  const res = await axios.post(`${config.baseUrl}attachment/uploadFile`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return res.data;
};

const initialState = {
  files: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'add': {
      const newState = { ...state };
      newState.files.push(action.payload.attachment);
      return newState;
    }

    case 'remove':
      return {
        ...state,
        files: state.files.filter(file => file.id !== action.payload),
      };

    case 'reset':
      return {
        files: [],
        loading: false,
      };

    case 'setLoading':
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};

export default function(additionalData = {}) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const actions = {
    upload: async isImageOnly => {
      let res;
      try {
        res = await selectFile(isImageOnly);
      } catch (e) {
        return;
      }

      try {
        dispatch({ type: 'setLoading', payload: true });
        const attachment = await uploadFile(res, additionalData);
        await dispatch({ type: 'add', payload: {attachment} });
      } catch (err) {
        let message = 'Tải file lên thất bại';
        if (
          err.response?.data?.exception === 'org.springframework.web.multipart.MultipartException'
        ) {
          message = 'Chỉ tải lên file có dung lượng tối đa 5MB';
        }
        Alert.alert('Thông báo', message, [{ text: 'Đóng', style: 'destructive' }]);
      } finally {
        dispatch({ type: 'setLoading', payload: false });
      }
      return res
    },
    remove(id) {
      dispatch({ type: 'remove', payload: id });
    },
    reset() {
      dispatch({ type: 'reset' });
    },
  };

  return [state, actions];
}
