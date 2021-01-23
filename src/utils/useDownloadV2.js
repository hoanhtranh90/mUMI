import RNFetchBlob from 'rn-fetch-blob';
import { Alert, PermissionsAndroid, Platform } from 'react-native';
import { useState } from 'react';
import eConfig from 'eoffice/config';
import store from '../store/index';
import md5 from 'md5';
import {
  getAttachmentById,
  getTokenForNote,
  getTokenRelationDoc,
  getTokenForHcCommandsDocRelation,
  getTokenFileFlight,
} from '../service/vbAttachmentService';
import FileViewer from 'react-native-file-viewer';

const { config, fs } = RNFetchBlob;

const requestPermissions = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'Cấp quyền cho E-Office',
        message: 'Ứng dụng cần quyền ghi vào bộ nhớ ngoài của thiết bị',
        buttonNeutral: 'Để sau',
        buttonNegative: 'Huỷ',
        buttonPositive: 'Đồng ý',
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }

    return false;
  } catch (e) {
    return false;
  }
};

const getOptionsDownload = async ({ fileName, mime }) => {
  if (Platform.OS === 'android') {
    const permitted = await requestPermissions();
    if (!permitted) {
      Alert.alert('Thông báo', 'Không có quyền tải file', [{ text: 'Đóng', style: 'destructive' }]);
      return null;
    }
  }
  const userInfo = store.getState().auth.me;
  const idHash = `IdHash=${md5(`${userInfo.id}${userInfo.userName}`)}`;
  const timeStamp = Date.now();
  const dir = Platform.OS === 'android' ? fs.dirs.DownloadDir : fs.dirs.DocumentDir;
  fileName = fileName.trim();
  const extensionIndex = fileName.lastIndexOf('.');
  const extension = extensionIndex === -1 ? '' : fileName.substring(extensionIndex);
  fileName = extensionIndex === -1 ? fileName : fileName.substring(0, extensionIndex);
  fileName = fileName.replace(/[\\.\s]/g, '_'); //replace tat ca ky tu (.), ( ) thanh ky tu (_)
  fileName = fileName.replace(/[^a-zA-Z0-9_]/g, ''); //loai bo cac ky tu dac biet khac
  fileName = fileName + extension;
  const path = `${dir}/${timeStamp}_${fileName}`;
  const options = {
    path,
    addAndroidDownloads: {
      mime,
      path,
      useDownloadManager: true,
      notification: true,
      description: 'Tải file',
      title: fileName,
      mediaScannable: true,
    },
    IOSBackgroundTask: true,
    indicator: true,
  };

  return { options, idHash };
};

const getAttachment = attachmentId => getAttachmentById(attachmentId);

const downloadFileCommon = ({ options, idHash, url }) =>
  config(options).fetch('GET', url, {
    cookie: idHash,
  });

const buildPath = (options, type) => {
  let params = [];
  if (options) for (let key in options) params.push(`${key}=${encodeURIComponent(options[key])}`);
  switch (type) {
    case 'note.image':
    case 'flight':
      return `${eConfig.baseUrl}vbAttachmentToken/secure/downloadFileCommon?${params.join('&')}`;
    case 'relationDoc':
      return `${eConfig.baseUrl}vbAttachmentToken/secure/downloadFile?${params.join('&')}`;
    case 'hcCommandsDocRelation':
      return `${
        eConfig.baseUrl
      }vbAttachmentToken/secure/downloadFileForHcCommandsDocRelation?${params.join('&')}`;
    default:
      return `${eConfig.baseUrl}vbAttachmentToken/secure/downloadFileCommon?${params.join('&')}`;
  }
};

const openFile = async (res, setOpening) => {
  const localPath = res.path();
  if (Platform.OS === 'ios') {
    FileViewer.open(localPath);
    await new Promise(resolve => {
      setTimeout(() => {
        setOpening(false);
        resolve();
      }, 500);
    });
  } else if (Platform.OS === 'android') {
    await FileViewer.open(localPath)
      .then(() => {
        setOpening(true);
      })
      .catch(() => {
        Alert.alert('Thông báo', 'Tải file thành công!', [{ text: 'Đóng', style: 'destructive' }]);
      });
  }
};

const useDownloadV2 = ({ isOpen }) => {
  const [downloading, setDownloading] = useState(false);
  const [opening, setOpening] = useState(false);

  const downloadAttachmentForNote = async ({ noteId, attachmentId }) => {
    try {
      const attachment = await getAttachment(attachmentId);
      const options = await getOptionsDownload({
        fileName: attachment.fileName,
        mime: attachment.contentType,
      });
      if (options) {
        setDownloading(true);
        const token = await getTokenForNote({ noteId, attachmentId });
        const url = buildPath({ token, type: 'pdf' }, 'note.image');
        const res = await downloadFileCommon({ ...options, url });
        setDownloading(false);
        return { attachment, res };
      }
      return null;
    } catch (e) {
      return null;
    }
  };

  const downloadFileFlight = async params => {
    try {
      const attachment = await getAttachment(params.vbAttachmentId);
      const options = await getOptionsDownload({
        fileName: attachment.fileName,
        mime: attachment.contentType,
      });
      if (options) {
        setDownloading(true);
        const token = await getTokenFileFlight(params);
        const url = buildPath({ token, type: attachment.fileExtention }, 'flight');
        const res = await downloadFileCommon({ ...options, url });
        setDownloading(false);
        if (isOpen) {
          await openFile(res, setOpening);
        }
      }
      return null;
    } catch (e) {
      return null;
    }
  };

  const downloadRelationDocInTask = async (taskId, docId) => {
    try {
      setDownloading(true);
      const [token, attachmentId] = await getTokenRelationDoc(taskId, docId);
      const attachment = await getAttachment(attachmentId);
      const options = await getOptionsDownload({
        fileName: attachment.fileName,
        mime: attachment.contentType,
      });
      if (options) {
        const url = buildPath({ token, type: 'pdf' }, 'relationDoc');
        const res = await downloadFileCommon({ ...options, url });
        setDownloading(false);
        if (isOpen) {
          await openFile(res, setOpening);
        }
      }
      return null;
    } catch (e) {
      return null;
    }
  };

  const downloadFileForHcCommandsDocRelation = async (
    objectId,
    objectType,
    referenceObjectType,
    referenceObjectId
  ) => {
    try {
      setDownloading(true);
      const { token, vbAttachmentId } = await getTokenForHcCommandsDocRelation(
        objectId,
        objectType,
        referenceObjectType,
        referenceObjectId
      );
      const attachment = await getAttachment(vbAttachmentId);
      const options = await getOptionsDownload({
        fileName: attachment.fileName,
        mime: attachment.contentType,
      });
      if (options) {
        const url = buildPath({ token, referenceObjectType }, 'hcCommandsDocRelation');
        const res = await downloadFileCommon({ ...options, url });
        setDownloading(false);
        if (isOpen) {
          await openFile(res, setOpening);
        }
      }
      return null;
    } catch (e) {
      return null;
    }
  };

  return {
    state: { downloading, opening },
    downloadAttachmentForNote,
    downloadRelationDocInTask,
    downloadFileForHcCommandsDocRelation,
    downloadFileFlight,
  };
};

export default useDownloadV2;
