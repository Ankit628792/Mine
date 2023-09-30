import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { colors, gradient } from '../../utils/colors'
import tw from 'twrnc'
import { LikeCard } from './Likes'

const Matches = () => {
    return (
        <LinearGradient colors={gradient.purple} style={tw`flex-1`}>
            <View style={tw`p-5 pb-2`}>
                <Text style={[tw`text-2xl font-semibold mb-3 ml-3 text-white text-center`]}>Matches</Text>
            </View>
            <View style={[tw`p-5`, { borderRadius: 40, backgroundColor: colors.white }]}>
                <ScrollView showsVerticalScrollIndicator={false} style={tw`pt-5`}>
                    <View style={tw`flex-row flex-wrap justify-center gap-5`}>
                        {
                            Array(50).fill(1).map((item, i) => (<LikeCard key={i} />))
                        }
                    </View>
                    <View style={tw`h-32`}></View>
                </ScrollView>
            </View>
        </LinearGradient>
    )
}

export default Matches