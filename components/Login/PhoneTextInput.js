import React, { Component } from 'react';
import { View } from 'react-native';
import {
  RkText,
  RkTextInput,
  RkStyleSheet,
} from 'react-native-ui-kitten';
import { connect } from 'react-redux';
import validator from 'validator';
import { phoneChanged } from './../../actions';

class PhoneTextInput extends Component {

  constructor(props) {
      super(props)
      this.state = {
        phoneError: '',
        phoneFlag: 0,
      }
  }

  componentWillMount () {
      // Populate the text inputs if you already have values for them
      if ( this.props.phone != '') {
        this.validateInput('phone', this.props.phone);
      }
  }

  onPhoneChange(text) {
    this.props.phoneChanged(text);
  }

  // Validate the form inputs
  validateInput(inputName, inputVal) {

    if (inputName == 'phone') {
      if (validator.isMobilePhone(inputVal, 'en-US')){
        this.setState({ phoneError: '' });
        this.setState({ phoneFlag: 1 });
        return true;
      } else {
        this.setState({ phoneError: 'Please enter a valid phone number'});
        this.setState({ phoneFlag: 0 });
        return false;
      }
    }
  }

  // Display form validation errors if needed
  renderFormError(inputName) {

    if (inputName == 'phone') {
      if (this.state.phoneError !='') {
        return (<RkText rkType='danger'> {this.state.phoneError} </RkText>);
      }
    }
  }

  render() {
    return (
      <View style = {styles.emailPwdContainer} >
        <RkTextInput
          rkType='rounded'
          placeholder='Phone ( 8143217654 )'
          value={this.props.phone}
          onChangeText={phone => this.onPhoneChange(phone)}
          onBlur={() => { this.validateInput('phone', this.props.phone); }}
        />
        <View>
        { this.renderFormError('phone') }
        </View>
      </View>
    );
  }
}

let styles = RkStyleSheet.create(theme => ({
  emailPwdContainer: {
    alignItems: 'center',
    marginHorizontal: 20
  }
}));


const mapStateToProps = ({ auth }) => {
  const { phone } = auth;
  return { phone };
};

export default connect(mapStateToProps, {
  phoneChanged
})(PhoneTextInput);
