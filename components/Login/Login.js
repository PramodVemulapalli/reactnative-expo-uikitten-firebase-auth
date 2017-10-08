import React, { Component } from 'react';
import { View, Keyboard, Dimensions, LayoutAnimation } from 'react-native';
import { connect } from 'react-redux';

import ErrorMessage from './../ErrorMessage';
import LoginHeaderImage from './LoginHeaderImage';
import EmailTextInput from './EmailTextInput';
import PwdTextInput from './PwdTextInput';
import ForgotPwdButton from './ForgotPwdButton';
import FbSignInUpButton from './FbSignInUpButton';
import EmailPwdButton from './EmailPwdButton';
import FooterNavButtons from './FooterNavButtons';
import { loginUser, signupUser, facebookSignin, errorSet, facebookSignup } from './../../actions';

import {
  RkStyleSheet
} from 'react-native-ui-kitten';

class Login extends Component {

  constructor(props) {

    super(props)
    this.state = {
      keyboardflag: false,
      showEmailPwdState: false
    }
  }

  componentWillMount () {
    // set listeners on when the keyboard is up or down
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow.bind(this));
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide.bind(this));
  }

  componentWillUnmount () {
    // remove the listeners upon exit
   this.keyboardDidShowListener.remove();
   this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow () {
    // use the spring animation when the key board is shown
    if ( true ) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    }
    this.setState({ keyboardflag: true });
  }

  _keyboardDidHide () {
    // use the spring animation when the key board is hidden
    if ( true ) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    }
    this.setState({ keyboardflag: false });
  }

  _renderEmailPwdOption() {
    if ( this.props.emailPwdBtnStr == 'SignIn' || this.state.showEmailPwdState ) {
      // In the case of login screen or if the email pwd button is pressed
      return (
        <View>
          <EmailTextInput />
          <PwdTextInput />
          <EmailPwdButton emailPwdBtnStr={this.props.emailPwdBtnStr} />
        </View>
      );
    }
  }

  pressEmailPwdButton() {
      this.setState({ showEmailPwdState: true });
  }


  render() {

      let android_s_c_marginTop = (this.state.keyboardflag) ? 30 : 0; // Platform.OS === 'android' &&
      let android_styles_container = {marginTop: android_s_c_marginTop};
      let screen_width = Dimensions.get('window').width;

      return (
        <View style={styles.screen}>

          <View>
            <LoginHeaderImage
              keyboardflag = {this.state.keyboardflag}
              emailPwdBtnStr={this.props.emailPwdBtnStr}
              />
          </View>

          <View style={{ marginHorizontal: 20 }}>
            <FbSignInUpButton emailPwdBtnStr={this.props.emailPwdBtnStr} fbBtnStr={this.props.fbBtnStr} />
          </View>

          {this._renderEmailPwdOption()}

          <FooterNavButtons
            emailPwdBtnStr={this.props.emailPwdBtnStr}
            _footerButton={this.props._footerButton}
            onForgotPassword={this.props.onForgotPassword}
            onNavString1={this.props.onNavString1}
            onNavString2={this.props.onNavString2}
            onNavPress={this.props.onNavPress}
            keyboardflag={this.state.keyboardflag}
            pressEmailPwdButton={this.pressEmailPwdButton.bind(this)}
            showEmailPwdState={this.state.showEmailPwdState}
          />
        </View>
      );
  }

}

let styles = RkStyleSheet.create(theme => ({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.screen.base
  }
}));

export default Login;
