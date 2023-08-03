import { View, Text, TextInput, Pressable } from 'react-native'
import React, { useState } from 'react'
import tw from 'twrnc'
import PrimaryButton from '../../components/PrimaryButton'
import LinearGradient from 'react-native-linear-gradient'
import { colors, gradient } from '../../utils/colors'

const Name = () => {

    const [name, setName] = useState('')

    return (
        <>
            <View style={[tw`h-1.5 relative`, { backgroundColor: colors.white }]}>
                <View style={[tw`h-1.5`, { backgroundColor: colors.blue, width: `${(100 * 1) / 12}%` }]}></View>
            </View>
            <LinearGradient colors={gradient.bg} style={tw`flex-1 p-5`}>
                <View style={tw`flex-grow py-10`}>
                    <Text style={[tw`text-3xl font-medium text-center`, { color: colors.black }]}>Enter Your Name</Text>
                    <View style={tw`p-5`}>
                        <TextInput style={[tw`border border-gray-50 p-2 rounded-lg mt-1`, { backgroundColor: colors.white }]} />
                    </View>
                </View>
                <PrimaryButton text={'Continue'} disabled={false} isLoading={false} onPress={() => { }} />

            </LinearGradient>
        </>
    )
}

export default Name