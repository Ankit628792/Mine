import { View, Text, Image } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { colors, gradient } from '../../utils/colors'
import tw from 'twrnc'
import { Dimensions } from 'react-native'
import { ScrollView } from 'react-native'

const Likes = () => {
  return (
    <LinearGradient colors={gradient.bg} style={tw`flex-1 p-5`}>
      <Text style={[tw`text-2xl font-medium`, { color: colors.black }]}>Your Likes</Text>
      <ScrollView style={tw`py-3`} showsVerticalScrollIndicator={false}>
        {
          Array(50).fill(1).map((item, i) => (<LikeCard key={i} />))
        }
        <View style={tw`h-32`}></View>
      </ScrollView>
    </LinearGradient>
  )
}

export default Likes

const LikeCard = () => {
  return (
    <View style={tw`flex-row py-3 px-4 bg-white mt-3`}>
      <Image
        source={{
          uri: 'https://ca-times.brightspotcdn.com/dims4/default/b4ef547/2147483647/strip/false/crop/3817x3968+0+0/resize/1429x1486!/quality/80/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2Fff%2F47%2F08088f494f9a89fb369c6b367422%2Fla-photos-1staff-471763-en-ana-de-armas-mjc-24.jpg',
        }}
        style={tw`w-14 h-14 rounded-full mr-3`}
      />
      <View style={[tw`relative flex-grow`, { width: Dimensions.get('window').width - 140 }]}>
        <Text style={[tw`absolute top-1 right-1`, { color: colors.darkGray }]}>3 days ago</Text>
        <Text style={[tw`text-xl font-medium`, { color: colors.black }]}>Sanurita</Text>
        <Text numberOfLines={1} style={[tw`text-sm`, { color: colors.darkGray, width: Dimensions.get('window').width - 180 }]}>Profession</Text>
      </View>
    </View>
  )
}