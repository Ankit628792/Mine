import React from 'react';
import { StyleSheet, ScrollView, View, Text } from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import TabComponent from './TabComponent';
import { colors, gradient } from '../../utils/colors';
import { TabBar, TabView } from 'react-native-tab-view';
import ChatCard from '../chat/ChatCard';
import tw from 'twrnc'
import LinearGradient from 'react-native-linear-gradient';

const PersonalChatList = () => {
  const navigation = useNavigation();
  const handleCardClick = () => {
    navigation.navigate('PersonalChat');
  };
  return (
    <ScrollView style={tw`p-2 bg-white`}>
      {[0, 1, 2, 3, 4].map(index => (
        <ChatCard key={index} onPress={handleCardClick} />
      ))}
    </ScrollView>
  );
};


const Chat = () => {

  return (
    <LinearGradient colors={gradient.purple} style={tw`flex-1`}>
      <View style={tw`p-5 pb-2`}>
        <Text style={[tw`text-2xl font-semibold mb-3 ml-3 text-white text-center`]}>Your Chats</Text>
      </View>
      <View style={[tw`p-5`, { borderRadius: 40, backgroundColor: colors.white }]}>
        <ScrollView style={tw`gap-4 pt-5`} showsVerticalScrollIndicator={false}>
          <View style={tw`gap-4`}>
            {
              Array(50).fill(1).map((item, i) => (<ChatCard key={i} />))
            }
          </View>
        </ScrollView>
        <View style={tw`h-32`}></View>
      </View>
    </LinearGradient>
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
