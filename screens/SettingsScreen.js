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
      <View style={styles.overviewContainer}>
        <View>
          <Text> Settings Screen </Text>
          <Text> Settings Screen </Text>
          <Text> Settings Screen </Text>
          <Text> Settings Screen </Text>
          <Text> Settings Screen </Text>
          <Text> Settings Screen </Text>
        </View>
        <View>
          <Button
            large
            title="Log out"
            backgroundColor="#00aced"
            icon={{ type: 'font-awesome', color: "#ffffff", name: 'sign-out' }}
            onPress={ () => this.props.logoutUser()  }
          />
        </View>
      </View>
    );
  }
}

const styles = {
  overviewContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
  }
}

export default connect(null, {
  logoutUser
})(SettingsScreen);
