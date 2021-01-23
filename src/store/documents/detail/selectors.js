import _ from 'lodash';
import { createSelector } from 'redux-starter-kit';

import {
  INCOMING_DOC_STATUS,
  INCOMING_PROCESS_STATUS,
  OUTGOING_PROCESS_STATUS,
  STEP_POS_TYPE,
  DOCUMENT_TYPE,
  OUTGOING_DOC_STATUS,
  FLOW_INSTANCE_STATUS,
  ROLE,
  CATEGORY_CODE,
  HDTV_DEPT_CODE,
} from '../../../constants/documents';
import { deptRoleSelector } from '../../auth/selectors';
import { modeSelector } from '../list/selectors';
import store from '../../index';

const detailSelector = createSelector(
  ['documents'],
  documents => {
    return documents.detail;
  }
);

export const actionHistorySelector = createSelector(
  [detailSelector],
  detail => detail.actionHistory
);

export const documentSelector = createSelector(
  [detailSelector],
  detail => detail.document
);

export const flowInstanceSelector = createSelector(
  [detailSelector],
  detail => detail.flowInstance
);
// cc Handlers

export const handlersObjCCSelector = createSelector(
  [detailSelector],
  detail => detail.handlersCC
);

export const handlersCCSelector = createSelector(
  [handlersObjCCSelector],
  handlersCC => Object.values(handlersCC)
);

export const handlersCCByIdsSelector = createSelector(
  [handlersObjCCSelector, { path: 'ids', argIndex: 1 }],
  (handlersCC, ids) => _.compact(_.map(ids, id => handlersCC[id]))
);

export const groupsSelector = createSelector(
  [detailSelector],
  detail => detail.groups
);

export const opinionFormSelector = createSelector(
  [detailSelector],
  detail => detail.opinionForm
);

// forward handlers
const handlersObjSelector = createSelector(
  [detailSelector],
  detail => {
    return detail.handlers;
  }
);

const handlerDeptsObjSelector = createSelector(
  [detailSelector],
  detail => detail.handlerDepts
);

export const handlersSelector = createSelector(
  [handlersObjSelector],
  handlers => {
    return Object.values(handlers);
  }
);

export const handlerDeptsSelector = createSelector(
  [handlerDeptsObjSelector],
  handlers => Object.values(handlers)
);

export const handlerByIdSelector = createSelector(
  [handlersObjSelector, { path: 'userViewId', argIndex: 1 }],
  (handlers, id) => handlers[id]
);

export const handlersByIdsSelector = createSelector(
  [handlersObjSelector, { path: 'ids', argIndex: 1 }],
  (handlers, ids) => _.compact(_.map(ids, id => handlers[id]))
);

export const handlerDeptsByIdsSelector = createSelector(
  [handlerDeptsObjSelector, { path: 'ids', argIndex: 1 }],
  (handlers, ids) => _.compact(_.map(ids, id => handlers[id]))
);

export const handlersByDeptCCSelector = createSelector(
  [handlersCCSelector],
  users => {
    const depts = [];
    const deptIdToIdx = {};

    _.forEach(users, userView => {
      if (!_.isNumber(deptIdToIdx[userView.deptId])) {
        deptIdToIdx[userView.deptId] = depts.length;
        depts.push({
          id: userView.deptId,
          name: userView.deptName,
          children: [],
        });
      }

      const deptIdx = deptIdToIdx[userView.deptId];
      depts[deptIdx].children.push({
        ...userView,
      });
    });

    return depts;
  }
);

export const handlersByDeptSelector = createSelector(
  [handlersSelector],
  users => {
    const depts = [];
    const deptIdToIdx = {};

    _.forEach(users, userView => {
      if (!_.isNumber(deptIdToIdx[userView.deptId])) {
        deptIdToIdx[userView.deptId] = depts.length;
        depts.push({
          id: userView.deptId,
          name: userView.deptName,
          children: [],
        });
      }

      const deptIdx = deptIdToIdx[userView.deptId];
      depts[deptIdx].children.push({
        ...userView,
      });
    });
    return depts;
  }
);

export const historySelector = createSelector(
  [detailSelector],
  detail => detail.history
);

export const nextStepsSelector = createSelector(
  [detailSelector],
  detail => detail.nextSteps
);

export const processSelector = createSelector(
  [detailSelector],
  detail => detail.process
);

export const forwardProcessSelector = createSelector(
  [detailSelector],
  detail => detail.forwardProcess
);

export const processSelectorDelegateInfo = (async = createSelector(
  [detailSelector],
  detail => detail.isViewAsUyQuyen
));

export const focusCommentSelector = (async = createSelector(
  [detailSelector],
  detail => detail.isFocusComment
));

export const stepSelector = createSelector(
  [detailSelector],
  detail => detail.step
);

export const vbDocUserBccSelector = createSelector(
  [detailSelector],
  detail => detail.vbDocUserBcc
);

export const bccInfoSelector = createSelector(
  [detailSelector],
  detail => detail.bccInfo
);

