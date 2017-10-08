import React, { Component } from 'react';
import { View } from 'react-native';

import { connect } from 'react-redux';

import {
  RkStyleSheet
} from 'react-native-ui-kitten';

import {GradientButton} from './../../components/';
import validator from 'validator';
import { errorSet } from './../../actions';


class ProfileDataButton extends Component {

  onButtonPress() {

    if (this.validateInput('firstname', this.props.firstname)
        && this.validateInput('lastname', this.props.lastname)
        && this.validateInput('email', this.props.email)
        && this.validateInput('phone', this.props.phone)) {
        this.props.onRegisterPressAndReady();
    } else {
        this.props.errorSet('Please provide valid profile inputs');
    }

  }

  // Validate the form inputs
  validateInput(inputName, inputVal) {

      if (inputName == 'email') {
        return validator.isEmail(inputVal);
      }

      if (inputName == 'phone') {
        return validator.isMobilePhone(inputVal, 'en-US');
      }

      if (inputName == 'firstname') {
        return validator.isAscii(inputVal);
      }

      if (inputName == 'lastname') {
        return validator.isAscii(inputVal);
      }

  }
  render () {
    return (
      <View>
        <GradientButton
          onPress={() => {
            this.onButtonPress();
          }}
          rkType='large'
          style={styles.save}
          text='Proceed to Register'>
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
  const { email, phone, firstname, lastname } = auth;
  return { email, phone, firstname, lastname };
};

export default connect(mapStateToProps, {
  errorSet
})(ProfileDataButton);
