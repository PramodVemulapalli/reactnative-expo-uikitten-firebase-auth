import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { emailChanged, passwordChanged, loginUser, facebookLogin } from '../actions';
import { FormLabel, FormInput, Button, Divider, SocialIcon, Icon } from 'react-native-elements';


class LoginScreen extends Component {

  static navigationOptions = {
     title: 'Login',
     //tabBarVisible: true
  }

  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onButtonPress() {
    const { email, password } = this.props;
    this.props.loginUser({ email, password });
  }

  renderButton() {

    return (
      <Button
        onPress={this.onButtonPress.bind(this)} title="Submit" />
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
