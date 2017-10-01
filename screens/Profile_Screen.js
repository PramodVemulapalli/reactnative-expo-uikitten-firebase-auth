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

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import validator from 'validator';
import { emailChanged, phoneChanged, firstnameChanged, lastnameChanged, errorSet } from '../actions';
import Spinner from 'react-native-loading-spinner-overlay';

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
      emailError: '',
      firstnameError: '',
      lastnameError: '',
      phoneError: '',
      emailFlag: 0,
      phoneFlag: 0,
      firstnameFlag: 0,
      lastnameFlag: 0,
      keyboardflag: false,
      loadingState: false,
    }

    if (Platform.OS === 'android') {
      // UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
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

  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPhoneChange(text) {
    this.props.phoneChanged(text);
  }

  onFirstnameChange(text) {
    this.props.firstnameChanged(text);
  }

  onLastnameChange(text) {
    this.props.lastnameChanged(text);
  }

  onButtonPress() {
    this.setState({ loadingState: true });
    if (this.validateInput('firstname', this.props.firstname)
        && this.validateInput('lastname', this.props.lastname)
        && this.validateInput('email', this.props.email)
        && this.validateInput('phone', this.props.phone)) {
        this.props.navigation.navigate('fbregister_screen')
    } else {
        this.props.errorSet('Please provide valid profile inputs');
    }
    this.setState({ loadingState: false });
    Keyboard.dismiss();
  }

  // Validate the form inputs
  validateInput(inputName, inputVal) {

    console.log('profile_screen:line114:' + inputName + ' ' + inputVal);
    if (inputName == 'email') {
      if (validator.isEmail(inputVal)){
        this.setState({ emailError: '' });
        this.setState({ emailFlag: 1 });
        return true;
      } else {
        this.setState({ emailError: 'Please enter a valid email address'});
        this.setState({ emailFlag: 0 });
        return false;
      }
    }

    if (inputName == 'phone') {
      if (validator.isMobilePhone(inputVal, 'en-US')){
        this.setState({ phoneError: '' });
        this.setState({ phoneFlag: 1 });
        return true;
      } else {
        this.setState({ phoneError: 'Please enter a valid phone number'});
        this.setState({ phoneFlag: 0 });
        return false;
      }
    }

    if (inputName == 'firstname') {
      if (validator.isAscii(inputVal)){
        this.setState({ firstnameError: '' });
        this.setState({ firstnameFlag: 1 });
        return true;
      } else {
        this.setState({ firstnameError: 'Please enter your First Name'});
        this.setState({ firstnameFlag: 0 });
        return false;
      }
    }

    if (inputName == 'lastname') {
      if (validator.isAscii(inputVal)){
        this.setState({ lastnameError: '' });
        this.setState({ lastnameFlag: 1 });
        return true;
      } else {
        this.setState({ lastnameError: 'Please enter your Last Name'});
        this.setState({ lastnameFlag: 0 });
        return false;
      }
    }

  }

  renderSpinner() {
    console.log('Profile_Screen:line171: ' + this.state.loadingState);
    if (this.state.loadingState) {
      return (
          <Spinner visible={true} color={'#FFFFFF'} size={'large'} />
      );
    }
  }

  // Display form validation errors if needed

  renderFormError(inputName) {
    if (inputName == 'email') {
      if (this.state.emailError !='') {
        return (<RkText rkType='danger'> {this.state.emailError} </RkText>);
      }
    }
    if (inputName == 'phone') {
      if (this.state.phoneError !='') {
        return (<RkText rkType='danger'> {this.state.phoneError} </RkText>);
      }
    }
    if (inputName == 'firstname') {
      if (this.state.firstnameError !='') {
        return (<RkText rkType='danger'> {this.state.firstnameError} </RkText>);
      }
    }
    if (inputName == 'lastname') {
      if (this.state.lastnameError !='') {
        return (<RkText rkType='danger'> {this.state.lastnameError} </RkText>);
      }
    }
    return;
  }

  onNavPress = (screenname) => {
    this.props.navigation.navigate(screenname);
  }

  render() {

    let renderIcon = () => {
      if (RkTheme.current.name === 'light' && this.state.keyboardflag == false ) {
        return (
          <View style={{alignItems: 'center'}}>
            <Image style={styles.image} source={require('./../assets/images/cartLogo.png')}/>
            <RkText rkType='h1'>Registration</RkText>
          </View>
          );
        }
        else {
          return;
        }
    };

    let keyboardUp_justifyContent = (this.state.keyboardflag) ? 'flex-start' : 'space-around';
    let keyboardUp_styles_content = {justifyContent: keyboardUp_justifyContent};



    return (
      <View style={{...styles.screen, ...keyboardUp_styles_content}}>
        { renderIcon() }
        <View style={styles.content}>
          <View>
            <RkTextInput
              rkType='rounded'
              placeholder='First Name ( John )'
              value={this.props.firstname}
              onChangeText={firstname => this.onFirstnameChange(firstname)}
              onBlur={() => { this.validateInput('firstname', this.props.firstname); }}
            />
            <View>
              { this.renderFormError('firstname') }
            </View>
            <RkTextInput
              rkType='rounded'
              placeholder='Last Name ( Doe )'
              value={this.props.lastname}
              onChangeText={lastname => this.onLastnameChange(lastname)}
              onBlur={() => { this.validateInput('lastname', this.props.lastname); }}
            />
            <View>
              { this.renderFormError('lastname') }
            </View>
            <RkTextInput
              rkType='rounded'
              placeholder='Email ( John.Doe@gmail.com )'
              value={this.props.email}
              onChangeText={email => this.onEmailChange(email)}
              onBlur={() => { this.validateInput('email', this.props.email); }}
            />
            <View>
              { this.renderFormError('email') }
            </View>
            <RkTextInput
              rkType='rounded'
              placeholder='Phone ( 8143217654 )'
              value={this.props.phone}
              onChangeText={phone => this.onPhoneChange(phone)}
              onBlur={() => { this.validateInput('phone', this.props.phone); }}
            />
            <View>
              { this.renderFormError('phone') }
            </View>
            <GradientButton
              style={styles.save}
              rkType='large'
              text='Proceed to Register'
              onPress={() => {
                this.onButtonPress();
              }}/>
          </View>
          <View style={styles.footer}>
            <View style={styles.textRow}>
              <RkButton rkType='clear'  onPress={() => this.props.navigation.navigate('login_screen')}>
                <RkText rkType='primary3'>Already have an account?</RkText>
                <RkText rkType='header6'> Sign In now </RkText>
              </RkButton>
            </View>
          </View>
        </View>



        <ErrorMessage />


      </View>

    );
  }
}

let styles = RkStyleSheet.create(theme => ({
  screen: {
    padding: 16,
    flex: 1,
    justifyContent: 'space-around',
    backgroundColor: theme.colors.screen.base
  },
  image: {
    marginBottom: 10,
    height:scaleVertical(77),
    resizeMode:'contain'
  },
  content: {
    justifyContent: 'flex-start',
  },
  save: {
    marginVertical: 20
  },
  buttons: {
    flexDirection: 'row',
    marginBottom: 24,
    marginHorizontal: 24,
    justifyContent: 'space-around'
  },
  footer:{
    justifyContent:'flex-end'
  },
  textRow: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
}));

const mapStateToProps = ({ auth }) => {
  const { email, phone, firstname, lastname, error } = auth;
  return { email, phone, firstname, lastname, error };
};

export default connect(mapStateToProps, {
  emailChanged, phoneChanged, firstnameChanged, lastnameChanged, errorSet
})(ProfileScreen);
