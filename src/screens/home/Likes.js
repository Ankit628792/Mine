import React, {useState} from 'react';
import {TabView, TabBar} from 'react-native-tab-view';
import TabComponent from './TabComponent';
import {StyleSheet, Text, View} from 'react-native';
import {gradient} from '../../utils/colors';
import tw from 'twrnc';

const Likes = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'likes', title: 'Liked Profile'},
    {key: 'chats', title: 'Liked Chats'},
  ]);

  const renderScene = ({route}) => {
    switch (route.key) {
      case 'likes':
        return (
          <TabComponent
            // ankit pass the component here
            content={
              <View style={tw`flex-1 flex-col justify-between relative`}>
                <Text style={tw`text-white text-2xl text-center`}>Profile</Text>
              </View>
            }
          />
        );
      case 'chats':
        return (
          <TabComponent
            content={
              <View style={tw`flex-1 flex-col justify-between relative`}>
                <Text style={tw`text-white text-2xl text-center`}>Chats</Text>
              </View>
            }
          />
        );
      default:
        return null;
    }
  };

  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      renderTabBar={props => (
        <TabBar
          {...props}
          indicatorStyle={styles.tabIndicator}
          style={styles.tabBar}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: gradient.orange[0],
    paddingTop: 8,
    paddingBottom: 8,
  },
  tabIndicator: {
    backgroundColor: 'white',
  },
});

export default Likes;
