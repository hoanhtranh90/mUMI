import { useState } from 'react';
import { PermissionsAndroid, Platform, Alert } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import FileViewer from 'react-native-file-viewer';
import { lookup } from 'react-native-mime-types';
import md5 from 'md5';
import eConfig from 'eoffice/config';
import axios from '../store/axios';
import { DOWNLOAD_TYPES } from '../constants/common';
import store from '../store/index';
import {
  findTrangKySo,
  findReferenceOutgoingAttachment,
  findVbAttachmentById,
} from '../store/documents/detail/service';

const { config, fs } = RNFetchBlob;
// /secure/
// header: cookies
async function requestPermissions() {
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
}

async function download({
  attachmentId,
  attachmentMetaId,
  fileName,
  mime,
  type,
  documentId,
  page,
  imageStatus,
  isRefere,
  idKySo,
  user,
  isRelationDoc,
  hcCaseCalendarId,
}) {
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
    // fileCache: true,
    path,
    // Android
    addAndroidDownloads: {
      mime,
      path,
      useDownloadManager: true,
      notification: true,
      description: 'Tải file',
      title: fileName,
      mediaScannable: true,
    },
    // IOS
    IOSBackgroundTask: true,
    indicator: true,
  };
  let res = null;

  if (hcCaseCalendarId) {
    // get token
    const token = await axios
      .get('/vbAttachmentToken/getTokenForHcCaseCalendarAttachment', {
        params: { hcCaseCalendarId: hcCaseCalendarId, vbAttachmentId: attachmentId },
      })
      .then(response => response.data.token);
    res = await config(options).fetch(
      'GET',
      `${eConfig.baseUrl}vbAttachmentToken/secure/downloadFileCommon?token=${token}`,
      {
        cookie: idHash,
      }
    );
  } else if (type === DOWNLOAD_TYPES.IMG) {
    if (imageStatus === 'comment') {
      // get token
      const token = await axios
        .get('/vbAttachmentToken/getTokenImage', {
          params: { attachmentMetaId },
        })
        .then(response => response.data.token);
      res = await config(options).fetch(
        'GET',
        `${
          eConfig.baseUrl
        }vbAttachmentToken/secure/downloadFileImage?token=${token}&type=${type}&pageNumber=${page}&imageStatus=comment`,
        {
          cookie: idHash,
        }
      );
    } else if (idKySo) {
      // get token
      const token = await axios
        .get('/vbAttachmentToken/getToken', { params: { vbAttachmentId: idKySo } })
        .then(response => response.data.token);
      res = await config(options).fetch(
        'GET',
        `${eConfig.baseUrl}vbAttachmentToken/secure/downloadFile?token=${token}&type=trangKySo`,
        {
          cookie: idHash,
        }
      );
    } else {
      // get token
      const token = await axios
        .get('/vbAttachmentToken/getToken', { params: { vbAttachmentId: attachmentId } })
        .then(response => response.data.token);
      res = await config(options).fetch(
        'GET',
        `${
          eConfig.baseUrl
        }vbAttachmentToken/secure/downloadFileImage?token=${token}&type=${type}&pageNumber=${page}&imageStatus=original`,
        {
          cookie: idHash,
        }
      );
    }
  } else if (isRefere) {
    const trangRefere = await findReferenceOutgoingAttachment(documentId).then(
      respose => respose.data
    );
    if (trangRefere.id) {
      // get token
      const token = await axios
        .get('/vbAttachmentToken/getTokenForReferenceOutgoingAttachment', {
          params: { vbAttachmentId: trangRefere.id },
        })
        .then(response => response.data.token);
      res = await config(options).fetch(
        'GET',
        `${
          eConfig.baseUrl
        }vbAttachmentToken/secure/downloadFileReferenceOutgoing?token=${token}&type=${type}`,
        {
          cookie: idHash,
        }
      );
    } else {
      // get token
      const token = await axios
        .get('/vbAttachmentToken/getToken', {
          params: { vbAttachmentId: attachmentId },
        })
        .then(response => response.data.token);
      res = await config(options).fetch(
        'GET',
        `${
          eConfig.baseUrl
        }vbAttachmentToken/secure/downloadFileOutgoing?token=${token}&type=${type}`,
        {
          cookie: idHash,
        }
      );
    }
  } else if (isRelationDoc) {
    // get token
    const [token, vbAttachmentId] = await axios
      .get('/vbAttachmentToken/getTokenDocRelation', {
        params: { docRelationId: attachmentId },
      })
      .then(response => [response.data.token, response.data.vbAttachmentId]);
    const vbAttachment = await findVbAttachmentById(vbAttachmentId).then(
      responseAttachment => responseAttachment.data
    );

    const pathRelatedDocs = `${dir}/${Date.now()}_${vbAttachment.fileName}`;
    const optionsRelatedDocs = {
      // fileCache: true,
      path: pathRelatedDocs,
      // Android
      addAndroidDownloads: {
        mime: vbAttachment.contentType,
        path: pathRelatedDocs,
        useDownloadManager: true,
        notification: true,
        description: 'Tải file',
        title: fileName,
        mediaScannable: true,
      },
      // IOS
      IOSBackgroundTask: true,
      indicator: true,
    };
    res = await config(optionsRelatedDocs).fetch(
      'GET',
      `${eConfig.baseUrl}vbAttachmentToken/secure/downloadFile?token=${token}&type=${type}`,
      {
        cookie: idHash,
      }
    );
    res.fileName = vbAttachment.fileName;
    res.contentType = vbAttachment.contentType;
  } else {
    const trangKySo = await findTrangKySo(documentId).then(response => response.data);
    if (trangKySo.id) {
      // get token
      const token = await axios
        .get('/vbAttachmentToken/getToken', {
          params: { vbAttachmentId: attachmentId },
        })
        .then(response => response.data.token);
      res = await config(options).fetch(
        'GET',
        `${
          eConfig.baseUrl
        }vbAttachmentToken/secure/downloadFileOutgoing?token=${token}&type=${type}`,
        {
          cookie: idHash,
        }
      );
    } else {
      // get token
      const token = await axios
        .get('/vbAttachmentToken/getToken', { params: { vbAttachmentId: attachmentId } })
        .then(response => response.data.token);

      res = await config(options).fetch(
        'GET',
        `${eConfig.baseUrl}vbAttachmentToken/secure/downloadFile?token=${token}&type=${type}`,
        {
          cookie: idHash,
        }
      );
    }
  }
  return res;
}

