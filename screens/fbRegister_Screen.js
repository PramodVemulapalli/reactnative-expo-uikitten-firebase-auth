import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import Login from './../components/Login';
import { facebookSignin } from '../actions';


class fbRegister_Screen extends Component {

  static navigationOptions = {
    header: null,
  };

  render() {
      return (
          <Login
            emailPwdBtnStr='SignUp'
            fbBtnStr='Facebook SignUp'
            showEmailPwdOption={false}
            onNavString1='Switch to email-password option'
            onNavString2=''
            onNavPress={ () => { this.props.navigation.navigate('register_screen'); } }
          />
      )
  }
}

export default connect(null, {
  facebookSignin
})(fbRegister_Screen);
