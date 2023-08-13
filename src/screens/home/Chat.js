import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import {gradient} from '../../utils/colors';
import tw from 'twrnc';

const ChatCard = ({onPress}) => (
  <View style={styles.container}>
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <View style={styles.userInfo}>
        <View style={styles.userImgWrapper}>
          <Image
            source={{
              uri: 'https://ca-times.brightspotcdn.com/dims4/default/b4ef547/2147483647/strip/false/crop/3817x3968+0+0/resize/1429x1486!/quality/80/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2Fff%2F47%2F08088f494f9a89fb369c6b367422%2Fla-photos-1staff-471763-en-ana-de-armas-mjc-24.jpg',
            }}
            style={styles.userImg}
          />
        </View>
        <View style={styles.textSection}>
          <View style={styles.userInfoText}>
            <Text style={styles.userName}>User Name</Text>
            <Text style={styles.postTime}>34 min ago</Text>
          </View>
          <Text style={styles.messageText}>hi ryan gosling...</Text>
        </View>
      </View>
    </TouchableOpacity>
  </View>
);

const PersonalChatList = () => {
  const navigation = useNavigation();
  const handleCardClick = () => {
    navigation.navigate('PersonalChat');
  };

  return (
    <ScrollView>
      {[0, 1, 2, 3, 4].map((item, index) => (
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
      {[0, 1].map((item, index) => (
        <ChatCard key={index} onPress={handleCardClick} />
      ))}
    </ScrollView>
  );
};

const HeaderButton = props => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor:
          props.activeTab === props.text ? 'rgb(225, 29, 72)' : 'white',
        paddingVertical: 6,
        paddingHorizontal: 16,
        borderRadius: 30,
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10,
      }}
      onPress={() => props.setActiveTab(props.text)}>
      <Icon
        name={props.iconName}
        size={20}
        color={props.activeTab === props.text ? 'white' : 'black'}
        style={{marginRight: 5}}
      />
      <Text
        style={{
          color: props.activeTab === props.text ? 'white' : 'black',
          fontSize: 15,
          fontWeight: 'bold',
        }}>
        {props.text}
      </Text>
    </TouchableOpacity>
  );
};

const Chat = () => {
  const [activeTab, setActiveTab] = useState('Personal Chat');
  return (
    <LinearGradient
      style={tw`flex-1 flex-col justify-between relative`}
      colors={gradient.orange}>
      <View
        style={{
          flexDirection: 'row',
          alignSelf: 'center',
          padding: 20,
          paddingBottom: 0,
        }}>
        <HeaderButton
          text="Personal Chat"
          btnColor="black"
          textColor="white"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          iconName="user"
        />
        <HeaderButton
          text="Liked Chat"
          btnColor="white"
          textColor="black"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          iconName="heart"
        />
      </View>
      {activeTab === 'Personal Chat' ? <PersonalChatList /> : <LikedChatList />}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: 'center',
    // backgroundColor: '#ffffff',
  },
  card: {
    width: '100%',
  },
  userInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  userImgWrapper: {
    paddingTop: 15,
    paddingBottom: 15,
  },
  userImg: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  textSection: {
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 15,
    paddingLeft: 0,
    marginLeft: 10,
    width: 300,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  userInfoText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  userName: {
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'Lato-Regular',
    color: 'black',
  },
  postTime: {
    fontSize: 12,
    color: 'white',
    fontFamily: 'Lato-Regular',
  },
  messageText: {
    fontSize: 14,
    color: 'white',
  },
});

export default Chat;
