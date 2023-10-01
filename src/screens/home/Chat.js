import React from 'react';
import { ScrollView, View, Text, Image } from 'react-native';
import { colors, gradient } from '../../utils/colors';
import ChatCard from '../chat/ChatCard';
import tw from 'twrnc'
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';


const Chat = () => {
  const navigator = useNavigation();

  return (
    <LinearGradient colors={gradient.purple} style={tw`flex-1`}>
      <View style={tw`p-5 pb-2`}>
        <Text style={[tw`text-2xl font-semibold mb-3 ml-3 text-white text-center`]}>Your Chats</Text>
      </View>
      <View style={[tw`p-5 flex-1`, { borderRadius: 40, backgroundColor: colors.white }]}>
        {/* <NoChat /> */}
        <ScrollView style={tw`pt-5`} showsVerticalScrollIndicator={false}>
          <View style={tw`gap-4`}>
            {
              Array(50).fill(1).map((item, i) => (<ChatCard key={i} navigator={navigator} item={item} />))
            }
          </View>
          <View style={tw`h-60`}></View>
        </ScrollView>
      </View>
    </LinearGradient>
  );
};

export default Chat;

const NoChat = () => {
  return (
    <View style={tw`flex-1 items-center justify-center`}>
      <Image source={require('../../assets/images/no-message.png')} style={tw`w-28 h-28`} />
      <Text style={[tw`text-xl mt-4`, { color: colors.gray }]}>No Conversation Initiated</Text>
    </View>
  )
}