import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import firebase from 'firebase';
import validator from 'validator';
import { emailChanged, passwordChanged, loginUser, facebookLogin } from '../actions';
import { FormLabel, FormInput, FormValidationMessage, Button, Divider, SocialIcon, Icon } from 'react-native-elements';


class LoginScreen extends Component {

  constructor(props) {
    super(props)

    this.state = {
      emailError: '',
      passwordError: '',
      emailFlag: 0,
      passwordFlag: 0
    }
  }

  static navigationOptions = {
     title: 'Login',
     //tabBarVisible: true
  }

  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
    this.validateInput('password',text);
  }

  onButtonPress() {
    const { email, password } = this.props;
    this.props.loginUser({ email, password });
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

  onNavPress = (screenname) => {
    this.props.navigation.navigate(screenname);
  }

  render() {

    return (
      <KeyboardAwareScrollView>
        <Divider style={{ backgroundColor: 'gray' }} />
        <View style={styles.buttonContainer}>
          <SocialIcon
              title="Sign In With Facebook"
              button
              fontWeight="400"
              type="facebook"
              onPress={ () => this.props.facebookLogin() }
            />
        </View>
        <View style={styles.orView}>
          <Text> - or - </Text>
        </View>
        <View>
              <View style={{ marginBottom: 10 }}>
                <FormLabel>Enter Email</FormLabel>
                <FormInput
                  value={this.props.email}
                  onChangeText={email => this.onEmailChange(email)}
                  onBlur={() => {
                    this.validateInput('email', this.props.email);
                  }}
                />
                <View>
                  { this.renderFormError('email') }
                </View>
              </View>

              <View style={{ marginBottom: 10 }}>
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
        <View style={styles.orView}>
          <Text> - or - </Text>
        </View>
        <View>
            <View style={styles.buttonContainer}>
              <Button
                title="Register"
                backgroundColor="#f50"
                fontSize={20}
                icon={{ type: 'font-awesome', color: "#ffffff", name: 'grav' }}
                onPress={ () => this.onNavPress('register_scr') }
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
  orView: {
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
}


const mapStateToProps = ({ auth }) => {
  const { email, password, error, user } = auth;
  return { email, password, error, user };
};

export default connect(mapStateToProps, {
  emailChanged, passwordChanged, loginUser, facebookLogin
})(LoginScreen);
