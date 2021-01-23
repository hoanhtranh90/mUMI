import _ from 'lodash';
import { createLogic } from 'redux-logic';
import DeviceInfo from 'react-native-device-info';

import {
  COMMENT_TYPE,
  DOCUMENT_TYPE,
  STEP_TYPE,
  INCOMING_PROCESS_STATUS,
  RELATION_TYPE,
} from '../../../constants/documents';
import { convertCommentToHistory } from '../../../utils/utils';
import { selectors } from '../../auth';
import * as userService from '../../users/service';
import { selectors as listSelectors } from '../list';
import * as detailSelectors from './selectors';
import * as service from './service';
import slice from './slice';
import { findByIdDelegate, findPhieuYKienByDocIdAndUser } from './service';
import { buildHistoryTree, convertActionLogToHistory } from './utils';
import store from '../../index';
const { actions } = slice;

export const getDocument = async (mode, documentId) => {
  const func =
    mode === DOCUMENT_TYPE.VB_DEN ? service.getIncomingDocument : service.getOutgoingDocument;
  const document = await func(documentId);
  const attachments = await service.listAttachments({ attachmentType: mode, documentId });
  let receivers;

  if (mode === DOCUMENT_TYPE.VB_DI) {
    receivers = await service.listReceivers({ docId: document.id, sort: 'objectType' });
  }
  return {
    ...document,
    file: attachments?.length > 0 && attachments[0],
    receivers,
  };
};

const listDepartmentHandlersLogic = createLogic({
  type: actions.listDepartmentHandlers,
  processOptions: {
    successType: actions.listHandlersDeptSuccess,
  },
  async process({ getState }) {
    const state = getState();
    let mode = null;
    if (global.hasDeeplink) {
      mode = global.typeDocDetail;
    } else {
      mode = listSelectors.modeSelector(state);
    }

    if (mode !== DOCUMENT_TYPE.VB_DEN) {
      return [];
    }

    const process = detailSelectors.processSelector(state);
    const nextSteps = detailSelectors.nextStepsSelector(state);

    const [allDepartments, pastProcesses] = await Promise.all([
      userService.listDepartments(),
      service.listIncomingProcesses({ parentId: process.id, stepType: STEP_TYPE.DON_VI }),
    ]);
    const pastDeptIds = pastProcesses?.reduce(
      (hash, pr) => ({ ...hash, [pr.deptReceiverId]: true }),
      {}
    );

    const deptIds = nextSteps.reduce((hash, step) => {
      if (step.stepType !== STEP_TYPE.DON_VI || pastDeptIds[step.deptId]) {
        return hash;
      }
      return { ...hash, [step.deptId]: { active: true, order: step.order || 999 } };
    }, {});
    console.log('deptIds');
    console.log(deptIds);
    let allDepts = allDepartments;
    allDepts = allDepts.filter(department => !!deptIds[department.id]);
    allDepts = allDepts.filter(department => department.status === 'active');
    allDepts.forEach(dept => (dept.order = deptIds[dept.id].order));
    console.log('nextSteps');
    console.log(nextSteps);
    console.log('allDepts');
    console.log(allDepts);
    return allDepts;
  },
});
const listDepartmentsHandlersLogic = createLogic({
  type: actions.listDepartmentsHandlers,
  processOptions: {
    successType: actions.listHandlersDeptSuccess,
  },
  async process({
    getState,
    action: {
      payload: { listDoc },
    },
  }) {
    const state = getState();
    let mode = null;
    if (global.hasDeeplink) {
      mode = global.typeDocDetail;
    } else {
      mode = listSelectors.modeSelector(state);
    }

    if (mode !== DOCUMENT_TYPE.VB_DEN) {
      return [];
    }
    const promises = [];

    const deptsResponse = async processId => {
      //
      const process = await service.getVbInProcess({ processId });

      const stepDept =
        detailSelectors.stepSelector(state) ||
        (await service.getVbProcessStep({ stepId: process.stepId }));
      const params = {
        stepId: null,
      };
      if (process) {
        params.stepId = process.stepId;
      }
      if (stepDept) {
        params.flowId = stepDept.flowId;
      }

      const nextSteps = await service.listNextSteps({
        flowId: params.flowId,
        stepId: params.stepId,
      });
      if (
        !!nextSteps?.find(step => step.stepType === STEP_TYPE.DON_VI) &&
        process?.status !== INCOMING_PROCESS_STATUS.KET_THUC &&
        process?.status !== INCOMING_PROCESS_STATUS.TU_CHOI
      ) {
        const [allDepartments, pastProcesses] = await Promise.all([
          userService.listDepartments(),
          service.listIncomingProcesses({ parentId: process.id, stepType: STEP_TYPE.DON_VI }),
        ]);
        const pastDeptIds = pastProcesses?.reduce(
          (hash, pr) => ({ ...hash, [pr.deptReceiverId]: true }),
          {}
        );

        const deptIds = nextSteps.reduce((hash, step) => {
          if (step.stepType !== STEP_TYPE.DON_VI || pastDeptIds[step.deptId]) {
            return hash;
          }
          return { ...hash, [step.deptId]: true };
        }, {});
        let allDepts = allDepartments;
        allDepts = allDepts.filter(department => deptIds[department.id]);
        allDepts = allDepts.filter(department => department.status === 'active');
        return allDepts;
      }
      return [];
    };
    listDoc.forEach(doc => {
      promises.push(deptsResponse(JSON.parse(doc).vbDocUserVbDocProcessId));
    });
    const dataDepts = await Promise.all(promises).then(data => data);

    let newDataDept = [];
    for (let i = 0; i < dataDepts.length - 1; i += 1) {
      newDataDept = [...dataDepts[i], ...dataDepts[i + 1]];
    }

    if (dataDepts.length === 1) {
      newDataDept = [...dataDepts[0]];
      return newDataDept;
    }
    const intersectDepts = [];
    // eslint-disable-next-line no-unused-vars
    const uniqueDataDeptsSet = newDataDept.reduce((acc, current) => {
      const x = acc.find(item => item.id === current.id);
      if (!x) {
        return acc.concat([current]);
      }
      intersectDepts.push(current);
      return acc;
    }, []);

    console.log('intersectDepts');
    console.log(intersectDepts);

    return intersectDepts;
  },
});

