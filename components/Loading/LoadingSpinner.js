import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import Spinner from 'react-native-loading-spinner-overlay';


class LoadingSpinner extends Component {

  render() {

    if ( this.props.loginStatus == 'checking' || this.props.loginStatus == 'fbchecking' ) {
        console.log('loading spinner : line 13: Turned spinner on as login status is checking ');
        // using the visibility flag on the spinner doesnot work.
        // The only way to get rid of the spinner is to unmount it
        return (
          <View>
            <Spinner visible={true} color={'#003399'} size={'large'} />
          </View>
        );
    }

    if ( this.props.parentFlag == true ) {
        console.log('loading spinner : line 24: Turned spinner on based on props flag ');
        // return the prop when the parent passes true flag
        return (
          <View>
            <Spinner visible={true} color={'#003399'} size={'large'} />
          </View>
        );
    }

    console.log('loading spinner : line 16: Turned spinner oFF ');
    return (null);

  }
}


const mapStateToProps = ({ auth }) => {
  const { loginStatus } = auth;
  return { loginStatus };
};

export default connect(mapStateToProps,null)(LoadingSpinner);
