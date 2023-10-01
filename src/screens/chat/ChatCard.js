
import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import { colors } from '../../utils/colors'
import { Dimensions } from 'react-native'

const ChatCard = ({ navigator }) => {
  return (
    <TouchableOpacity onPress={() => navigator.navigate('PersonalChat')} style={tw`flex-row py-3 px-4 bg-white rounded-2xl shadow-lg shadow-gray-300`}>
      <Image
        source={{
          uri: 'https://ca-times.brightspotcdn.com/dims4/default/b4ef547/2147483647/strip/false/crop/3817x3968+0+0/resize/1429x1486!/quality/80/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2Fff%2F47%2F08088f494f9a89fb369c6b367422%2Fla-photos-1staff-471763-en-ana-de-armas-mjc-24.jpg',
        }}
        style={tw`w-14 h-14 rounded-full mr-3`}
      />
      <View style={[tw`relative flex-grow`, { width: Dimensions.get('window').width - 140 }]}>
        <Text style={[tw`absolute top-1 right-1`, { color: colors.gray }]}>3 days ago</Text>
        <Text style={[tw`text-xl font-medium`, { color: colors.black }]}>Sanurita</Text>
        <Text numberOfLines={1} style={[tw`text-sm`, { color: colors.gray, width: Dimensions.get('window').width - 180 }]}>Last Meesage with a long text written in the view</Text>
      </View>
    </TouchableOpacity>
  )
}

export default ChatCard