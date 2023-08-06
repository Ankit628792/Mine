

import { View, Text, TextInput, Pressable, Image, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import tw from 'twrnc'
import PrimaryButton from '../../components/PrimaryButton'
import LinearGradient from 'react-native-linear-gradient'
import { colors, gradient } from '../../utils/colors'
import BackButton from '../../components/BackButton'
import Bar from '../../components/Bar'

const UserNotInterest = () => {
    const [data, setData] = useState([])

    return (
        <>
            <Bar value={11} />
            <LinearGradient colors={gradient.bg} style={tw`flex-1 p-5 flex-col justify-between`}>
                <BackButton />

                <Text style={[tw`text-3xl font-medium text-center pt-5`, { color: colors.black }]}>Select Your Non Interest</Text>
                <ScrollView style={tw`flex-grow mb-4 mt-6`}>
                    <View style={tw`flex-row items-center flex-wrap`}>
                        {
                            [...Array(50).fill(1).keys()].map((index) => <TouchableOpacity key={index} style={[tw`w-auto py-2 px-4 rounded-full m-2`, { backgroundColor: false ? colors.blue : colors.white }]} >
                                <Text style={[{ color: false ? colors.white : colors.black }]}>Interest {index + 1}</Text>
                            </TouchableOpacity>)
                        }
                    </View>
                </ScrollView>
                <PrimaryButton text={'Continue'} disabled={false} isLoading={false} onPress={() => { }} />
            </LinearGradient>
        </>
    )
}

export default UserNotInterest