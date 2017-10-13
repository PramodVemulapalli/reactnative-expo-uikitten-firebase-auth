import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { loginStatusChanged, authStateChanged } from '../actions';
import firebase from 'firebase';
import Spinner from 'react-native-loading-spinner-overlay';
import { AppLoading } from 'expo';


class Loading_Screen extends Component {

  static navigationOptions = {
    header: null
  };

  componentDidMount() {
    this.props.authStateChanged();
  }

  componentWillReceiveProps(nextProps) {
    console.log('-------------------------------------');
    console.log("Loading Screen: componentWillReceiveProps");
    console.log('nextProps.loginStatus');
    console.log(nextProps.loginStatus);
    if ( nextProps.loginStatus != this.props.loginStatus ) {
      console.log("login status is different");
      console.log( nextProps.loginStatus );
      console.log( this.props.loginStatus );
      this.onAuthComplete(nextProps);
    }
  }

  onAuthComplete(props) {

    if (props.loginStatus == 'loggedin') {
      console.log('Loading Screen: navigate to menu');
      this.props.navigation.navigate('menu_scr');
    }

    if (props.loginStatus == 'notloggedin') {
      console.log('Loading Screen: navigate to Welcome Screen');
      this.props.navigation.navigate('welcome_screen');
    }

  }

  render() {

    console.log('-------------------------------------');
    console.log("Loading Screen: Render: Login Status");
    console.log(this.props.loginStatus);
    //<Spinner visible={true} textContent={"Loading..."} textStyle={{color: '#003399'}} overlayColor={'rgba(0,51,153,0.5)'} />





      if ( this.props.loginStatus == 'initial' ) {
          return (
              <AppLoading />
          );
        }
      if ( this.props.loginStatus == 'checking' ) {
          return (
            <View>
              <Spinner visible={true} color={'#003399'} size={'large'} />
            </View>
          );
        }
      if ( this.props.loginStatus == 'loggedin' || this.props.loginStatus == 'notloggedin' || this.props.loginStatus == 'loginfailed') {
        return (
          <View/>
        );
      }
    }

}

const mapStateToProps = ({ auth }) => {
  const { loginStatus } = auth;
  return { loginStatus };
};

const styles = {
  buttonContainer: {
    position: 'relative'
  },
  columnView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
}

export default connect( mapStateToProps , {
  loginStatusChanged, authStateChanged
})(Loading_Screen);
