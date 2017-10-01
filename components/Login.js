import React, { Component } from 'react';
import { LayoutAnimation, View, Text, Dimensions, Image, Keyboard, Platform, UIManager } from 'react-native';
//import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import validator from 'validator';
import ErrorMessage from './ErrorMessage';
import { emailChanged, passwordChanged, loginUser, signupUser, facebookSignin, errorSet, facebookSignup } from '../actions';


import {
  RkButton,
  RkText,
  RkTextInput,
  RkAvoidKeyboard,
  RkStyleSheet,
  RkTheme
} from 'react-native-ui-kitten';
import {FontAwesome} from './../assets/icons';
import {GradientButton} from './../components/';
import {scale, scaleModerate, scaleVertical} from './../utils/scale';


class Login extends Component {

  constructor(props) {
    super(props)

    this.state = {
      emailError: '',
      passwordError: '',
      emailFlag: 0,
      passwordFlag: 0,
      keyboardflag: false
    }

    if (Platform.OS === 'android') {
      // UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
    }

  }

  componentWillMount () {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow.bind(this));
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide.bind(this));
    if ( this.props.email != '') {
      this.validateInput('email', this.props.email);
    }
    if ( this.props.password != '') {
      this.validateInput('password', this.props.password);
    }
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
    if ( true ) { // Platform.OS === 'android'
      LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    }
    this.setState({ keyboardflag: false });
  }

  onEmailChange(text) {
    console.log(text);
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onButtonPress() {
    if ( this.validateInput('email', this.props.email) && this.validateInput('password', this.props.password)) {
      const { email, password, phone, firstname, lastname } = this.props;
      if (this.props.emailPwdBtnStr == 'SignIn') {
        this.props.loginUser({ email, password });
      } else {
        this.props.signupUser({ email, password, phone, firstname, lastname });
      }
    } else {
      this.props.errorSet('Please provide a valid email and password');
    }
  }

  // Validate the form inputs
  validateInput(inputName, inputVal) {

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

    if (inputName == 'password') {
      if (validator.isAscii(inputVal)){
        this.setState({ passwordError: '' });
        this.setState({ passwordFlag: 1 });
        return true;
      } else {
        this.setState({ passwordError: 'Please enter a valid password'});
        this.setState({ passwordFlag: 0 });
        return false;
      }
    }
  }

  // Display form validation errors if needed
  renderFormError(inputName) {
    if (inputName == 'email') {
      if (this.state.emailError !='') {
        return (<RkText rkType='danger'>{this.state.emailError}</RkText>);
      }
    }
    if (inputName == 'password') {
      if (this.state.passwordError !='') {
        return (<RkText rkType='danger'>{this.state.passwordError}</RkText>);
      }
    }
    return;
  }

  onNavPress = (screenname) => {
    this.props.navigation.navigate(screenname);
  }


  _renderImage(image) {

    if ( this.state.keyboardflag == false ) { // Platform.OS === 'ios' ||
      let contentHeight = scaleModerate(375, 1);
      let height = Dimensions.get('window').height - contentHeight;
      let width = Dimensions.get('window').width;
      image = (<Image style={[styles.image, {height, width}]}
                      source={require('./../assets/images/backgroundLoginV6.png')}/>);
      return image;
    } else {
      return;
    }
  }

  _fbBtnPressType() {
    if (this.props.emailPwdBtnStr == 'SignIn') {
      this.props.facebookSignin();
    }
  }

  _renderEmailPwdOption() {

    if (this.props.showEmailPwdOption) {

      return (

        <View style = {{...styles.emailPwdContainer}}>

          <RkTextInput
            rkType='rounded'
            placeholder='Email'
            value={this.props.email}
            onChangeText={email => this.onEmailChange(email)}
            onBlur={() => { this.validateInput('email', this.props.email); }}
          />

          <View>
            { this.renderFormError('email') }
          </View>


          <RkTextInput
            rkType='rounded'
            placeholder='Password'
            secureTextEntry={true}
            value={this.props.password}
            onChangeText={password => this.onPasswordChange(password)}
            onBlur={() => { this.validateInput('password', this.props.password); }}
          />

          <View>
            { this.renderFormError('password') }
          </View>


          <GradientButton
            onPress={() => { this.onButtonPress(); }}
            rkType='large'
            style={styles.save}
            text={this.props.emailPwdBtnStr}>
          </GradientButton>

        </View>


      );
    }
  }

  _renderFacebook() {
    if (this.props.emailPwdBtnStr == 'SignIn') {
        return (
        <View style={styles.buttons}>
          <RkButton style={styles.button} rkType='social'>
            <RkText
              onPress={() => { this.props.facebookSignin() }}
              rkType='awesome hero accentColor'
              style={{ fontFamily: 'fontawesome' }}>
              {FontAwesome.facebook}
            </RkText>
          </RkButton>
          <GradientButton
            onPress={() => { this.props.facebookSignin() }}
            rkType='large'
            style={styles.fb}
            text={this.props.fbBtnStr}>
          </GradientButton>
        </View>
      );
    } else {
      const { email, phone, firstname, lastname } = this.props;
      return (
      <View style={styles.buttons}>
        <RkButton style={styles.button} rkType='social'>
          <RkText
            onPress={() => { this.props.facebookSignup({ email, phone, firstname, lastname }); }}
            rkType='awesome hero accentColor'
            style={{ fontFamily: 'fontawesome' }}>
            {FontAwesome.facebook}
          </RkText>
        </RkButton>
        <GradientButton
          onPress={() => { this.props.facebookSignup({ email, phone, firstname, lastname }); }}
          rkType='large'
          style={styles.fb}
          text={this.props.fbBtnStr}>
        </GradientButton>
      </View>
    );
    }
  }

  /*
  <RkAvoidKeyboard
    onStartShouldSetResponder={ (e) => true}
    onResponderRelease={ (e) => Keyboard.dismiss()}
    style={styles.screen}>
  */

  render() {
      let image = this._renderImage();
      let android_s_c_marginTop = (this.state.keyboardflag) ? 30 : 0; // Platform.OS === 'android' &&
      let android_styles_container = {marginTop: android_s_c_marginTop};
      let android_s_c_justifyContent = (this.state.keyboardflag) ? 'flex-start' : 'flex-end'; // Platform.OS === 'android' &&
      if (!this.props.showEmailPwdOption) {
          android_s_c_justifyContent = 'flex-start';
      }
      let android_styles_footer = {justifyContent: android_s_c_justifyContent};

      // console.log(android_styles_footer);

      return (

        <View style={styles.screen}>

          {this._renderImage()}

          <View style = {{...styles.container, ...android_styles_container}}>

            {this._renderFacebook()}
            {this._renderEmailPwdOption()}

            <View style={{...styles.footer, ...android_styles_footer}}>
              <View style={styles.textRow}>
              <RkButton
                  rkType='clear'
                  onPress={ () => {this.props.onNavPress()} }>
                  <RkText rkType='primary3'>{this.props.onNavString1}</RkText>
                  <RkText rkType='header6'>
                    {this.props.onNavString2}
                  </RkText>
                </RkButton>
              </View>
            </View>


          </View>
          <ErrorMessage />
        </View>
      )
  }

}


