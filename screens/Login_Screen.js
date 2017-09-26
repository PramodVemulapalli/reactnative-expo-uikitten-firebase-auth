import React, { Component } from 'react';
import { LayoutAnimation, View, Text, Dimensions, Image, Keyboard, Platform, UIManager } from 'react-native';
//import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import firebase from 'firebase';
import validator from 'validator';
import ErrorMessage from './../components/ErrorMessage';
import { emailChanged, passwordChanged, loginUser, facebookSignin, errorSet } from '../actions';


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


class Login_Screen extends Component {

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
      UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
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
    if (Platform.OS === 'android') {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    }
    this.setState({ keyboardflag: true });
  }

  _keyboardDidHide () {
    if (Platform.OS === 'android') {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    }
    this.setState({ keyboardflag: false });
  }

  static navigationOptions = {
    header: null,
  };

  onEmailChange(text) {
    console.log(text);
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
    this.validateInput('password',text);
  }

  onButtonPress() {
    console.log('Login_Screen:Line 84: onButtonPress');
    console.log(this.state.emailFlag);
    console.log(this.state.passwordFlag);
    if (this.state.emailFlag && this.state.passwordFlag) {
      const { email, password } = this.props;
      this.props.loginUser({ email, password });
    } else {

    }
  }

  // Validate the form inputs
  validateInput(inputName, inputVal) {

    if (inputName == 'email') {
      if (validator.isEmail(inputVal)){
        this.setState({ emailError: '' });
        this.setState({ emailFlag: 1 });
      } else {
        this.setState({ emailError: 'Please enter a valid email address'});
        this.setState({ emailFlag: 0 });
      }
    }

    if (inputName == 'password') {
      if (validator.isAscii(inputVal)){
        this.setState({ passwordError: '' });
        this.setState({ passwordFlag: 1 });
      } else {
        this.setState({ passwordError: 'Please enter a valid password'});
        this.setState({ passwordFlag: 0 });
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

    if ( Platform.OS === 'ios' || this.state.keyboardflag == false ) {
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

  _renderFacebook() {
      return (<View style={styles.buttons}>
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
          rkType='large' style={styles.fb}
          text='Facebook Signin'>
        </GradientButton>
      </View>);
  }

  /*
  <RkAvoidKeyboard
    onStartShouldSetResponder={ (e) => true}
    onResponderRelease={ (e) => Keyboard.dismiss()}
    style={styles.screen}>
  */

  render() {
      let image = this._renderImage();
      let android_s_c_marginTop = (Platform.OS === 'android' && this.state.keyboardflag) ? 30 : 0;
      let android_styles_container = {marginTop: android_s_c_marginTop};
      let android_s_c_justifyContent = (Platform.OS === 'android' && this.state.keyboardflag) ? 'flex-start' : 'flex-end';
      let android_styles_footer = {justifyContent: android_s_c_justifyContent};
      console.log(android_styles_footer);

      return (

        <RkAvoidKeyboard
          onStartShouldSetResponder={ (e) => true}
          onResponderRelease={ (e) => Keyboard.dismiss()}
          style={styles.screen}>

          {this._renderImage()}
          <View style = {{...styles.container, ...android_styles_container}}>

            {this._renderFacebook()}
            <RkTextInput
              rkType='rounded'
              placeholder='Username'
              value={this.props.email}
              onChangeText={email => this.onEmailChange(email)}
              onBlur={() => {
                this.validateInput('email', this.props.email);
              }}
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
              text='LOGIN'>
            </GradientButton>


            <View style={{...styles.footer, ...android_styles_footer}}>
              <View style={styles.textRow}>
                <RkText rkType='primary3'>Don’t have an account?</RkText>
                <RkButton rkType='clear'>
                  <RkText rkType='header6' onPress={() => this.props.navigation.navigate('profile_scr')}> Sign up
                    now </RkText>
                </RkButton>
              </View>
            </View>
          </View>
          <ErrorMessage />
        </RkAvoidKeyboard>
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
    flex: -1
  },
  footer: {
    justifyContent: 'flex-end',
    flex: 1
  },
  buttons: {
    flexDirection: 'row',
    marginBottom: scaleVertical(24),
    justifyContent: 'center'
  },
  button: {
    flex: 1,
    marginHorizontal: 7
  },
  fb: {
    flex: 4,
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
  const { email, password, user } = auth;
  return { email, password, user };
};

export default connect(mapStateToProps, {
  emailChanged, passwordChanged, loginUser, facebookSignin, errorSet
})(Login_Screen);