export const isAutoBccSelector = createSelector(
  [detailSelector],
  detail => detail.isAutoBcc
);

export const isAutoBccDuThaoSelector = createSelector(
  [detailSelector],
  detail => detail.isAutoBccDuThao
);

const checkBcc = (isAutoBccDuThao, isAutoBcc, userVbIncomingProcessId) => {
  return !isAutoBccDuThao && (!isAutoBcc || userVbIncomingProcessId);
};

export const canKetThucSelector = createSelector(
  [
    flowInstanceSelector,
    processSelector,
    stepSelector,
    documentSelector,
    modeSelector,
    deptRoleSelector,
    isAutoBccDuThaoSelector,
    isAutoBccSelector,
  ],
  (
    flowInstance,
    vbProcess,
    vbProcessStep,
    document,
    mode,
    deptRole,
    isAutoBccDuThao,
    isAutoBcc
  ) => {
    let modeStatus = null;
    if (global.hasDeeplink) {
      modeStatus = global.typeDocDetail;
    } else {
      modeStatus = mode;
    }
    if (modeStatus === DOCUMENT_TYPE.VB_DEN) {
      return (
        checkBcc(isAutoBccDuThao, isAutoBcc, vbProcess?.id) &&
        (document?.status === INCOMING_DOC_STATUS.DANG_XU_LY ||
          document?.status === INCOMING_DOC_STATUS.TAO_MOI) &&
        flowInstance?.status === FLOW_INSTANCE_STATUS.DANG_XU_LY &&
        (vbProcess?.status === INCOMING_PROCESS_STATUS.CHO_XU_LY ||
          vbProcess?.status === INCOMING_PROCESS_STATUS.DA_XU_LY) &&
        vbProcess.receiverId === deptRole?.userId
      );
    }

    return (
      vbProcess?.status === OUTGOING_PROCESS_STATUS.CHO_XU_LY &&
      (vbProcessStep?.posType === STEP_POS_TYPE.KET_THUC ||
        vbProcessStep?.posType === STEP_POS_TYPE.BOTH)
    );
  }
);

export const canChuyenXuLyDonviSelector = createSelector(
  [nextStepsSelector, modeSelector, processSelector],
  (nextSteps, mode, vbProcess) => {
    let modeStatus = null;
    if (global.hasDeeplink) {
      modeStatus = global.typeDocDetail;
    } else {
      modeStatus = mode;
    }
    // return (
    //   modeStatus === DOCUMENT_TYPE.VB_DEN &&
    //   !!nextSteps?.find(step => step.stepType === STEP_TYPE.DON_VI) &&
    //   vbProcess?.status !== INCOMING_PROCESS_STATUS.KET_THUC &&
    //   vbProcess?.status !== INCOMING_PROCESS_STATUS.TU_CHOI
    // );
    return true;
  }
);

export const canChuyenXuLySelector = createSelector(
  [
    processSelector,
    stepSelector,
    modeSelector,
    nextStepsSelector,
    isAutoBccDuThaoSelector,
    isAutoBccSelector,
  ],
  (vbProcess, vbProcessStep, mode, nextSteps, isAutoBccDuThao, isAutoBcc) => {
    let modeStatus = null;
    if (global.hasDeeplink) {
      modeStatus = global.typeDocDetail;
    } else {
      modeStatus = mode;
    }
    const notEndNode =
      _.isObject(vbProcessStep) &&
      vbProcessStep.posType !== STEP_POS_TYPE.KET_THUC &&
      vbProcessStep.posType !== STEP_POS_TYPE.BOTH;

    if (modeStatus === DOCUMENT_TYPE.VB_DEN) {
      // return (
      //   (vbProcess?.status === INCOMING_PROCESS_STATUS.CHO_XU_LY ||
      //     vbProcess?.status === INCOMING_PROCESS_STATUS.DA_XU_LY) &&
      //   notEndNode &&
      //   !!nextSteps?.find(step => step.stepType === STEP_TYPE.CA_NHAN)
      // );

      return true;
    }
    return (
      checkBcc(isAutoBccDuThao, isAutoBcc, vbProcess?.id) &&
      vbProcess?.status === OUTGOING_PROCESS_STATUS.CHO_XU_LY &&
      notEndNode
    );
  }
);

export const canThuHoiProcessSelector = createSelector(
  [
    processSelector,
    documentSelector,
    modeSelector,
    deptRoleSelector,
    isAutoBccDuThaoSelector,
    isAutoBccSelector,
  ],
  (vbProcess, document, mode, deptRole, isAutoBccDuThao, isAutoBcc) => {
    let modeStatus = null;
    if (global.hasDeeplink) {
      modeStatus = global.typeDocDetail;
    } else {
      modeStatus = mode;
    }
    if (vbProcess && document) {
      if (
        checkBcc(isAutoBccDuThao, isAutoBcc, vbProcess?.id) &&
        modeStatus === DOCUMENT_TYPE.VB_DEN &&
        document.status === INCOMING_DOC_STATUS.DANG_XU_LY &&
        vbProcess.receiverId === deptRole?.userId &&
        vbProcess.status === INCOMING_PROCESS_STATUS.DA_XU_LY
      ) {
        return true;
      }

      if (
        modeStatus === DOCUMENT_TYPE.VB_DI &&
        document.status === OUTGOING_DOC_STATUS.DANG_XU_LI &&
        vbProcess.status === OUTGOING_PROCESS_STATUS.DA_XU_LY
      ) {
        return true;
      }
    }

    return false;
  }
);

