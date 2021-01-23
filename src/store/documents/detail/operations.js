import _ from 'lodash';
import { Toast } from 'native-base';

import { COMMENT_TYPE, DOCUMENT_TYPE, PROCESS_TYPES, STEP_TYPE } from 'eoffice/constants/documents';
import { getErrorMessage } from 'eoffice/constants/errorMessages';
import { convertCommentToHistory } from 'eoffice/utils/utils';
import createOperation from '../../createOperation';
import { selectors as userSelectors } from '../../users';
import { actions as listActions, selectors as listSelectors } from '../list';
import slice from './slice';
import * as detailSelectors from './selectors';
import * as detailService from './service';


const { actions } = slice;

export const addComment = createOperation({
  actions: {
    successAction: actions.addCommentSuccess,
  },
  async process({ getState, payload: { attachmentIds, content, toUsers } }) {
    const state = getState();
    let mode = null;
    if (global.hasDeeplink) {
      mode = global.typeDocDetail;
    } else {
      mode = listSelectors.modeSelector(state);
    }
    const document = detailSelectors.documentSelector(state);

    const comment = await detailService.addComment({
      attachmentIds,
      content,
      vbCommentToUserForms: toUsers,
      objectId: document.id,
      objectType: mode === DOCUMENT_TYPE.VB_DEN ? COMMENT_TYPE.VB_DEN : COMMENT_TYPE.VB_DI,
    });

    return convertCommentToHistory(comment);
  },
});

// document actions
const onSuccess = ({ dispatch }) => dispatch(listActions.updateQuery());

export const chuyenXuLyVbDi = createOperation({
  onSuccess,
  process: async ({ getState, payload: { handlerId, note } }) => {
    const state = getState();
    const process = detailSelectors.processSelector(state);
    const step = detailSelectors.stepSelector(state);
    const userView = userSelectors.userViewByIdSelector(state, { userViewId: handlerId });

    const data = {
      outgoingProcessId: process.id,
      flowId: step.flowId,
      stepId: process.stepId,
      flowInstanceId: process.flowInstanceId,
      content: note,
      processHandlerForms: [
        {
          userId: userView.userId,
          deptId: userView.deptId,
          roleId: userView.roleId,
          stepId: userView.stepId,
          positionId: userView.positionId,
        },
      ],
    };

    await detailService.chuyenXuLyVbDi({ documentId: process.docId, data });

    Toast.show({
      duration: 3000,
      text: step?.signType === 2 ? 'Ký số và chuyển xử lý thành công' : 'Chuyển xử lý thành công',
      type: 'success',
    });

    return true;
  },
});

export const chuyenXuLyVbDen = createOperation({
  onSuccess({ dispatch, getState, result }) {
    const state = getState();
    const canCxlDv = detailSelectors.canChuyenXuLyDonviSelector(state);

    if (result) {
      if (!canCxlDv) {
        dispatch(listActions.updateQuery());
      } else {
        const document = detailSelectors.documentSelector(state);
        const process = detailSelectors.processSelector(state);
        dispatch(
          actions.loadDetail({
            documentId: document.id,
            processId: process?.id,
          })
        );
      }
    }
  },
  process: async ({ getState, payload: { note, awaitCDV, ...payload } }) => {
    const state = getState();
    const vbProcess = detailSelectors.processSelector(state);
    const step = detailSelectors.stepSelector(state);

    const processHandlerForms = [];
    const processHandlerDeptForms = [];

    _.forEach(payload, (handlerIds, key) => {
      const constantKey = _.snakeCase(key).toUpperCase();

      if (PROCESS_TYPES[constantKey]) {
        _.forEach([...handlerIds], handlerId => {
          const handler = detailSelectors.handlerByIdSelector(state, { userViewId: handlerId });
          processHandlerForms.push({
            userId: handler.userId,
            deptId: handler.deptId,
            roleId: handler.roleId,
            stepId: handler.stepId,
            processType: PROCESS_TYPES[constantKey].value,
          });
        });
      }
    });

    const data = {
      processHandlerDeptForms,
      processHandlerForms,
      incomingProcessId: vbProcess.id,
      flowId: step.flowId,
      stepId: vbProcess.stepId,
      flowInstanceId: vbProcess.flowInstanceId,
      content: note,
    };

    await detailService.chuyenXuLyVbDen({ documentId: vbProcess.docId, data });
    if (awaitCDV === true) {
      return false;
    }
    return true;
  },
  successMessage: 'Chuyển xử lý thành công',
});

