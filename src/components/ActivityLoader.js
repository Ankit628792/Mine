import { View, ActivityIndicator as Loader } from 'react-native'
import React from 'react'
import tw from 'twrnc'

const ActivityLoader = () => {
    return (
        <View style={tw`flex-1 justify-center items-center`}>
            <Loader size={50} />
        </View>
    )
}

export default ActivityLoader