import React from 'react';
import {View, Text, TouchableOpacity, Image, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';

const PersonalChatList = () => {
  const navigation = useNavigation();
  const handleCardClick = () => {
    navigation.navigate('PersonalChat');
  };

  return (
    <ScrollView>
      {[0, 1, 2, 3, 4].map(item => {
        return (
          <TouchableOpacity onPress={handleCardClick}>
            <View
              style={{
                backgroundColor: 'lightgray',
                padding: 16,
                margin: 6,
                marginBottom: 2,
                flexDirection: 'row',
                alignItems: 'center',
                borderRadius: 8,
              }}>
              <Image
                source={{
                  uri: 'https://ca-times.brightspotcdn.com/dims4/default/b4ef547/2147483647/strip/false/crop/3817x3968+0+0/resize/1429x1486!/quality/80/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2Fff%2F47%2F08088f494f9a89fb369c6b367422%2Fla-photos-1staff-471763-en-ana-de-armas-mjc-24.jpg',
                }}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  marginRight: 12,
                }}
              />
              <View style={{flex: 1}}>
                <Text>User Name</Text>
                <Text style={{color: 'gray'}}>last seen: 34 min ago</Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      })}
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
      {[0, 1].map(item => {
        return (
          <TouchableOpacity onPress={handleCardClick}>
            <View
              style={{
                backgroundColor: 'lightgray',
                padding: 16,
                margin: 6,
                marginBottom: 2,
                flexDirection: 'row',
                alignItems: 'center',
                borderRadius: 8,
              }}>
              <Image
                source={{
                  uri: 'https://ca-times.brightspotcdn.com/dims4/default/b4ef547/2147483647/strip/false/crop/3817x3968+0+0/resize/1429x1486!/quality/80/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2Fff%2F47%2F08088f494f9a89fb369c6b367422%2Fla-photos-1staff-471763-en-ana-de-armas-mjc-24.jpg',
                }}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  marginRight: 12,
                }}
              />
              <View style={{flex: 1}}>
                <Text>User Name</Text>
                <Text style={{color: 'gray'}}>last seen: 34 min ago</Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

const Chat = () => {
  const [activeTab, setActiveTab] = useState('personal');

  return (
    <View style={{flex: 1}}>
      <View style={{flexDirection: 'row', marginTop: 10}}>
        <TouchableOpacity
          style={{
            backgroundColor: 'gray',
            padding: 10,
            flex: 0.5,
            borderRightColor: 'white',
            borderRightWidth: 1,
          }}
          onPress={() => setActiveTab('personal')}>
          <Text style={{color: 'white'}}>Personal Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: 'gray',
            padding: 10,
            flex: 0.5,
          }}
          onPress={() => setActiveTab('liked')}>
          <Text style={{color: 'white'}}>Liked Chat</Text>
        </TouchableOpacity>
      </View>
      {activeTab === 'personal' && <PersonalChatList />}
      {activeTab === 'liked' && <LikedChatList />}
    </View>
  );
};

export default Chat;
