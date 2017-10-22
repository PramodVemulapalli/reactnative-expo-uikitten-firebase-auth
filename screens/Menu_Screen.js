import React, { Component } from 'react';
import {
  FlatList,
  Image,
  Text,
  View,
  TouchableOpacity,
  Platform,
  StatusBar
} from 'react-native';
import {
  RkText,
  RkCard,
  RkStyleSheet,
  RkTheme
} from 'react-native-ui-kitten';
import { Header } from 'react-navigation';

import {SocialBar} from './../components/';
import articles from './../data/raw/articles';
import { Button } from 'react-native-elements';
import {FontAwesome} from './../assets/icons';


class Menu_Screen extends Component {

  static navigationOptions = {
    headerTitle: 'Items',
    tabBarLabel: 'Home',
    tabBarIcon: ({ tintColor }) => (
      <RkText
        rkType='awesome'
        style={{
          color: tintColor,
          fontSize: 24,
          marginBottom: 0,
        }}>
          {FontAwesome.home}
      </RkText>
    ),
  };

  constructor(props) {
    super(props);
    // this.data = data.getArticles('fact');
    this.renderItem = this._renderItem.bind(this);
    console.log(articles);
  }

  _keyExtractor(post) {
    return post.id;
  }

  _renderItem(info) {
    return (
      <TouchableOpacity
        delayPressIn={70}
        activeOpacity={0.8}
        onPress={() => this.props.navigation.navigate('Article', {id: info.item.id})}>
      	<RkCard rkType='horizontal' style={styles.card}>
        	<Image rkCardImg source={info.item.photo}/>

          <View rkCardContent style={{justifyContent: 'space-around'}}>
            <View style={{ flex: 1, justifyContent: 'flex-start'}}>
              <RkText numberOfLines={1} rkType='h6'>{info.item.header}</RkText>
              <RkText rkType='s6 hintColor'>{'Sandra Powers'}</RkText>
            </View>
            <View style={{ marginTop: 20, flex: 1, justifyContent: 'center'}}>
              <RkText style={styles.post} numberOfLines={1} rkType={Platform.OS==='android' ? 's5':'s3'}>{'Hi There 1'}</RkText>
            </View>
            <View style={{ marginBottom: 0, flex: 1, justifyContent: 'flex-end'}}>
              <RkText style={styles.post} numberOfLines={1} rkType={Platform.OS==='android' ? 's5  hintColor':'s3  hintColor'}>{'8 Oz / $2.99'}</RkText>
            </View>
          </View>
          <View rkCardFooter>
            <SocialBar rkType='space' showLabel={true}/>
          </View >
        </RkCard>
      </TouchableOpacity>
    )
  }

  render() {

    return (
      <View>
        <FlatList
          data={articles}
          renderItem={this.renderItem}
          keyExtractor={this._keyExtractor}
          style={styles.container}/>
        <Text>
          Hello World
        </Text>
      </View>
    )
  }
}


/*

<View>
  <Button
    large
    title="Log out"
    backgroundColor="#00aced"
    icon={{ type: 'font-awesome', color: "#ffffff", name: 'sign-out' }}
    onPress={ () => this.props.navigation.navigate('location_screen') }
  />
</View>

*/

let styles = RkStyleSheet.create(theme => ({
  container: {
    backgroundColor: theme.colors.screen.scroll,
    paddingVertical: 8,
    paddingHorizontal: 14
  },
  card: {
    marginVertical: 8,
    height: 125
  },
  post: {
    marginTop: 5,
    marginBottom: 1
  }
}));

export default Menu_Screen;
