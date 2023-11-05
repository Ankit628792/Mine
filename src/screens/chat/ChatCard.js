
import { View, Text, Image, TouchableOpacity, TouchableHighlight } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import { colors } from '../../utils/colors'
import { Dimensions } from 'react-native'
import moment from 'moment'

const ChatCard = ({ navigator, item }) => {
  console.log(item.deviceToken)
  let receiver = {
    id: item?.user?.userId,
    image: item?.user?.profileImage,
    name: item?.user?.userName,
    deviceToken: item?.deviceToken
  }

  return (
    item?.last ?
      <View style={tw`w-full h-32`}></View>
      :
      <TouchableHighlight activeOpacity={1} underlayColor={'transparent'} onPress={() => navigator.navigate('PersonalChat', {
        chatId: item?.chatId,
        receiver
      })} style={tw`flex-row py-3 px-4 bg-white rounded-2xl shadow-lg shadow-gray-300 my-2`}>
        <>
          <Image
            source={{
              uri: item?.user?.profileImage
            }}
            style={tw`w-14 h-14 rounded-full mr-3`}
          />
          <View style={[tw`relative flex-grow`, { width: Dimensions.get('window').width - 140 }]}>
            <Text style={[tw`absolute top-1 right-1 bg-transparent`, { color: colors.gray }]}>{item?.lastMessageTym ? moment(item?.lastMessageTym).fromNow() : ''}</Text>
            <Text style={[tw`text-xl font-medium bg-transparent`, { color: colors.black }]}>{item?.user?.userName}</Text>
            <Text numberOfLines={1} style={[tw`text-sm`, { color: colors.gray, width: Dimensions.get('window').width - 180 }]}>{item?.lastMessage || 'No Message'}</Text>
          </View>
        </>
      </TouchableHighlight>
  )
}

export default ChatCard