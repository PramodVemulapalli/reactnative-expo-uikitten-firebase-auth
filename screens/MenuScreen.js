import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';


class MenuScreen extends Component {


  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <View>
        <View>
          <Text> Menu Screen </Text>
          <Text> Menu Screen </Text>
          <Text> Menu Screen </Text>
          <Text> Menu Screen </Text>
          <Text> Menu Screen </Text>
          <Text> Menu Screen </Text>
        </View>
      </View>
    );
  }
}

const styles = {
  buttonContainer: {
    position: 'relative'
  }
}

export default MenuScreen;
