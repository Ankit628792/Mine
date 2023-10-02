import { View, Text, ScrollView, Image } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { colors, gradient } from '../../utils/colors'
import tw from 'twrnc'
import MatchCard from '../../components/MatchCard'

const Matches = () => {
    return (
        <LinearGradient colors={gradient.purple} style={tw`flex-1`}>
            <View style={tw`p-5`}>
                <Text style={[tw`text-2xl font-semibold text-white text-center`]}>Matches</Text>
            </View>
            <View style={[tw`p-5 flex-1`, { borderRadius: 40, backgroundColor: colors.white }]}>
                {/* <NoMatch /> */}
                <ScrollView showsVerticalScrollIndicator={false} style={tw`pt-5`}>
                    <View style={tw`flex-row flex-wrap justify-center gap-5`}>
                        {
                            Array(20).fill(1).map((item, i) => (<MatchCard key={i} />))
                        }
                    </View>
                    <View style={tw`h-32`}></View>
                </ScrollView>
            </View>
        </LinearGradient>
    )
}

export default Matches

const NoMatch = () => {
    return (
        <View style={tw`flex-1 items-center justify-center`}>
            <Image source={require('../../assets/images/match.png')} style={tw`w-28 h-28`} />
            <Text style={[tw`text-xl mt-4`, { color: colors.gray }]}>No Match Yet</Text>
        </View>
    )
}