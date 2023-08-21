import { View, Text } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import moment from 'moment'
import { colors } from '../../utils/colors'
import { TouchableOpacity } from 'react-native'
import { ScrollView } from 'react-native'

const About = () => {
    return (
        <ScrollView style={tw`flex-1 p-5`}>
            <View>
                <Text style={[tw`text-xl font-medium`, { color: colors.white }]}>About</Text>
                <Text style={[tw`text-lg`, { color: colors.white }]}>ftdfyuijvvjb</Text>
            </View>
            <View style={tw`mt-4`}>
                <Text style={[tw`text-xl font-medium`, { color: colors.white }]}>Date of Birth</Text>
                <Text style={[tw`text-lg`, { color: colors.white }]}>{moment().format('DD MMM YYYY')}</Text>
            </View>
            <View style={tw`mt-4`}>
                <Text style={[tw`text-xl font-medium`, { color: colors.white }]}>Gender</Text>
                <Text style={[tw`text-lg`, { color: colors.white }]}>Male</Text>
            </View>

            <View style={tw`mt-4`}>
                <Text style={[tw`text-xl font-medium`, { color: colors.white }]}>Interests</Text>
                <View style={tw`flex-row items-center flex-wrap py-2`}>
                    {
                        Array(3).fill(1).map((interest, i) => <Interest key={i} interest={interest} />)
                    }
                </View>
            </View>
            <View style={tw`mt-4`}>
                <Text style={[tw`text-xl font-medium`, { color: colors.white }]}>Interests</Text>
                <View style={tw`flex-row items-center flex-wrap py-2`}>
                    {
                        Array(3).fill(1).map((interest, i) => <Interest key={i} interest={interest} />)
                    }
                </View>
            </View>
        </ScrollView>
    )
}

export default About

const Interest = ({ interest }) => (
    <TouchableOpacity
        style={[
            tw`w-auto py-2 px-4 rounded-full mr-2`,
            {
                backgroundColor: colors.white,
            },
        ]}
    >
        <Text
            style={[
                {
                    color: colors.black,
                },
            ]}>
            interest
        </Text>
    </TouchableOpacity>
)