import { combineReducers } from 'redux';
import { reducer as phongHopReducer } from './phongHop';
import { reducer as phongHopDotXuatReducer } from './phongHopDotXuat';
import { reducer as datXeReducer } from './datXe';
import { reducer as lichTuanReducer } from './lichTuan';
import { reducer as datXeDotXuatReducer } from './datXeDotXuat';
import { reducer as summaryListReducer } from './summary';
import { reducer as chiDaoLDReducer } from './theoDoiChiDaoLanhDao';
import { reducer as veMayBayReducer } from './veMayBay';

export const reducer = combineReducers({
  phongHop: phongHopReducer,
  phongHopDotXuat: phongHopDotXuatReducer,
  datXe: datXeReducer,
  datXeDotXuat: datXeDotXuatReducer,
  summary: summaryListReducer,
  chiDaoLD: chiDaoLDReducer,
  lichTuan: lichTuanReducer,
  veMayBay: veMayBayReducer,
});
