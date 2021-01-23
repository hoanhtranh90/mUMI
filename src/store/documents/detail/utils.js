import {
  ACTION_LOGS,
  DOCUMENT_TYPE,
  OUTGOING_PROCESS_STATUS,
  PROCESS_TYPES,
  STEP_TYPE,
} from 'eoffice/constants/documents';
import colors from 'eoffice/utils/colors';

function processesByParentId(processes) {
  const map = {};

  processes.forEach(process => {
    const { parentId } = process;
    if (!map[parentId]) {
      map[parentId] = [];
    }
    map[parentId].push(process);
  });

  return map;
}

function getProcessBadge(processType) {
  switch (processType) {
    case PROCESS_TYPES.CHU_TRI.value:
      return {
        badge: PROCESS_TYPES.CHU_TRI.text,
        badgeColor: colors.lightGreen,
        textColor: colors.green,
      };

    case PROCESS_TYPES.NHAN_DE_BIET.value:
      return {
        badge: PROCESS_TYPES.NHAN_DE_BIET.text,
        badgeColor: colors.lightYellow,
        textColor: colors.yellow,
      };

    case PROCESS_TYPES.PHOI_HOP.value:
      return {
        badge: PROCESS_TYPES.PHOI_HOP.text,
        badgeColor: colors.lightPink,
        textColor: colors.pink,
      };

    default:
      return {};
  }
}

function buildReleaseTree(incomingDocs) {
  let minTime = incomingDocs[0].createTime;

  const children = incomingDocs.map(doc => {
    if (doc.createTime < minTime) {
      minTime = doc.createTime;
    }

    return {
      id: doc.id,
      title: doc.deptName,
      timestamp: doc.createTime,
      isDept: true,
      titleOnly: true,
    };
  });

  return {
    children,
    id: 'banHanh',
    title: 'Ban Hành',
    timestamp: minTime,
    rounded: true,
  };
}

function buildChuyenTiepTree(processes) {
  if (!processes?.length) {
    return [];
  }

  const children = processes.map(process => ({
    id: process.id,
    title: process.deptReceiverName,
    timestamp: process.createTime,
    checked: !!process.isRead,
    isDept: true,
  }));

  return children;
}

function buildTuChoiNode(process) {
  return {
    id: 'tuChoi',
    title: 'Từ chối',
    rounded: true,
    timestamp: process.updateTime,
  };
}

function buildTreeNode(vbProcess, allProcesses, incomingDocs, mode) {
  const node = {
    ...(mode === DOCUMENT_TYPE.VB_DEN ? getProcessBadge(vbProcess.processType) : {}),
    id: vbProcess.id,
    title: vbProcess.receiverName,
    subtitle: vbProcess.receiverPosName,
    deptName: vbProcess.deptReceiverName,
    checked: !!vbProcess.isRead,
    timestamp: vbProcess.createTime,
    receiverId: vbProcess.receiverId,
  };

  if (Array.isArray(allProcesses[vbProcess.id]) && allProcesses[vbProcess.id].length) {
    const childProcesses = allProcesses[vbProcess.id];

    if (mode === DOCUMENT_TYPE.VB_DEN) {
      const caNhanProcesses = childProcesses.filter(
        process => !process.stepType || process.stepType === STEP_TYPE.CA_NHAN
      );
      const donViProcesses = childProcesses.filter(
        process => process.stepType === STEP_TYPE.DON_VI
      );

      node.children = [
        ...buildChuyenTiepTree(donViProcesses),
        ...caNhanProcesses.map(p => buildTreeNode(p, allProcesses, incomingDocs, mode)),
      ];
    } else {
      node.children = childProcesses.map(p => buildTreeNode(p, allProcesses, incomingDocs, mode));
    }
  } else if (mode === DOCUMENT_TYPE.VB_DI && vbProcess.status === OUTGOING_PROCESS_STATUS.TU_CHOI) {
    node.children = [buildTuChoiNode(vbProcess)];
  } else if (Array.isArray(incomingDocs) && incomingDocs.length) {
    node.children = [buildReleaseTree(incomingDocs)];
  }

  return node;
}

