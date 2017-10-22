import React, { Component } from 'react';
import {
  LayoutAnimation,
  View,
  Image,
  Text,
  TextInput,
  Keyboard,
  Platform
 } from 'react-native';

import validator from 'validator';
import { emailChanged, phoneChanged, firstnameChanged, lastnameChanged, errorSet } from '../actions';
import EmailTextInput from './../components/Login/EmailTextInput';
import FirstnameTextInput from './../components/Login/FirstnameTextInput';
import LastnameTextInput from './../components/Login/LastnameTextInput';
import PhoneTextInput from './../components/Login/PhoneTextInput';
import ProfileDataButton from './../components/Login/ProfileDataButton';
import FooterNavButtons from './../components/Login/FooterNavButtons';
import LoginHeaderImage from './../components/Login/LoginHeaderImage';
import NavigatorService from './../utils/navigator';
import LoadingSpinner from './../components/Loading/LoadingSpinner';



import ErrorMessage from './../components/ErrorMessage';
import { FormLabel, FormInput, FormValidationMessage, Button, Divider, SocialIcon, Icon } from 'react-native-elements';
import {scale, scaleModerate, scaleVertical} from './../utils/scale';


import {
  RkButton,
  RkText,
  RkTextInput,
  RkAvoidKeyboard,
  RkStyleSheet,
  RkTheme
} from 'react-native-ui-kitten';
import {GradientButton} from './../components/';

class ProfileScreen extends Component {

  constructor(props) {

    super(props)

    this.state = {
      keyboardflag: false,
      loadingState: false,
    }

  }

  componentWillMount () {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow.bind(this));
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide.bind(this));
  }

  componentWillUnmount () {
     this.keyboardDidShowListener.remove();
     this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow () {
    if ( true ) {  // Platform.OS === 'android'
      LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    }
    this.setState({ keyboardflag: true });
  }

  _keyboardDidHide () {
    if ( true ) {  // Platform.OS === 'android'
      LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    }
    this.setState({ keyboardflag: false });
  }

  static navigationOptions = {
     header: null
  }

  // Call action if the value is changed

  onRegisterPressAndReady() {
    this.setState({ loadingState: true });
    // this.props.navigation.navigate('register_screen')
    NavigatorService.reset('register_screen');
    this.setState({ loadingState: false });
    Keyboard.dismiss();
  }

  render() {

    let keyboardUp_justifyContent = (this.state.keyboardflag) ? 'flex-start' : 'space-between';
    let keyboardUp_styles_content = {justifyContent: keyboardUp_justifyContent};

    console.log('Profile_Screen:Line 230: Rendering Profile screen');
    // style={{...styles.screen, ...keyboardUp_styles_content}}
    return (
      <View style={{ ...styles.screen, ...keyboardUp_styles_content}}>

        <LoadingSpinner parentFlag={this.state.loadingState} />
        <LoginHeaderImage
          keyboardflag = {this.state.keyboardflag}
          emailPwdBtnStr = {'Profile'}
          headerString = {'Registration'}
        />
        <FirstnameTextInput />
        <LastnameTextInput />
        <EmailTextInput />
        <PhoneTextInput />
        <ProfileDataButton
          onRegisterPressAndReady = {this.onRegisterPressAndReady.bind(this)}
        />
        <View>
          <FooterNavButtons
            emailPwdBtnStr={'Profile Screen'}
            onForgotPassword={''}
            onNavString1={'Already have an account?'}
            onNavString2={'Sign In now'}
            onNavPress={
              () => {
                NavigatorService.reset('login_screen');
                //this.props.navigation.navigate('login_screen');
              }
            }
            keyboardflag={this.state.keyboardflag}
            showEmailPwdState={true}
          />
          <ErrorMessage />
        </View>

      </View>

    );
  }
}
//    flex: 1,
//    justifyContent: 'space-around',
let styles = RkStyleSheet.create(theme => ({
  screen: {
    backgroundColor: theme.colors.screen.base,
    flex: 1,
    justifyContent: 'space-between',
  },
  image: {
    marginVertical: 10,
    height:scaleVertical(77),
    resizeMode:'contain'
  }
}));


export default ProfileScreen;
