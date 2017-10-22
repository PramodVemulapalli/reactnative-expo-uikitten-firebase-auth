import Expo from 'expo';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
// import { Font } from 'expo';


import { StyleSheet, Text, View, Platform, StatusBar } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { firebaseConfig } from './config/auth';
import { bootstrap } from './config/bootstrap';
import { RkStyleSheet, RkTheme } from 'react-native-ui-kitten';
import NavigatorService from './utils/navigator';

// import KittenTheme from './config/theme';

import Welcome_Screen from './screens/Welcome_Screen';
import Register_Screen from './screens/Register_Screen';
import Login_Screen from './screens/Login_Screen';
// import Loading_Screen from './screens/Loading_Screen';
import Menu_Screen from './screens/Menu_Screen';
import Orders_Screen from './screens/Orders_Screen';
import Location_Screen from './screens/Location_Screen';
import Profile_Screen from './screens/Profile_Screen';
import Reset_Screen from './screens/Reset_Screen';
import Settings_Screen from './screens/Settings_Screen';


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

/*
  async componentDidMount() {
    await Font.loadAsync({
      'fontawesome': require('./assets/fonts/fontawesome.ttf'),
      'icomoon': require('./assets/fonts/icomoon.ttf'),
      'Righteous-Regular': require('./assets/fonts/Righteous-Regular.ttf'),
      'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
      'Roboto-Light': require('./assets/fonts/Roboto-Light.ttf'),
      'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
      'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
    });
  }
*/

/*

menu_scr: {
  screen: StackNavigator({
    menu_screen: { screen: Menu_Screen },
    location_screen: { screen: Location_Screen },
  })
},
orders_screen: { screen: Orders_Screen },
settings_screen: { screen: Settings_Screen },

*/



  render() {

    const MainNavigator = TabNavigator({
      menu_scr: { screen: Menu_Screen },
      orders_screen: { screen: Orders_Screen },
      settings_screen: { screen: Settings_Screen },
    },
    {
      navigationOptions: {
        headerLeft: null,
        headerStyle: {
           backgroundColor: 'white',
           elevation: 2,
           paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight + 10
         },
         headerTitleStyle: {
           fontSize: RkTheme.current.fonts.sizes.h5,
           alignSelf:'center',
           marginBottom: Platform.OS === 'ios' ? 0 : 10,
           marginTop: Platform.OS === 'ios' ? 25: 0
         }
      },
      tabBarOptions: {
        showLabel: false,
        showIcon: true,
        indicatorStyle: { backgroundColor: '#ffffff' },
        activeTintColor: RkTheme.current.colors.accent,
        inactiveTintColor: RkTheme.current.colors.text.hint,
        style: { backgroundColor: '#ffffff' },
      },
      cardStyle: {
        paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight
      },
      swipeEnabled: false,
      tabBarPosition: 'bottom',
    })

//       loading_scr: { screen: Loading_Screen },

    const LoginNavigator = StackNavigator({
      welcome_screen: { screen: Welcome_Screen },
      register_screen: { screen: Register_Screen },
      reset_screen: { screen: Reset_Screen },
      profile_screen: { screen: Profile_Screen },
      login_screen: { screen: Login_Screen},
      main_screen: { screen: MainNavigator}
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
            <LoginNavigator
            ref={navigatorRef => {
              NavigatorService.setContainer(navigatorRef);
            }}/>
          </View>
        </Provider>
      );
  }
}

let styles = RkStyleSheet.create(theme => ({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
}));
