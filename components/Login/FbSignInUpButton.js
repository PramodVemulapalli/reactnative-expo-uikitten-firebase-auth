import React, { Component } from 'react';
import { View, Dimensions, Image } from 'react-native';
import { scaleModerate, scaleVertical } from './../../utils/scale';

import { connect } from 'react-redux';

import {
  RkButton,
  RkText,
  RkStyleSheet
} from 'react-native-ui-kitten';
import {FontAwesome} from './../../assets/icons';
import {GradientButton} from './../../components/';
import { facebookSignin, facebookSignup } from './../../actions';
import {scale} from './../../utils/scale';

class FbSignInUpButton extends Component {

  _pressSignInUp() {
    if (this.props.emailPwdBtnStr == 'SignIn') {
        this.props.facebookSignin();
    } else {
      const { email, phone, firstname, lastname } = this.props;
      this.props.facebookSignup({ email, phone, firstname, lastname });
    }
  }

  render() {

    return (
      <View style={styles.buttons}>
        <RkButton style={styles.button} rkType='social'>
          <RkText
            onPress={() => { this._pressSignInUp(); }}
            rkType='awesome hero accentColor'
            style={{ fontFamily: 'fontawesome' }}>
            {FontAwesome.facebook}
          </RkText>
        </RkButton>
        <GradientButton
          onPress={() => { this._pressSignInUp(); }}
          rkType='large'
          style={styles.fb}
          text={this.props.fbBtnStr}>
        </GradientButton>
      </View>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  const { email, phone, firstname, lastname, loginStatus, } = auth;
  return { email, phone, firstname, lastname, loginStatus, };
};


let styles = RkStyleSheet.create(theme => ({
  buttons: {
    flexDirection: 'row',
    marginBottom: scaleVertical(24),
    justifyContent: 'space-between',
  },
  fb: {
    flex: 4,
    marginLeft: 10,
    marginVertical: 1,
    height: scale(56)
  }
}));

export default connect(mapStateToProps, {
  facebookSignin, facebookSignup
})(FbSignInUpButton);
