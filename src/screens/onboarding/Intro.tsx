import { View, Text } from 'react-native'
import React from 'react'
import tw from 'twrnc'
const Intro = () => {
  return (
    <View style={tw`flex-1 justify-center items-center bg-sky-500`}>
      <Text style={tw`text-5xl font-medium text-white`}>Mine</Text>
    </View>
  )
}

export default Intro