export const chuyenXuLyNhieuVbDen = createOperation({
  onSuccess,
  process: async ({
    getState,
    payload: {
      data: { note, ...payload },
      dataDept: { ...payloadDept },
      doc,
    },
  }) => {
    const state = getState();
    const processHandlerForms = [];
    const processHandlerDeptForms = [];

    _.forEach(payload, (handlerIds, key) => {
      const constantKey = _.snakeCase(key).toUpperCase();
      if (PROCESS_TYPES[constantKey]) {
        _.forEach([...handlerIds], handlerId => {
          const handler = detailSelectors.handlerByIdSelector(state, { userViewId: handlerId });
          processHandlerForms.push({
            userId: handler.userId,
            deptId: handler.deptId,
            roleId: handler.roleId,
            stepId: handler.stepId,
            processType: PROCESS_TYPES[constantKey].value,
          });
        });
      }
    });

    const { vbDocUserVbDocProcessId: processId } = doc;
    const vbProcess = await detailService.getVbInProcess({ processId });
    const step = await detailService.getVbProcessStep({ stepId: vbProcess.stepId });

    _.forEach(payloadDept, (handlerIds, key) => {
      const constantKey = _.snakeCase(key).toUpperCase();
      if (PROCESS_TYPES[constantKey]) {
        _.forEach([...handlerIds], handlerId => {
          processHandlerDeptForms.push({
            deptId: handlerId,
            stepId: vbProcess.stepId,
            processType: PROCESS_TYPES[constantKey].value,
          });
        });
      }
    });

    const data = {
      processHandlerDeptForms: processHandlerDeptForms.length > 0 ? processHandlerDeptForms : [],
      processHandlerForms,
      incomingProcessId: vbProcess.id,
      flowId: step.flowId,
      stepId: vbProcess.stepId,
      flowInstanceId: vbProcess.flowInstanceId,
      content: note,
    };
    await detailService.chuyenXuLyVbDen({ documentId: vbProcess?.docId, data });

    return true;
  },
});

export const chuyenXuLyDonVi = createOperation({
  onSuccess({ dispatch, getState }) {
    const state = getState();
    const canCxl = detailSelectors.canChuyenXuLySelector(state);

    if (!canCxl) {
      dispatch(listActions.updateQuery());
    } else {
      const document = detailSelectors.documentSelector(state);
      const process = detailSelectors.processSelector(state);
      dispatch(
        actions.loadDetail({
          documentId: document.id,
          processId: process?.id,
        })
      );
    }
  },
  async process({ getState, payload: { departmentIds, note, ...payload } }) {
    const state = getState();
    const vbProcess = detailSelectors.processSelector(state);
    const step = detailSelectors.stepSelector(state);
    const processHandlerForms = [];

    _.forEach(payload, (handlerIds, key) => {
      const constantKey = _.snakeCase(key).toUpperCase();
      if (PROCESS_TYPES[constantKey]) {
        _.forEach([...handlerIds], handlerId => {
          processHandlerForms.push({
            deptId: handlerId,
            stepId: vbProcess.stepId,
            processType: PROCESS_TYPES[constantKey].value,
          });
        });
      }
    });

    const data = {
      processHandlerForms,
      incomingProcessId: vbProcess.id,
      flowId: step.flowId,
      stepId: vbProcess.stepId,
      flowInstanceId: vbProcess.flowInstanceId,
      content: note,
    };
    await detailService.chuyenXuLiDonVi({ data, documentId: vbProcess.docId });
    return true;
  },
  successMessage: 'Chuyển xử lý thành công',
});

export const ketThuc = createOperation({
  onSuccess,
  process: async ({ getState, payload: { note } }) => {
    const state = getState();
    if (global.hasDeeplink) {
      mode = global.typeDocDetail;
    } else {
      mode = listSelectors.modeSelector(state);
    }
    const vbProcess = detailSelectors.processSelector(state);
    const step = detailSelectors.stepSelector(state);

    const docIdKey = mode === DOCUMENT_TYPE.VB_DEN ? 'incomingProcessId' : 'outgoingProcessId';
    const data = {
      [docIdKey]: vbProcess.id,
      flowInstanceId: vbProcess.flowInstanceId,
      content: note,
    };

    const func =
      mode === DOCUMENT_TYPE.VB_DEN ? detailService.ketThucVbDen : detailService.ketThucVbDi;
    await func({ documentId: vbProcess.docId, data });

    Toast.show({
      duration: 3000,
      text: step?.signType === 2 ? 'Ký duyệt văn bản thành công' : 'Kết thúc văn bản thành công',
      type: 'success',
    });
    return true;
  },
});

export const choYKien = createOperation({
  onSuccess,
  process: async ({ getState, payload: { note } }) => {
    const state = getState();
    const vbProcess = detailSelectors.processSelector(state);
    const data = {
      incomingProcessId: vbProcess.id,
      content: note,
    };

    await detailService.choYKien({ documentId: vbProcess.docId, data });

    Toast.show({
      duration: 3000,
      text: 'Cho ý kiến thành công',
      type: 'success',
    });
    return true;
  },
});

