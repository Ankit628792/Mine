import { View, Text, TextInput, Pressable, Image } from 'react-native'
import React, { useState } from 'react'
import tw from 'twrnc'
import PrimaryButton from '../../components/PrimaryButton'
import LinearGradient from 'react-native-linear-gradient'
import { colors, gradient } from '../../utils/colors'
import BackButton from '../../components/BackButton'

const GenderInterested = () => {
    const [interestedIn, setInterestedIn] = useState('')

    return (
        <>
            <View style={[tw`h-1.5 relative`, { backgroundColor: colors.white }]}>
                <View style={[tw`h-1.5`, { backgroundColor: colors.blue, width: `${(100 * 4) / 12}%` }]}></View>
            </View>

            <LinearGradient colors={gradient.bg} style={tw`flex-1 p-5`}>
                <BackButton />
                <View style={tw`flex-grow py-10`}>
                    <View style={tw`p-5`}>
                        <Text style={[tw`text-3xl font-medium text-center`, { color: colors.black }]}>Who would you like to date?</Text>
                        <View style={tw`flex-row items-center justify-evenly mt-10`}>
                            <Pressable onPress={() => setInterestedIn('male')} style={tw`w-20 h-20 ${interestedIn == 'male' ? 'opacity-100' : 'opacity-60'}`}>
                                <Image style={tw`w-full h-full`} resizeMode='contain' source={{ uri: 'https://cdn-icons-png.flaticon.com/512/4139/4139981.png' }} />
                            </Pressable>
                            <Pressable onPress={() => setInterestedIn('female')} style={tw`w-20 h-20 ${interestedIn == 'female' ? 'opacity-100' : 'opacity-60'}`}>
                                <Image style={tw`w-full h-full`} resizeMode='contain' source={{ uri: 'https://cdn-icons-png.flaticon.com/512/4140/4140060.png' }} />
                            </Pressable>
                            <Pressable onPress={() => setInterestedIn('transgender')} style={tw`w-20 h-20 ${interestedIn == 'transgender' ? 'opacity-100' : 'opacity-60'}`}>
                                <Image style={tw`w-full h-full`} resizeMode='contain' source={{ uri: 'https://cdn-icons-png.flaticon.com/512/4646/4646471.png' }} />
                            </Pressable>
                        </View>
                    </View>

                </View>
                <PrimaryButton text={'Continue'} disabled={false} isLoading={false} onPress={() => { }} />
            </LinearGradient>
        </>
    )
}

export default GenderInterested