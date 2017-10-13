import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';


class Location_Screen extends Component {

  // Donot show header
  static navigationOptions = {
    tabBarVisible: false // to hide the bottom tab bar
  };

  render() {
    return (
      <View>
        <View>
          <Text> Loc Screen </Text>
          <Text> Loc Screen </Text>
          <Text> Loc Screen </Text>
          <Text> Loc Screen </Text>
          <Text> Loc Screen </Text>
          <Text> Loc Screen </Text>
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

export default Location_Screen;
