import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import validator from 'validator';
import { emailChanged, passwordChanged, phoneChanged, firstnameChanged, lastnameChanged, signupUser, facebookSignup } from '../actions';

import { FormLabel, FormInput, FormValidationMessage, Button, Divider, SocialIcon, Icon } from 'react-native-elements';


class RegisterScreen extends Component {

  constructor(props) {
    super(props)

    this.state = {
      emailError: '',
      passwordError: '',
      emailFlag: 1,
      passwordFlag: 0
    }
  }

  static navigationOptions = {
     title: 'Register'
  }

  // Call action if the value is changed
  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
    this.validateInput('password',text);
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
        return (<FormValidationMessage>{this.state.emailError}</FormValidationMessage>);
      }
    }
    if (inputName == 'password') {
      if (this.state.passwordError !='') {
        return (<FormValidationMessage>{this.state.passwordError}</FormValidationMessage>);
      }
    }
    return;
  }

  onButtonPress() {
    const { email, password, phone, firstname, lastname } = this.props;
    this.props.signupUser({ email, password, phone, firstname, lastname });
  }

  onNavPress = (screenname) => {
    this.props.navigation.navigate(screenname);
  }

  onFacebookPress() {
    const { email, phone, firstname, lastname } = this.props;
    this.props.facebookSignup({ email, phone, firstname, lastname });
  }

  render() {
    return (

      <KeyboardAwareScrollView enableOnAndroid={true}>
        <Divider style={{ backgroundColor: 'gray' }} />
          <View style={styles.buttonContainer}>
            <SocialIcon
                title="Sign Up With Facebook"
                button
                fontWeight="400"
                type="facebook"
                onPress={this.onFacebookPress.bind(this)}
              />
          </View>
          <View style={styles.orView}>
            <Text> - or - </Text>
          </View>
          <View>
                <View>
                  <FormLabel>Enter Email</FormLabel>
                  <FormInput
                    value={this.props.email}
                    placeholder='johnnydoe@gmail.com'
                    onChangeText={email => this.onEmailChange(email)}
                    onBlur={() => {
                      this.validateInput('email', this.props.email);
                    }}
                  />
                  <View>
                    { this.renderFormError('email') }
                  </View>
                </View>
                <View>
                  <FormLabel>Enter Password</FormLabel>
                  <FormInput
                    value={this.props.password}
                    onChangeText={password => this.onPasswordChange(password)}
                    secureTextEntry={true}
                    onBlur={() => {
                      this.validateInput('password', this.props.password);
                    }}
                  />
                  <View>
                    { this.renderFormError('password') }
                  </View>
                </View>
                <Text style={styles.errorTextStyle}>
                  {this.props.error}
                </Text>
                <View style={styles.viewContainer}>
                  <Button
                    onPress={this.onButtonPress.bind(this)}
                    title="Submit"
                    disabled={!(this.state.emailFlag && this.state.passwordFlag)}
                     />
                </View>
          </View>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = {
  buttonContainer: {
    position: 'relative',
    marginTop: 10
  },
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  },
  viewContainer: {
    margin: 10
  },
  headerView: {
    marginTop: 30,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  orView: {
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerText: {
    color: '#00aced',
    fontSize: 30,
    fontWeight: 'bold',
    alignSelf: 'center'
  },
}

const mapStateToProps = ({ auth }) => {
  const { email, password, error, phone, firstname, lastname } = auth;
  return { email, password, error, phone, firstname, lastname };
};

export default connect(mapStateToProps, {
  emailChanged, passwordChanged, signupUser, facebookSignup
})(RegisterScreen);
