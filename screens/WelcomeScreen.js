import React, { Component } from 'react';
import { View, Text, Dimensions, rgba } from 'react-native';
import { connect } from 'react-redux';
import Swiper from 'react-native-swiper';
import firebase from 'firebase';
import { Button } from 'react-native-elements';
import Modal from 'react-native-modal';
import { errorClear } from '../actions';
import { AppLoading } from 'expo';


class WelcomeScreen extends Component {

  static navigationOptions = {
    header: null
  };


  onNavPress = (screenname) => {
    this.props.navigation.navigate(screenname);
  };


  renderModalContent = () => (
    <View style={styles.modalContent}>
      <Text>{this.props.error}</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Close"
          backgroundColor="#f50"
          fontSize={20}
          icon={{ type: 'font-awesome', color: "#ffffff", name: 'grav' }}
          onPress={ () => this.props.errorClear('') }
        />
      </View>
    </View>
  );



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
              <Text style={styles.headertext}> Consumer App </Text>
              <Text style={styles.text}>But I promised I would do it,</Text>
            </View>
            <View style={styles.slide2}>
              <Text style={styles.headertext}> Consumer App </Text>
              <Text style={styles.text}>and he thought it might be so</Text>
            </View>
            <View style={styles.slide3}>
              <Text style={styles.headertext}> Consumer App </Text>
              <Text style={styles.text}>If it came from one that loved him,</Text>
            </View>
            <View style={styles.slide4}>
              <Text style={styles.headertext}> Consumer App </Text>
              <Text style={styles.text}>perhaps it would ease the blow.</Text>
            </View>
          </Swiper>
        </View>
        <View style={styles.buttongroup}>
          <View style={styles.buttonStyle1}>
            <Button
              onPress={() => this.onNavPress('login_scr')}
              backgroundColor="#003399"
              title="Login"
              color="#ffffff"
            />
          </View>
          <View style={styles.buttonStyle2}>
            <Button
              onPress={() => this.onNavPress('profile_scr')}
              backgroundColor="#f50"
              title="Register"
              color="#ffffff"
            />
          </View>
        </View>
        <Modal isVisible={this.props.error != ''} style={styles.bottomModal}>
          {this.renderModalContent()}
        </Modal>
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
    backgroundColor: '#003399'
  },
  buttonStyle2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f50'
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#003399'
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f50'
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#003399'
  },
  slide4: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f50'
  },
  headertext: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    margin: 20
  },
  text: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'normal',
    margin: 20
  }
}

const mapStateToProps = ({ auth }) => {
  const { error } = auth;
  return { error };
};

export default connect(mapStateToProps, {
  errorClear
})(WelcomeScreen);
