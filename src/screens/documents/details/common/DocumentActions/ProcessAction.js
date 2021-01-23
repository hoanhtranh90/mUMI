import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

import Fsb from 'eoffice/components/Fsb';
import BottomNoteModal from 'eoffice/components/modals/BottomNoteModal';
import NavigationService from 'eoffice/utils/NavigationService';
import { convertImgToBase64 } from 'eoffice/utils/utils';
import useModal from 'eoffice/utils/useModal';
import Axios from 'axios';
import DeviceInfo from 'react-native-device-info';
import { Button, Text } from 'native-base';
import * as DocumentNavigation from '../../../../../utils/DocumentNavigation';
import eConfig from '../../../../../config.json';
import {
  DOCUMENT_TYPE,
  OUTGOING_DOC_STATUS,
  CATEGORY,
  FLOW_TYPE,
} from '../../../../../constants/documents';
import { Alert } from 'react-native';
import categoryService from '../../../../../service/categoryService';
import departmentService from '../../../../../service/departmentService';
import vbFlowService from '../../../../../service/flowService';

const ProcessAction = ({
  action,
  actionName,
  icon,
  noteRequired,
  label,
  tabletEditDocument,
  documentId,
  onClickTuChoi,
  onSubmitPress,
  listImgs,
  mode,
  step,
  document,
  resetDocuments,
  defaultNote,
  currentUserDeptRole,
  ...restProps
}) => {
  const [loading, setLoading] = useState(false);
  const [defaultComment, setDefaultComment] = useState(null);
  const [isVisible, open, close] = useModal();
  const submit = async (note, attachmentId = null, listPageNumberChange = null) => {
    setLoading(true);
    if (attachmentId !== null) {
      const result = await action({ note, attachmentMetaId: attachmentId, listPageNumberChange });
      if (result) {
        close();
        onSubmitPress();
        setLoading(false);
      } else {
        setLoading(false);
      }
    } else {
      const result = await action({ note });
      if (result) {
        close();
        if (DeviceInfo.isTablet()) {
          if (listImgs && listImgs.length > 0) {
            onSubmitPress();
          } else {
            // DocumentNavigation.goToDuThaoCxl();
            // NavigationService.goBack();

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
          }
        } else {
          NavigationService.goBack();
        }
        setLoading(false);
      } else {
        setLoading(false);
      }
    }
  };

  const initDocType = () => {
    return (document.docTypeCode
      ? Promise.resolve(document.docTypeCode)
      : (document.docTypeId
          ? categoryService.findById(document.docTypeId).then(response => response.data)
          : Promise.resolve(null)
        ).then(docType => (docType ? docType.categoryCode : null))
    ).then(docTypeCode => docTypeCode);
  };

  const loadPublisher = () => {
    return departmentService.findById(document.publisherId).then(response => response.data);
  };

  const loadFlow = () => {
    return vbFlowService.findById(step.flowId).then(response => response.data);
  };

  useEffect(
    () => {
      mode === DOCUMENT_TYPE.VB_DI &&
        document &&
        currentUserDeptRole &&
        step &&
        initDefaultComment();
    },
    [document, step]
  );

  const initDefaultComment = () => {
    Promise.all([initDocType(), loadPublisher(), loadFlow()]).then(
      ([docTypeCode, publisher, flow]) => {
        if (
          flow &&
          flow.flowType !== FLOW_TYPE.DONG_TRINH &&
          publisher.path !== currentUserDeptRole.deptPath &&
          publisher.path.startsWith(currentUserDeptRole.deptPath) &&
          docTypeCode === CATEGORY.CODE.DOC_TYPE.TO_TRINH
        ) {
          setDefaultComment('Đồng ý');
        }
      }
    );
  };

  const beforeSubmit = (note, attachmentId, imageExtractIds, listPageNumberChange) => {
    Axios.post(`${eConfig.baseUrl}attachment/uploadFileComment`, {
      vbAttachmentId: attachmentId,
      imageExtractIds,
    }).then(res => {
      const attachmentMetaId = res.data.id;
      //
      submit(note, attachmentMetaId, listPageNumberChange);
    });
  };

  const uploadBase64Image = (idx, arrsImgUpload, note, attachmentId = '', imageExtractIds) => {
    if (idx === arrsImgUpload.length) {
      const listPageNumberChange = arrsImgUpload.map(item => item.pageNumber - 1);
      beforeSubmit(note, attachmentId, imageExtractIds, listPageNumberChange);
    } else {
      Axios.post(`${eConfig.baseUrl}attachment/uploadImageComment2`, {
        base64: arrsImgUpload[idx].base64,
        vbAttachmentId: arrsImgUpload[idx].vbAttachmentId,
        pageNumber: arrsImgUpload[idx].pageNumber - 1,
        objectType: DOCUMENT_TYPE.VB_DI,
        objectId: documentId,
      }).then(res => {
        imageExtractIds.push(res.data.id);
        // eslint-disable-next-line no-param-reassign
        idx += 1;
        uploadBase64Image(idx, arrsImgUpload, note, attachmentId, imageExtractIds);
      });
    }
  };

  const pressSubmit = (listImgsSubmit, note) => {
    setLoading(true);
    let listImage = [...listImgsSubmit];
    listImage = listImage.filter(img => img.edited === true);
    const arrsImg = [];
    let count = 0;
    listImage.forEach(async img => {
      let base64 = null;
      const image = {
        pageNumber: 0,
        vbAttachmentId: 0,
        base64: '',
      };
      base64 = await convertImgToBase64(img.url);
      count += 1;
      image.pageNumber = img.id;
      image.vbAttachmentId = img.vbAttachmentId;
      image.base64 = base64;
      arrsImg.push(image);
      if (count === listImage.length) {
        uploadBase64Image(0, arrsImg, note, arrsImg[0].vbAttachmentId, []);
      }
    });
  };

  return (
    <>
      {tabletEditDocument && (
        <Button
          block
          onPress={() => {
            onClickTuChoi();
            open();
          }}
          style={{
            paddingHorizontal: 30,
            marginLeft: 10,
            height: 40,
            backgroundColor: 'white',
          }}
        >
          <Text
            style={{
              fontSize: 13,
              color: 'red',
            }}
            uppercase={false}
          >
            Từ chối văn bản
          </Text>
        </Button>
      )}
      {!tabletEditDocument && <Fsb text={actionName} icon={icon} onPress={open} {...restProps} />}

      <BottomNoteModal
        loading={loading}
        noteRequired={noteRequired}
        label={label}
        visible={isVisible}
        onClose={close}
        defaultComment={defaultComment}
        defaultNote={defaultNote}
        title={`${actionName} văn bản`}
        onSubmit={note => {
          if (listImgs && listImgs.length > 0) {
            if (DeviceInfo.isTablet()) {
              const index = listImgs.findIndex(img => img.edited === true);
              if (index >= 0) {
                pressSubmit(listImgs, note);
              } else {
                submit(note);
              }
            }
          } else {
            submit(note);
          }
        }}
      />
    </>
  );
};

ProcessAction.propTypes = {
  action: PropTypes.func.isRequired,
  actionName: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  noteRequired: PropTypes.bool,
  label: PropTypes.string,
  tabletEditDocument: PropTypes.bool,
  listImgs: PropTypes.arrayOf(PropTypes.shape({})),
  documentId: PropTypes.string,
  onClickTuChoi: PropTypes.func,
  onSubmitPress: PropTypes.func,
  document: PropTypes.shape({
    status: PropTypes.number,
  }),
  mode: PropTypes.number,
  resetDocuments: PropTypes.func.isRequired,
};
ProcessAction.defaultProps = {
  noteRequired: false,
  label: undefined,
  tabletEditDocument: false,
  listImgs: [],
  documentId: '',
  onClickTuChoi() {},
  onSubmitPress() {},
};

export default ProcessAction;
