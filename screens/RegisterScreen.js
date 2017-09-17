import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, phoneChanged, firstnameChanged, lastnameChanged, signupUser, facebookLogin } from '../actions';

import { FormLabel, FormInput, Button, Divider, SocialIcon, Icon } from 'react-native-elements';


class RegisterScreen extends Component {

  static navigationOptions = {
     title: 'Register'
  }

  onEmailChange(text) {
    console.log(this.props.email);
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
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
    const { email, password } = this.props;
    this.props.signupUser({ email, password });
  }

  renderButton() {
    return (
      <Button
        onPress={this.onButtonPress.bind(this)}
        title="Sign Up !"
         />
    );
  }


  onNavPress = (screenname) => {
    this.props.navigation.navigate(screenname);
  }

  render() {
    return (

      <View>
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
                  <FormLabel>Enter Phone Number</FormLabel>
                  <FormInput
                    value={this.props.phone}
                    onChangeText={phone => this.onPhoneChange(phone)}
                  />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around'}} >
                  <View style={{flex:1}} >
                    <FormLabel>Enter First Name</FormLabel>
                    <FormInput
                      value={this.props.firstname}
                      onChangeText={firstname => this.onFirstnameChange(firstname)}
                    />
                  </View>
                  <View style={{flex:1}} >
                    <FormLabel>Enter Last Name</FormLabel>
                    <FormInput
                      value={this.props.lastname}
                      onChangeText={lastname => this.onLastnameChange(lastname)}
                    />
                  </View>
                </View>
                <View style={{ marginBottom: 10 }}>
                  <FormLabel>Enter Email</FormLabel>
                  <FormInput
                    value={this.props.email}
                    onChangeText={email => this.onEmailChange(email)}
                  />
                </View>
                <View style={{ marginBottom: 10 }}>
                  <FormLabel>Enter Password</FormLabel>
                  <FormInput
                    value={this.props.password}
                    onChangeText={password => this.onPasswordChange(password)}
                    secureTextEntry={true}
                  />
                </View>
                <Text style={styles.errorTextStyle}>
                  {this.props.error}
                </Text>
                <View style={styles.viewContainer}>
                  {this.renderButton()}
                </View>

          </View>
      </View>
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
})(RegisterScreen);
