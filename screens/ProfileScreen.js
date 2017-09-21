import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import validator from 'validator';
import { emailChanged, passwordChanged, phoneChanged, firstnameChanged, lastnameChanged, signupUser, facebookLogin } from '../actions';

import { FormLabel, FormInput, FormValidationMessage, Button, Divider, SocialIcon, Icon } from 'react-native-elements';


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
    }
  }

  static navigationOptions = {
     title: 'Enter your profile'
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
    this.validateInput('lastname',text);
  }

  onButtonPress() {
    const { email, password, phone, firstname, lastname } = this.props;
    this.props.signupUser({ email, password, phone, firstname, lastname });
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

    if (inputName == 'phone') {
      if (validator.isMobilePhone(inputVal, 'en-US')){
        this.setState({ phoneError: '' });
        this.setState({ phoneFlag: 1 });
      } else {
        this.setState({ phoneError: 'Please enter a valid phone number'});
        this.setState({ phoneFlag: 0 });
      }
    }

    if (inputName == 'firstname') {
      if (validator.isAscii(inputVal)){
        this.setState({ firstnameError: '' });
        this.setState({ firstnameFlag: 1 });
      } else {
        this.setState({ firstnameError: 'Please enter your First Name'});
        this.setState({ firstnameFlag: 0 });
      }
    }

    if (inputName == 'lastname') {
      if (validator.isAscii(inputVal)){
        this.setState({ lastnameError: '' });
        this.setState({ lastnameFlag: 1 });
      } else {
        this.setState({ lastnameError: 'Please enter your Last Name'});
        this.setState({ lastnameFlag: 0 });
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
    if (inputName == 'phone') {
      if (this.state.phoneError !='') {
        return (<FormValidationMessage>{this.state.phoneError}</FormValidationMessage>);
      }
    }
    if (inputName == 'firstname') {
      if (this.state.firstnameError !='') {
        return (<FormValidationMessage>{this.state.firstnameError}</FormValidationMessage>);
      }
    }
    if (inputName == 'lastname') {
      if (this.state.lastnameError !='') {
        return (<FormValidationMessage>{this.state.lastnameError}</FormValidationMessage>);
      }
    }
    return;
  }

  onNavPress = (screenname) => {
    this.props.navigation.navigate(screenname);
  }

  render() {
    return (

      <KeyboardAwareScrollView enableOnAndroid={true}>
        <Divider style={{ backgroundColor: 'gray' }} />
          <View>
                <View>
                  <FormLabel>Enter Phone Number</FormLabel>
                  <FormInput
                    value={this.props.phone}
                    placeholder='9876543210'
                    onChangeText={phone => this.onPhoneChange(phone)}
                    onBlur={() => {
                      this.validateInput('phone', this.props.phone);
                    }}
                    keyboardType={'phone-pad'}
                  />
                  <View>
                    { this.renderFormError('phone') }
                  </View>
                </View>
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
                <View style={{ flexDirection: 'row', justifyContent: 'space-around'}} >
                  <View style={{flex:1}} >
                    <FormLabel>Enter First Name</FormLabel>
                    <FormInput
                      value={this.props.firstname}
                      placeholder='John'
                      onChangeText={firstname => this.onFirstnameChange(firstname)}
                      onBlur={() => {
                        this.validateInput('firstname', this.props.firstname);
                      }}
                    />
                    <View>
                      { this.renderFormError('firstname') }
                    </View>
                  </View>
                  <View style={{flex:1}} >
                    <FormLabel>Enter Last Name</FormLabel>
                    <FormInput
                      value={this.props.lastname}
                      placeholder='Doe'
                      onChangeText={lastname => this.onLastnameChange(lastname)}
                      onBlur={() => {
                        this.validateInput('lastname', this.props.lastname);
                      }}
                    />
                    <View>
                      { this.renderFormError('lastname') }
                    </View>
                  </View>
                </View>
                <Text style={styles.errorTextStyle}>
                  {this.props.error}
                </Text>
                <View style={styles.viewContainer}>
                  <Button
                    onPress={() => this.onNavPress('register_scr')}
                    title="Proceed to Register"
                    disabled={!(this.state.emailFlag && this.state.phoneFlag && this.state.firstnameFlag && this.state.lastnameFlag )}
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
  const { email, password, phone, firstname, lastname, error } = auth;
  return { email, password, error, phone, firstname, lastname };
};

export default connect(mapStateToProps, {
  emailChanged, passwordChanged, phoneChanged, firstnameChanged, lastnameChanged, signupUser, facebookLogin
})(ProfileScreen);