const listCCHandlersLogic = createLogic({
  type: actions.listCCHandlers,
  processOptions: {
    successType: actions.listCCHandlersSuccess,
  },
  async process({ getState }) {
    const state = getState();
    const document = detailSelectors.documentSelector(state);
    const deptRole = selectors.deptRoleSelector(state);
    const [listHandlers, listHandlersHasCC] = await Promise.all([
      userService.getUserCCVanBan({ deptId: deptRole?.deptId, docId: document?.id }),
      service.vanBanHasCC({ documentId: document?.id }),
    ]);
    const listCC = listHandlersHasCC.reduce(
      (hash, step) => ({ ...hash, [step.userDeptRoleId]: true }),
      {}
    );
    return listHandlers.filter(handlers => !listCC[handlers.id]);
  },
});

const listUserHandlersLogic = createLogic({
  type: actions.listUserHandlers,
  processOptions: {
    successType: actions.listHandlersSuccess,
  },
  async process({
    getState,
    action: {
      payload: { processId },
    },
  }) {
    const state = getState();
    let mode = null;
    if (global.hasDeeplink) {
      mode = global.typeDocDetail;
    } else {
      mode = listSelectors.modeSelector(state);
    }
    if (mode !== DOCUMENT_TYPE.VB_DEN) {
      return [];
    }
    // when forwards we can't using document selectors
    const process =
      detailSelectors.processSelector(state) || (await service.getVbInProcess({ processId }));

    const step =
      detailSelectors.stepSelector(state) ||
      (await service.getVbProcessStep({ stepId: process.stepId }));

    const deptRole = selectors.deptRoleSelector(state);
    const params = {
      stepId: null,
    };
    if (process) {
      params.stepId = process.stepId;
    }
    if (step) {
      params.flowId = step.flowId;
    }

    console.log('listUserHandlersLogic');
    let users = await userService.loadUserDeptRoleView(params);

    console.log(users);
    console.log(step);
    const existedProcesses = await service.listIncomingProcesses({
      parentId: process.id,
      stepType: STEP_TYPE.CA_NHAN,
    });

    users = users.filter(user => user.id !== deptRole.id);
    users = users.filter(user => user.status === 'active');
    if (!existedProcesses || existedProcesses.length === 0) {
      return users;
    }

    const existedProcessKeys = existedProcesses
      .map(
        ({ deptReceiverId, receiverId, roleReceiverId }) =>
          `${receiverId}.${deptReceiverId}.${roleReceiverId}`
      )
      .reduce((hash, key) => ({ ...hash, [key]: true }), {});

    return users.filter(
      ({ deptId, roleId, userId }) => !existedProcessKeys[`${userId}.${deptId}.${roleId}`]
    );
  },
});

