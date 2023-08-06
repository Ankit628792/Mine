import { View, Text } from 'react-native'
import React from 'react'
import tw from 'twrnc'

const NetworkNotAvailable = () => {
  return (
    <View style={tw`flex-1 justify-center items-center`}>
      <Text>NetworkNotAvailable</Text>
    </View>
  )
}

export default NetworkNotAvailable