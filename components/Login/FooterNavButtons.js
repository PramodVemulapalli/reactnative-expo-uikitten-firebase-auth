import React, { Component } from 'react';
import { View, Text } from 'react-native';

import ForgotPwdButton from './ForgotPwdButton';

import {
  RkStyleSheet,
  RkButton,
  RkText
} from 'react-native-ui-kitten';

class FooterNavButtons extends Component {

  /*
  _pressEmailPwdButton() {

    console.log('footerButton');
    if ( this.props.emailPwdBtnStr=='SignUp' ) {
      if (!this.state.showEmailPwdState) {
        // In the case when we have the register screen and the show email-pwd option button is pressed
        // console.log('We are in the register signup screen and we want to show the email pwd option');
        this.setState({ showEmailPwdState: true });
        return;
      }
    }

  }

  */

  _pressNavButton() {
    // In the other two cases we should navigate
    // case 1: we are in the login screen
    // case 2: we are in the register screen and the email-pwd option button is pressed
    // console.log('We are not in the register signup screen and so we should navigate');
    this.props.onNavPress();
  }


  _renderFooter() {

    /*
    let android_s_c_justifyContent = (this.props.keyboardflag) ? 'flex-start' : 'flex-end'; // Platform.OS === 'android' &&
    if ( this.props.emailPwdBtnStr=='SignUp' && !this.props.showEmailPwdState) {
        android_s_c_justifyContent = 'flex-end';
    }
    android_s_c_justifyContent = 'flex-start';
    let android_styles_footer = {justifyContent: android_s_c_justifyContent};
    */
    if ( this.props.emailPwdBtnStr=='SignUp'  && !this.props.showEmailPwdState) {
        // In the case when we are on register screen and the show email-pwd button is not pressed
        // console.log('show email password option');
        // {...styles.footer, ...
        return (
        <View>
          <View style={styles.textRow}>
          <RkButton
              rkType='clear'
              onPress={ () => { this.props.pressEmailPwdButton() } }>
              <RkText rkType='primary3'>
                {'Show email-password option'}
              </RkText>
              <RkText rkType='header6'>
                {''}
              </RkText>
            </RkButton>
          </View>
        </View>

      );
    } else {
      // In the other cases
      // If we are on the login screen or
      // If we are on the register screen and the show email-pwd button is pressed
      // console.log('show parent props option');

      // let android_nav_elsewhere = { marginBottom: 20 } ;
      //style={{...styles.footer, ...android_styles_footer}}

      /*

      */
      return (
        <View>
          <ForgotPwdButton emailPwdBtnStr={this.props.emailPwdBtnStr} onForgotPassword = {this.props.onForgotPassword} />
          <View style={ styles.textRow } >
            <RkButton
                rkType='clear'
                onPress={ () => { this._pressNavButton() } }>
                <RkText rkType='primary3'>
                  {this.props.onNavString1}
                </RkText>
                <RkText rkType='header6'>
                  {this.props.onNavString2}
                </RkText>
              </RkButton>
          </View>
        </View>
      );
    }
  }

  /*

  <ForgotPwdButton emailPwdBtnStr={this.props.emailPwdBtnStr} onForgotPassword = {this.props.onForgotPassword} />
  <View style={{...styles.textRow, ...android_nav_elsewhere}}>
  <RkButton
      rkType='clear'
      onPress={ () => { this._pressNavButton() } }>
      <RkText rkType='primary3'>
        {this.props.onNavString1}
      </RkText>
      <RkText rkType='header6'>
        {this.props.onNavString2}
      </RkText>
    </RkButton>
  </View>

  */

  //{ this._renderFooter() }

  render() {

    return (
      <View>
        { this._renderFooter() }
      </View>
    );

  }


}

/*

<View style={ flex: 1 } >
  { this._renderFooter() }
</View>

*/


let styles = RkStyleSheet.create(theme => ({
  footer: {
    justifyContent: 'flex-end',
    flex: 1
  },
  textRow: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 20
  }
}));

export default FooterNavButtons;
