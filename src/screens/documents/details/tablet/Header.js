import React, { useState } from 'react';
import { StyleSheet, Alert, Image } from 'react-native';
import PropTypes from 'prop-types';
import useDownload from 'eoffice/utils/useDownload';
import { Button, Title, View, Icon, Text, Spinner } from 'native-base';
import IconButton from 'eoffice/components/IconButton';
import DeviceInfo from 'react-native-device-info';
import Modal from 'react-native-modal';
import colors from 'eoffice/utils/colors';
import variables from 'eoffice/native-base-theme/variables/commonColor';
import { DOCUMENT_TYPE, OUTGOING_DOC_STATUS } from '../../../../constants/documents';
import * as DocumentNavigation from '../../../../utils/DocumentNavigation';
import useModal from '../../../../utils/useModal';
import EditDocumentModal from '../common/tablet/EditDocumentModal';
import { DOWNLOAD_TYPES } from '../../../../constants/common';
import { findTrangKySo } from '../../../../store/documents/detail/service';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 94,
    paddingTop: 15,
    backgroundColor: '#f8f9fd',
    paddingLeft: 18,
    paddingRight: 25,
  },
  iconBtn: {
    borderWidth: 0,
    borderColor: '#f8f9fd',
  },
  modal: {
    width: variables.deviceWidth * 0.95,
    height: variables.deviceHeight * 0.95,
    marginHorizontal: variables.deviceWidth * 0.025,
    marginVertical: variables.deviceHeight * 0.025,
  },
  title: {
    color: '#2d3e4f',
    paddingRight: 20,
    fontSize: 16,
  },
  btnView: { backgroundColor: colors.blue, borderRadius: 4, height: 42, width: 200 },
  btnEdit: {
    backgroundColor: colors.blue,
    borderRadius: 4,
    height: 42,
    width: 200,
    marginLeft: 20,
  },
  btnText: { fontSize: 15, fontWeight: 'bold', flex: 1, textAlign: 'center' },
  btnIcon: {
    position: 'absolute',
    right: 0,
    fontSize: 24,
    marginHorizontal: 16,
    paddingTop: 0,
  },
  txtListPage: {
    marginTop: 6,
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 12,
    borderColor: '#efeff4',
    borderWidth: 1,
    borderRadius: 10,
    textAlign: 'center',
  },
  imgListPage: { width: 150, height: 100, borderColor: '#efeff4', borderWidth: 2 },
});