async function downloadforView({ attachmentMetaId, type, page }) {
  if (Platform.OS === 'android') {
    const permitted = await requestPermissions();
    if (!permitted) {
      Alert.alert('Thông báo', 'Không có quyền tải file', [{ text: 'Đóng', style: 'destructive' }]);

      return null;
    }
  }
  let res = null;
  // get token
  const token = await axios
    .get('/vbAttachmentToken/getTokenImage', {
      params: { attachmentMetaId },
    })
    .then(response => response.data.token);
  // res = await config(options).fetch(
  //   'GET',
  //   `${
  //     eConfig.baseUrl
  //   }vbAttachmentToken/secure/downloadFileImage?token=${token}&type=${type}&pageNumber=${page}&imageStatus=comment`,
  //   {
  //     cookie: `IdHash=${md5(`${user.id}${user.userName}`)}`,
  //   }
  // );
  res = `${
    eConfig.baseUrl
  }vbAttachmentToken/downloadFileImage?token=${token}&type=${type}&pageNumber=${page}&imageStatus=comment`;
  return res;
}

export default function useDownload({
  attachmentId,
  fileName,
  open,
  type = DOWNLOAD_TYPES.PDF,
  attachmentMetaId,
  documentId = null,
  user,
}) {
  const [downloading, setDownloading] = useState(false);
  const [downloadingPdf, setDownloadingPdf] = useState(false);
  const [opening, setOpening] = useState(false);
  const [openingPdf, setOpeningPdf] = useState(false);

  const startDownloadPdf = async () => {
    if (!attachmentId || !fileName) {
      Alert.alert('Thông báo', 'Không có văn bản', [{ text: 'Đóng', style: 'destructive' }]);
      return;
    }
    setDownloadingPdf(true);
    try {
      let name = fileName.replace(/\.[^/.]+$/, '.pdf');
      if (name.indexOf('.pdf') < 0) {
        name = name + '.pdf';
      }
      const mime = 'application/pdf';
      const res = await download({
        attachmentId,
        fileName: name,
        mime,
        type: DOWNLOAD_TYPES.PDF,
        user,
        documentId,
      });
      setDownloadingPdf(false);
      if (open) {
        setOpeningPdf(true);
        const localPath = res.path();
        if (Platform.OS === 'ios') {
          FileViewer.open(localPath);
          await new Promise(resolve => {
            setTimeout(() => {
              setOpeningPdf(false);
              resolve();
            }, 500);
          });
        } else if (Platform.OS === 'android') {
          await FileViewer.open(localPath)
            .then(() => {
              setOpeningPdf(true);
            })
            .catch(() => {
              Alert.alert('Thông báo', 'Tải file thành công!', [
                { text: 'Đóng', style: 'destructive' },
              ]);
            });
        }
      }
    } catch (e) {
      Alert.alert('Thông báo', 'Tải file không thành công!', [
        { text: 'Đóng', style: 'destructive' },
      ]);
    } finally {
      setOpeningPdf(false);
      setDownloadingPdf(false);
    }
  };

  const startDownloadHcCalendar = async (hcCaseCalendarId, attachment) => {
    let attachmentId = attachment?.id;
    let fileName = attachment?.fileName;

    if (!attachmentId || !fileName) {
      Alert.alert('Thông báo', 'Không có tài liệu', [{ text: 'Đóng', style: 'destructive' }]);
      return;
    }
    setDownloadingPdf(true);
    try {
      const mime = attachment.contentType;
      const res = await download({
        attachmentId,
        fileName: fileName,
        mime,
        type: DOWNLOAD_TYPES.PDF,
        user,
        hcCaseCalendarId,
      });
      setDownloadingPdf(false);
      const localPath = res.path();
      setOpening(true);
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
            setOpening(false);
          })
          .catch(() => {
            Alert.alert('Thông báo', 'Tải file thành công!', [
              { text: 'Đóng', style: 'destructive' },
            ]);
          });
      }
    } catch (e) {
      if (e.request.status === 403) {
        Alert.alert('Thông báo', 'Không có quyền tải file!', [
          { text: 'Đóng', style: 'destructive' },
        ]);
      } else
        Alert.alert('Thông báo', 'Tải file không thành công!', [
          { text: 'Đóng', style: 'destructive' },
        ]);
    } finally {
      setOpening(false);
      setDownloadingPdf(false);
    }
  };

  const startDownload = async (idx, numPages, imageStatus, idKySo) => {
    let response = {};
    if (DOWNLOAD_TYPES.IMG === type) {
      if (!attachmentId || !fileName) {
        Alert.alert('Thông báo', 'Không có văn bản', [{ text: 'Đóng', style: 'destructive' }]);
        return;
      }
      setDownloading(true);
      try {
        const nameOfFile = `${attachmentId}-Trang${idKySo ? 'KySo' : idx}`;
        const name = `${nameOfFile}.png`;
        const mime = 'image/png';
        let res = null;
        if (type === DOWNLOAD_TYPES.IMG && imageStatus === 'comment') {
          res = await downloadforView({
            attachmentId,
            attachmentMetaId,
            fileName: name,
            mime,
            type,
            page: idx - 1,
            imageStatus,
            user,
          });
        } else {
          res = await download({
            attachmentId,
            attachmentMetaId,
            fileName: name,
            user,
            mime,
            type,
            page: idx - 1,
            imageStatus,
            idKySo,
          });
        }

        if (numPages === idx) setDownloading(false);

        if (open) {
          setOpening(true);
          let localPath = null;
          if (type === DOWNLOAD_TYPES.IMG && imageStatus === 'comment') {
            localPath = res;
          } else {
            localPath = res.path();
          }

          response = {
            id: idx,
            url: localPath,
            fileName: nameOfFile,
            vbAttachmentId: attachmentId,
            edited: false,
            opened: false,
          };

          // eslint-disable-next-line consistent-return
          return response;
        }
      } catch (e) {
        Alert.alert('Thông báo', 'Tải file không thành công!', [
          { text: 'Đóng', style: 'destructive' },
        ]);
      } finally {
        setOpening(false);
        if (attachmentMetaId && numPages === idx) setDownloading(false);
      }
    } else {
      if (!attachmentId || !fileName) {
        Alert.alert('Thông báo', 'Không có văn bản', [{ text: 'Đóng', style: 'destructive' }]);
        return;
      }
      setDownloading(true);
      try {
        let name = type === DOWNLOAD_TYPES.PDF ? fileName.replace(/\.[^/.]+$/, '.pdf') : fileName;
        if (type === DOWNLOAD_TYPES.PDF) {
          if (name.indexOf('.pdf') < 0) {
            name = name + '.pdf';
          }
        }
        const mime = type === DOWNLOAD_TYPES.PDF ? 'application/pdf' : lookup(name);
        const res = await download({ attachmentId, fileName: name, mime, type, user, documentId });
        setDownloading(false);
        if (open) {
          setOpening(true);
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
                Alert.alert('Thông báo', 'Tải file thành công!', [
                  { text: 'Đóng', style: 'destructive' },
                ]);
              });
          }
        }
      } catch (e) {
        Alert.alert('Thông báo', 'Tải file không thành công!', [
          { text: 'Đóng', style: 'destructive' },
        ]);
      } finally {
        setOpening(false);
        setDownloading(false);
      }
    }
  };

  const startDownloadRefere = async () => {
    if (!attachmentId || !fileName) {
      return;
    }
    setDownloading(true);
    try {
      const name = type === DOWNLOAD_TYPES.PDF ? fileName.replace(/\.[^/.]+$/, '.pdf') : fileName;
      const mime = type === DOWNLOAD_TYPES.PDF ? 'application/pdf' : lookup(name);
      const res = await download({
        attachmentId,
        fileName: name,
        mime,
        type,
        documentId,
        isRefere: true,
        user,
      });
      setDownloading(false);

      if (open) {
        setOpening(true);
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
              Alert.alert('Thông báo', 'Tải file thành công!', [
                { text: 'Đóng', style: 'destructive' },
              ]);
            });
        }
      }
    } catch (e) {
      Alert.alert('Thông báo', 'Tải file không thành công!', [
        { text: 'Đóng', style: 'destructive' },
      ]);
    } finally {
      setOpening(false);
      setDownloading(false);
    }
  };

  const startDownloadRelationDoc = async () => {
    if (!attachmentId || !fileName) {
      return;
    }
    setDownloading(true);
    let name = `${fileName}.pdf`;
    // const mime = type === DOWNLOAD_TYPES.PDF ? 'application/pdf' : lookup(name);
    let mime = 'application/pdf';
    try {
      const res = await download({
        attachmentId,
        fileName: name,
        mime,
        type,
        documentId,
        isRelationDoc: true,
        user,
      });

      name = res.fileName;
      mime = res.contentType;
      setDownloading(false);

      if (open) {
        setOpening(true);
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
              Alert.alert('Thông báo', 'Tải file thành công!', [
                { text: 'Đóng', style: 'destructive' },
              ]);
            });
        }
      }
    } catch (e) {
      Alert.alert('Thông báo', 'Tải file không thành công!', [
        { text: 'Đóng', style: 'destructive' },
      ]);
    } finally {
      setOpening(false);
      setDownloading(false);
    }
  };

  return [
    { downloading, opening, downloadingPdf },
    startDownload,
    startDownloadPdf,
    startDownloadRefere,
    startDownloadRelationDoc,
    startDownloadHcCalendar,
  ];
}
