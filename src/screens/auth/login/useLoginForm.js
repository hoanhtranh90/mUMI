import { useReducer } from 'react';

const initialState = {
  username: '',
  password: '',
  usernamePlaceholder: 'Tên đăng nhập',
  passwordPlaceholder: 'Mật khẩu',
  submiting: false,
};

function reducer(state, action) {
  switch (action.type) {
    case 'usernameChanged':
      return { ...state, username: action.payload };

    case 'passwordChanged':
      return { ...state, password: action.payload };

    case 'usernamePlaceholderChanged':
      return { ...state, usernamePlaceholder: '', passwordPlaceholder: 'Mật khẩu' };

    case 'passwordPlaceholderChanged':
      return { ...state, passwordPlaceholder: '', usernamePlaceholder: 'Tên đăng nhập' };
    case 'setSubmiting':
      return { ...state, submiting: action.payload };

    default:
      return state;
  }
}

export default function useLoginForm() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const actions = {
    setSubmiting(submiting) {
      dispatch({ type: 'setSubmiting', payload: submiting });
    },
    setUsername(username) {
      dispatch({ type: 'usernameChanged', payload: username });
    },
    setPassword(password) {
      dispatch({ type: 'passwordChanged', payload: password });
    },
    setUsernamePlaceholder() {
      dispatch({ type: 'usernamePlaceholderChanged' });
    },
    setPasswordPlaceholder() {
      dispatch({ type: 'passwordPlaceholderChanged' });
    },
  };

  return [state, actions];
}