export const canThuHoiVanThuSelector = createSelector(
  [processSelector, documentSelector, modeSelector, deptRoleSelector],
  (vbProcess, document, mode, deptRole) => {
    let modeStatus = null;
    if (global.hasDeeplink) {
      modeStatus = global.typeDocDetail;
    } else {
      modeStatus = mode;
    }
    if (!vbProcess && document) {
      if (
        modeStatus === DOCUMENT_TYPE.VB_DEN &&
        document.status === INCOMING_DOC_STATUS.DANG_XU_LY &&
        document.toDeptId === deptRole?.deptId
      ) {
        return true;
      }

      if (
        modeStatus === DOCUMENT_TYPE.VB_DI &&
        document.status === OUTGOING_DOC_STATUS.DANG_XU_LI &&
        document.creatorId === deptRole?.userId
      ) {
        return true;
      }
    }

    return false;
  }
);

export const canThuHoiSelector = createSelector(
  [canThuHoiProcessSelector, canThuHoiVanThuSelector],
  (canThuHoiProcess, canThuHoiVanThu) => canThuHoiProcess || canThuHoiVanThu
);

export const canTuChoiSelector = createSelector(
  [
    processSelector,
    documentSelector,
    stepSelector,
    modeSelector,
    forwardProcessSelector,
    deptRoleSelector,
    isAutoBccDuThaoSelector,
    isAutoBccSelector,
  ],
  (vbProcess, document, vbStep, mode, forwardProcess, selector, isAutoBccDuThao, isAutoBcc) => {
    let modeStatus = null;
    if (global.hasDeeplink) {
      modeStatus = global.typeDocDetail;
    } else {
      modeStatus = mode;
    }
    if (modeStatus === DOCUMENT_TYPE.VB_DEN) {
      let isReject =
        checkBcc(isAutoBccDuThao, isAutoBcc, vbProcess?.id) &&
        !(forwardProcess && forwardProcess.parentId != null) &&
        selector.roleCode === ROLE.LANH_DAO &&
        vbProcess &&
        vbProcess.status == INCOMING_PROCESS_STATUS.CHO_XU_LY &&
        vbStep &&
        (vbStep.posType == STEP_POS_TYPE.BAT_DAU || vbStep.posType == STEP_POS_TYPE.BOTH);
      return isReject;
    }
    if (modeStatus === DOCUMENT_TYPE.VB_DI) {
      return vbProcess?.status === OUTGOING_PROCESS_STATUS.CHO_XU_LY;
    }

    return false;
  }
);

export const canCCVanBan = createSelector(
  [processSelector, documentSelector, modeSelector, isAutoBccDuThaoSelector, isAutoBccSelector],
  (vbProcess, document, mode, isAutoBccDuThao, isAutoBcc) => {
    let modeStatus = null;
    if (global.hasDeeplink) {
      modeStatus = global.typeDocDetail;
    } else {
      modeStatus = mode;
    }
    if (
      checkBcc(isAutoBccDuThao, isAutoBcc, vbProcess?.id) &&
      modeStatus === DOCUMENT_TYPE.VB_DI &&
      document?.status === OUTGOING_DOC_STATUS.DA_BAN_HANH
    ) {
      return true;
    }
    return false;
  }
);

export const canChoYKien = createSelector(
  [documentSelector, modeSelector, deptRoleSelector, opinionFormSelector],
  (document, mode, deptRole, opinionForm) => {
    let modeStatus = null;
    if (global.hasDeeplink) {
      modeStatus = global.typeDocDetail;
    } else {
      modeStatus = mode;
    }
    const listDeptRoles = store.getState().auth.me.deptRoles;
    let currentRole = listDeptRoles.find(o => o.deptId === deptRole.deptId);
    return (
      modeStatus === DOCUMENT_TYPE.VB_DEN &&
      (!_.isNil(opinionForm) && !_.isEmpty(opinionForm)) &&
      currentRole?.deptCode === HDTV_DEPT_CODE &&
      (document?.docTypeCode === CATEGORY_CODE.TO_TRINH_XIN_Y_KIEN_HDTV ||
        document?.docTypeCode === CATEGORY_CODE.GIAI_TRINH_Y_KIEN_HDTV)
    );
  }
);

export const pagesNumberOfDocSelector = createSelector(
  [detailSelector],
  detail => detail.pagesNumberOfDoc
);
