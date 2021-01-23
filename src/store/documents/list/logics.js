import { createLogic } from 'redux-logic';

import { DOC_USER_STATUS, DOCUMENT_TYPE, OUTGOING_DOC_STATUS } from '../../../constants/documents';
import { actions as detailActions } from '../detail';
import * as selectors from './selectors';
import * as service from './service';
import slice from './slice';
import filters from '../../../utils/quick-filters';
import { convertQueryToTrinhQuaHan } from '../../../utils/utils';
import utilService from '../../../service/utils';
const createTimeMonthFilter = filters.find(filter => filter.id === 'createTimeMonthAgo');

const { actions } = slice;

function convertQueryListAndCountDocument(query, mode) {
  if (mode === DOCUMENT_TYPE.VB_DEN) {
    const fromSendTime = query.docDate[0].getTime();
    const toSendTime = query.docDate[1].getTime();
    let queryFinal = { ...query, fromSendTime, toSendTime };
    queryFinal.includeBcc = true;
    delete queryFinal.docDate;
    if (queryFinal.relationType === 'nguoiUyQuyen') {
      delete queryFinal.status;
    }
    delete queryFinal.createTime;
    delete queryFinal.filterLabel;
    return queryFinal;
  } else {
    let queryFinal;
    if (query.status === 1 || (query.typeDoc === 'duthao' && query.filterStatus === 'daXuLy')) {
      const fromVbDocUserUpdateTime = query.createTime
        ? query.createTime[0].getTime()
        : query.docDate[0];
      const toVbDocUserUpdateTime = query.createTime
        ? query.createTime[1].getTime()
        : query.docDate[1];
      queryFinal = { ...query, fromVbDocUserUpdateTime, toVbDocUserUpdateTime };
    } else if (query.typeDoc === 'phathanh') {
      const fromDocDate = query.createTime ? query.createTime[0].getTime() : query.docDate[0];
      const toDocDate = query.createTime ? query.createTime[1].getTime() : query.docDate[1];
      queryFinal = { ...query, fromDocDate, toDocDate };
      if (query.filterStatus === 'cc') {
        queryFinal.sort = 'docDate,desc';
        queryFinal.status = '';
        delete queryFinal.isRead;
        delete queryFinal.keyword;
        delete queryFinal.typeDoc;
      }
    } else if (query.typeDoc === 'duthao' && query.filterStatus === 'choXuLy') {
      const fromProcessTime = query.createTime ? query.createTime[0].getTime() : query.docDate[0];
      const toProcessTime = query.createTime ? query.createTime[1].getTime() : query.docDate[1];
      queryFinal = { ...query, fromProcessTime, toProcessTime };
    } else {
      const fromCreateTime = query.createTime ? query.createTime[0].getTime() : query.docDate[0];
      const toCreateTime = query.createTime ? query.createTime[1].getTime() : query.docDate[1];
      queryFinal = { ...query, fromCreateTime, toCreateTime };
    }
    delete queryFinal.createTime;
    delete queryFinal.docDate;
    delete queryFinal.type;
    delete queryFinal.filterLabel;
    return queryFinal;
  }
}

const countDocumentsLogic = createLogic({
  type: actions.countDocuments,
  latest: true,
  processOptions: {
    successType: actions.countDocumentsSuccess,
  },
  async process({ getState }) {
    const state = getState();
    const mode = selectors.modeSelector(state);
    const query = selectors.querySelector(state);
    const paginate = selectors.paginateSelector(state);
    let total;
    let totalCT;
    let totalNDB;
    let totalPH;
    let queryFinal = convertQueryListAndCountDocument(query, mode);
    if (mode === DOCUMENT_TYPE.VB_DEN) {
      total = await service.countInDocuments({ ...queryFinal });
      totalCT = await service.countInDocuments({ ...queryFinal, processType: 0 });
      totalNDB = await service.countInDocuments({ ...queryFinal, processType: 1 });
      totalPH = await service.countInDocuments({ ...queryFinal, processType: 2 });
    } else {
      if (
        (query.filterStatus === 'all' ||
          query.filterStatus === 'phoiHop' ||
          query.filterStatus === 'uyQuyen') &&
        query.typeDoc === 'duthao'
      ) {
        delete queryFinal.status;
      }
      total = await service.countOutDocuments({ ...queryFinal });
    }
    let unreadReleased = 0;
    if (query.docStatus === OUTGOING_DOC_STATUS.DA_BAN_HANH) {
      unreadReleased = await service.countOutDocuments({ ...queryFinal, isRead: 0 });
    }
    return {
      total,
      totalCT,
      totalNDB,
      totalPH,
      unreadReleased,
    };
  },
});

const getCountTTrinhLogic = createLogic({
  type: actions.getCountTTrinh,
  processOptions: {
    successType: actions.getCountTTrinhSuccess,
  },
  async process({ action: { payload }, getState }) {
    console.log(payload);
    const state = getState();
    const query = selectors.querySelector(state);
    return await Promise.all(
      [
        DOC_USER_STATUS.TO_TRINH_CHUA_YK,
        DOC_USER_STATUS.TO_TRINH_DCXL,
        DOC_USER_STATUS.TO_TRINH_DBL,
        DOC_USER_STATUS.TO_TRINH_CXL,
      ].map(type => {
        const { toTrinhQuaHan, isCommented, status } = convertQueryToTrinhQuaHan(type);
        return service
          .findAllToTrinhQuaHanCount({
            status: status,
            docDate: query.docDate,
            filterLabel: query.filterLabel,
            keyword: '',
            isRead: null,
            toTrinhQuaHan,
            isCommented,
          })
          .then(res => ({ [type]: res.data }));
      })
    );
  },
});

