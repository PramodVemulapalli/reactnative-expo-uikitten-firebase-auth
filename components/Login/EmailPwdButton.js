import React, { Component } from 'react';
import { View } from 'react-native';

import { connect } from 'react-redux';

import {
  RkStyleSheet
} from 'react-native-ui-kitten';

import {GradientButton} from './../../components/';
import validator from 'validator';
import { loginUser, signupUser, errorSet } from './../../actions';


class EmailPwdButton extends Component {

  onButtonPress() {

    console.log('Login.js:Line 102: onButtonPress');
    if ( this.validateInput('email', this.props.email) && this.validateInput('password', this.props.password)) {
      const { email, password, phone, firstname, lastname } = this.props;
      if (this.props.emailPwdBtnStr == 'SignIn') {
        this.props.loginUser({ email, password });
      }
      if (this.props.emailPwdBtnStr == 'SignUp') {
        this.props.signupUser({ email, password, phone, firstname, lastname });
      }
    } else {
      this.props.errorSet('Please provide a valid inputs');
    }

  }

  // Validate the form inputs
  validateInput(inputName, inputVal) {

    if (inputName == 'email') {
      return validator.isEmail(inputVal);
    }

    if (inputName == 'password') {
      return validator.isAscii(inputVal);
    }
  }


  render () {
    return (
      <View>
        <GradientButton
          onPress={() => {
            console.log("Hello");
            this.onButtonPress();
          }}
          rkType='large'
          style={styles.save}
          text={this.props.emailPwdBtnStr}>
        </GradientButton>
      </View>
    );
  }

}

let styles = RkStyleSheet.create(theme => ({
  save: {
    marginVertical: 9,
    marginHorizontal: 20
  }
}));


const mapStateToProps = ({ auth }) => {
  const { email, password,  phone, firstname, lastname } = auth;
  return { email, password, phone, firstname, lastname };
};

export default connect(mapStateToProps, {
  loginUser, signupUser, errorSet
})(EmailPwdButton);
