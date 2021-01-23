import * as service from './service';
import NavigationService from 'eoffice/utils/NavigationService';
import { Toast } from 'native-base';
import DeviceInfo from "react-native-device-info";
import {ACTION_CODE, HC_CASE_FLIGHT_FILE, modes} from "../../../constants/administrative";

const initState = {
  query: {
    startTime: 1572022800000,
    endTime: new Date().getTime(),
    flowCode: 'KHACH_SAN',
    size: 10,
    sort: 'updateTime,desc',
    page: 0,
    state: modes[0].state,
    hcFlowId: null,
    key: ''
  },
  hasMore: true,
  listRequest: [],
  bookHotelDetail: {},
  actionList: [],
};

const ACTION_TYPE = {
  GET_LIST_REQUESTS : 'bookHotel/GET_LIST_REQUESTS',
  SET_STATE_FOR_QUERY : 'bookHotel/SET_STATE_FOR_QUERY',
  SET_KEY_FOR_QUERY : 'bookHotel/SET_KEY_FOR_QUERY',
  SET_HAS_MORE : 'bookHotel/SET_HAS_MORE',
  NEXT_PAGE : 'bookHotel/NEXT_PAGE',
  REFRESH_PAGE : 'bookHotel/REFRESH_PAGE',
  SET_HC_FLOW_ID : 'bookHotel/SET_HC_FLOW_ID',
  SET_BOOK_HOTEL_DETAIL : 'bookHotel/SET_BOOK_HOTEL_DETAIL',
};

export default function(state = initState, action) {
  switch (action.type) {
    case ACTION_TYPE.GET_LIST_REQUESTS:
      return {
        ...state,
        listRequest: state.query.page === 0 ? action.payload.list : [...state.listRequest, ...action.payload.list],
        hasMore: action.payload.list.length === 10,
      };
    case ACTION_TYPE.SET_STATE_FOR_QUERY:
      return {
        ...state,
        query: {
          ...state.query,
          state: action.payload.state,
          page: 0,
        },
        hasMore: true,
      };
    case ACTION_TYPE.SET_KEY_FOR_QUERY:
      return {
        ...state,
        query: {
          ...state.query,
          key: action.payload.key
        },
      };
    case ACTION_TYPE.NEXT_PAGE:
      return {
        ...state,
        query: {
          ...state.query,
          page: state.query.page + 1,
        }
      }
    case ACTION_TYPE.REFRESH_PAGE:
      return {
        ...state,
        query: {
          ...state.query,
          page: 0,
        },
        hasMore: true,
      }

    case ACTION_TYPE.SET_HC_FLOW_ID:
      return {
        ...state,
        query: {
          ...state.query,
          hcFlowId: action.payload.hcFlowId,
        }
      }
    case ACTION_TYPE.SET_BOOK_HOTEL_DETAIL:
      return {
        ...state,
        bookHotelDetail: action.payload.bookHotelDetail
      }
    default:
      return state;
  }
}

export const getListRequest = () => async (dispatch, getState) => {
  const query = getState().bookHotel.query;
  const list = await service.getListRequest(query);
  if (list && list.length > 0) {
    dispatch({
      type: ACTION_TYPE.GET_LIST_REQUESTS,
      payload: {list},
    });
  }
};


export const setKeyForQuery = key => async dispatch => {
  dispatch({
    type: ACTION_TYPE.SET_KEY_FOR_QUERY,
    payload: { key },
  });
};

export const setStateForQuery = state => async dispatch => {
  dispatch({
    type: ACTION_TYPE.SET_STATE_FOR_QUERY,
    payload: { state },
  });
};

export const setHcFlowId = hcFlowId => async dispatch => {
  dispatch({
    type: ACTION_TYPE.SET_HC_FLOW_ID,
    payload: { hcFlowId },
  });
};

export const nextPage = () => async dispatch => {
  dispatch({
    type: ACTION_TYPE.NEXT_PAGE,
  });
};

export const refreshPage = () => async dispatch => {
  dispatch({
    type: ACTION_TYPE.REFRESH_PAGE,
  });
};


export const getBookHotelDetail = hcCaseMasterId => async dispatch => {
  const result = await Promise.all([
    service.getHcCaseHotel(hcCaseMasterId),
    service.getHcCaseHotelUserView(hcCaseMasterId),
    service.getHcCaseHotelLocationView(hcCaseMasterId),
    service.getHcCaseMaster(hcCaseMasterId),
    service.getHcCaseHotelPrice(hcCaseMasterId),
    service.getFileAttachments(hcCaseMasterId,HC_CASE_FLIGHT_FILE.TO_TRINH_KHACH_SAN),
    service.getFileAttachments(hcCaseMasterId,HC_CASE_FLIGHT_FILE.VE_KHACH_SAN),
    service.getRequester(hcCaseMasterId)
  ])
  const bookHotelDetail = {}
  if (result) {
    bookHotelDetail.hcCaseHotel = result[0] ? result[0] : null
    bookHotelDetail.hcCaseHotelUserView = result[1] ? result[1] : null
    bookHotelDetail.hcCaseHotelLocationView = result[2] ? result[2] : null
    bookHotelDetail.hcCaseMaster = result[3] ? result[3] : null
    bookHotelDetail.hcCaseHotelPrice = result[4] ? result[4] : null
    bookHotelDetail.documentsHotel = result[5] ? result[5] : []
    bookHotelDetail.ticketHotel = result[6] ? result[6] : []
    bookHotelDetail.requester = result[7] ? {
      deptName : result[7].deptName,
      fullName : result[7].fullName
    } : {
      deptName : '',
      fullName : ''
    }
   }
    if (bookHotelDetail && bookHotelDetail.hcCaseMaster.flowInstanceId) {
      const listActions = await service.getAllActions(bookHotelDetail.hcCaseMaster.flowInstanceId)
      if (listActions) {
        bookHotelDetail.listActions = listActions
      }
    }
  dispatch({
    type: ACTION_TYPE.SET_BOOK_HOTEL_DETAIL,
    payload: {bookHotelDetail}
  });
  NavigationService.navigate('BookHotelDetail');
};


export const createRequest = form => async dispatch => {
  await service
    .createKhachsan(form)
    .then(res => {
      Toast.show({
        text: 'Gửi yêu cầu thành công',
        type: 'success',
        duration: 3000,
      });
      dispatch({
        type: ACTION_TYPE.REFRESH_PAGE,
      })
      NavigationService.goBack();
    })
    .catch(err => console.log(err));
};

export const approveRequest = (form, msgToast) => async dispatch => {
  await service
    .acceptHotel(form)
    .then(res => {
      Toast.show({
        text: msgToast,
        type: 'success',
        duration: 3000,
      });
      dispatch({
        type: ACTION_TYPE.REFRESH_PAGE,
      })
      NavigationService.goBack();
    })
    .catch(err => console.log(err));
};

export const updateRequest = form => async dispatch => {
  await service
    .updateHotel(form)
    .then(res => {
      Toast.show({
        text: 'Cập nhật yêu cầu thành công',
        type: 'success',
        duration: 3000,
      });
      dispatch({
        type: ACTION_TYPE.REFRESH_PAGE,
      })
    })
    .catch(err => console.log(err));
};

export const cancelRequest = form => async (dispatch) => {
  await service
    .cancelHotel(form)
    .then(res => {
      Toast.show({
        text: 'Hủy yêu cầu thành công',
        type: 'success',
        duration: 3000,
      });
      dispatch({
        type: ACTION_TYPE.REFRESH_PAGE,
      })
      NavigationService.goBack();
    })
    .catch(err => console.log(err));
};
