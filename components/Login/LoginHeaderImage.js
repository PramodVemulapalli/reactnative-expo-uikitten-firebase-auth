import React, { Component } from 'react';
import { View, Dimensions, Image } from 'react-native';
import { scaleModerate, scaleVertical } from './../../utils/scale';

import {
  RkStyleSheet
} from 'react-native-ui-kitten';

class LoginHeaderImage extends Component {

  _renderImage(image) {
    if ( this.props.keyboardflag == false ) { // Platform.OS === 'ios' ||
      let contentHeight = scaleModerate(375, 1);
      let height = Dimensions.get('window').height - contentHeight;
      let width = Dimensions.get('window').width;
      image = (<Image style={[styles.image, {height, width}]}
                      source={require('./../../assets/images/backgroundLoginV6.png')}/>);
      return image;
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
  }
}));

export default LoginHeaderImage;
