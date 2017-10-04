import React, { Component } from 'react';
import { Header } from 'react-navigation';

import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';


class OrdersScreen extends Component {

  // Donot show header
  static navigationOptions = {
    header: (headerOptions) => <Header {...headerOptions} />,
    headerTitle: 'Orders Screen'
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
