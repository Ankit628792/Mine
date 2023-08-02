import { View, Text, TextInput } from 'react-native'
import React, { useState } from 'react'
import tw from 'twrnc'
import PrimaryButton from '../../components/PrimaryButton'

const About = () => {
    const [data, setData] = useState({
        name: '',
        about: '',
    })
    return (
        <View style={tw`flex-1 bg-white p-5`}>
            <Text style={tw`text-3xl font-medium text-gray-800 text-center`}>Setup Your Profile</Text>
            <View style={tw`flex-grow py-3`}>
                <View>
                    <Text>Name</Text>
                    <TextInput />
                </View>
            </View>
            <PrimaryButton text={'Continue'} disabled={true} isLoading={false} onPress={() => { }} />
        </View>
    )
}

export default About