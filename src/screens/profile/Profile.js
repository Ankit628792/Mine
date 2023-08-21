import React, { useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  Dimensions,
} from 'react-native';
import PostCard from '../../components/PostCard';
import tw from 'twrnc';
import LinearGradient from 'react-native-linear-gradient';
import { colors, gradient } from '../../utils/colors';
import { TabBar, TabView } from 'react-native-tab-view';
import { StyleSheet } from 'react-native';
import TabComponent from '../home/TabComponent';
import About from './About';
import Images from './Images';

const Profile = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'about', title: 'About' },
    { key: 'images', title: 'Images' },
  ]);

  const [posts, setPosts] = useState([
    {
      id: '1',
      item: 'Item 1',
      imageUrl:
        'https://i0.wp.com/www.jenniferbland.com/wp-content/uploads/Learn-CSS-Create-The-React-Logo.png?fit=1200%2C630&ssl=1s',
    },
    {
      id: '2',
      item: 'Item 2',
      imageUrl:
        'https://cdn.kinandcarta.com/-/media-assets/images/kincarta/insights/2022/02/react-native/react_hero.png?as=0&iar=0&w=1200&rev=61e1dad3af7e465e9544cf8490237772&hash=0AD31383BCBA1DA1C88546327312BA33',
    },
    {
      id: '3',
      item: 'Item 3',
      imageUrl:
        'https://i0.wp.com/www.jenniferbland.com/wp-content/uploads/Learn-CSS-Create-The-React-Logo.png?fit=1200%2C630&ssl=1s',
    },
  ]);

  const [userData, setUserData] = useState({
    fname: 'Test',
    lname: 'User',
    userImg: null,
    about: 'No details added.',
  });



  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'about':
        return (
          <About />
        );
      case 'images':
        return (
          <Images />
        );
      default:
        return null;
    }
  };

  return (
    <LinearGradient
      style={tw`flex-1 flex-col justify-between relative`}
      colors={gradient.orange}>
      <View
        style={tw`p-5 pb-0 justify-center items-center`}>
        <Image
          style={tw`h-32 w-32 rounded-full border-2 border-white`}
          source={{
            uri: userData
              ? userData.userImg ||
              'https://i1.sndcdn.com/artworks-1CYFgpCe6nIn-0-t500x500.jpg'
              : 'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg',
          }}
        />
        <Text style={[tw`text-2xl font-medium mt-2 text-center`, { color: colors.white }]}>Ryan Gosling</Text>
        <Text style={[tw`text-lg font-medium mt-1 text-center`, { color: colors.white }]}>+91 8985464414</Text>

      </View>
      <TabView
        sceneContainerStyle={{ shadowOpacity: 0 }}
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
    </LinearGradient>
  );
};

export default Profile;


const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: 'transparent',
    paddingTop: 8,
    paddingBottom: 8,
  },
  tabIndicator: {
    backgroundColor: 'white',
  },
});