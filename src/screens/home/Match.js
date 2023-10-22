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
import { Path, Svg } from 'react-native-svg'

const Match = ({ route }) => {
    const { sender, receiver, chatId } = route.params
    const navigator = useNavigation();

    return (
        <LinearGradient colors={gradient.white} style={tw`flex-1 p-5`}>
            <BackButton onPress={() => navigator.navigate("Main")} />
            <View style={tw`flex-grow p-5 pb-10 items-center justify-between`}>
                <Text style={[tw`text-3xl font-medium text-center my-5`, { color: colors.black }]}>You and <Text style={{ color: colors.purple }}>{receiver?.name}</Text> liked each other!</Text>

                <View style={tw`items-center justify-center`}>
                    <TouchableOpacity style={tw`bg-white w-20 h-20 rounded-full absolute z-30 shadow-lg shadow-gray-400 items-center justify-center`}>
                        {/* <Text style={[tw`text-lg font-medium`, { color: colors.black }]}>50%</Text> */}
                        <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style={tw`w-10 h-10 text-rose-500`}>
                            <Path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                        </Svg>
                    </TouchableOpacity>
                    <View style={tw`w-36 h-36 absolute -top-5 -left-5 rounded-full bg-white z-10 shadow-lg shadow-gray-300`}>
                        <Image source={{ uri: sender?.image }} style={tw`w-full h-full rounded-full`} resizeMode='cover' />
                    </View>
                    <View style={tw`w-36 h-36 absolute -bottom-5 -right-5 rounded-full bg-white z-10 shadow-lg shadow-gray-300`}>
                        <Image source={{ uri: receiver?.image }} style={tw`w-full h-full rounded-full`} resizeMode='cover' />
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
                <PrimaryButton text={'Send a message'} onPress={() => navigator.navigate("PersonalChat", { chatId, receiver })} textClass='text-lg' />
                <TouchableOpacity style={tw`py-2.5 rounded-xl bg-white`} onPress={() => navigator.navigate("Main")}>
                    <Text style={[tw`text-lg text-center font-medium`, { color: colors.purple }]}>Keep Swiping</Text>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    )
}

export default Match