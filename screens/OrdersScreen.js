import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';


class OrdersScreen extends Component {

  // Donot show header 
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <View>
        <View>
          <Text> Orders Screen </Text>
          <Text> Orders Screen </Text>
          <Text> Orders Screen </Text>
          <Text> Orders Screen </Text>
          <Text> Orders Screen </Text>
          <Text> Orders Screen </Text>
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

export default OrdersScreen;
