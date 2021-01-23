import _ from 'lodash';
import fp from 'lodash/fp';
import format from 'date-fns/format';
import formatDistance from 'date-fns/formatDistance';
import isSameYear from 'date-fns/isSameYear';
import isSameDay from 'date-fns/isSameDay';
import viLocale from 'date-fns/locale/vi';
import ImgToBase64 from 'react-native-image-base64';
import { DOC_USER_STATUS, INCOMING_PROCESS_STATUS } from '../constants/documents';
import {
  CHI_DAO_MESSAGE_TYPE,
  MESSAGE_TYPE_DIEU_XE,
  MESSAGE_TYPE_KHACH_SAN,
  MESSAGE_TYPE_MAY_BAY,
} from '../constants/administrative';
import * as h from './h';

export function convertCommentToHistory(comment) {
  return {
    id: comment.id,
    actionName: comment.actionName,
    creatorName: comment.creatorName,
    creatorId: comment.fromUserId,
    createTime: comment.createTime,
    dataType: 'comment',
    attachments: comment.attachments,
    toUsers: comment.toUsers,
    content: comment.content,
  };
}

export function convertLableModeDocument(status, modes) {
  let statusC = 1;
  if (status) {
    statusC = status;
  }
  for (const i in modes) {
    if (statusC === modes[i].type) {
      return modes[i].label.toUpperCase();
    }
  }
}

export const getInitial = fp.flow(
  fp.words,
  fp.map(w => w[0]),
  fp.join(''),
  fp.upperCase
);

export const formatQuery = query => {
  const formatted = {};

  _.forEach(query, (v, k) => {
    if (!_.isArray(v) || v.length !== 2 || !_.isDate(v[0])) {
      formatted[k] = v;
      return;
    }

    const [from, to] = v;
    formatted[`from${_.upperFirst(k)}`] = from.getTime();
    formatted[`to${_.upperFirst(k)}`] = to.getTime();
  });

  return formatted;
};

export const formatQueryDocument = query => {
  const formatted = {};

  _.forEach(query, (v, k) => {
    if (!_.isArray(v) || v.length !== 2 || !_.isDate(v[0])) {
      formatted[k] = v;
      return;
    }
  });

  return formatted;
};

export const formatDate = date => {
  const formatStr = isSameYear(new Date(), date) ? 'dd/MM/yyyy' : 'dd/MM/yyyy';

  return format(date, formatStr);
};

export const formatTimestamp = timestamp => {
  const date = new Date(timestamp);
  const sameDay = isSameDay(date, new Date());

  if (sameDay) {
    return formatDistance(date, new Date(), { addSuffix: true, locale: viLocale });
  }

  return format(date, 'dd/MM/yyyy HH:mm');
};

export const formatDateTime = timestamp => {
  const date = new Date(timestamp);
  const sameDay = isSameDay(date, new Date());

  if (sameDay) {
    return formatDistance(date, new Date(), { addSuffix: true, locale: viLocale });
  }

  return format(date, 'dd/MM/yyyy');
};

export function convertImgToBase64(path) {
  return ImgToBase64.getBase64String(path).then(base64String => base64String);
}

export const formatTextEdit = (text, getLength) => {
  let newText = '';
  const arrTxt = text.replace(/\n/g, ' ').split(' ');
  let countStrOfLine = 0;
  let strByLine = '';
  const arrTxtByLine = [];
  for (let i = 0; i < arrTxt.length; i += 1) {
    const ele = arrTxt[i];
    countStrOfLine += ele.length + 1;
    strByLine = `${strByLine}${ele} `;
    if (countStrOfLine > 20) {
      arrTxtByLine.push(strByLine);
      countStrOfLine = 0;
      strByLine = '';
    }
    if (i === arrTxt.length - 1) {
      arrTxtByLine.push(strByLine);
      countStrOfLine = 0;
      strByLine = '';
    }
  }
  for (let j = 0; j < arrTxtByLine.length; j += 1) {
    const ele = arrTxtByLine[j];
    newText = `${newText}${ele}\n`;
  }
  if (getLength) {
    return arrTxtByLine.length;
  }
  return newText;
};

export const compareUserDeptRoleView = (userDeptRole1, userDeptRole2) => {
  if (userDeptRole1.order !== userDeptRole2.order) return userDeptRole1.order - userDeptRole2.order;
  if (userDeptRole1.roleCode !== userDeptRole2.roleCode)
    if (userDeptRole1.roleCode === 'lanhdao') return -1;
    else if (userDeptRole2.roleCode === 'lanhdao') return 1;
  if (userDeptRole1.positionOrder !== userDeptRole2.positionOrder)
    return userDeptRole1.positionOrder > userDeptRole2.positionOrder ? 1 : -1;
  if (userDeptRole1.firstName !== userDeptRole2.firstName)
    return (xoaDau(userDeptRole1.firstName) || '').localeCompare(
      xoaDau(userDeptRole2.firstName) || ''
    );
  return (xoaDau(userDeptRole1.fullName) || '').localeCompare(xoaDau(userDeptRole2.fullName) || '');
};

export const compareDepartment = (department1, department2) => {
  if (department1.order !== department2.order) return department1.order - department2.order;
  return (xoaDau(department1.deptName) || '').localeCompare(xoaDau(department2.deptName) || '');
};

export const compareDeptPath = (department1, department2) => {
  return (department1.deptPath || '').localeCompare(department2.deptPath || '');
};

export const xoaDau = str => {
  // str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
  // str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
  // str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
  // str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
  // str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
  // str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
  // str = str.replace(/đ/g, 'd');
  str = str.toUpperCase();
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A');
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E');
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I');
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O');
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U');
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y');
  str = str.replace(/Đ/g, 'D');
  return str;
};

