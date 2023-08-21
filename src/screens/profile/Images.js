import { Text } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native'
import tw from 'twrnc'

const Images = () => {
    return (
        <ScrollView style={tw`p-3`}>
            <Text>Images with edit and delete + confirmation</Text>
        </ScrollView>
    )
}

export default Images