import React, { Component } from 'react';
import { View, Dimensions, Image } from 'react-native';
import { connect } from 'react-redux';

import { scaleModerate, scaleVertical } from './../../utils/scale';

import {
  RkStyleSheet,
  RkText
} from 'react-native-ui-kitten';




class LoginHeaderImage extends Component {

  constructor(props) {
      super(props)
      this.state = {
        fbcheckingFinished: false
      }
  }

  componentWillReceiveProps(nextProps) {
    if ( nextProps.loginStatus == 'fbchecking' && nextProps.loginStatus == 'fbloginfailed' ) {
      // only turns on when the loginstatus changes from fbchecking to fbloginfailed
      this.setState({fbcheckingFinished: true});
    } else {
      this.setState({fbcheckingFinished: false});
    }
  }


  _renderImage(image) {

    if ( this.props.keyboardflag == false || this.props.loginStatus == 'fbchecking' || this.state.fbcheckingFinished) {

        if ( this.props.emailPwdBtnStr == 'SignUp' || this.props.emailPwdBtnStr == 'SignIn') {
          let contentHeight = scaleModerate(375, 1);
          let height = Dimensions.get('window').height - contentHeight;
          let width = Dimensions.get('window').width;
          image = (<Image style={[styles.image, {height, width}]}
                          source={require('./../../assets/images/backgroundLoginV6.png')}/>);
          return image
        }
        if ( this.props.emailPwdBtnStr == 'Profile' ||  this.props.emailPwdBtnStr == 'Reset') {
          return (
          <View style={{alignItems: 'center'}}>
            <Image style={styles.profileImage} source={require('./../../assets/images/cartLogo.png')}/>
            <RkText rkType='h1'>{this.props.headerString}</RkText>
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

const mapStateToProps = ({ auth }) => {
  const { loginStatus, } = auth;
  return { loginStatus, };
};

let styles = RkStyleSheet.create(theme => ({
  image: {
    resizeMode: 'cover',
    marginBottom: scaleVertical(10),
  },
  profileImage: {
    marginVertical: 20,
    height:scaleVertical(77),
    resizeMode:'contain'
  }
}));

export default connect(mapStateToProps,null)(LoginHeaderImage);