export const initGroupFilters = (apiFn, getUserDeptRoleIdFn) => {
  return Promise.all(
    ['hoidongthanhvien', 'bantonggiamdoc'].map(actorGroup =>
      apiFn(actorGroup).then(data => {
        return {
          actorGroup: actorGroup,
          actorGroupName: getGroupNameByCode(actorGroup),
          actorsInGroups: data,
        };
      })
    )
  ).then(results => {
    return results.map(result => {
      return {
        actorGroup: result.actorGroup,
        actorGroupName: result.actorGroupName,
        actorsInGroups: result.actorsInGroups,
        isMatch(actor) {
          return (
            actor &&
            this.actorsInGroups.findIndex(actor_ => actor_.id === getUserDeptRoleIdFn(actor)) > -1
          );
        },
        isFullOfGroups(actorsInGroup) {
          return (
            actorsInGroup &&
            actorsInGroup.length &&
            this.actorsInGroups &&
            this.actorsInGroups.length &&
            actorsInGroup.length === (this.actorsInGroups ? this.actorsInGroups.length : 0)
          );
        },
      };
    });
  });
};

export const groupActors = (actors, filters) => {
  let groups = [];
  let actors_ = (actors || []).slice();
  for (let index = 0; index < actors_.length; ) {
    let actor = actors_[index];
    let filter = filters.find(filter_ => filter_.isMatch(actor));
    if (filter) {
      let actorsInGroup = actors_.filter(actor_ => filter.isMatch(actor_));
      if (filter.isFullOfGroups(actorsInGroup)) {
        //neu da full user trong 1 nhom > gop lai thanh 1 nhom;
        groups.push({ type: 'group', data: actorsInGroup, filter: filter });
        actorsInGroup.forEach(actor_ => actors_.splice(actors_.indexOf(actor_), 1)); //loai bo actor trong danh sach cu;
      } else {
        groups.push({ type: 'item', data: actor });
        index++; //next item;
      }
    } else {
      groups.push({ type: 'item', data: actor });
      index++; //next item;
    }
  }
  return groups;
};

const getGroupNameByCode = code => {
  switch (code) {
    case 'hoidongthanhvien':
      return 'Hội đồng thành viên';
    case 'bantonggiamdoc':
      return 'Ban tổng giám đốc';
    default:
      return code;
  }
};
export function getNotifyActionNameByNotifyMessageType(messageType) {
  switch (messageType) {
    case CHI_DAO_MESSAGE_TYPE.BAO_CAO:
      return 'Báo cáo';
    case CHI_DAO_MESSAGE_TYPE.GIA_HAN:
      return 'Gia hạn';
    case CHI_DAO_MESSAGE_TYPE.CREATE:
      return 'Tạo mới';
    case CHI_DAO_MESSAGE_TYPE.UPDATE:
      return 'Cập nhật';
    case CHI_DAO_MESSAGE_TYPE.PHE_DUYET:
      return 'Phê duyệt';
    case CHI_DAO_MESSAGE_TYPE.HUY:
      return 'Hủy';
    case CHI_DAO_MESSAGE_TYPE.YCBS:
      return 'Yêu cầu bổ sung';
    case CHI_DAO_MESSAGE_TYPE.DK_DEADLINE:
      return 'Đăng ký hạn hoàn thành';
    case CHI_DAO_MESSAGE_TYPE.CHO_Y_KIEN:
      return 'Cho YK chỉ đạo';
    case MESSAGE_TYPE_DIEU_XE.CAP_NHAT:
    case MESSAGE_TYPE_MAY_BAY.CAP_NHAT:
    case MESSAGE_TYPE_KHACH_SAN.CAP_NHAT:
      return 'Cập nhật';
    case MESSAGE_TYPE_DIEU_XE.HUY_YEU_CAU:
    case MESSAGE_TYPE_MAY_BAY.HUY_YEU_CAU:
    case MESSAGE_TYPE_KHACH_SAN.HUY_YEU_CAU:
      return 'Hủy';
    case MESSAGE_TYPE_DIEU_XE.TU_CHOI:
    case MESSAGE_TYPE_MAY_BAY.TU_CHOI:
    case MESSAGE_TYPE_KHACH_SAN.TU_CHOI:
      return 'Từ chối';
    case MESSAGE_TYPE_DIEU_XE.PHE_DUYET:
    case MESSAGE_TYPE_MAY_BAY.PHE_DUYET:
    case MESSAGE_TYPE_KHACH_SAN.PHE_DUYET:
      return 'Phê duyệt';
    case MESSAGE_TYPE_DIEU_XE.DANG_KY:
    case MESSAGE_TYPE_MAY_BAY.DANG_KY:
    case MESSAGE_TYPE_KHACH_SAN.DANG_KY:
      return 'Đăng ký';
    default:
      return '';
  }
}

export function getHcCommandSectorName(sectorId, sectorCategories) {
  let category = h.find(sectorCategories, category => category.value === sectorId);
  return category ? category.label : '';
}

export const convertQueryToTrinhQuaHan = type => {
  let toTrinhQuaHan = 1;
  let isCommented = null;
  let status = [];

  switch (type) {
    case DOC_USER_STATUS.TO_TRINH_CHUA_YK:
      break;
    case DOC_USER_STATUS.TO_TRINH_CXL:
      isCommented = 0;
      status = [INCOMING_PROCESS_STATUS.CHO_XU_LY];
      break;
    case DOC_USER_STATUS.TO_TRINH_DCXL:
      status = [INCOMING_PROCESS_STATUS.DA_XU_LY];
      break;
    case DOC_USER_STATUS.TO_TRINH_DBL:
      isCommented = 1;
      break;
  }
  return { toTrinhQuaHan, isCommented, status };
};
