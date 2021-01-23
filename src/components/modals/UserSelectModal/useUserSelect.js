import _ from 'lodash';
import { useReducer } from 'react';

import { searchUsers } from 'eoffice/store/users/service';

const initialState = {
  users: [],
  selectedIds: {},
  loading: false,
  keyword: undefined,
  paginate: { page: 0, size: 10 },
  hasMore: true,
};

function reducer(state, action) {
  switch (action.type) {
    case 'end': {
      const {
        payload: { reload, users },
      } = action;
      if (!reload) {
        return {
          ...state,
          users: [...state.users, ...users],
          loading: false,
          hasMore: users.length > 0,
        };
      }

      const selectedUsers = _.filter(state.users, 'selected');
      const newUsers = _.filter(users, user => !state.selectedIds[user.id]);
      return {
        ...state,
        users: [...selectedUsers, ...newUsers],
        loading: false,
        hasMore: true,
      };
    }

    case 'nextPage':
      return {
        ...state,
        loading: true,
        paginate: {
          ...state.paginate,
          page: state.paginate.page + 1,
        },
      };

    case 'setKw':
      return {
        ...state,
        loading: true,
        keyword: action.payload,
        paginate: initialState.paginate,
      };

    case 'toggle':
      return {
        ...state,
        selectedIds: {
          ...state.selectedIds,
          [action.payload]: !state.selectedIds[action.payload],
        },
        users: state.users.map(user => {
          if (user.id === action.payload) {
            return {
              ...user,
              selected: !user.selected,
            };
          }
          return user;
        }),
      };

    default:
      return state;
  }
}

const search = (keyword, paginate) =>
  searchUsers({
    ...paginate,
    keyword,
  });

export default function() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const actions = {
    async nextPage() {
      dispatch({ type: 'nextPage' });
      const users = await search(state.keyword, {
        ...state.paginate,
        page: state.paginate.page + 1,
      });
      dispatch({ type: 'end', payload: { users } });
    },
    setKeyword: _.throttle(async keyword => {
      dispatch({ type: 'setKw', payload: keyword });
      const users = await search(keyword, initialState.paginate);
      dispatch({ type: 'end', payload: { users, reload: true } });
    }, 300),
    toggleUser(id) {
      dispatch({ type: 'toggle', payload: id });
    },
  };

  return [state, actions];
}
