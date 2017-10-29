import firebase from 'firebase';

import {
  USERDETAILS_FETCH_SUCCESS
} from './types';

export const userDetailsFetch = () => {
  const { currentUser } = firebase.auth();
  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/userDetails`)
      .on('value', snapshot => {
        dispatch({ type: USERDETAILS_FETCH_SUCCESS, payload: snapshot.val() });
      });
  };
};