const listGroupsHandlersLogic = createLogic({
  type: actions.listGroupsHandlers,
  processOptions: {
    successType: actions.listGroupsHandlersSuccess,
  },
  async process({ getState }) {
    const state = getState();
    let mode = null;
    if (global.hasDeeplink) {
      mode = global.typeDocDetail;
    } else {
      mode = listSelectors.modeSelector(state);
    }
    if (mode !== DOCUMENT_TYPE.VB_DEN) {
      return [];
    }
    const groups = await service.getGroups();
    return groups;
  },
});

const listUsersHandlersLogic = createLogic({
  type: actions.listUsersHandlers,
  processOptions: {
    successType: actions.listHandlersSuccess,
  },
  async process({
    getState,
    action: {
      payload: { listDoc },
    },
  }) {
    console.log('listUsersHandlersLogic');

    const state = getState();
    let mode = null;
    if (global.hasDeeplink) {
      mode = global.typeDocDetail;
    } else {
      mode = listSelectors.modeSelector(state);
    }
    if (mode !== DOCUMENT_TYPE.VB_DEN) {
      return [];
    }
    // when forwards we can't using document selectors
    const promises = [];

    const usersResponse = async processId => {
      const process = await service.getVbInProcess({ processId });

      const step =
        detailSelectors.stepSelector(state) ||
        (await service.getVbProcessStep({ stepId: process.stepId }));

      const deptRole = selectors.deptRoleSelector(state);
      const params = {
        stepId: null,
      };
      if (process) {
        params.stepId = process.stepId;
      }
      if (step) {
        params.flowId = step.flowId;
      }

      let users = await userService.loadUserDeptRoleView(params);

      const existedProcesses = await service.listIncomingProcesses({
        parentId: process.id,
        stepType: STEP_TYPE.CA_NHAN,
      });

      users = users.filter(user => user.id !== deptRole.id);
      users = users.filter(user => user.status === 'active');

      console.log('listUserHandlersLogic');
      console.log(users);
      if (!existedProcesses || existedProcesses.length === 0) {
        return users;
      }

      const existedProcessKeys = existedProcesses
        .map(
          ({ deptReceiverId, receiverId, roleReceiverId }) =>
            `${receiverId}.${deptReceiverId}.${roleReceiverId}`
        )
        .reduce((hash, key) => ({ ...hash, [key]: true }), {});

      return users.filter(
        ({ deptId, roleId, userId }) => !existedProcessKeys[`${userId}.${deptId}.${roleId}`]
      );
    };
    listDoc.forEach(doc => {
      promises.push(usersResponse(JSON.parse(doc).vbDocUserVbDocProcessId));
    });
    const dataUsers = await Promise.all(promises).then(data => data);

    let newDataUser = [];
    for (let i = 0; i < dataUsers.length - 1; i += 1) {
      newDataUser = [...dataUsers[i], ...dataUsers[i + 1]];
    }
    if (dataUsers.length === 1) {
      newDataUser = [...dataUsers[0]];
      return newDataUser;
    }
    const intersectUsers = [];
    // eslint-disable-next-line no-unused-vars
    const uniqueDataUsersSet = newDataUser.reduce((acc, current) => {
      const x = acc.find(item => item.id === current.id);
      if (!x) {
        return acc.concat([current]);
      }
      intersectUsers.push(current);
      return acc;
    }, []);
    return intersectUsers;
  },
});

const reLoadActionHistoryLogic = createLogic({
  type: actions.reLoadActionHistory,
  cancelType: actions.cancelLoadActionHistory,
  processOptions: {
    successType: actions.loadActionHistorySuccess,
  },
  async process({ getState }) {
    const state = getState();
    const document = detailSelectors.documentSelector(state);
    let mode = null;
    if (global.hasDeeplink) {
      mode = global.typeDocDetail;
    } else {
      mode = listSelectors.modeSelector(state);
    }
    const process = detailSelectors.processSelector(state);
    const listActionLogs =
      mode === DOCUMENT_TYPE.VB_DEN
        ? service.listAccessibleActionLogs({ vbIncomingProcessId: process.id })
        : service.listActionLogsByOutgoingDoc({ outgoingDocId: document.id });
    const [actionLogs, comments] = await Promise.all([
      listActionLogs,
      service.listComments({
        documentId: document.id,
        commentType: mode === DOCUMENT_TYPE.VB_DEN ? COMMENT_TYPE.VB_DEN : COMMENT_TYPE.VB_DI,
      }),
    ]);

    const items = [
      ...actionLogs.map(convertActionLogToHistory),
      ...comments.map(convertCommentToHistory),
    ];
    items.sort((item1, item2) => {
      if (item1.createTime > item2.createTime) {
        return -1;
      }
      return item1.createTime < item2.createTime ? 1 : 0;
    });
    return items;
  },
});

