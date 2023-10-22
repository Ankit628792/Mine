import { View, Text, Image } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import PrimaryButton from '../../components/PrimaryButton'
import { colors } from '../../utils/colors'
import { useNavigation } from '@react-navigation/native'


const Welcome = () => {
    const navigator = useNavigation();
    return (
        <View style={tw`flex-1 bg-white flex-col p-10`}>
            <View style={tw`flex-grow justify-center items-center`}>
                <Image style={tw`w-16 h-16`} source={require('../../assets/images/f1.png')} />
                <Text style={[tw`text-[2.8rem] font-bold`, { color: colors.purple }]}>Welcome</Text>
                <Text style={[tw`text-xl text-center mt-1 mb-10`, { color: colors.darkGray }]}>Ask your dating partner</Text>
                <Image source={require('../../assets/images/beMine.png')} style={tw`w-48 h-48`} resizeMode='contain' />
            </View>
            <PrimaryButton text={"Continue"} onPress={() => navigator.navigate("Intro")} />

        </View>
    )
}

export default Welcome