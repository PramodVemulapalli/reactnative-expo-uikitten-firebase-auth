import Expo from 'expo';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';

import { StyleSheet, Text, View } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { LOGIN_STATUS_CHANGED } from './actions/types';

import WelcomeScreen from './screens/WelcomeScreen';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import LoadingScreen from './screens/LoadingScreen';
import MenuScreen from './screens/MenuScreen';
import OrdersScreen from './screens/OrdersScreen';
import SettingsScreen from './screens/SettingsScreen';


export default class App extends React.Component {

  //state = { loggedIn: true };

  constructor(props) {
    super(props);
    this.store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
  }

  componentWillMount() {

    const config = {
      apiKey: "AIzaSyAOU9XJOb9lwbl3nTY-Y5F7EzIcpDGyu0A",
      authDomain: "homefood-d7c6d.firebaseapp.com",
      databaseURL: "https://homefood-d7c6d.firebaseio.com",
      projectId: "homefood-d7c6d",
      storageBucket: "",
      messagingSenderId: "512397701929"
    };
    firebase.initializeApp(config);

  }

  render() {
    const MainNavigator = StackNavigator({
      loading_scr: { screen: LoadingScreen },
      welcome_scr: { screen: WelcomeScreen },
      register_scr: { screen: RegisterScreen },
      login_scr: { screen: LoginScreen },
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
