import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import Login from './../components/Login';
import { facebookSignin } from '../actions';


class Register_Screen extends Component {

  static navigationOptions = {
    header: null,
  };

  render() {
    console.log('Register_Screen:Line 15: Rendering Register_Screen');
      return (
          <Login
            emailPwdBtnStr='SignUp'
            fbBtnStr='Facebook SignUp'
            showEmailPwdOption={true}
            onNavString1='Already have an account?'
            onNavString2=' Sign In now'
            onNavPress={ () => { this.props.navigation.navigate('login_screen'); } }
          />
      )
  }
}

export default connect(null, {
  facebookSignin
})(Register_Screen);
