import { View, Text } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { colors, gradient } from '../../utils/colors'
import tw from 'twrnc'
import { ScrollView } from 'react-native'
import BackButton from '../../components/BackButton'

const TermsAndConditions = () => {
    return (
        <LinearGradient colors={gradient.purple} style={tw`flex-1`}>
            <View style={tw`flex-row items-center justify-between relative z-20 p-5`}>
                <BackButton />
                <Text style={[tw`text-2xl font-semibold text-white text-center`]}>Terms And Conditions</Text>
                <BackButton disabled={true} buttonClass='opacity-0' />
            </View>
            <View style={[tw`p-5 pb-0 flex-1 rounded-t-[40px]`, { backgroundColor: colors.white }]}>
                <ScrollView showsVerticalScrollIndicator={false} style={tw`pt-5`}>
                    <Text style={[tw`text-base text-gray-500 my-4`]}>There is no fee from The Nature Conservancy to receive text messages. Message and data rates may apply—this can be checked with your mobile service provider. Charges are billed and payable to your mobile service provider or deducted from your prepaid account. Consent is not a requirement for purchase.</Text>
                    <Text style={[tw`text-base text-gray-500 my-4`]}>Data obtained from you in connection with this SMS service may include your mobile phone number, your carrier’s name and the date, time and content of your messages. The Nature Conservancy may use this information to contact you and provide the services you request from The Nature Conservancy. Alerts sent via SMS may not be delivered if the mobile phone is not in range of a transmission site, or if sufficient network capacity is not available at a particular time. Even within a coverage area, factors beyond the control of the wireless operator may interfere with message delivery, including the customer’s equipment, terrain, proximity to buildings, foliage, and weather. Wireless operators do not guarantee message delivery and will not be held liable for delayed or undelivered messages.</Text>
                    <View style={tw`w-full h-32`}></View>
                </ScrollView>
                <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(255,255,255,1)']} style={tw`absolute left-0 bottom-0 right-0 h-32`} />
            </View>
        </LinearGradient>

    )
}

export default TermsAndConditions