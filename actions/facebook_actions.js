// import { AsyncStorage } from 'react-native';
import { Facebook } from 'expo';
import firebase from 'firebase';
import { fbappid } from './../config/auth';
// import { emailChanged, passwordChanged, signupUser } from '../actions';

import {
  FACEBOOK_LOGIN_SUCCESS,
  FACEBOOK_LOGIN_FAIL,
  LOGIN_STATUS_CHANGED,
  ERROR_SET
} from './types';


export const facebookSignin = () => {

    return async (dispatch) => {
      console.log('facebook_Actions.js:line17:fbappid');
      console.log(fbappid);

      dispatch({
        type: LOGIN_STATUS_CHANGED,
        payload: 'fbchecking'
      });


      let { type, token } = await Facebook.logInWithReadPermissionsAsync(fbappid, {
        permissions: ['public_profile', 'email']
      });



      console.log('---credential---');
      console.log(credential);
      if (type === 'cancel') {
        dispatch({
          type: LOGIN_STATUS_CHANGED,
          payload: 'fbloginfailed'
        });
        return (dispatch({ type: FACEBOOK_LOGIN_FAIL }));
      }

      var credential = firebase.auth.FacebookAuthProvider.credential(token);

      console.log('---token---');
      console.log(token);

      try {

        let user = await firebase.auth().signInWithCredential(credential);
        let emailcheck = await firebase.database().ref(`/users/${user.uid}/userDetails/email`).once('value');
        var emailcheckflag = emailcheck.val();

        if (emailcheckflag) {
          // update user properties to firebase
          firebase.database().ref(`/users/${user.uid}/userDetails`).update({
            fbEmail: user.email,
            fbDisplayName: user.displayName,
            fbPhotoURL: user.photoURL
          });

        }

      } catch (error) {
        console.log('fb_actions.js:line57:error');
        console.log(error);
        let err_message = error.message;
        dispatch({
          type: LOGIN_STATUS_CHANGED,
          payload: 'notloggedin'
        });
        dispatch({
          type: ERROR_SET,
          payload: err_message
        });
      }
      // await AsyncStorage.setItem('fb_token', token);
      if (emailcheckflag) {
        dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
      } else {
        // case where the user has signed in without signing up.
        await firebase.auth().signOut();
        dispatch({ type: ERROR_SET, payload: 'Please Register first ...'});
      }

  };

};

export const facebookSignup = ({ email, phone, firstname, lastname  }) => {

    return async (dispatch) => {
      console.log(fbappid);

      dispatch({
        type: LOGIN_STATUS_CHANGED,
        payload: 'fbchecking'
      });

      let { type, token } = await Facebook.logInWithReadPermissionsAsync(fbappid, {
        permissions: ['public_profile', 'email']
      });



      console.log(credential);
      if (type === 'cancel') {
        dispatch({
          type: LOGIN_STATUS_CHANGED,
          payload: 'fbloginfailed'
        });
        return (dispatch({ type: FACEBOOK_LOGIN_FAIL }));
      }

      var credential = firebase.auth.FacebookAuthProvider.credential(token);
      console.log(token);

      try {
        let user = await firebase.auth().signInWithCredential(credential);
        console.log(user);
        console.log(user.email);
        var displayName = firstname + ' ' + lastname;
        console.log(email);
        console.log(displayName);
        // write user properties to firebase
        firebase.database().ref(`/users/${user.uid}/userDetails`).set({
          email: email,
          phone: phone,
          firstname: firstname,
          lastname: lastname,
          displayName: displayName,
          fbEmail: user.email,
          fbDisplayName: user.displayName,
          fbPhotoURL: user.photoURL
        });
        dispatch({
          type: ERROR_SET,
          payload: 'Welcome to our online shop'
        });

      } catch (error) {
        console.log(error);
        dispatch({
          type: LOGIN_STATUS_CHANGED,
          payload: 'notloggedin'
        });
        let err_message = error.message;
        dispatch({
          type: ERROR_SET,
          payload: err_message
        });
      }
      // await AsyncStorage.setItem('fb_token', token);
      dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
  };



};