const loadActionHistoryLogic = createLogic({
  type: DeviceInfo.isTablet() ? actions.getDocumentSuccess : actions.loadActionHistory,
  cancelType: actions.cancelLoadActionHistory,
  processOptions: {
    successType: actions.loadActionHistorySuccess,
  },
  async process({ getState }) {
    const state = getState();
    const document = detailSelectors.documentSelector(state);
    let mode = null;
    if (global.hasDeeplink) {
      mode = global.typeDocDetail;
    } else {
      mode = listSelectors.modeSelector(state);
    }
    const bccInfo = detailSelectors.bccInfoSelector(state);
    const process = detailSelectors.processSelector(state);
    const listActionLogs =
      mode === DOCUMENT_TYPE.VB_DEN && !bccInfo
        ? service.findAllByVbIncomingDoc(document.id)
        : service.listActionLogsByOutgoingDoc({
            outgoingDocId: bccInfo ? bccInfo.vbOutgoingDocId : document.id,
          });
    const [actionLogs, comments] = await Promise.all([
      listActionLogs,
      service.listComments({
        documentId: bccInfo ? bccInfo.vbOutgoingDocId : document.id,
        commentType:
          mode === DOCUMENT_TYPE.VB_DEN && !bccInfo ? COMMENT_TYPE.VB_DEN : COMMENT_TYPE.VB_DI,
      }),
    ]).catch(error => console.log(error));

    const items = [
      ...actionLogs.map(convertActionLogToHistory),
      ...comments.map(convertCommentToHistory),
    ];
    items.sort((item1, item2) => {
      if (item1.createTime > item2.createTime) {
        return -1;
      }
      return item1.createTime < item2.createTime ? 1 : 0;
    });
    return items;
  },
});

const getPagesNummberOfDocLogic = createLogic({
  type: actions.getPagesNummberOfDoc,
  latest: true,
  processOptions: {
    successType: actions.getPagesNummberOfDocSuccess,
  },
  async process({ getState }, dispatch, done) {
    const state = getState();
    const document = detailSelectors.documentSelector(state);
    const attachmentId = document?.file?.id;
    const dataPagesNumber = await service.soTrangVanBan({ attachmentId });
    dispatch(actions.getPagesNummberOfDocSuccess(dataPagesNumber.pageSize));
    done();
  },
});

const loadDetailLogic = createLogic({
  type: actions.loadDetail,
  latest: true,
  async process(
    {
      getState,
      action: {
        payload: { documentId, processId },
      },
    },
    dispatch,
    done
  ) {
    let mode = null;
    if (global.hasDeeplink) {
      mode = global.typeDocDetail;
    } else {
      mode = listSelectors.modeSelector(getState());
    }
    const userDeptRoleId = store.getState().auth.deptRole.id;
    if (processId) {
      const func = mode === DOCUMENT_TYPE.VB_DEN ? service.getVbInProcess : service.getVbOutProcess;
      const process = await func({ processId });
      if (process && process.delegateInfoId) {
        await findByIdDelegate(process.delegateInfoId).then(response => {
          if (response && response.data && response.data.fromUserDeptRoleId) {
            dispatch(
              actions.updateViewAsUyQuyen(response.data.fromUserDeptRoleId === userDeptRoleId)
            );
          }
        });
      }
      const [flowInstance, step] = await Promise.all([
        service.getFlowInstance({ flowInstanceId: process.flowInstanceId }),
        service.getVbProcessStep({ stepId: process.stepId }),
      ]);
      dispatch(
        actions.getProcessSuccess({
          flowInstance,
          process,
          step: _.isObject(step) ? step : null,
        })
      );
      if (mode === DOCUMENT_TYPE.VB_DEN) {
        const nextSteps = await service.listNextSteps({
          flowId: flowInstance.flowId,
          stepId: step.id,
        });

        if (nextSteps?.length > 0) {
          dispatch(actions.listNextStepsSuccess(nextSteps));
        }
      }
      const vbDocUserBcc = await service.findByVbIncomingProcessId(processId);
      dispatch(actions.getVbDocUserBccSuccess(vbDocUserBcc));
      if (vbDocUserBcc) {
        await populateBccInfo(vbDocUserBcc, documentId, dispatch, processId);
      }
    } else {
      const vbDocUserBcc = await service.findByDocIdAndRelationType(
        documentId,
        RELATION_TYPE.NGUOI_DUOC_BCC
      );
      dispatch(actions.getVbDocUserBccSuccess(vbDocUserBcc));

      if (vbDocUserBcc) {
        await populateBccInfo(vbDocUserBcc, documentId, dispatch, null);
      }
    }
    const document = await getDocument(mode, documentId);
    let opinionForm = null;
    if (document.vbOutgoingDocId) {
      const response = await findPhieuYKienByDocIdAndUser(document.vbOutgoingDocId, userDeptRoleId);
      opinionForm = response?.data;
    }
    if (document.forwardIncomingProcessId) {
      const forwardProcess = await service.getVbInProcess({
        processId: document.forwardIncomingProcessId,
      });
      dispatch(actions.getForwardProcessSuccess(forwardProcess));
    }
    dispatch(actions.getOpinionFormSuccess(opinionForm));
    dispatch(actions.getDocumentSuccess(document));
    dispatch(actions.getPagesNummberOfDoc());

    done();
  },
});

