import {
  USERDETAILS_FETCH_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USERDETAILS_FETCH_SUCCESS:
      console.log(action);
      return { ...state, userdetails: action.payload };
    default:
      return state;
  }
};
