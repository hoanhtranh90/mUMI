import { combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { configureStore } from 'redux-starter-kit';
import { createLogicMiddleware } from 'redux-logic';
import { reducer as networkReducer, createNetworkMiddleware } from 'react-native-offline';

import { logics as appLogic, reducer as appReducer } from './app';
import { reducer as authReducer } from './auth';
import { logics as documentsLogic, reducer as documentsReducer } from './documents';
import { logics as tasksLogic, reducer as tasksReducer } from './tasks';
import { reducer as userReducer } from './users';
import { reducer as administrativeReducer } from './administrative';
import hcCalendarReducer from './hcCalendar/reducer';
import bookHotelReducer from './administrative/bookHotel/reducer';
import vanPhongPhamReducer from './administrative/vanPhongPham/reducer';
import requestSupportReducer from './administrative/requestSupport/reducer'
import noteReducer from './ghiChu/reducer';
import noteReducerV2 from './ghiChuV2/reducer';

const reducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  documents: documentsReducer,
  network: networkReducer,
  tasks: tasksReducer,
  users: userReducer,
  administrative: administrativeReducer,
  hcCalendar : hcCalendarReducer,
  bookHotel: bookHotelReducer,
  vanPhongPham: vanPhongPhamReducer,
  requestSupport: requestSupportReducer,
  note: noteReducer,
  noteV2: noteReducerV2,
});

const logicMiddleware = createLogicMiddleware([...appLogic, ...documentsLogic, ...tasksLogic], {});
const networkMiddleware = createNetworkMiddleware({
  queueReleaseThrottle: 200,
  regexActionType: /FETCH.*REQUEST/,
});

const middleware = [networkMiddleware, thunk, logicMiddleware];

const store = configureStore({
  reducer,
  middleware,
});

export default store;
