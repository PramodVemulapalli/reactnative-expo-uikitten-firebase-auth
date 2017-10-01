import React, { Component } from 'react';
import { View, Text, Dimensions, rgba } from 'react-native';
import { connect } from 'react-redux';
import Swiper from 'react-native-swiper';
import firebase from 'firebase';
import { Button } from 'react-native-elements';
import ErrorMessage from './../components/ErrorMessage';
import Modal from 'react-native-modal';
import { AppLoading } from 'expo';


class WelcomeScreen extends Component {

  static navigationOptions = {
    header: null
  };

  onNavPress = (screenname) => {
    this.props.navigation.navigate(screenname);
  };


  render() {

    console.log('-------------------------------------');
    console.log("Welcome Screen: Render: App loading status display");

    return (
      <View style={styles.container}>
        <View style={{flex: 8}}>
          <Swiper style={styles.wrapper}
            dot={<View style={styles.dotstyle} />}
            activeDot={<View style={styles.activedotstyle} />}
            paginationStyle={{ bottom: 70 }}
          >
            <View style={styles.slide1}>
              <Text style={styles.headertext}> Online Shop6 </Text>
              <Text style={styles.text}>We have quality stuff</Text>
            </View>
            <View style={styles.slide2}>
              <Text style={styles.headertext}> Online Shop </Text>
              <Text style={styles.text}>Great value for money</Text>
            </View>
            <View style={styles.slide3}>
              <Text style={styles.headertext}> Online Shop </Text>
              <Text style={styles.text}>Awesome customer support</Text>
            </View>
            <View style={styles.slide4}>
              <Text style={styles.headertext}> Online Shop </Text>
              <Text style={styles.text}>Fast delivery</Text>
            </View>
          </Swiper>
        </View>
        <View style={styles.buttongroup}>
          <View style={styles.buttonStyle1}>
            <Button
              onPress={() => this.onNavPress('login_screen')}
              backgroundColor="#35b729"
              title="Login"
              color="#ffffff"
              fontSize={18}
            />
          </View>
          <View style={styles.buttonStyle2}>
            <Button
              onPress={() => this.onNavPress('profile_scr')}
              backgroundColor="#000000"
              title="Regis"
              color="#ffffff"
              fontSize={18}
            />
          </View>
          <View style={styles.buttonStyle3}>
            <Button
              onPress={() => this.onNavPress('welcome_scr')}
              backgroundColor="#000000"
              title="Regis"
              color="#ffffff"
              fontSize={18}
            />
          </View>
        </View>
        <ErrorMessage />
      </View>

    );
  }
}


const styles = {
  dotstyle: {
    backgroundColor: 'rgba(255,255,255,.3)',
    width: 10,
    height: 10,
    borderRadius: 7,
    marginLeft: 7,
    marginRight: 7
  },
  activedotstyle: {
    backgroundColor: '#fff',
    width: 10,
    height: 10,
    borderRadius: 7,
    marginLeft: 7,
    marginRight: 7
  },
  buttongroup: {
    flex: 1,
    flexDirection: 'row',
  },
  container: {
    flex: 1
  },
  buttonStyle1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#35b729'
  },
  buttonStyle2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000'
  },
  buttonStyle3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF'
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#35b729'
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000'
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#35b729'
  },
  slide4: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000'
  },
  headertext: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    margin: 20
  },
  text: {
    color: '#fff',
    fontSize: 18,
    margin: 20
  },
}

export default WelcomeScreen;
