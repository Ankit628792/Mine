import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { colors, gradient } from '../../utils/colors'
import tw from 'twrnc'
import { Dimensions } from 'react-native'
import { ScrollView } from 'react-native'
import { Path, Svg } from 'react-native-svg'

const Likes = () => {
  return (
    <LinearGradient colors={gradient.purple} style={tw`flex-1`}>
      <View style={tw`p-5 pb-2`}>
        <Text style={[tw`text-2xl font-semibold mb-3 ml-3 text-white text-center`]}>Your Likes</Text>
      </View>
      <View style={[tw`p-5`, { borderRadius: 40, backgroundColor: colors.white }]}>
        <ScrollView showsVerticalScrollIndicator={false} style={tw`pt-5`}>
          <View style={tw`flex-row flex-wrap justify-center gap-5`}>
            {
              Array(50).fill(1).map((item, i) => (<LikeCard key={i} />))
            }
          </View>
          <View style={tw`h-32`}></View>
        </ScrollView>
      </View>
    </LinearGradient>
  )
}

export default Likes

const NoLikes = () => (
  <View style={tw`flex-1 items-center justify-center`}>
    <Image style={tw`w-20 h-20`} source={require('../../assets/images/noLike.png')} />
    <Text style={tw`text-xl text-gray-500 mt-3`}>No Likes Yet</Text>
  </View>
)

export const LikeCard = () => {
  return (
    <TouchableOpacity style={[tw`items-center justify-center bg-white h-40 rounded-2xl overflow-hidden relative`, { width: (Dimensions.get('window').width - 100) / 2 }]}>
      <Image
        source={{
          uri: 'https://ca-times.brightspotcdn.com/dims4/default/b4ef547/2147483647/strip/false/crop/3817x3968+0+0/resize/1429x1486!/quality/80/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2Fff%2F47%2F08088f494f9a89fb369c6b367422%2Fla-photos-1staff-471763-en-ana-de-armas-mjc-24.jpg',
        }}
        style={tw`w-full h-full rounded-lg`}
      />
      <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(119,44,232,0.5)']} style={tw`absolute inset-0 w-full p-2 pl-3 items-end justify-between`}>
        <View style={tw`bg-white bg-opacity-40 rounded-full py-0.5 px-1.5 flex-row items-center`}>
          <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style={tw`text-white w-3 h-3 mr-0.5`}>
            <Path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
          </Svg>
          <Text style={tw`text-[10px] font-medium`}>10 Km away</Text>
        </View>
        <View style={tw`w-full`}>
          <Text numberOfLines={1} style={[tw`text-lg font-medium text-white text-left w-full`]}>Sanurita</Text>
          <Text style={[tw`text-xs text-white text-left w-full`, { color: colors.white }]}>Profession</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  )
}