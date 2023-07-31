import React from 'react'
import { useColorScheme } from 'react-native'
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Intro from './screens/onboarding/Intro';
import Login from './screens/auth/Login';
import VerifyOTP from './screens/auth/VerifyOTP';

const Stack = createNativeStackNavigator();

function AuthGroup({ routeName }) {
    return (
        <Stack.Navigator initialRouteName={routeName} screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name="Intro" component={Intro} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="VerifyOTP" component={VerifyOTP} />
            {/* Other screen for user info  */}
        </Stack.Navigator>
    )
}


const NavigationLayer = ({ user }) => {
    const theme = useColorScheme();

    return (
        <NavigationContainer theme={theme === "dark" ? DarkTheme : DefaultTheme}>
            <AuthGroup routeName={'Intro'} />
        </NavigationContainer>
    )
}

export default NavigationLayer