export const ketThucNhieuVBDen = createOperation({
  onSuccess,
  process: async ({ getState, payload: { note, doc } }) => {
    const state = getState();
    if (global.hasDeeplink) {
      mode = global.typeDocDetail;
    } else {
      mode = listSelectors.modeSelector(state);
    }
    const { vbDocUserVbDocProcessId: processId } = doc;
    const vbProcess = await detailService.getVbInProcess({ processId });
    const docIdKey = mode === DOCUMENT_TYPE.VB_DEN ? 'incomingProcessId' : 'outgoingProcessId';
    const data = {
      [docIdKey]: vbProcess.id,
      flowInstanceId: vbProcess.flowInstanceId,
      content: note,
    };

    const func =
      mode === DOCUMENT_TYPE.VB_DEN ? detailService.ketThucVbDen : detailService.ketThucVbDi;
    await func({ documentId: vbProcess.docId, data });

    return true;
  },
});

export const tuChoi = createOperation({
  onSuccess,
  process: async ({ getState, payload: { note, attachmentMetaId, listPageNumberChange } }) => {
    const state = getState();
    if (global.hasDeeplink) {
      mode = global.typeDocDetail;
    } else {
      mode = listSelectors.modeSelector(state);
    }
    const vbProcess = detailSelectors.processSelector(state);
    if (mode === DOCUMENT_TYPE.VB_DEN) {
      await detailService.tuChoiVbDen({
        processId: vbProcess.id,
        data: { content: note },
      });
    } else {
      const data = {
        outgoingProcessId: vbProcess.id,
        flowInstanceId: vbProcess.flowInstanceId,
        content: note,
      };
      if (attachmentMetaId !== null && attachmentMetaId !== undefined) {
        data.attachmentMetaId = attachmentMetaId;
        data.listPageNumberChange = [...listPageNumberChange];
      }
      await detailService.tuChoiVbDi({ documentId: vbProcess.docId, data });
    }
    return true;
  },
  successMessage: 'Từ chối văn bản thành công',
});

export const ccVanBan = createOperation({
  onSuccess,
  process: async ({ getState, payload: { note, users } }) => {
    const state = getState();
    const document = detailSelectors.documentSelector(state);
    const data = { outgoingDocId: document?.id, toUserIds: users, comment: note };
    await detailService.ccVanBan({ data });
    return true;
  },
  successMessage: 'CC Văn bản thành công',
});

export const thuHoi = createOperation({
  onSuccess,
  process: async ({ getState, payload: { note, processes } }) => {
    const state = getState();
    if (global.hasDeeplink) {
      mode = global.typeDocDetail;
    } else {
      mode = listSelectors.modeSelector(state);
    }
    const canThuHoiProcess = detailSelectors.canThuHoiProcessSelector(state);
    const canThuHoiVanThu = detailSelectors.canThuHoiVanThuSelector(state);
    const vbProcess = detailSelectors.processSelector(state);

    if (canThuHoiProcess) {
      const data = {
        comment: note,
      };
      if (mode === DOCUMENT_TYPE.VB_DEN) {
        data.nextVbIncomingProcessIds = processes.map(process => process.id);
        await detailService.thuHoiVbDen({ processId: vbProcess.id, data });
      } else {
        await detailService.thuHoiVbDi({ processId: vbProcess.id, data });
      }
    }

    if (canThuHoiVanThu) {
      const func =
        mode === DOCUMENT_TYPE.VB_DEN
          ? detailService.vanThuThuHoiVbDen
          : detailService.vanThuThuHoiVbDi;
      await func({ documentId: vbProcess.docId, data: { comment: note } });
    }
    return true;
  },
  successMessage: 'Thu hồi văn bản thành công',
  getCustomMessage({ errors, payload: { processes } }) {
    const [err] = errors;
    if (
      err.errorCode.indexOf('vbIncomingProcess.thuHoi.nextVbIncomingProcessStatusMissMatch') >= 0
    ) {
      const names = processes
        .filter(({ id }) => err.params.indexOf(id) >= 0)
        .map(({ deptReceiverName, receiverName, stepType }) =>
          stepType === STEP_TYPE.CA_NHAN ? receiverName : deptReceiverName
        );

      return getErrorMessage(err.errorCode, { name: names.join(', ') });
    }

    return getErrorMessage(err.errorCode);
  },
});

export const uploadImageBase64 = createOperation({
  process({ payload }) {
    const { image } = payload;
    const id = detailService.uploadBase64Image({ image });
    return id;
  },
});
