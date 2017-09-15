import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import auth_reducer from './auth_reducer';

export default combineReducers({
  auth: AuthReducer,
  fbauth: auth_reducer
});
