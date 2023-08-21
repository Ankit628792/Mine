import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import TabComponent from './TabComponent';
import { gradient } from '../../utils/colors';
import { TabBar, TabView } from 'react-native-tab-view';
import ChatCard from '../chat/ChatCard';
import tw from 'twrnc'

const PersonalChatList = () => {
  const navigation = useNavigation();
  const handleCardClick = () => {
    navigation.navigate('PersonalChat');
  };
  return (
    <ScrollView style={tw`p-2`}>
      {[0, 1, 2, 3, 4].map(index => (
        <ChatCard key={index} onPress={handleCardClick} />
      ))}
    </ScrollView>
  );
};

const MatchList = () => {
  const navigation = useNavigation();
  const handleCardClick = () => {
    navigation.navigate('LikedChat');
  };
  return (
    <ScrollView style={tw`p-2`}>
      {[0, 1].map(index => (
        <ChatCard key={index} onPress={handleCardClick} />
      ))}
    </ScrollView>
  );
};

const Chat = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'matches', title: 'Matches' },
    { key: 'chats', title: 'Chats' },
  ]);
  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'chats':
        return <TabComponent content={<PersonalChatList />} />;
      case 'matches':
        return <TabComponent content={<MatchList />} />;
      default:
        return null;
    }
  };
  return (
    <TabView
      navigationState={{ index, routes }}
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

export default Chat;
