import React, { Component } from 'react';
import { View, Text, Platform } from 'react-native';
import Modal from 'react-native-modal';
import { connect } from 'react-redux';
import { errorSet } from '../actions';

import { Button } from 'react-native-elements';
import {
  RkText
} from 'react-native-ui-kitten';
import {GradientButton} from './../components/';

class ErrorMessage extends Component {

  renderModalContent = () => (
    <View style={styles.modalContent}>
      <View style={{marginTop: 10, marginLeft: 5, marginRight: 5, marginBottom: 25}}>
        <RkText rkType='header6' > {this.props.error} </RkText>
      </View>
        <GradientButton
          onPress={ () => this.props.errorSet('') }
          rkType='medium'
          text='Close'>
        </GradientButton>
    </View>
  );

  render() {
    return (
      <View>
        <Modal
          isVisible={this.props.error != ''}
          animationIn={'slideInLeft'}
          animationOut={'slideOutRight'}
          style={styles.bottomModal}
          backdropOpacity={Platform.OS === 'android'? 0.4 : 0.7}
        >
          {this.renderModalContent()}
        </Modal>
      </View>
    );
  }
}


const styles = {
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  bottomModal: {
    justifyContent: 'center',
    margin: 0,
  }
}


const mapStateToProps = ({ auth }) => {
  const { error } = auth;
  return { error };
};

export default connect(mapStateToProps, {
  errorSet
})(ErrorMessage);
