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
import { TouchableOpacity } from 'react-native';
import { Path, Svg } from 'react-native-svg';
import Blur50 from '../../components/Blue50';
import PrimaryButton from '../../components/PrimaryButton';
import { useNavigation } from '@react-navigation/native';

const Profile = () => {
  const navigator = useNavigation()
  const [index, setIndex] = useState(0);
  const [popUp, setPopUp] = useState({
    open: false
  })
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
          <Images setPopUp={setPopUp} />
        );
      default:
        return null;
    }
  };

  return (
    <LinearGradient
      style={tw`flex-1 flex-col justify-between relative`}
      colors={gradient.bg}>
      <TouchableOpacity style={tw`absolute top-5 right-5 bg-white w-10 h-10 items-center justify-center rounded-lg`}>
        <Svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={[tw`w-6 h-6`, { color: colors.black }]}>
          <Path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
          <Path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </Svg>

      </TouchableOpacity>
      <View
        style={tw`p-5 pb-0 justify-center items-center`}>
        <View style={tw`h-32 w-32 rounded-full border-2 border-white items-center justify-center`}>
          <Image
            style={tw`h-full w-full rounded-full `}
            source={{
              uri: userData
                ? userData.userImg ||
                'https://i1.sndcdn.com/artworks-1CYFgpCe6nIn-0-t500x500.jpg'
                : 'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg',
            }}
          />
          <TouchableOpacity onPress={() => navigator.navigate('Edit Profile', { user: userData })} style={tw`p-1 bg-white rounded-full absolute -bottom-3 w-8 h-8 items-center justify-center`}>
            <Svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={tw`w-5 h-5 text-sky-500`}>
              <Path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
            </Svg>
          </TouchableOpacity>
        </View>
        <Text style={[tw`text-2xl font-medium mt-3 text-center`, { color: colors.black }]}>Ryan Gosling</Text>
        <Text style={[tw`text-lg font-medium mt-1 text-center`, { color: colors.darkGray }]}>+91 8985464414</Text>

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

      {popUp.open ? (
        <View
          style={tw`flex-1 flex-row items-center justify-center rounded-lg px-5 py-32 absolute inset-0`}>
          <Blur50 onPress={() => setPopUp({ open: false })} />
          <View
            nativeID=" jyg"
            style={tw`bg-gray-50 p-5 rounded-lg w-full relative`}>
            <TouchableOpacity onPress={() => setPopUp({ open: false })}>
              <Svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                style={tw`w-8 h-8 text-gray-800 ml-auto`}>
                <Path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </Svg>
            </TouchableOpacity>
            <View style={tw`items-center justify-center p-5`}>
              {
                popUp.type == 'delete'
                  ?
                  <>
                    <Text style={[tw`text-xl text-center mb-8`, { color: colors.darkGray }]}>Are you sure, you want remove the image?</Text>
                    <PrimaryButton text={'Delete'} onPress={popUp.onClick} />
                  </>
                  :
                  popUp.type == 'edit'
                    ?
                    <>
                      <Text style={[tw`text-xl text-center mb-8`, { color: colors.darkGray }]}>Uplaod new image</Text>
                      <PrimaryButton text={'Upload'} onPress={popUp.onClick} />
                    </>
                    :
                    <></>
              }
            </View>

          </View>
        </View>
      ) : (
        <></>
      )}
    </LinearGradient>
  );
};

export default Profile;


const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: 'transparent',
    paddingTop: 8,
    paddingBottom: 8,
    color: 'black'
  },
  tabIndicator: {
    backgroundColor: 'black',
  },
});