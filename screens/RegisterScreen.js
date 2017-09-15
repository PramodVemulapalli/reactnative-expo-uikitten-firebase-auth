import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, signupUser, facebookLogin } from '../actions';

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
      /*
      <View style={styles.headerView}>
          <Icon
            type="material"
            color="#00aced"
            name="home"
            size={28}
          />
          <Icon
            type="font-awesome"
            color="#00aced"
            name="cutlery"
            size={20}
          />
          <Text style={styles.headerText}> HomeFood </Text>
      </View>
      */

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
                  <FormLabel>Enter Email</FormLabel>
                  <FormInput
                    value={this.props.email}
                    onChangeText={email => this.onEmailChange(email)}
                  />
                </View>

                <View style={{ marginBottom: 10 }}>
                  <FormLabel>Enter Paasword</FormLabel>
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
  const { email, password, error } = auth;
  return { email, password, error };
};

export default connect(mapStateToProps, {
  emailChanged, passwordChanged, signupUser, facebookLogin
})(RegisterScreen);
