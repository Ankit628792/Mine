import { View, Text } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { gradient } from '../utils/colors'
import { Image } from 'react-native'
import tw from 'twrnc'

const Splash = () => {
    return (
        <LinearGradient colors={gradient.purple} style={tw`flex-1 items-center justify-center`}>
            <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2627/2627031.png' }} style={tw`w-28 h-28`} />
            <View style={tw`absolute bottom-20`}>
                <Text style={tw`text-2xl text-white font-medium text-center`}>Mine</Text>
                <Text style={tw`text-base text-gray-100 text-center`}>Where your story begins</Text>
            </View>
        </LinearGradient>
    )
}

export default Splash