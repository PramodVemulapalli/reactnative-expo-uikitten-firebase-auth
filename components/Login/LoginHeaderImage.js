import React, { Component } from 'react';
import { View, Dimensions, Image } from 'react-native';
import { scaleModerate, scaleVertical } from './../../utils/scale';

import {
  RkStyleSheet,
  RkText
} from 'react-native-ui-kitten';

class LoginHeaderImage extends Component {

  _renderImage(image) {
    if ( this.props.keyboardflag == false ) {
        if ( this.props.emailPwdBtnStr == 'SignUp' || this.props.emailPwdBtnStr == 'SignIn') {
          let contentHeight = scaleModerate(375, 1);
          let height = Dimensions.get('window').height - contentHeight;
          let width = Dimensions.get('window').width;
          image = (<Image style={[styles.image, {height, width}]}
                          source={require('./../../assets/images/backgroundLoginV6.png')}/>);
          return image
        }
        if ( this.props.emailPwdBtnStr == 'Profile') {
          return (
          <View style={{alignItems: 'center'}}>
            <Image style={styles.profileImage} source={require('./../../assets/images/cartLogo.png')}/>
            <RkText rkType='h1'>Registration</RkText>
          </View>
          );
        }
    } else {
      return;
    }
  }

  render() {
    return (
      <View>
        {this._renderImage()}
      </View>
    );
  }
}

let styles = RkStyleSheet.create(theme => ({
  image: {
    resizeMode: 'cover',
    marginBottom: scaleVertical(10),
  },
  profileImage: {
    marginVertical: 10,
    height:scaleVertical(77),
    resizeMode:'contain'
  }
}));

export default LoginHeaderImage;
