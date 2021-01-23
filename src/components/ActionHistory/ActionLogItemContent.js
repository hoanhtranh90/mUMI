import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';
import { Text, Icon } from 'native-base';
import Axios from 'axios';
import DeviceInfo from 'react-native-device-info';
import { ACTION_LOGS } from 'eoffice/constants/documents';
import { DOWNLOAD_TYPES } from 'eoffice/constants/common';
import Modal from 'react-native-modal';
import eConfig from 'eoffice/config.json';
import variables from 'eoffice/native-base-theme/variables/commonColor';
import EditDocumentModal from '../../screens/documents/details/common/tablet/EditDocumentModal';
import EditDocumentModalOs from '../../screens/documents/details/common/EditDocumentModalOs';
import useModal from '../../utils/useModal';
import useDownload from '../../utils/useDownload';

const widthS = Dimensions.get('window').width;
const heightS = Dimensions.get('window').height;

const styles = StyleSheet.create({
  touchable: { flexDirection: 'row', paddingTop: 5 },
  icon: { fontSize: 13, color: '#007aff' },
  textTouchable: { fontSize: 13, color: '#007aff' },
  btnIcon: {
    position: 'absolute',
    right: 0,
    fontSize: 24,
    marginHorizontal: 16,
    paddingTop: 0,
  },
  modal: {
    width: variables.deviceWidth * 0.95,
    height: variables.deviceHeight * 0.95,
    marginHorizontal: variables.deviceWidth * 0.025,
    marginVertical: variables.deviceHeight * 0.025,
  },
  modalNotTablet: {
    width: variables.deviceWidth * 0.95,
    height: variables.deviceHeight * 0.95,
    marginHorizontal: 0,
    marginVertical: 0,
  },
});

const ActionLogItemContent = ({ item }) => {
  if (!item.content) {
    return null;
  }

  const [downloadState, startDownload] = useDownload({
    attachmentId: item?.dataJson?.attachmentMetaId,
    attachmentMetaId: item?.dataJson?.attachmentMetaId,
    fileName: item?.actionName,
    open: true,
    type: DOWNLOAD_TYPES.IMG,
  });
  const [isVisible, open, close] = useModal();
  const [imgArrs, setImgArrs] = useState([]);

  const getPage = () => {
    Axios.get(`${eConfig.baseUrl}attachment/getAttachmentMetadataComment`, {
      params: { attachmentMetaId: item?.dataJson?.attachmentMetaId },
    }).then(res => {
      const pagesNumber = res.data.pageSize;
      let idx = 0;
      const arrImg = [];
      const arrAfter = [];
      for (let i = 0; i < pagesNumber; i += 1) {
        arrImg.push(i);
      }
      arrImg.forEach(async page => {
        if (pagesNumber === null) {
          for (let i = 0; i < pagesNumber; i += 1) {
            arrImg.push(i);
          }
        }
        const resEle = await startDownload(page + 1, pagesNumber, 'comment');
        idx += 1;
        arrAfter.push(resEle);
        if (idx === pagesNumber) {
          const arrImgs = arrAfter;
          arrImgs.sort((a, b) => a.id - b.id);
          // Promise get width height of image
          const fn = img =>
            // sample async action
            new Promise(resolve =>
              Image.getSize(
                img.url,
                (width, height) => {
                  // console.log(`The image dimensions are ${width}x${height}`);
                  resolve({ width, height });
                },
                error => {
                  resolve(widthS, heightS);
                }
              )
            );
          Promise.all(arrImgs.map(fn)).then(data => {
            data.forEach((img, index) => {
              arrImgs[index].sizeImage = img;
              setImgArrs(arrImgs);
              setTimeout(() => {
                open();
              }, 200);
            });
          });
        }
      });
    });
  };

  const getImgs = () => {
    getPage();
  };

  return (
    <View style={{ paddingHorizontal: 12, paddingBottom: 12 }}>
      <Text style={{ fontSize: 14, color: '#6a7683', lineHeight: 14 * 1.14 }}>{item.content}</Text>
      {item.actionName === ACTION_LOGS.ACTION_NAMES.TUCHOI_GHICHUVB && (
        <TouchableOpacity
          style={styles.touchable}
          onPress={() => {
            getImgs();
          }}
        >
          <Icon type="Feather" name="file-text" style={styles.icon} />
          <Text style={styles.textTouchable}>Xem ghi chú</Text>
          {downloadState.downloading && (
            <Text style={[styles.textTouchable, { paddingLeft: 8 }]}>Đang tải..</Text>
          )}
        </TouchableOpacity>
      )}
      {item.actionName === ACTION_LOGS.ACTION_NAMES.TUCHOI_GHICHUVB &&
        imgArrs.length > 0 &&
        DeviceInfo.isTablet() && (
          <Modal isVisible={isVisible} onBackButtonPress={close} style={styles.modal}>
            <EditDocumentModal
              closeModal={close}
              listImgs={imgArrs}
              listPageNumberChange={item.dataJson.listPageNumberChange}
            />
          </Modal>
        )}
      {item.actionName === ACTION_LOGS.ACTION_NAMES.TUCHOI_GHICHUVB &&
        imgArrs.length > 0 &&
        !DeviceInfo.isTablet() && (
          <Modal isVisible={isVisible} onBackButtonPress={close} style={styles.modalNotTablet}>
            <EditDocumentModalOs
              closeModal={close}
              listImgs={imgArrs}
              listPageNumberChange={item.dataJson.listPageNumberChange}
            />
          </Modal>
        )}
    </View>
  );
};

ActionLogItemContent.propTypes = {
  item: PropTypes.shape({}),
};
ActionLogItemContent.defaultProps = {
  item: {},
};

export default ActionLogItemContent;
