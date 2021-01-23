import { useReducer } from 'react';

import { DOCUMENT_TYPE } from 'eoffice/constants/documents';
import axios from 'eoffice/store/axios';

const listUsers = async (mode, documentId, query) => {
  let res;
  if (mode === DOCUMENT_TYPE.VB_DEN) {
    res = await axios.get('/userDeptRoleView/findAllByVbIncomingDoc', {
      params: {
        vbIncomingDocId: documentId,
      },
    });
  } else {
    res = await axios.get('/userDeptRoleView/findAllByVbOutgoingDoc', {
      params: {
        vbOutgoingDocId: documentId,
        query,
      },
    });
  }
  return res.data;
};

const initialState = {
  loading: true,
  allUsers: [],
  users: [],
  usersSelected: [],
  selected: {},
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'filter':
      return {
        ...state,
        users: state.allUsers.filter(user => {
          const str = `${user.fullName} ${user.deptName} ${user.positionName}`.toLowerCase();
          return str.indexOf(action.payload) >= 0;
        }),
      };

    case 'setUsers':
      return {
        ...state,
        loading: false,
        allUsers: action.payload,
        users: action.payload,
      };

    case 'toggle':
      return {
        ...state,
        selected: {
          ...state.selected,
          [action.payload]: !state.selected[action.payload],
        },
      };
    case 'updateUserSelected':
      return {
        ...state,
        usersSelected: action.payload,
      };

    default:
      return state;
  }
};

export default function(mode, documentId, query) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const actions = {
    async init() {
      const users = await listUsers(mode, documentId, '');
      dispatch({
        type: 'setUsers',
        payload: users,
      });
    },
    async saveListUser(users) {
      dispatch({
        type: 'setUsers',
        payload: users,
      });
    },
    async filter(keyword) {
      const users = await listUsers(mode, documentId, keyword);
      dispatch({
        type: 'setUsers',
        payload: users,
      });
    },
    async filterVbDen(keyword) {
      dispatch({
        type: 'filter',
        payload: keyword.toLowerCase(),
      });
    },
    toggle(user) {
      const checkIndexItem = state.usersSelected.findIndex(item => item.id === user.id);
      let newUsersSelected = state.usersSelected;
      if (checkIndexItem < 0) {
        newUsersSelected.push(user);
      }
      dispatch({
        type: 'toggle',
        payload: user.id,
      });
      dispatch({
        type: 'updateUserSelected',
        payload: newUsersSelected,
      });
    },
  };

  return [state, actions];
}
