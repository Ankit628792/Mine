import { View, Text, Image } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import PrimaryButton from '../../components/PrimaryButton'
import { colors } from '../../utils/colors'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { selectUser } from '../../redux/user/user-slice'
import { Path, Svg } from 'react-native-svg'
import { useQueryClient } from 'react-query'

const Instruction = () => {
    const queryClient = useQueryClient();
    const navigator = useNavigation();
    const user = useSelector(selectUser)
    return (
        <View style={tw`flex-1 bg-white flex-col p-10`}>
            <View style={tw`flex-grow`}>
                <Image source={require('../../assets/images/f0.png')} style={tw`w-16 h-16 mx-auto`} resizeMode='contain' />
                <Text style={[tw`text-3xl font-semibold text-center`, { color: colors.primary }]}>Hey, {user?.userName || 'User'}</Text>
                <Text style={[tw`text-xl text-center mt-1 mb-10`, { color: colors.darkGray }]}>Welcome to Mine</Text>

                <View>
                    <View style={tw`flex-row items-center gap-2`}>
                        <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style={[tw`w-7 h-7`, { color: colors.primary }]}>
                            <Path fillRule="evenodd" d="M14.615 1.595a.75.75 0 01.359.852L12.982 9.75h7.268a.75.75 0 01.548 1.262l-10.5 11.25a.75.75 0 01-1.272-.71l1.992-7.302H3.75a.75.75 0 01-.548-1.262l10.5-11.25a.75.75 0 01.913-.143z" clipRule="evenodd" />
                        </Svg>
                        <Text style={[tw`text-xl font-medium`, { color: colors.primary }]}>Be yourself</Text>
                    </View>
                    <Text style={[tw`text-base mt-1`, { color: colors.gray }]}>Make sure your provided details are accurate and reflect who you truly are.</Text>
                </View>
                <View style={tw`mt-5`}>
                    <View style={tw`flex-row items-center gap-2`}>
                        <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style={[tw`w-7 h-7`, { color: colors.primary }]}>
                            <Path fillRule="evenodd" d="M14.615 1.595a.75.75 0 01.359.852L12.982 9.75h7.268a.75.75 0 01.548 1.262l-10.5 11.25a.75.75 0 01-1.272-.71l1.992-7.302H3.75a.75.75 0 01-.548-1.262l10.5-11.25a.75.75 0 01.913-.143z" clipRule="evenodd" />
                        </Svg>
                        <Text style={[tw`text-xl font-medium`, { color: colors.primary }]}>Stay Safe</Text>
                    </View>
                    <Text style={[tw`text-base mt-1`, { color: colors.gray }]}>Make sure you are interacting with original profiles.</Text>
                </View>
                <View style={tw`mt-5`}>
                    <View style={tw`flex-row items-center gap-2`}>
                        <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style={[tw`w-7 h-7`, { color: colors.primary }]}>
                            <Path fillRule="evenodd" d="M14.615 1.595a.75.75 0 01.359.852L12.982 9.75h7.268a.75.75 0 01.548 1.262l-10.5 11.25a.75.75 0 01-1.272-.71l1.992-7.302H3.75a.75.75 0 01-.548-1.262l10.5-11.25a.75.75 0 01.913-.143z" clipRule="evenodd" />
                        </Svg>
                        <Text style={[tw`text-xl font-medium`, { color: colors.primary }]}>Play it cool</Text>
                    </View>
                    <Text style={[tw`text-base mt-1`, { color: colors.gray }]}>Be respectful of others and treat them the way you would like to be treated.</Text>
                </View>
                <View style={tw`mt-5`}>
                    <View style={tw`flex-row items-center gap-2`}>
                        <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style={[tw`w-7 h-7`, { color: colors.primary }]}>
                            <Path fillRule="evenodd" d="M14.615 1.595a.75.75 0 01.359.852L12.982 9.75h7.268a.75.75 0 01.548 1.262l-10.5 11.25a.75.75 0 01-1.272-.71l1.992-7.302H3.75a.75.75 0 01-.548-1.262l10.5-11.25a.75.75 0 01.913-.143z" clipRule="evenodd" />
                        </Svg>
                        <Text style={[tw`text-xl font-medium`, { color: colors.primary }]}>Be proactive</Text>
                    </View>
                    <Text style={[tw`text-base mt-1`, { color: colors.gray }]}>The profiles should be reported and blocked if they appear suspicious.</Text>
                </View>

            </View>
            <PrimaryButton text={"I Agree"} onPress={() => {
                queryClient.invalidateQueries('validateToken');
                navigator.navigate("Main");
            }} />

        </View>
    )
}

export default Instruction