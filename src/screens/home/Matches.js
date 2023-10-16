import { View, Text, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { colors, gradient } from '../../utils/colors'
import tw from 'twrnc'
import { useQuery } from 'react-query'
import { SwipeService } from '../../services/swipe.service'
import ActivityLoader from '../../components/ActivityLoader'
import { useNavigation } from '@react-navigation/native'
import moment from 'moment'

const Matches = () => {
    const navigator = useNavigation()
    const { data, isLoading } = useQuery('getAllUserMatch', SwipeService.getAllUserMatch, {
        retry: false,
        onSuccess: res => console.log(res)
    })

    return (
        <LinearGradient colors={gradient.purple} style={tw`flex-1`}>
            <View style={tw`p-5`}>
                <Text style={[tw`text-2xl font-semibold text-white text-center`]}>Matches</Text>
            </View>
            <View style={[tw`p-5 flex-1`, { borderRadius: 40, backgroundColor: colors.white }]}>
                {
                    isLoading ? <ActivityLoader /> :
                        data?.length ?
                            <ScrollView showsVerticalScrollIndicator={false} style={tw`pt-5`}>
                                <View style={tw`flex-row flex-wrap justify-center gap-5`}>
                                    {
                                        data.map((item, i) => (<MatchCard item={item} key={i} navigator={navigator} />))
                                    }
                                </View>
                                <View style={tw`h-32`}></View>
                            </ScrollView>
                            :
                            <NoMatch />
                }
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


export const MatchCard = ({ item, navigator }) => {

    return (
        <TouchableOpacity onPress={() => navigator.navigate('ViewProfile', { id: item?.id })} style={tw`flex-row items-center py-3 px-4 bg-white rounded-2xl shadow-lg shadow-gray-300`}>
            <Image
                source={{
                    uri: ('https://mine-blob-storage.s3.us-east-2.amazonaws.com/' + item?.profileImage),
                }}
                style={tw`w-14 h-14 rounded-full mr-3`}
            />
            <View style={[tw`relative flex-grow`, { width: Dimensions.get('window').width - 140 }]}>
                <Text style={[tw`text-xl font-medium`, { color: colors.black }]}>{item?.userName}</Text>
            </View>
        </TouchableOpacity>
    )
}