// </RkAvoidKeyboard>

let styles = RkStyleSheet.create(theme => ({
  screen: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: theme.colors.screen.base
  },
  image: {
    resizeMode: 'cover',
    marginBottom: scaleVertical(10),
  },
  container: {
    paddingHorizontal: 17,
    paddingBottom: scaleVertical(22),
    alignItems: 'center',
    flex: 1
  },
  emailPwdContainer: {
    alignItems: 'center',
    flex: 1
  },
  footer: {
    justifyContent: 'flex-end',
    flex: 1
  },
  buttons: {
    flexDirection: 'row',
    marginBottom: scaleVertical(24),
    justifyContent: 'space-between'
  },
  button: {
    flex: 1,
    marginRight: 10
  },
  fb: {
    flex: 4,
    marginLeft: 10,
    marginVertical: 1,
    height: scale(56)
  },
  save: {
    marginVertical: 9
  },
  textRow: {
    justifyContent: 'center',
    flexDirection: 'row',
  }
}));


const mapStateToProps = ({ auth }) => {
  const { email, password,  user, phone, firstname, lastname } = auth;
  return { email, password, user, phone, firstname, lastname };
};

export default connect(mapStateToProps, {
  emailChanged, passwordChanged, loginUser, signupUser, facebookSignin, errorSet, facebookSignup
})(Login);