const getSummaryLogic = createLogic({
  type: actions.getSummary,
  latest: true,
  processOptions: {
    successType: actions.getSummarySuccess,
  },
  async process() {
    const arrayDateMonth = createTimeMonthFilter.getValue();
    const stats = await Promise.all([
      service.countInDocuments({
        status: DOC_USER_STATUS.CHO_XU_LY,
        fromDocDate: arrayDateMonth[0].getTime(),
        toDocDate: arrayDateMonth[1].getTime(),
      }),
      service.countOutDocuments({
        docStatus: [
          OUTGOING_DOC_STATUS.TAO_MOI,
          OUTGOING_DOC_STATUS.DANG_XU_LI,
          OUTGOING_DOC_STATUS.CHO_BAN_HANH,
          OUTGOING_DOC_STATUS.TU_CHOI,
          OUTGOING_DOC_STATUS.TU_CHOI_BANHANH,
        ],
        fromProcessTime: arrayDateMonth[0].getTime(),
        toProcessTime: arrayDateMonth[1].getTime(),
        status: [DOC_USER_STATUS.CHO_XU_LY],
      }),
      service.countOutDocuments({
        docStatus: OUTGOING_DOC_STATUS.DA_BAN_HANH,
        isRead: 0,
        fromDocDate: arrayDateMonth[0].getTime(),
        toDocDate: arrayDateMonth[1].getTime(),
      }),
    ]);

    const totalCT = await Promise.all([
      service.countInDocuments({
        processType: 0,
        status: DOC_USER_STATUS.CHO_XU_LY,
        fromDocDate: arrayDateMonth[0].getTime(),
        toDocDate: arrayDateMonth[1].getTime(),
      }),
    ]);

    const totalNDB = await Promise.all([
      service.countInDocuments({
        processType: 1,
        status: DOC_USER_STATUS.CHO_XU_LY,
        fromDocDate: arrayDateMonth[0].getTime(),
        toDocDate: arrayDateMonth[1].getTime(),
      }),
    ]);

    const totalPH = await Promise.all([
      service.countInDocuments({
        processType: 2,
        status: DOC_USER_STATUS.CHO_XU_LY,
        fromDocDate: arrayDateMonth[0].getTime(),
        toDocDate: arrayDateMonth[1].getTime(),
      }),
    ]);

    return {
      [DOCUMENT_TYPE.VB_DEN]: {
        [DOC_USER_STATUS.CHO_XU_LY]: stats[0],
      },
      [DOCUMENT_TYPE.VB_DI]: {
        [DOC_USER_STATUS.DU_THAO]: stats[1],
        [DOC_USER_STATUS.DA_PHAT_HANH]: stats[2],
      },
      totalCT,
      totalNDB,
      totalPH,
    };
  },
});

const listDocumentsLogic = createLogic({
  type: actions.listDocuments,
  cancelType: actions.cancelListDocuments,
  latest: true,
  processOptions: {
    failType: actions.listDocumentsFailed,
    successType: actions.listDocumentsSuccess,
  },
  process({ getState }) {
    const state = getState();
    const query = selectors.querySelector(state);

    let paginate = selectors.paginateSelector(state);
    const mode = selectors.modeSelector(state);
    let queryFinal = convertQueryListAndCountDocument(query, mode);

    if (mode === DOCUMENT_TYPE.VB_DEN) {
      if (query.toTrinhQuaHan) {
        return service.listToTrinh({ ...queryFinal, ...paginate });
      }
      return service.listInDocuments({ ...queryFinal, ...paginate });
    }
    return service.listOutDocuments({ ...queryFinal, ...paginate });
  },
});

const listPrioritiesLogic = createLogic({
  type: actions.listPriorities,
  processOptions: {
    successType: actions.listPrioritiesSuccess,
  },
  process() {
    return service.listPriorities();
  },
});

const listCategoriesLogic = createLogic({
  type: actions.listCategories,
  processOptions: {
    successType: actions.listCategoriesSuccess,
  },
  process() {
    return service.listCategories();
  },
});

const updateQueryLogic = createLogic({
  type: actions.updateQuery,
  process(deps, dispatch, done) {
    dispatch(actions.cancelListDocuments());
    dispatch(actions.countDocuments());
    dispatch(actions.getCountTTrinh());
    dispatch(actions.listDocuments());
    done();
  },
});

const viewDetailLogic = createLogic({
  type: actions.viewDetail,
  async process(
    {
      action: { payload: docUserView },
      getState,
    },
    dispatch,
    done
  ) {
    const state = getState();
    let mode = null;
    if (global.hasDeeplink) {
      mode = global.typeDocDetail;
    } else {
      mode = selectors.modeSelector(state);
    }
    const { docId: documentId, vbDocUserVbDocProcessId: processId } = docUserView;
    dispatch(detailActions.loadDetail({ documentId, processId }));
    if (!docUserView.isSeen) {
      await service.markAsRead({
        documentId,
        processId: mode === DOCUMENT_TYPE.VB_DI ? processId : undefined,
      });
      dispatch(actions.markAsRead(docUserView.key));
      utilService.refreshNotificationUnseen();
    }

    done();
  },
});

export default [
  getCountTTrinhLogic,
  countDocumentsLogic,
  getSummaryLogic,
  listDocumentsLogic,
  listCategoriesLogic,
  listPrioritiesLogic,
  updateQueryLogic,
  viewDetailLogic,
];
