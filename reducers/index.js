import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import FacebookReducer from './FacebookReducer';
import UserDataReducer from './UserDataReducer';


export default combineReducers({
  auth: AuthReducer,
  fbauth: FacebookReducer,
  userdata: UserDataReducer
});