const loadHistoryLogic = createLogic({
  type: DeviceInfo.isTablet() ? actions.getDocumentSuccess : actions.loadHistory,
  cancelType: actions.cancelLoadHistory,
  processOptions: {
    successType: actions.loadHistorySuccess,
  },
  async process({ getState }) {
    const state = getState();
    const document = detailSelectors.documentSelector(state);
    const isAutoBccDuThao = detailSelectors.isAutoBccDuThaoSelector(state);
    let mode = null;
    if (global.hasDeeplink) {
      mode = global.typeDocDetail;
    } else {
      mode = listSelectors.modeSelector(state);
    }

    let allProcesses;
    if (mode === DOCUMENT_TYPE.VB_DEN) {
      const bccInfo = detailSelectors.bccInfoSelector(state);
      if (!_.isNull(bccInfo) && !_.isEmpty(bccInfo)) {
        // load vb flow instance
        const flowInstance = await service.getLatestVbFlowInstance({
          documentId: bccInfo.vbOutgoingDocId,
        });

        if (!flowInstance) {
          return [];
        }

        allProcesses = await service.listOutgoingProcesses({
          flowInstanceId: flowInstance.id,
          page: 0,
          size: 1000,
        });
      } else {
        allProcesses = await service.getHistoryProcessesIn(document.id, document.id);
      }
    } else {
      // load vb flow instance
      const flowInstance = await service.getLatestVbFlowInstance({
        documentId: document.id,
      });

      if (!flowInstance) {
        return [];
      }

      allProcesses = await service.listOutgoingProcesses({
        flowInstanceId: flowInstance.id,
        page: 0,
        size: 1000,
      });
    }

    // we only use the 1st process without parent
    const vbProcess = allProcesses.filter(process => !process.parentId);
    //
    // if (!vbProcess) {
    //   // dispatch(actions.loadHistoryFailed(new Error('Không có luồng xử lý nào')));
    //   return [];
    // }

    let incomingDocs = null;
    if (mode === DOCUMENT_TYPE.VB_DI) {
      incomingDocs = await service.listIncomingDocsWithDept({
        outgoingDocId: document.id,
      });
    }
    return buildHistoryTree({
      allProcesses,
      document,
      incomingDocs,
      mode,
      vbProcess,
      isAutoBccDuThao,
    });
  },
});

export default [
  listDepartmentHandlersLogic,
  listDepartmentsHandlersLogic,
  listUserHandlersLogic,
  listUsersHandlersLogic,
  loadActionHistoryLogic,
  loadDetailLogic,
  loadHistoryLogic,
  listCCHandlersLogic,
  getPagesNummberOfDocLogic,
  listGroupsHandlersLogic,
  reLoadActionHistoryLogic,
  // focusCommentInput
];

async function populateBccInfo(vbDocUserBcc, documentId, dispatch, processId) {
  const bccInfo = await service.findBccInfoByVbIncomingDocId(documentId);
  dispatch(actions.getBccInfoSuccess(bccInfo));
  let isAutoBcc = false;
  isAutoBcc = vbDocUserBcc && vbDocUserBcc.relationType === RELATION_TYPE.NGUOI_DUOC_BCC;
  dispatch(actions.setIsAutoBcc(isAutoBcc));
  if (!processId && isAutoBcc) {
    service.markAsDaXLForBcc(vbDocUserBcc.id);
  }
  if (isAutoBcc) {
    const bccInfo = await service.findBccInfoByVbIncomingDocId(documentId);
    dispatch(actions.getBccInfoSuccess(bccInfo));
  } else dispatch(actions.getBccInfoSuccess(null));
  let isAutoBccDuThao = false;
  isAutoBccDuThao = isAutoBcc && !!bccInfo;
  dispatch(actions.setIsAutoBccDuThao(isAutoBccDuThao));
}
