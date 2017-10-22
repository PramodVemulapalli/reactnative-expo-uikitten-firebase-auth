import React, { Component } from 'react';
import { Header } from 'react-navigation';

import {
  ListView,
  View,
  Image,
  Text,
  Platform,
  StatusBar
} from 'react-native';

import {RkStyleSheet, RkText, RkTheme} from 'react-native-ui-kitten';
import {Avatar} from './../components';
import notifications from './../data/raw/notifications';
import {FontAwesome} from './../assets/icons';



// import { View, Text } from 'react-native';
// import { Button } from 'react-native-elements';


class OrdersScreen extends Component {

  // Donot show header
  static navigationOptions = {

    headerTitle: 'Orders',
    tabBarIcon: ({ tintColor }) => (
      <RkText
        rkType='awesome'
        style={{
          color: tintColor,
          marginBottom: 0,
        }}>
          {FontAwesome.list}
      </RkText>
    ),

    /*
    header: (headerOptions) => <Header {...headerOptions} />,
    headerStyle: {
       backgroundColor: '#FFFFFF',
       elevation: 2,
       paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight + 10
     },
    headerTitleStyle: {
      fontSize: 22,
      alignSelf:'center',
      marginBottom: Platform.OS === 'ios' ? 0 : 10
    }
    */
  };

  constructor(props) {
    super(props);

    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.data = ds.cloneWithRows(notifications);
    console.log(this.data);
  }

  renderRow(row) {

    /*

    let username = `${row.user.firstName} ${row.user.lastName}`;
    let hasAttachment = row.attach !== undefined;
    let attachment = <View/>;

    let mainContentStyle;
    if (hasAttachment) {
      mainContentStyle = styles.mainContent;
      attachment =
        <Image style={styles.attachment} source={row.attach}/>
    }
    {attachment}

    */

    return (
      <View style={styles.container}>
        <Avatar img={require('./../data/img/photo45.png')}
                rkType='circle'
                style={styles.avatar}
                badge={row.type}/>
        <View style={styles.content}>
          <View style={styles.mainContent}>
            <View style={styles.text}>
              <RkText>
                <RkText rkType='header6'>{'Daisy'}</RkText>
                <RkText rkType='primary2'> {row.description}</RkText>
              </RkText>
            </View>
            <RkText rkType='secondary5 hintColor'>{row.time}</RkText>
          </View>

        </View>
      </View>
    )
  }

  render() {
    return (
        <ListView
          style={styles.root}
          dataSource={this.data}
          renderRow={this.renderRow}
          removeClippedSubviews={false}/>
    );
  }
}


let styles = RkStyleSheet.create(theme => ({
  root: {
    backgroundColor: theme.colors.screen.base
  },
  container: {
    padding: 16,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: theme.colors.border.base,
    alignItems: 'flex-start'
  },
  avatar: {},
  text: {
    marginBottom: 5,
  },
  content: {
    flex: 1,
    marginLeft: 16,
    marginRight: 0
  },
  mainContent: {
    marginRight: 60
  },
  img: {
    height: 50,
    width: 50,
    margin: 0
  },
  attachment: {
    position: 'absolute',
    right: 0,
    height: 50,
    width: 50
  }
}));

export default OrdersScreen;
