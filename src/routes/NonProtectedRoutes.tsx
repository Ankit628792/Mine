import React from 'react';
import LoginScreen from '../screens/login/LoginScreen';
import SignupScreen from '../screens/sign-up/SignupScreen';
import OtpScreen from '../screens/otp/OtpScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {screenOptions} from '../shared/shared.interface';

const Stack = createNativeStackNavigator();

export const NonProtectedRoutes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={screenOptions}
        initialRouteName={'LoginScreen'}>
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="SignupScreen" component={SignupScreen} />
        <Stack.Screen name="OTPScreen" component={OtpScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
