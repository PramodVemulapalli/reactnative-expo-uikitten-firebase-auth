import React, { Component } from 'react';
import { View } from 'react-native';
import {
  RkText,
  RkTextInput,
  RkStyleSheet,
} from 'react-native-ui-kitten';
import { connect } from 'react-redux';
import validator from 'validator';
import { lastnameChanged } from './../../actions';

class LastnameTextInput extends Component {

  constructor(props) {
      super(props)
      this.state = {
        lastnameError: '',
        lastnameFlag: 0,
      }
  }

  componentWillMount () {
      // Populate the text inputs if you already have values for them
      if ( this.props.lastname != '') {
        this.validateInput('lastname', this.props.lastname);
      }
  }

  onLastnameChange(text) {
    this.props.lastnameChanged(text);
  }

  // Validate the form inputs
  validateInput(inputName, inputVal) {

    if (inputName == 'lastname') {
      if (validator.isAscii(inputVal)){
        this.setState({ lastnameError: '' });
        this.setState({ lastnameFlag: 1 });
        return true;
      } else {
        this.setState({ lastnameError: 'Please enter your Last Name'});
        this.setState({ lastnameFlag: 0 });
        return false;
      }
    }
  }

  // Display form validation errors if needed
  renderFormError(inputName) {

    if (inputName == 'lastname') {
      if (this.state.lastnameError !='') {
        return (<RkText rkType='danger'> {this.state.lastnameError} </RkText>);
      }
    }
  }

  render() {
    return (
      <View style = {styles.emailPwdContainer} >
        <RkTextInput
          rkType='rounded'
          placeholder='Last Name ( Doe )'
          value={this.props.lastname}
          onChangeText={lastname => this.onLastnameChange(lastname)}
          onBlur={() => { this.validateInput('lastname', this.props.lastname); }}
        />
        <View>
        { this.renderFormError('lastname') }
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
  const { lastname } = auth;
  return { lastname };
};

export default connect(mapStateToProps, {
  lastnameChanged
})(LastnameTextInput);
