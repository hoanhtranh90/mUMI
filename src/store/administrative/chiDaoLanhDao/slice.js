import { createSlice } from 'redux-starter-kit';

const initialState = {
  requests: [],
  size: 10,
  query: {
    meeting: null, // Cuộc họp
    sector: null, // Lĩnh vực
    conclusion: null, // Nội dung kết luận
    directiveId: null, // Lãnh đạo chỉ đạo
    performId: null, // Lãnh đạo phụ trách
    deptId: null, // Đơn vị chủ trì
    progress: null, // Tiến độ
    commandsStatus: null, // Trạng thái hoàn thành
    startTimeCommand: null, // Bắt đầu Ngày chỉ đạo
    endTimeCommand: null, // Kết thúc Ngày chỉ đạo
    startTimeDeadline: null, // Bắt đầu Hạn hoàn thành
    endTimeDeadline: null, // Kết thúc Hạn hoàn thành
    startTimeFinish: null, // Bắt đầu Ngày kết thúc chỉ đạo
    endTimeFinish: null, // Kết thúc Ngày kết thúc chỉ đạo
  },
  page: 0,
  hasMore: true,
  loading: false,
  error: null,
  detail: null,
  listLDDonVi: [],
  listDVChuTri: [],
};

export default createSlice({
  slice: 'chidao',
  initialState,
  reducers: {
    reset: state => ({
      ...state,
      requests: initialState.requests,
      query: initialState.query,
      hasMore: true,
      loading: false,
      page: 0,
    }),
    listStart: state => ({
      ...state,
      loading: true,
    }),
    listSuccess: (state, action) => ({
      ...state,
      loading: false,
      requests: [...state.requests, ...action.payload.result],
      hasMore: action.payload.result.length > 0,
    }),
    listError: (state, action) => ({
      ...state,
      loading: false,
      error: action.payload.error,
    }),
    nextPage: state => ({
      ...state,
      page: state.page + 1,
    }),

    getDetailChiDaoSuccess: (state, action) => ({
      ...state,
      detail: action.payload.result,
    }),

    listLDDVSuccess: (state, action) => ({
      ...state,
      listLDDonVi: action.payload.result,
    }),

    listDVCTSuccess: (state, action) => ({
      ...state,
      listDVChuTri: action.payload.result,
    }),

    setQuery: (state, action) => ({
      ...state,
      query: action.payload,
    }),
  },
});
