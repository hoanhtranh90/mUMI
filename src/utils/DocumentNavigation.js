import store from '../store';
import { actions } from '../store/documents/list';
import NavigationService from './NavigationService';
import {
  DOC_USER_STATUS,
  OUTGOING_DOC_STATUS,
  INCOMING_PROCESS_STATUS,
} from '../constants/documents';
import filters from './quick-filters';
import { convertQueryToTrinhQuaHan } from './utils';
import moment from 'moment';
const docDateYearFilter = filters.find(filter => filter.id === 'docDateThisYear');
const createTimeMonthFilter = filters.find(filter => filter.id === 'createTimeMonthAgo');

export const goToSummary = mode => {
  store.dispatch(actions.setMode(mode));
  NavigationService.navigate('Documents');
};

export const goToToTrinh = type => {
  let fromDate = moment()
    .subtract(5, 'days')
    .startOf('day')
    .subtract(3, 'months')
    .toDate();
  let toDate = moment()
    .subtract(5, 'days')
    .startOf('day')
    .toDate();
  const { toTrinhQuaHan, isCommented, status } = convertQueryToTrinhQuaHan(type);
  store.dispatch(
    actions.updateQuery({
      status: status,
      docDate: [fromDate, toDate],
      filterLabel: docDateYearFilter.label,
      keyword: '',
      isRead: null,
      toTrinhQuaHan,
      isCommented,
    })
  );
  NavigationService.navigate('List', {
    status: type,
    isIn: true,
    fromCXL: false,
  });
};

export const goToVbDenCxl = () => {
  store.dispatch(
    actions.updateQuery({
      status: DOC_USER_STATUS.CHO_XU_LY,
      docDate: createTimeMonthFilter.getValue(),
      filterLabel: createTimeMonthFilter.label,
      keyword: '',
      isRead: null,
    })
  );
  NavigationService.navigate('List', {
    status: DOC_USER_STATUS.CHO_XU_LY,
    isIn: true,
    fromCXL: true,
  });
};

export const goToVbDenCxlWithType = (type, status) => {
  store.dispatch(
    actions.updateQuery({
      processType: type,
      status: DOC_USER_STATUS.CHO_XU_LY,
      docDate: createTimeMonthFilter.getValue(),
      filterLabel: createTimeMonthFilter.label,
      keyword: '',
      isRead: null,
    })
  );
  NavigationService.navigate('List', {
    status: status,
    type: type,
    isIn: true,
    fromCXL: true,
  });
};

export const goToVbDenDxl = () => {
  store.dispatch(
    actions.updateQuery({
      status: DOC_USER_STATUS.DA_XU_LY,
      docDate: createTimeMonthFilter.getValue(),
      filterLabel: createTimeMonthFilter.label,
      keyword: '',
      isRead: null,
    })
  );
  NavigationService.navigate('List', {
    status: DOC_USER_STATUS.DA_XU_LY,
    isIn: true,
    fromCXL: false,
  });
};

export const goToVbDenDxlWithType = (type, status) => {
  store.dispatch(
    actions.updateQuery({
      processType: type,
      status: DOC_USER_STATUS.DA_XU_LY,
      docDate: createTimeMonthFilter.getValue(),
      filterLabel: createTimeMonthFilter.label,
      keyword: '',
      isRead: null,
    })
  );
  NavigationService.navigate('List', {
    status: status,
    type: type,
    isIn: true,
    fromCXL: false,
  });
};

export const goToVbDenUyQuyen = () => {
  store.dispatch(
    actions.updateQuery({
      status: DOC_USER_STATUS.UY_QUYEN,
      docDate: createTimeMonthFilter.getValue(),
      filterLabel: createTimeMonthFilter.label,
      relationType: 'nguoiUyQuyen',
      keyword: '',
      isRead: null,
    })
  );
  NavigationService.navigate('List', {
    status: DOC_USER_STATUS.UY_QUYEN,
    isIn: true,
    fromCXL: false,
  });
};

export const goToDuThaoCxl = () => {
  store.dispatch(
    actions.updateQuery({
      relationType: null,
      docStatus: [
        OUTGOING_DOC_STATUS.TAO_MOI,
        OUTGOING_DOC_STATUS.DANG_XU_LI,
        OUTGOING_DOC_STATUS.CHO_BAN_HANH,
        OUTGOING_DOC_STATUS.TU_CHOI,
        OUTGOING_DOC_STATUS.TU_CHOI_BANHANH,
      ],
      createTime: createTimeMonthFilter.getValue(),
      filterLabel: createTimeMonthFilter.label,
      status: DOC_USER_STATUS.CHO_XU_LY,
      filterStatus: 'choXuLy',
      sort: 'processTime',
      typeDoc: 'duthao',
      keyword: '',
      isRead: null,
    })
  );
  NavigationService.navigate('OutDocDrafts', {
    status: DOC_USER_STATUS.DU_THAO,
    fromPH: false,
  });
};

export const goToVbPhatHanh = () => {
  store.dispatch(
    actions.updateQuery({
      relationType: null,
      docStatus: OUTGOING_DOC_STATUS.DA_BAN_HANH,
      createTime: createTimeMonthFilter.getValue(),
      filterLabel: createTimeMonthFilter.label,
      sort: 'docDate',
      typeDoc: 'phathanh',
      filterStatus: 'all',
      keyword: '',
      isRead: null,
    })
  );
  NavigationService.navigate('OutDocDrafts', {
    status: DOC_USER_STATUS.DA_PHAT_HANH,
    fromPH: true,
  });
};
