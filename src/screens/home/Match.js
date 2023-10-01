import { View, Text } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { colors, gradient } from '../../utils/colors'
import BackButton from '../../components/BackButton'
import tw from 'twrnc'
import PrimaryButton from '../../components/PrimaryButton'
import { TouchableOpacity } from 'react-native'
import { Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const Match = () => {
    const navigator = useNavigation();

    return (
        <LinearGradient colors={gradient.white} style={tw`flex-1 p-5`}>
            <BackButton />
            <View style={tw`flex-grow p-5 pb-10 items-center justify-between`}>
                <Text style={[tw`text-3xl font-medium text-center my-5`, { color: colors.black }]}>You and <Text style={{ color: colors.purple }}>Marin</Text> liked each other!</Text>

                <View style={tw`items-center justify-center`}>
                    <TouchableOpacity style={tw`bg-white w-20 h-20 rounded-full absolute z-30 shadow-lg shadow-gray-400 items-center justify-center`}>
                        <Text style={[tw`text-lg font-medium`, { color: colors.black }]}>50%</Text>
                    </TouchableOpacity>
                    <View style={tw`w-36 h-36 absolute -top-5 -left-5 rounded-full bg-white z-10 shadow-lg shadow-gray-300`}>
                        <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' }} style={tw`w-full h-full rounded-full`} resizeMode='cover' />
                    </View>
                    <View style={tw`w-36 h-36 absolute -bottom-5 -right-5 rounded-full bg-white z-10 shadow-lg shadow-gray-300`}>
                        <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/128/3135/3135789.png' }} style={tw`w-full h-full rounded-full`} resizeMode='cover' />
                    </View>
                    <View style={[tw`w-60 h-60 rounded-full`, { backgroundColor: colors.purple }]}>
                        <Image source={require('../../assets/images/pattern.png')} style={tw`w-full h-full rounded-full`} resizeMode='cover' />
                    </View>
                </View>

                <View>
                    <Text style={[tw`text-2xl font-medium text-center`, { color: colors.black }]}>It's a <Text style={{ color: colors.purple }}>Match</Text></Text>
                    <Text style={[tw`text-base text-center`, { color: colors.gray }]}>Get the Chat Started Now!</Text>
                </View>
            </View>
            <View style={tw`gap-4`}>
                <PrimaryButton text={'Send a message'} textClass='text-lg' />
                <TouchableOpacity style={tw`py-2.5 rounded-xl bg-white`} onPress={() => navigator.goBack()}>
                    <Text style={[tw`text-lg text-center font-medium`, { color: colors.purple }]}>Keep Swiping</Text>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    )
}

export default Match