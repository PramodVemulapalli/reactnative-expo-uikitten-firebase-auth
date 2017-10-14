import React, { Component } from 'react';
import { View, Dimensions, Text, Image } from 'react-native';
import { connect } from 'react-redux';
import { loginStatusChanged, authStateChanged, fontLoadedChanged } from '../actions';
import firebase from 'firebase';
import Spinner from 'react-native-loading-spinner-overlay';
import { AppLoading, Font } from 'expo';


class Loading_Screen extends Component {

  static navigationOptions = {
    header: null
  };

  async componentDidMount() {
    if ( !this.props.fontLoaded ) {
      console.log(this.props.fontLoaded);
      await Font.loadAsync({
        'fontawesome': require('./../assets/fonts/fontawesome.ttf'),
        'icomoon': require('./../assets/fonts/icomoon.ttf'),
        'Righteous-Regular': require('./../assets/fonts/Righteous-Regular.ttf'),
        'Roboto-Bold': require('./../assets/fonts/Roboto-Bold.ttf'),
        'Roboto-Light': require('./../assets/fonts/Roboto-Light.ttf'),
        'Roboto-Medium': require('./../assets/fonts/Roboto-Medium.ttf'),
        'Roboto-Regular': require('./../assets/fonts/Roboto-Regular.ttf'),
      });
      this.props.fontLoadedChanged(true);
    }
    this.props.authStateChanged();
  }

  /*
  componentDidMount() {
    // console.log(KittenTheme);
    if ( !this.props.FontLoaded ) {
      console.log('I am in here');
      this.props.fontLoadedChanged(true);
    }
  }

  */



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

    console.log('------------------------------------------------');
    console.log("Loading Screen: Render: Login Status");
    console.log(this.props.loginStatus);
    console.log(this.props.fontLoaded);
    //<Spinner visible={true} textContent={"Loading..."} textStyle={{color: '#003399'}} overlayColor={'rgba(0,51,153,0.5)'} />


      if ( this.props.loginStatus == 'initial' || !this.props.fontLoaded ) {
          return (
              <AppLoading />
          );
        }
      if ( this.props.loginStatus == 'checking' || this.props.loginStatus == 'fbchecking' ) {
          return (
            <View>
              <Spinner visible={true} color={'#003399'} size={'large'} />
            </View>
          );
        }
      if ( this.props.loginStatus == 'loggedin' || this.props.loginStatus == 'notloggedin' || this.props.loginStatus == 'loginfailed' || this.props.loginStatus == 'fbloginfailed') {
        width = Dimensions.get('window').width / 2;
        return (
          <View style={{ flex:1, justifyContent: 'center', alignItems: 'center'}}>
            <Image style={[styles.image, {width}]} source={require('./../assets/icons/loading-icon.png')}/>
          </View>
        );
      }
      return (
        <View>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>
            { 'This is the invalid screen' }
          </Text>
        </View>
      );
    }

}

const mapStateToProps = ({ auth }) => {
  const { loginStatus, fontLoaded } = auth;
  return { loginStatus, fontLoaded };
};

const styles = {
  image: {
    resizeMode: 'contain',
  },
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
  loginStatusChanged, authStateChanged, fontLoadedChanged
})(Loading_Screen);
