import React, { Component } from 'react';
import { View } from 'react-native';
import {
  RkText,
  RkTextInput,
  RkStyleSheet,
} from 'react-native-ui-kitten';
import { connect } from 'react-redux';
import validator from 'validator';
import { emailResetChanged } from './../../actions';

class EmailTextInput extends Component {

  constructor(props) {
      super(props)
      this.state = {
        emailError: '',
        emailFlag: 0,
      }
  }

  componentWillMount () {
      // Populate the text inputs if you already have values for them
      if ( this.props.emailReset != '') {
        this.validateInput('email', this.props.emailReset);
      }
  }

  onEmailResetChange(text) {
    this.props.emailResetChanged(text);
  }

  // Validate the form inputs
  validateInput(inputName, inputVal) {

    if (inputName == 'email') {
      if (validator.isEmail(inputVal)){
        this.setState({ emailError: '' });
        this.setState({ emailFlag: 1 });
        return true;
      } else {
        this.setState({ emailError: 'Please enter a valid email address'});
        this.setState({ emailFlag: 0 });
        return false;
      }
    }
  }

  // Display form validation errors if needed
  renderFormError(inputName) {

    if (inputName == 'email') {
      if (this.state.emailError !='') {
        return (<RkText rkType='danger'>{this.state.emailError}</RkText>);
      }
    }
  }

  render() {
    return (
      <View style = {styles.emailPwdContainer}>
        <RkTextInput
          rkType='rounded'
          placeholder='Email ( John.Doe@gmail.com )'
          value={this.props.emailReset}
          onChangeText={emailReset => this.onEmailResetChange(emailReset)}
          onBlur={() => { this.validateInput('email', this.props.emailReset); }}
        />
        <View>
        { this.renderFormError('email') }
        </View>
      </View>
    );
  }
}

let styles = RkStyleSheet.create(theme => ({
  emailPwdContainer: {
    marginHorizontal: 20,
    marginTop: 30
  }
}));


const mapStateToProps = ({ auth }) => {
  const { emailReset } = auth;
  return { emailReset };
};

export default connect(mapStateToProps, {
  emailResetChanged
})(EmailTextInput);