export function buildHistoryTree({
  vbProcess,
  allProcesses,
  incomingDocs,
  document,
  mode = DOCUMENT_TYPE.VB_DEN,
  isAutoBccDuThao,
}) {
  let processesByParent;
  let tree;
  if (allProcesses && allProcesses.length > 0) {
    processesByParent = processesByParentId(allProcesses);
    tree = vbProcess.map(process => buildTreeNode(process, processesByParent, incomingDocs, mode));
  } else tree = [];
  if (mode === DOCUMENT_TYPE.VB_DEN && !isAutoBccDuThao) {
    if (document.forwardDeptName) {
      return {
        id: 'donViChuyenTiep',
        title: document.forwardDeptName,
        timestamp: document.incomingDate,
        badge: 'Chuyển tiếp',
        badgeColor: colors.lightBlue,
        textColor: colors.blue,
        isDept: true,
        children: tree ? [...tree] : null,
      };
    }
    return {
      id: 'donViBanHanh',
      title: document.publisherName || document.outsidePublisherName,
      timestamp: document.incomingDate,
      badge: 'Ban hành',
      badgeColor: colors.lightBlue,
      textColor: colors.blue,
      isDept: true,
      children: tree ? [...tree] : null,
    };
  }

  return {
    id: 'editor',
    title: isAutoBccDuThao && vbProcess[0] ? vbProcess[0].senderName : document.editorName,
    subtitle:
      isAutoBccDuThao && vbProcess[0] ? vbProcess[0].roleSenderName : document.editorRoleName,
    deptName:
      isAutoBccDuThao && vbProcess[0] ? vbProcess[0].deptSenderName : document.deptEditorName,
    editorId: isAutoBccDuThao && vbProcess[0] ? vbProcess[0].senderId : document.editorId,
    timestamp: document.createTime,
    children: tree ? [...tree] : null,
  };
}

const toUserActions = new Set([
  ACTION_LOGS.ACTION_NAMES.CC,
  ACTION_LOGS.ACTION_NAMES.BANHANH,
  ACTION_LOGS.ACTION_NAMES.CHOBANHANH,
  ACTION_LOGS.ACTION_NAMES.CHUYENXULI,
  ACTION_LOGS.ACTION_NAMES.CHUYENXULI_DONVI,
  ACTION_LOGS.ACTION_NAMES.THUHOI,
  ACTION_LOGS.ACTION_NAMES.THUHOI_BANHANH,
  ACTION_LOGS.ACTION_NAMES.TUCHOI,
  ACTION_LOGS.ACTION_NAMES.CHUYENXULI_KYSO,
  ACTION_LOGS.ACTION_NAMES.BANHHANH_CANHAN,
  ACTION_LOGS.ACTION_NAMES.TUCHOI_TIEPNHAN,
  ACTION_LOGS.ACTION_NAMES.BANHANH_HIEUCHINH,
  ACTION_LOGS.ACTION_NAMES.BAN_HANH_TOI,
]);

export function convertActionLogToHistory(actionLog) {
  const data = actionLog.dataJson ? JSON.parse(actionLog.dataJson) : undefined;
  let toUsers;
  if (data && toUserActions.has(actionLog.actionName)) {
    toUsers = (Array.isArray(data) ? data : [data]).map(toUser => {
      if (actionLog.actionName === ACTION_LOGS.ACTION_NAMES.BANHANH_HIEUCHINH) {
        return {
          id: toUser.id,
          deptName: toUser.deptName,
        };
      }
      if (actionLog.actionName === ACTION_LOGS.ACTION_NAMES.BANHANH) {
        return {
          id: toUser.id || toUser.deptName,
          deptName: toUser.deptName,
        };
      }
      if (actionLog.actionName === ACTION_LOGS.ACTION_NAMES.CC) {
        return {
          id: toUser.id,
          fullName: toUser.receivedName,
          positionName: toUser.positionName,
        };
      }
      if (
        actionLog.actionName === ACTION_LOGS.ACTION_NAMES.CHUYENXULI_DONVI ||
        actionLog.actionName === ACTION_LOGS.ACTION_NAMES.THUHOI_BANHANH
      ) {
        return {
          id: toUser.toDeptId,
          deptName: toUser.toDeptName ? toUser.toDeptName : toUser.deptReceiverName,
        };
      }

      return {
        id: toUser.receiverId,
        deptName: toUser.deptReceiverName,
        fullName: toUser.receiverName,
        positionName: toUser.roleReceiverName,
      };
    });
  }
  return {
    toUsers,
    id: actionLog.id,
    actionName: actionLog.actionName,
    creatorName: actionLog.creatorName,
    creatorId: actionLog.creatorId,
    dataJson: data,
    createTime: actionLog.createTime,
    dataType: 'actionLog',
    content: actionLog.comment,
  };
}
