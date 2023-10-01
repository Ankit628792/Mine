import { View, Text, TouchableOpacity, Linking } from 'react-native'
import React from 'react'
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AUTH_TOKEN_KEY } from '../../utils/constants';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { colors, gradient } from '../../utils/colors';
import LinearGradient from 'react-native-linear-gradient';
import BackButton from '../../components/BackButton';
import tw from 'twrnc'
import { Path, Svg } from 'react-native-svg';
import { setUser } from '../../redux/user/user-slice';

const Setting = () => {
    const dispatch = useDispatch();
    const navigator = useNavigation();


    const _logout = async () => {
        const keys = [AUTH_TOKEN_KEY, "USER"]
        await AsyncStorage.multiRemove(keys)
        dispatch(setUser(null));
        try {
            navigator.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [
                        { name: "Login" }
                    ]
                })
            );
        } catch (error) {
            console.log("unable to logout")
        }
    };

    return (
        <LinearGradient style={tw`flex-1 justify-between p-5 pb-10 relative`} colors={gradient.white}>
            <View style={tw`flex-row items-center justify-between relative z-20 pb-5`}>
                <BackButton />
                <Text style={tw`text-2xl font-medium text-gray-800`}>Settings</Text>
                <BackButton buttonClass='relative opacity-0' disabled={true} />
            </View>
            <View style={tw`flex-grow`}>
                <List onPress={() => navigator.navigate("Subscription")}>Subscription</List>
                <List onPress={() => navigator.navigate("PrivacyPolicy")}>Privacy Policy</List>
                <List onPress={() => navigator.navigate("TermsAndConditions")}>Terms And Conditions</List>
                <TouchableOpacity onPress={() => Linking.openURL(`mailto:support@delanki.com`)} style={tw`bg-white flex-row w-full items-center justify-between py-3 px-5 my-2 rounded-md shadow-lg shadow-gray-300`}>
                    <Text style={tw`text-base text-gray-700`}>Contact Us</Text>
                    <Text style={tw`text-base text-sky-500`}>support@delanki.com</Text>
                </TouchableOpacity>
            </View>
            <View style={tw`px-5`}>
                <View style={tw`items-center py-5`}>
                    <Text style={tw`text-gray-700 text-base`}>Version</Text>
                    <Text style={tw`text-gray-600`}>1.0.0</Text>
                </View>
                <TouchableOpacity style={[tw`rounded-xl py-3 px-10 bg-rose-500`]} onPress={_logout}>
                    <Text style={tw`text-white text-xl text-center`}>Logout</Text>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    )
}

export default Setting

const List = ({ children, onPress }) => <TouchableOpacity onPress={onPress} style={tw`bg-white flex-row w-full items-center justify-between py-3 px-5 my-2 rounded-md shadow-lg shadow-gray-300`}>
    <Text style={tw`text-base text-gray-700`}>{children}</Text>
    <Svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={tw`text-gray-700 w-7 h-7`}>
        <Path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </Svg>
</TouchableOpacity>
