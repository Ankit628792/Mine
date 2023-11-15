import { View, Text, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native'
import React, { useEffect } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { colors, gradient } from '../../utils/colors'
import tw from 'twrnc'
import { useQuery } from 'react-query'
import { SwipeService } from '../../services/swipe.service'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import ActivityLoaderRound from '../../components/ActivityLoaderRound'
import { Path, Svg } from 'react-native-svg'

const Matches = () => {
    const navigator = useNavigation()
    const focus = useIsFocused();
    const { data, isLoading, refetch } = useQuery('getAllUserMatch', SwipeService.getAllUserMatch, {
        retry: false
    })

    useEffect(() => { refetch() }, [focus])

    return (
        <LinearGradient colors={gradient.purple} style={tw`flex-1`}>
            <View style={tw`p-5`}>
                <Text style={[tw`text-2xl font-semibold text-white text-center`]}>Matches</Text>
            </View>
            <View style={[tw`p-5 flex-1`, { borderRadius: 40, backgroundColor: colors.white }]}>
                {
                    isLoading ? <ActivityLoaderRound image={require('../../assets/images/loading.png')} /> :
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

    let receiver = {
        id: item?.id,
        image: item?.profileImage,
        name: item?.userName,
        deviceToken: item?.deviceToken
    }
    return (
        <View style={tw`w-full flex-row items-center py-3 px-4 gap-3 bg-white rounded-2xl shadow-lg shadow-gray-300`}>
            <TouchableOpacity onPress={() => navigator.navigate('ViewProfile', { id: item?.id })}>
                <Image
                    source={{
                        uri: item?.profileImage,
                    }}
                    style={tw`w-14 h-14 rounded-full`}
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigator.navigate('ViewProfile', { id: item?.id })} style={[tw`relative flex-grow`, { width: Dimensions.get('window').width - 180 }]}>
                <Text style={[tw`text-xl font-medium`, { color: colors.black }]}>{item?.userName}</Text>
                <Text style={[tw`text-base`, { color: colors.darkGray }]}>Send message</Text>
            </TouchableOpacity>
            <TouchableOpacity style={tw`pr-1`} onPress={() => navigator.navigate('PersonalChat', { chatId: item?.chatId, receiver })}>
                <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style={[tw`w-8 h-8`, { color: colors.purple, transform: [{ rotate: '-45deg' }] }]}>
                    <Path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                </Svg>
            </TouchableOpacity>


        </View>
    )
}
