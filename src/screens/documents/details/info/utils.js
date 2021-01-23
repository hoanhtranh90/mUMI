import _ from 'lodash';
import format from 'date-fns/format';

import {
  DOCUMENT_TYPE,
  HIGH_LEVELS_PIORITY_IDS,
  OUTGOING_DOC_STATUS,
} from 'eoffice/constants/documents';
import colors from 'eoffice/utils/colors';

function getRedTextStyle(target, list) {
  return document => {
    if (!document) {
      return {};
    }

    const val = _.get(document, target);
    if (list.indexOf(val) >= 0) {
      return {
        color: colors.red,
      };
    }

    return {};
  };
}

const VB_DI_FIELD = [
  { icon: 'book', label: 'Loại văn bản', path: 'docTypeName' },
  { icon: 'calendar', label: 'Hạn xử lý', path: 'deadlineDate', formatter: 'dateTime' },
  { icon: 'edit-2', label: 'Đơn vị ban hành', path: 'publisherName' },
  {
    icon: 'zap',
    label: 'Độ khẩn',
    path: 'priorityName',
    getTextStyle: getRedTextStyle('priorityId', HIGH_LEVELS_PIORITY_IDS),
  },
  { icon: 'file-text', label: 'Số trang', path: 'numberOfPage' },
  { icon: 'copy', label: 'Số bản', path: 'numberOfCopy' },
  { icon: 'map-pin', label: 'Nơi nhận bên trong', path: 'receivers.objectName' },
  { icon: 'map-pin', label: 'Nơi nhận bên ngoài', path: 'otherReceivePlaces' },
];

const DA_PHAT_HANH = [
  { icon: 'hash', label: 'Số ký hiệu', path: 'docCode' },
  // { icon: 'calendar', label: 'Ngày văn bản', path: 'docDate', formatter: 'date' },
  { icon: 'calendar', label: 'Ngày chuyển', path: 'docDate', formatter: 'date' },
];

export function getFields(mode, status) {
  if (mode === DOCUMENT_TYPE.VB_DEN) {
    return [
      {
        icon: 'hash',
        label: 'Số ký hiệu',
        paths: ['docCode'],
        key: 'docCodeBookNumber',
      },
      // { icon: 'hash', label: 'Số ký hiệu', path: 'docCode' },
      // { icon: 'calendar', label: 'Ngày văn bản', path: 'docDate', formatter: 'date' },
      { icon: 'calendar', label: 'Ngày chuyển', path: 'docDate', formatter: 'date' },
      { icon: 'bookmark', label: 'Loại văn bản', path: 'docTypeName' },
      { icon: 'edit-2', label: 'Đơn vị phát hành (bên trong)', path: 'publisherName' },
      { icon: 'edit-2', label: 'Đơn vị phát hành (bên ngoài)', path: 'outsidePublisherName' },
      { icon: 'calendar', label: 'Hạn xử lý', path: 'deadlineDate', formatter: 'dateTime' },

      {
        icon: 'zap',
        label: 'Độ khẩn',
        path: 'priorityName',
        getTextStyle: getRedTextStyle('priorityId', HIGH_LEVELS_PIORITY_IDS),
      },
      { icon: 'file-text', label: 'Số trang', path: 'numberOfPage' },
      { icon: 'copy', label: 'Số bản', path: 'numberOfCopy' },
    ];
  }

  if (status === OUTGOING_DOC_STATUS.DA_BAN_HANH) {
    return [...DA_PHAT_HANH, ...VB_DI_FIELD];
  }
  return VB_DI_FIELD;
}

export function getValue(document, path, formatter = undefined) {
  if (!document) {
    return null;
  }

  if (_.isArray(path)) {
    let val;

    let idx = 0;
    while (!val && path[idx]) {
      val = getValue(document, path[idx], formatter);
      idx += 1;
    }

    return val;
  }
  // only supporting 1 . for now
  if (path.indexOf('.') >= 0) {
    const parts = path.split('.');

    const obj = _.get(document, parts[0]);
    if (_.isArray(obj)) {
      const v = _.map(obj, parts[1]).join('\n');
      return v;
    }
    return _.get(obj, parts[1]);
  }

  const val = _.get(document, path);

  if (formatter === 'date' && val) {
    return format(val, 'dd/MM/yyyy');
  }

  if (formatter === 'dateTime' && val) {
    return format(val, 'dd/MM/yyyy hh:mm');
  }

  return val;
}

export function getValueByKey(document, paths, formatters = undefined) {
  if (!document) {
    return null;
  }
  const vals = [];
  for (let i = 0; i < paths.length; i += 1) {
    const path = paths[i];
    const val = getValue(document, path, formatters ? formatters[i] : undefined);
    vals.push(val);
  }
  return vals.join(' - ');
}
