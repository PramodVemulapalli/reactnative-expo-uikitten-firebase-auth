import React, { Component } from 'react';
import { View, Dimensions, Text, Image, Platform } from 'react-native';
import { connect } from 'react-redux';
import { loginStatusChanged, authStateChanged, fontLoadedChanged } from '../actions';
import firebase from 'firebase';
import Spinner from 'react-native-loading-spinner-overlay';
import { AppLoading, Font } from 'expo';


class Loading_Screen extends Component {

  static navigationOptions = {
    header: null
  };

  componentDidMount() {

    console.log('---------------------------');
    console.log('component did mount');
    console.log('loadAssetAsync');
    this._loadAssetsAsync();
    console.log('authstatechanged');
    this.props.authStateChanged();
  }

  cacheFonts(fonts) {
    return fonts.map(font => Font.loadAsync(font));
  }

  async _loadAssetsAsync() {

    /*
    const imageAssets = cacheImages([
      require('./assets/images/exponent-wordmark.png'),
      'http://www.google.com/logo.png',
    ]);
    */

    const fontAssets = this.cacheFonts([
      {'fontawesome': require('./../assets/fonts/fontawesome.ttf')},
      {'icomoon': require('./../assets/fonts/icomoon.ttf')},
      {'Righteous-Regular': require('./../assets/fonts/Righteous-Regular.ttf')},
      {'Roboto-Bold': require('./../assets/fonts/Roboto-Bold.ttf')},
      {'Roboto-Light': require('./../assets/fonts/Roboto-Light.ttf')},
      {'Roboto-Medium': require('./../assets/fonts/Roboto-Medium.ttf')},
      {'Roboto-Regular': require('./../assets/fonts/Roboto-Regular.ttf')},
    ]);

    await Promise.all(fontAssets);
    console.log('All fonts loaded !');
    this.props.fontLoadedChanged(true);

  }


  /*
  async fontsLoaded() {
    await Font.loadAsync({
      'fontawesome': require('./../assets/fonts/fontawesome.ttf'),
      'icomoon': require('./../assets/fonts/icomoon.ttf'),
      'Righteous-Regular': require('./../assets/fonts/Righteous-Regular.ttf'),
      'Roboto-Bold': require('./../assets/fonts/Roboto-Bold.ttf'),
      'Roboto-Light': require('./../assets/fonts/Roboto-Light.ttf'),
      'Roboto-Medium': require('./../assets/fonts/Roboto-Medium.ttf'),
      'Roboto-Regular': require('./../assets/fonts/Roboto-Regular.ttf'),
    });
  }


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

    if ( nextProps.fontLoaded ) {
      console.log('nextProps.fontLoaded = ' + nextProps.fontLoaded);
      this.onAuthComplete(nextProps);
    }

    /*
    if ( nextProps.loginStatus != this.props.loginStatus ) {
      console.log("login status is different");
      console.log( nextProps.loginStatus );
      console.log( this.props.loginStatus );
      this.onAuthComplete(nextProps);
    }
    */
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

  /*

  <View style={{flex:1}}>
      <Spinner visible={true} color={'#003399'} size={'large'} />
    <View style={{position: 'absolute',
                  right: '33%',
                  top: '20%'}}>
      <Image style={[styles.image, {width}]} source={require('./../assets/icons/loading-icon.png')}/>
    </View>
  </View>

  fontsLoaded

  <AppLoading
    startAsync={this.fontsLoaded}
    onFinish={() => this.props.fontLoadedChanged(true)}
    onError={console.warn}
  />

  return (
    <View style={{ flex:1, justifyContent: 'center', alignItems: 'center'}}>
      <Image style={[styles.image, {width}]} source={require('./../assets/icons/loading-icon.png')}/>
    </View>
  );


  <View style={{ flex:1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'}}>
    <Image style={[styles.image, {width}]} source={require('./../assets/icons/loading-icon.png')}/>
  </View>
  */

  render() {

    console.log('------------------------------------------------');
    console.log("Loading Screen: Render: Login Status");
    console.log('loginStatus = ' + this.props.loginStatus);
    console.log('fontLoaded = ' + this.props.fontLoaded);
    //<Spinner visible={true} textContent={"Loading..."} textStyle={{color: '#003399'}} overlayColor={'rgba(0,51,153,0.5)'} />
//<AppLoading />

      if ( this.props.loginStatus == 'initial' || !this.props.fontLoaded ) {
          width = Dimensions.get('window').width / 3;
          console.log('rendering app loading screen');
          if (Platform.OS === 'ios') {
            return (
              <AppLoading />
            );
          } else {
            return (
              <View style={{flex:1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'}}>
                <View>
                  <Image style={[styles.image, {width}]} source={require('./../assets/icons/loading-icon.png')}/>
                </View>
                <View>
                  <Spinner visible={true} color={'#003399'} size={'large'} />
                </View>
              </View>
            );
          }
        }
      if ( this.props.loginStatus == 'checking' || this.props.loginStatus == 'fbchecking' ) {
          console.log('rendering spinner screen');
          return (
            <View>
              <Spinner visible={true} color={'#003399'} size={'large'} />
              <Text> {'Hello World'} </Text>
            </View>
          );
        }
      if ( this.props.loginStatus == 'loggedin' || this.props.loginStatus == 'notloggedin' || this.props.loginStatus == 'loginfailed' || this.props.loginStatus == 'fbloginfailed') {
        console.log('rendering appy loading screen');
        width = Dimensions.get('window').width/2.3;
        return (
          <View style={{ flex:1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'}}>
            <Image style={[styles.image, {width}]} source={require('./../assets/icons/loading-icon.png')}/>
          </View>
        );
      }
      console.log('rendering aerror screen');
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
