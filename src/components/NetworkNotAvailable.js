import { Text, Image } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import { colors, gradient } from '../utils/colors'
import LinearGradient from 'react-native-linear-gradient'

const NetworkNotAvailable = () => {
  return (
    <LinearGradient colors={gradient.white} style={tw`flex-1 p-5 justify-center items-center`}>
      <Image source={require('../assets/images/noNetwork.png')} style={tw`w-32 h-32`} />
      <Text style={[tw`absolute bottom-12 text-xl font-medium`, { color: colors.gray }]}>Network Unavailable</Text>
    </LinearGradient>
  )
}

export default NetworkNotAvailable;
