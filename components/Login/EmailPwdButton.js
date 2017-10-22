import React, { Component } from 'react';
import { View } from 'react-native';

import { connect } from 'react-redux';

import {
  RkStyleSheet
} from 'react-native-ui-kitten';

import {GradientButton} from './../../components/';
import validator from 'validator';
import { loginUser, signupUser, errorSet, resetUser } from './../../actions';


class EmailPwdButton extends Component {

  onButtonPress() {

    if (this.props.emailPwdBtnStr == 'SignIn') {
        const { email, password } = this.props;
        if ( this.validateInput('email', email) && this.validateInput('password', password)) {
          this.props.loginUser({ email, password });
        } else {
          this.props.errorSet('Please provide valid inputs');
        }
    }

    if (this.props.emailPwdBtnStr == 'SignUp') {
        const { email, password, phone, firstname, lastname } = this.props;
        if ( this.validateInput('email', email) && this.validateInput('password', password)) {
          this.props.signupUser({ email, password, phone, firstname, lastname });
        } else {
          this.props.errorSet('Please provide valid inputs');
        }
    }

    if (this.props.emailPwdBtnStr == 'Reset') {
        const { emailReset } = this.props;
        if ( this.validateInput('email', emailReset) ) {
          this.props.resetUser({email: emailReset});
          this.props.onButtonPress();
        } else {
          this.props.errorSet('Please provide valid inputs');
        }
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
  const { email, password,  phone, firstname, lastname, emailReset } = auth;
  return { email, password, phone, firstname, lastname, emailReset };
};

export default connect(mapStateToProps, {
  loginUser, signupUser, errorSet, resetUser
})(EmailPwdButton);
