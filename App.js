import Expo from 'expo';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import { Font } from 'expo';


import { StyleSheet, Text, View } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { LOGIN_STATUS_CHANGED } from './actions/types';
import { firebaseConfig } from './config/auth';
import { bootstrap } from './config/bootstrap';

import WalkthroughScreen from './screens/WalkthroughScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import RegisterScreen from './screens/RegisterScreen';
import Register_Screen from './screens/Register_Screen';
import fbRegister_Screen from './screens/fbRegister_Screen';
import LoginScreen from './screens/LoginScreen';
import Login_Screen from './screens/Login_Screen';
import LoadingScreen from './screens/LoadingScreen';
import MenuScreen from './screens/MenuScreen';
import OrdersScreen from './screens/OrdersScreen';
import ProfileScreen from './screens/ProfileScreen';
import Profile_Screen from './screens/Profile_Screen';
import Reset_Screen from './screens/Reset_Screen';
import SettingsScreen from './screens/SettingsScreen';


export default class App extends React.Component {

  //state = { loggedIn: true };

  constructor(props) {
    super(props);
    this.store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    bootstrap();
  }

  componentWillMount() {

    console.log(firebaseConfig);
    firebase.initializeApp(firebaseConfig);

  }

  componentDidMount() {
    Font.loadAsync({
      'fontawesome': require('./assets/fonts/fontawesome.ttf'),
      'icomoon': require('./assets/fonts/icomoon.ttf'),
      'Righteous-Regular': require('./assets/fonts/Righteous-Regular.ttf'),
      'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
      'Roboto-Light': require('./assets/fonts/Roboto-Light.ttf'),
      'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
      'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
    });
  }

  render() {
    const MainNavigator = StackNavigator({
      loading_scr: { screen: LoadingScreen },
      welcome_screen: { screen: WalkthroughScreen },
      welcome_scr: { screen: WelcomeScreen },
      register_scr: { screen: RegisterScreen },
      register_screen: { screen: Register_Screen },
      reset_screen: { screen: Reset_Screen },
      fbregister_screen: { screen: fbRegister_Screen },
      profile_scr: { screen: ProfileScreen },
      profile_screen: { screen: Profile_Screen },
      login_scr: { screen: LoginScreen },
      login_screen: { screen: Login_Screen},
      main_scr: {
          screen: TabNavigator({
            menu_scr: { screen: MenuScreen },
            orders_scr: { screen: OrdersScreen },
            settings_scr: { screen: SettingsScreen },
          },
          {
            tabBarOptions: {
              labelStyle: { fontSize: 12 }
            },
            swipeEnabled: false,
            tabBarPosition: 'bottom',
          })
        }
      },
      {
        navigationOptions: {
          tabBarVisible: false
        },
        swipeEnabled: false,
        lazy: true
      });

      return (
        <Provider store={this.store}>
          <View style={styles.container}>
            <MainNavigator />
          </View>
        </Provider>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
