import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import Login from './../components/Login/Login';
import { facebookSignin } from '../actions';
import NavigatorService from './../utils/navigator';


class Register_Screen extends Component {

  static navigationOptions = {
    header: null,
  };

  render() {
      return (
          <Login
            emailPwdBtnStr='SignUp'
            fbBtnStr='Facebook SignUp'
            showEmailPwdOption={false} // the email password option will be hidden
            onNavString1='Already have an account?'
            onNavString2='Sign In now'
            onNavPress={ () => { NavigatorService.reset('login_screen'); } }
            onForgotPassword={ () => { NavigatorService.reset('reset_screen'); } }
          />
      )
  }
}

export default connect(null, {
  facebookSignin
})(Register_Screen);
