import { View, Text } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { gradient } from '../utils/colors'

const Splash = () => {
    return (
        <LinearGradient colors={['rgba(128,102,255,1)', 'rgba(119,44,232,1)']} style={{ flex: 1 }}>

        </LinearGradient>
    )
}

export default Splash