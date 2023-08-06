import { View, Text, TextInput, Pressable, Image } from 'react-native'
import React, { useState } from 'react'
import tw from 'twrnc'
import PrimaryButton from '../../components/PrimaryButton'
import LinearGradient from 'react-native-linear-gradient'
import { colors, gradient } from '../../utils/colors'
import BackButton from '../../components/BackButton'
import Bar from '../../components/Bar'

const Religion = () => {

    return (
        <>
            <Bar value={6} />

            <LinearGradient colors={gradient.bg} style={tw`flex-1 p-5`}>
                <BackButton />
                <View style={tw`flex-grow py-10`}>
                    <Text style={[tw`text-3xl font-medium text-center`, { color: colors.black }]}>Your Religion</Text>

                    <View style={tw`p-5`}>
                        {/* On press add a modal to choose religion  */}
                        <Pressable style={[tw`border border-gray-50 p-2 rounded-lg mt-1`, { backgroundColor: colors.white }]}>
                            <Text style={[tw`text-lg`, { color: colors.black }]}>Hindu</Text>
                        </Pressable>
                    </View>

                </View>
                <PrimaryButton text={'Continue'} disabled={false} isLoading={false} onPress={() => { }} />
            </LinearGradient>
        </>
    )
}

export default Religion