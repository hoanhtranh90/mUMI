// eslint-disable-next-line import/no-extraneous-dependencies
import { useReducer } from 'react';

const initialState = {
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
};

function reducer(state, action) {
  switch (action.type) {
    case 'setValue':
      return {
        ...state,
        [action.payload.field]: action.payload.value,
      };
    case 'refresh':
      return {
        meeting: null,
        sector: null,
        conclusion: null,
        directiveId: null,
        performId: null,
        deptId: null,
        progress: null,
        commandsStatus: null,
        startTimeCommand: null,
        endTimeCommand: null,
        startTimeDeadline: null,
        endTimeDeadline: null,
        startTimeFinish: null,
        endTimeFinish: null,
      };
    default:
      return state;
  }
}

export default function useSearchForm() {
  const [state, dispatch] = useReducer(reducer, { ...initialState });

  const actions = {
    setValue(field, value) {
      dispatch({ type: 'setValue', payload: { field, value } });
    },
    refresh(){
      dispatch({ type: 'refresh'});
    }
  };

  return [state, actions];
}
