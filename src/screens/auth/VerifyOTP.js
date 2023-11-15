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
// import OTPInputView from '../../components/OTPInputView';
import BackButton from '../../components/BackButton';
import { useSendOtp, useVerifyOtp } from '../../hooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

import PrimaryButton from '../../components/PrimaryButton';
import { colors, gradient } from '../../utils/colors';
import { Dimensions } from 'react-native';
import OtpInputs from 'react-native-otp-inputs';


const VerifyOTP = ({ route }) => {
  const navigator = useNavigation();
  const [isVisible, setIsVisible] = useState(true);

  const [otp, setOtp] = useState('');

  // useEffect(() => {
  //   if (route.params?.initialOtp) {
  //     setOtp(route.params?.initialOtp?.toString());
  //   }
  // }, [route.params?.initialOtp]);

  useEffect(() => { if (!isVisible) { setTimeout(() => setIsVisible(true), 20000) } }, [isVisible])

  let {
    mutate: verifyOtp,
    isLoading,
    isError,
    error: err,
  } = useVerifyOtp(() => setOtp(''));
  let { mutate: sendOtp } = useSendOtp();

  const checkOtp = async () => {
    if (otp?.length == 6) {
      let token = await AsyncStorage.getItem('fcmToken');
      Keyboard.dismiss();
      verifyOtp({
        phoneNumber: route.params?.mobile?.toString(),
        otp: otp,
        deviceToken: token || '',
      });
    }
  };

  useEffect(() => {
    if (otp.length == 6) {
      checkOtp();
    }
  }, [otp])

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <LinearGradient
        style={tw`flex-1 flex-col justify-between relative p-5 pb-10`}
        colors={gradient.purple}>
        <BackButton />
        <View></View>
        <View style={[tw`absolute top-0 h-96 flex-col items-center justify-end`, { width: Dimensions.get('screen').width }]}>
          <Image source={require('../../assets/images/ve.png')} style={tw`w-60 h-60`} resizeMode='contain' />
        </View>
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

            <View style={tw`relative w-4/5 z-10 my-4`}>
              <OtpInputs
                handleChange={(code) => setOtp(code)}
                numberOfInputs={6}
                autofillFromClipboard={false}
                inputStyles={{
                  fontSize: 20,
                  width: 45,
                  height: 50,
                  borderWidth: 1,
                  borderRadius: 10,
                  borderColor: otp?.length == 6 ? colors.purple : 'rgba(0, 0, 0, 0.2)',
                  color: otp?.length == 6 ? colors.purple : '#333',
                  textAlign: 'center'
                }}
              />
            </View>
            <View
              style={tw`flex-row items-center ${isVisible ? '' : 'opacity-0'}`}>
              <Text style={[tw`text-sm mr-1`, { color: colors.darkGray }]}>
                Didn't received the code?
              </Text>
              <TouchableOpacity
                disabled={!isVisible}
                onPress={() => {
                  setIsVisible(false);
                  sendOtp({
                    mobile: route.params?.mobile,
                    countryCode: route.params?.countryCode,
                  })
                }}>
                <Text style={[tw`font-medium`, { color: colors.purple }]}>Send Again</Text>
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
