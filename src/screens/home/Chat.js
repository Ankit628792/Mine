import React, { useState } from 'react';
import { ScrollView, View, Text, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import { colors, gradient } from '../../utils/colors';
import ChatCard from '../chat/ChatCard';
import tw from 'twrnc'
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { SwipeListView } from 'react-native-swipe-list-view'


const Chat = () => {
  const navigator = useNavigation();
  const [openRows, setOpenRows] = useState({});

  const isListItemOpen = (rowKey) => {
    return openRows[rowKey] === true;
  };


  const renderHiddenItem = ({ item, index }, rowMap) => {
    const isOpen = isListItemOpen(item.id);
    if (item?.last) return <></>
    return (
      isOpen
        ?
        <TouchableOpacity style={[tw`flex-1 justify-center items-end pt-4`]}>
          <View style={tw`bg-red-500 h-full rounded-xl px-4 items-center justify-center min-w-[100px]`}>
            {
              false ?
                <ActivityIndicator size={20} color={"#FFF"} />
                :
                <Text style={tw`text-white text-base`}>Delete</Text>
            }
          </View>
        </TouchableOpacity>
        :
        <></>
    );
  };



  const onRowOpen = (rowKey) => {
    setOpenRows({ [rowKey]: true });
  };

  const onRowClose = (rowKey) => {
    if (openRows[rowKey])
      setOpenRows({ [rowKey]: false });
  };


  return (
    <LinearGradient colors={gradient.purple} style={tw`flex-1`}>
      <View style={tw`p-5`}>
        <Text style={[tw`text-2xl font-semibold text-white text-center`]}>Your Chats</Text>
      </View>
      <View style={[tw`p-5 flex-1`, { borderRadius: 40, backgroundColor: colors.white }]}>
        {/* <NoChat /> */}
        {/* <ScrollView style={tw`pt-5`} showsVerticalScrollIndicator={false}> */}
        <SwipeListView
          showsVerticalScrollIndicator={false}
          onRowOpen={onRowOpen}
          onRowClose={onRowClose}
          data={[...Array(50).fill(1), { id: -10, last: true }]}
          renderItem={({ item }, i) => <ChatCard key={i} navigator={navigator} item={item} />}
          renderHiddenItem={renderHiddenItem}
          disableRightSwipe={true}
          rightOpenValue={-100}
          swipeToOpenPercent={0.2}
          style={{ gap: 10 }}
        />

        {
          // Array(50).fill(1).map((item, i) => (<ChatCard key={i} navigator={navigator} item={item} />))
        }
        {/* </ScrollView> */}
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