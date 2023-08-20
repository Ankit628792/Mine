import React from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import TabComponent from './TabComponent';
import {gradient} from '../../utils/colors';
import {TabBar, TabView} from 'react-native-tab-view';
import ChatCard from '../chat/ChatCard';

const PersonalChatList = () => {
  const navigation = useNavigation();
  const handleCardClick = () => {
    navigation.navigate('PersonalChat');
  };
  return (
    <ScrollView>
      {[0, 1, 2, 3, 4].map(index => (
        <ChatCard key={index} onPress={handleCardClick} />
      ))}
    </ScrollView>
  );
};

const LikedChatList = () => {
  const navigation = useNavigation();
  const handleCardClick = () => {
    navigation.navigate('LikedChat');
  };
  return (
    <ScrollView>
      {[0, 1].map(index => (
        <ChatCard key={index} onPress={handleCardClick} />
      ))}
    </ScrollView>
  );
};

const Chat = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'personal', title: 'Personal Chat'},
    {key: 'liked', title: 'Liked Chat'},
  ]);
  const renderScene = ({route}) => {
    switch (route.key) {
      case 'personal':
        return <TabComponent content={<PersonalChatList />} />;
      case 'liked':
        return <TabComponent content={<LikedChatList />} />;
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
  },
  tabIndicator: {
    backgroundColor: 'white',
  },
});

export default Chat;
