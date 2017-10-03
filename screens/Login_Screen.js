import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import Login from './../components/Login';
import { facebookSignin } from '../actions';


class Login_Screen extends Component {

  static navigationOptions = {
    header: null,
  };

  render() {
    console.log('Login_Screen:Line 15: Rendering Login_Screen');
      return (
          <Login
            emailPwdBtnStr='SignIn'
            fbBtnStr='Facebook Signin'
            showEmailPwdOption={true}
            onNavString1='Don’t have an account?'
            onNavString2=' Sign Up now'
            onNavPress={ () => { this.props.navigation.navigate('profile_screen'); } }
            onForgotPassword={ () => { this.props.navigation.navigate('reset_screen'); } }
          />
      )
  }
}

export default connect(null, {
  facebookSignin
})(Login_Screen);
