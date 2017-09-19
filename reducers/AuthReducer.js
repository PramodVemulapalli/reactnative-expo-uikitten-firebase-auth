import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  PHONE_CHANGED,
  FIRSTNAME_CHANGED,
  LASTNAME_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  LOGOUT_USER,
  LOGIN_STATUS_CHANGED,
  LOAD_WELCOME_CHANGED,
  SIGNUP_USER
} from '../actions/types';

const INITIAL_STATE = {
  email: '',
  password: '',
  phone: '',
  firstname: '',
  lastname: '',
  user: null,
  error: '',
  loginStatus: 'initial',
  loadWelcome: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EMAIL_CHANGED:
      return { ...state, email: action.payload };
    case PASSWORD_CHANGED:
      return { ...state, password: action.payload };
    case PHONE_CHANGED:
      return { ...state, phone: action.payload };
    case FIRSTNAME_CHANGED:
      return { ...state, firstname: action.payload };
    case LASTNAME_CHANGED:
      return { ...state, lastname: action.payload };
    case LOGIN_USER:
      return { ...state, error: '' };
    case LOGIN_STATUS_CHANGED:
      console.log('AuthReducer: LOGIN_STATUS_CHANGED');
      return { ...state, loginStatus: action.payload};
    case LOAD_WELCOME_CHANGED:
      return { ...state, loadWelcome: action.payload };
    case LOGIN_USER_SUCCESS:
      return { ...state, ...INITIAL_STATE, user: action.payload, loginStatus: 'loggedin', email: '', password: ''};
    case LOGIN_USER_FAIL:
      return { ...state, error: 'Authentication Failed.', password: '', loginStatus: 'loginfailed'  };
    default:
      return state;
  }
};