const HeaderTab = ({
  user,
  document,
  mode,
  pagesNumberOfDoc,
  resetDocuments,
  canTuChoi,
  deptRole,
}) => {
  if (!document) {
    return null;
  }

  const [isVisible, open, close] = useModal();
  const [imgArrs, setImgArrs] = useState([]);
  const [imgArrsDefault, setImgArrsDefault] = useState([]);

  const [downloadState, startDownload, startDownloadPdf, startDownloadRefere] = useDownload({
    attachmentId: document?.file?.id,
    fileName: document?.file?.fileName,
    open: true,
    user,
    documentId:
      (mode === DOCUMENT_TYPE.VB_DI &&
        deptRole?.userId === document?.editorId &&
        document?.status === OUTGOING_DOC_STATUS.TU_CHOI) ||
      (mode === DOCUMENT_TYPE.VB_DI &&
        deptRole?.userId === document?.editorId &&
        document?.status === OUTGOING_DOC_STATUS.TU_CHOI_BANHANH)
        ? null
        : document?.id,
    type:
      canTuChoi &&
      mode === DOCUMENT_TYPE.VB_DI &&
      document.status === OUTGOING_DOC_STATUS.DANG_XU_LI &&
      DeviceInfo.isTablet() &&
      pagesNumberOfDoc !== null
        ? DOWNLOAD_TYPES.IMG
        : DOWNLOAD_TYPES.PDF,
  });

  const getImgs = numPages => {
    findTrangKySo(document?.id).then(response => {
      let idx = 0;
      const arrImg = [];
      const arrAfter = [];
      if (response.data?.id) {
        arrImg.push('KySo');
      }
      for (let i = 0; i < numPages; i += 1) {
        arrImg.push(i);
      }
      if (arrImg.length > 0) {
        arrImg.forEach(async page => {
          if (page === 'KySo') {
            const resEle = await startDownload(0, arrImg.length, 'original', response.data?.id);
            idx += 1;
            arrAfter.push(resEle);
          } else {
            const resEle = await startDownload(page + 1, arrImg.length, 'original');
            idx += 1;
            arrAfter.push(resEle);
          }
          if (idx === arrImg.length) {
            const arrImgs = arrAfter;
            arrImgs.sort((a, b) => a.id - b.id);
            // Promise get width height of image
            const fn = item =>
              // sample async action
              new Promise(resolve =>
                Image.getSize(item.url, (width, height) => {
                  resolve({ width, height });
                })
              );
            Promise.all(arrImgs.map(fn)).then(data => {
              data.forEach((item, index) => {
                arrImgs[index].sizeImage = item;
                setImgArrs(arrImgs);
                setImgArrsDefault(arrImgs);
                setTimeout(() => {
                  open();
                }, 500);
              });
            });
          }
        });
      } else {
        Alert.alert('Thông báo', 'Không có văn bản', [{ text: 'Đóng', style: 'destructive' }]);
      }
    });
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <IconButton
          icon="arrow-left"
          iconStyle={{ color: colors.gray }}
          style={styles.iconBtn}
          onPress={() => {
            global.hasDeeplink = null;
            console.log('GO BACK mode ' + mode + '-------- document ' + document.status);
            if (mode === DOCUMENT_TYPE.VB_DEN) {
              DocumentNavigation.goToSummary(DOCUMENT_TYPE.VB_DEN);
              resetDocuments();
              DocumentNavigation.goToVbDenCxl();
            } else if (document.status === OUTGOING_DOC_STATUS.DA_BAN_HANH) {
              DocumentNavigation.goToSummary(DOCUMENT_TYPE.VB_DI);
              resetDocuments();
              DocumentNavigation.goToVbPhatHanh();
            } else {
              DocumentNavigation.goToSummary(DOCUMENT_TYPE.VB_DI);
              resetDocuments();
              DocumentNavigation.goToDuThaoCxl();
            }
          }}
        />
      </View>
      <View style={{ flex: 7, justifyContent: 'center', alignItems: 'baseline' }}>
        <Title style={styles.title}>{document?.quote}</Title>
      </View>
      <View style={{ justifyContent: 'center' }}>
        {document?.file?.id !== undefined && (
          <Button
            style={styles.btnView}
            onPress={() => {
              setImgArrs([]);
              setImgArrsDefault([]);
              if (
                mode === DOCUMENT_TYPE.VB_DI &&
                document.status === OUTGOING_DOC_STATUS.DA_BAN_HANH
              ) {
                startDownloadRefere();
              } else {
                startDownloadPdf();
              }
            }}
            disabled={downloadState.downloadingPdf || downloadState.setOpeningPdf}
          >
            <Text style={styles.btnText} uppercase={false}>
              {downloadState.downloadingPdf && 'Tải văn bản'}
              {downloadState.setOpeningPdf && 'Mở văn bản'}
              {!downloadState.downloadingPdf && !downloadState.setOpeningPdf && 'Xem văn bản'}
            </Text>
            {!downloadState.downloadingPdf && <Icon name="eye" style={styles.btnIcon} />}
            {downloadState.downloadingPdf && (
              <Spinner size="small" style={styles.btnIcon} color="white" />
            )}
          </Button>
        )}
      </View>
      <View style={{ justifyContent: 'center' }}>
        {/*{mode === DOCUMENT_TYPE.VB_DI && pagesNumberOfDoc === null && (*/}
        {/*  <Button*/}
        {/*    block*/}
        {/*    style={styles.btn}*/}
        {/*    onPress={() => {*/}
        {/*      setImgArrs([]);*/}
        {/*      setImgArrsDefault([]);*/}
        {/*      startDownload();*/}
        {/*    }}*/}
        {/*    disabled={downloadState.downloading || downloadState.opening}*/}
        {/*  >*/}
        {/*    <Text style={styles.btnText} uppercase={false}>*/}
        {/*      {downloadState.downloading && 'Đang tải văn bản'}*/}
        {/*      {downloadState.opening && 'Đang mở văn bản'}*/}
        {/*      {!downloadState.downloading && !downloadState.opening && 'Xem trước văn bản'}*/}
        {/*    </Text>*/}
        {/*    {!downloadState.downloading && <Icon name="eye" style={styles.btnIcon} />}*/}
        {/*    {downloadState.downloading && (*/}
        {/*      <Spinner size="small" style={styles.btnIcon} color="white" />*/}
        {/*    )}*/}
        {/*  </Button>*/}
        {/*)}*/}
        {imgArrs.length < pagesNumberOfDoc &&
          mode === DOCUMENT_TYPE.VB_DI &&
          document.status !==
            OUTGOING_DOC_STATUS.DA_BAN_HANH && (
              <Button
                style={styles.btnEdit}
                onPress={() => {
                  setImgArrs([]);
                  setImgArrsDefault([]);
                  if (canTuChoi) {
                    if (
                      mode === DOCUMENT_TYPE.VB_DI &&
                      document.status === OUTGOING_DOC_STATUS.DANG_XU_LI
                    ) {
                      if (DeviceInfo.isTablet()) {
                        getImgs(pagesNumberOfDoc);
                      } else {
                        startDownload();
                      }
                    } else {
                      startDownload();
                    }
                  } else if (
                    mode === DOCUMENT_TYPE.VB_DI &&
                    document.status === OUTGOING_DOC_STATUS.DA_BAN_HANH
                  ) {
                    startDownloadRefere();
                  } else {
                    startDownload();
                  }
                }}
                disabled={downloadState.downloading || downloadState.opening}
              >
                <Text style={styles.btnText} uppercase={false}>
                  {downloadState.downloading && 'Tải văn bản'}
                  {downloadState.opening && 'Mở văn bản'}
                  {!downloadState.downloading && !downloadState.opening && 'Thêm ghi chú'}
                </Text>
                {!downloadState.downloading && <Icon name="feather" style={styles.btnIcon} />}
                {downloadState.downloading && (
                  <Spinner size="small" style={styles.btnIcon} color="white" />
                )}
              </Button>
            )}
        {imgArrs.length >= pagesNumberOfDoc &&
          mode === DOCUMENT_TYPE.VB_DI &&
          pagesNumberOfDoc !== null && (
            <Button
              block
              style={styles.btnEdit}
              onPress={() => {
                open();
              }}
            >
              <Text style={styles.btnText} uppercase={false}>
                Thêm ghi chú
              </Text>
              <Icon name="feather" style={styles.btnIcon} />
            </Button>
          )}
      </View>
      {imgArrs.length > 0 && (
        <Modal isVisible={isVisible} onBackButtonPress={close} style={styles.modal}>
          <EditDocumentModal
            closeModal={close}
            documentId={document?.id}
            listImgs={[...imgArrs]}
            listImgDefault={[...imgArrsDefault]}
          />
        </Modal>
      )}
    </View>
  );
};

HeaderTab.propTypes = {
  document: PropTypes.shape({}),
  mode: PropTypes.number.isRequired,
  pagesNumberOfDoc: PropTypes.number,
  resetDocuments: PropTypes.func.isRequired,
  canTuChoi: PropTypes.bool,
  deptRole: PropTypes.shape({}),
  user: PropTypes.shape({}).isRequired,
};
HeaderTab.defaultProps = {
  deptRole: null,
  canTuChoi: true,
  document: null,
  pagesNumberOfDoc: 0,
};

export default HeaderTab;
