import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { colors, gradient } from '../../utils/colors'
import tw from 'twrnc'
import { Dimensions } from 'react-native'
import { ScrollView } from 'react-native'
import { Path, Svg } from 'react-native-svg'
import { useNavigation } from '@react-navigation/native'

const Likes = () => {
  const navigator = useNavigation();

  return (
    <LinearGradient colors={gradient.purple} style={tw`flex-1`}>
      <View style={tw`p-5`}>
        <Text style={[tw`text-2xl font-semibold text-white text-center`]}>Your Likes</Text>
      </View>
      <View style={[tw`p-5 flex-1`, { borderRadius: 40, backgroundColor: colors.white }]}>
        {/* <NoLike /> */}
        <ScrollView showsVerticalScrollIndicator={false} style={tw`pt-5`}>
          <View style={tw`flex-row flex-wrap justify-center gap-4`}>
            {
              Array(20).fill(1).map((item, i) => (<LikeCard navigator={navigator} key={i} />))
            }
          </View>
          <View style={tw`h-32`}></View>
        </ScrollView>
      </View>
    </LinearGradient>
  )
}

export default Likes

export const LikeCard = ({ navigator }) => {

  return (
    <TouchableOpacity onPress={() => navigator.navigate('ViewProfile')} style={tw`flex-row py-3 px-4 bg-white rounded-2xl shadow-lg shadow-gray-300`}>
      <Image
        source={{
          uri: 'https://ca-times.brightspotcdn.com/dims4/default/b4ef547/2147483647/strip/false/crop/3817x3968+0+0/resize/1429x1486!/quality/80/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2Fff%2F47%2F08088f494f9a89fb369c6b367422%2Fla-photos-1staff-471763-en-ana-de-armas-mjc-24.jpg',
        }}
        style={tw`w-14 h-14 rounded-full mr-3`}
      />
      <View style={[tw`relative flex-grow`, { width: Dimensions.get('window').width - 140 }]}>
        <Text style={[tw`text-xl font-medium`, { color: colors.black }]}>Sanurita</Text>
        <Text numberOfLines={1} style={[tw`text-sm`, { color: colors.gray, width: Dimensions.get('window').width - 180 }]}>Liked you 3 days ago</Text>
        <Svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={tw`text-gray-300 w-6 h-6 absolute top-4 right-2`}>
          <Path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
        </Svg>
      </View>
    </TouchableOpacity>
  )
}


const NoLike = () => {
  return (
    <View style={tw`flex-1 items-center justify-center`}>
      <Image source={require('../../assets/images/heart.png')} style={tw`w-28 h-28`} />
      <Text style={[tw`text-xl mt-4`, { color: colors.gray }]}>No Likes Available</Text>
    </View>
  )
}