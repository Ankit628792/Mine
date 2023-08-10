import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import tw from 'twrnc';
import LinearGradient from 'react-native-linear-gradient';
import OTPInputView from '../../components/OTPInputView';
import BackButton from '../../components/BackButton';
import { useSendOtp, useVerifyOtp } from '../../hooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

import PrimaryButton from '../../components/PrimaryButton';
const colors = {
  primary: '#0072ff',
  white: '#FFF',
  cyan: '#48D1CC',
  bg: '#F5F7FA',
  black: '#333',
  darkGray: '#999',
  blue: '#0072ff',
  orange: '#FF5F6D',
};

const gradient = {
  primary: ['#7F00FF', '#E100FF'],
  blue: ['#00c6ff', '#0072ff'],
  gray: ['#F5F7FA', '#B8C6DB'],
  orange: ['#FF5F6D', '#FFC371'],
};

const VerifyOTP = ({ route }) => {
  // get mobile from route params
  const navigation = useNavigation();
  const [isVisible, setIsVisible] = useState(true);

  const [otp, setOtp] = useState('');

  useEffect(() => {
    if (route.params?.initialOtp) {
      setOtp(route.params?.initialOtp?.toString())
    }
  }, [route.params?.initialOtp])


  // useEffect(() => { setTimeout(() => setIsVisible(true), 30000) }, [])

  let { mutate: verifyOtp, isLoading, isError, error: err } = useVerifyOtp(() => setOtp(''));
  let { mutate: sendOtp } = useSendOtp();

  const checkOtp = async () => {
    if (otp?.length == 6) {
      let token = await AsyncStorage.getItem('fcmToken')
      verifyOtp({ phoneNumber: route.params?.mobile?.toString(), otp: otp, deviceToken: token || '' })
    }
  }


  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <LinearGradient
        style={tw`flex-1 flex-col justify-between relative p-5 pb-10`}
        colors={gradient.orange}>
        <BackButton />
        <View></View>
        <View
          style={[
            tw`p-5 absolute bottom-0 left-0 right-0 rounded-t-3xl`,
            { backgroundColor: colors.white },
          ]}>
          <View style={tw`flex-col items-center justify-center mb-10`}>
            <Text
              style={[
                tw`text-3xl font-medium my-1 text-center`,
                { color: colors.black },
              ]}>
              Verification Code
            </Text>
            <Text
              style={[
                tw`text-base text-center px-5`,
                { color: colors.darkGray },
              ]}>
              We have sent the verification code to {route.params?.mobile}
            </Text>

            <View style={tw`relative w-4/5 z-10 mt-6`}>
              <OTPInputView
                style={tw`h-24`}
                pinCount={6}
                code={otp}
                codeInputFieldStyle={{
                  color: otp?.length == 6 ? colors.orange : colors.black,
                }}
                onCodeChanged={val => setOtp(val)}
                onCodeFilled={val => setOtp(val)}
              />
            </View>
            <View
              style={tw`flex-row items-center ${isVisible ? '' : 'opacity-0'}`}>
              <Text style={[tw`text-sm mr-1`, { color: colors.darkGray }]}>
                Didn't received the code?
              </Text>
              <TouchableOpacity
                disabled={!isVisible}
                onPress={() => sendOtp({ mobile: route.params?.mobile, countryCode: route.params?.countryCode })}>
                <Text style={tw`font-medium text-orange-300`}>Send Again</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={tw`px-5`}>
            <PrimaryButton
              text={'Submit'}
              disabled={otp.length !== 6}
              isLoading={isLoading}
              onPress={() => checkOtp()}
            />
          </View>
        </View>
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
};

export default VerifyOTP;
