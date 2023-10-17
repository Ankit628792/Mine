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

                    <Text style={[tw`text-xl font-medium text-gray-800 mt-4 mb-1`]}>Introduction</Text>
                    <Text style={[tw`text-base text-gray-500`]}>
                        These terms and conditions govern your use of the Mine application. By using Mine, you accept these terms and conditions in full. If you disagree with these terms and conditions or any part of these terms and conditions, you must not use Mine.
                    </Text>

                    <Text style={[tw`text-xl font-medium text-gray-800 mt-4 mb-1`]}>User Account</Text>
                    <Text style={[tw`text-base text-gray-500`]}>
                        When you create an account with Mine, you must provide us with information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
                    </Text>

                    <Text style={[tw`text-xl font-medium text-gray-800 mt-4 mb-1`]}>Content</Text>
                    <Text style={[tw`text-base text-gray-500`]}>
                        Our Service allows you to post, link, store, share, and otherwise make available certain information, text, graphics, videos, or other material. You are responsible for the content that you post on or through the Service, including its legality, reliability, and appropriateness.
                    </Text>

                    <Text style={[tw`text-xl font-medium text-gray-800 mt-4 mb-1`]}>Privacy</Text>
                    <Text style={[tw`text-base text-gray-500`]}>
                        Your use of the Mine application is also governed by our Privacy Policy. Please review our Privacy Policy, which explains how we collect, use, and disclose information from our users.
                    </Text>

                    <Text style={[tw`text-xl font-medium text-gray-800 mt-4 mb-1`]}>Termination</Text>
                    <Text style={[tw`text-base text-gray-500`]}>
                        We may terminate or suspend access to our Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
                    </Text>

                    <Text style={[tw`text-xl font-medium text-gray-800 mt-4 mb-1`]}>Limitation of Liability</Text>
                    <Text style={[tw`text-base text-gray-500`]}>
                        In no event shall Mine, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
                    </Text>

                    <Text style={[tw`text-xl font-medium text-gray-800 mt-4 mb-1`]}>Governing Law</Text>
                    <Text style={[tw`text-base text-gray-500`]}>
                        These Terms shall be governed and construed in accordance with the laws of your country, without regard to its conflict of law provisions.
                    </Text>
                    <View style={tw`w-full h-32`}></View>

                </ScrollView>
                <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(255,255,255,1)']} style={tw`absolute left-0 bottom-0 right-0 h-32`} />
            </View>
        </LinearGradient>

    )
}

export default TermsAndConditions