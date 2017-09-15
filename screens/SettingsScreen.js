import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';
import { logoutUser } from '../actions';


class SettingsScreen extends Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <View>
        <View>
          <Text> Settings Screen </Text>
          <Text> Settings Screen </Text>
          <Text> Settings Screen </Text>
          <Text> Settings Screen </Text>
          <Text> Settings Screen </Text>
          <Text> Settings Screen </Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            large
            title="Log out"
            backgroundColor="#00aced"
            icon={{ name: 'search' }}
            onPress={ () => this.props.logoutUser()  }
          />
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

export default connect(null, {
  logoutUser
})(SettingsScreen);
