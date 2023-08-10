import React, { useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import tw from 'twrnc';
import {
  FlatList,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Path, Svg } from 'react-native-svg';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import countryCodes from '../../utils/countryCodes.json';
import { useSendOtp } from '../../hooks';
import Blur50 from '../../components/Blue50';
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
  bg: ['#F5F7FA', '#F5F7FA'],
};

const Login = () => {
  const navigator = useNavigation();

  const [mobile, setMobile] = useState('');
  const [error, setError] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [country, setCountry] = useState({
    country: 'India',
    code: '91',
    iso: 'IN',
  });


  const handleOptionSelect = (option) => {
    setError('');
    setCountry(option)
    setIsOpen(false);
  };

  let { mutate: sendOtp, isLoading, isError, error: err } = useSendOtp(({ initialOtp }) => {
    navigator.navigate("VerifyOTP", { mobile: mobile, countryCode: `+${country.code}`, initialOtp })
  });

  const validatePhoneNumber = () => {
    const phoneNumberInstance = parsePhoneNumberFromString(mobile, country.iso);
    const isValidNumber = phoneNumberInstance && phoneNumberInstance.isValid();
    if (!isValidNumber)
      setError("Invalid Mobile Number")
    else {
      // navigator.navigate("VerifyOTP", { mobile: `+${country.code}${mobile}` })
      sendOtp({ mobile: mobile, countryCode: `+${country.code}` })
      setError('')
    }
  };


  const handleNext = async () => {
    validatePhoneNumber();
    Keyboard.dismiss();
  };

  return (
    <>
      <LinearGradient
        style={tw`flex-1 flex-col justify-between relative`}
        colors={gradient.orange}>
        <View
          style={[
            tw`p-5 absolute bottom-0 left-0 right-0 rounded-t-3xl`,
            { backgroundColor: colors.white },
          ]}>
          <View style={tw`w-full p-5`}>
            <Text
              style={[
                tw`font-bold text-3xl text-center`,
                { color: colors.black },
              ]}>
              Enter your mobile number
            </Text>
            <View style={tw`flex-row items-center w-full my-4`}>
              <TouchableOpacity
                style={tw`w-20 py-2 rounded-lg mr-4 border-b border-gray-400 `}
                onPress={() => {
                  Keyboard.dismiss();
                  setIsOpen(true);
                }}>
                <Text style={[tw`text-2xl text-center`, { color: colors.black }]}>
                  +{country.code}
                </Text>
              </TouchableOpacity>
              <TextInput
                keyboardType="number-pad"
                maxLength={15}
                value={mobile}
                onChangeText={txt => {
                  setMobile(txt);
                  setError('');
                }}
                placeholder="9818451195"
                placeholderTextColor={'rgba(0, 0, 0, 0.4)'}
                style={[
                  tw`flex-grow text-2xl py-2 px-4 tracking-wide font-medium border-b border-gray-400 rounded-lg`,
                  { color: colors.black },
                ]}
              />
            </View>
            <Text style={tw`h-6 text-base text-right px-2 text-rose-500`}>
              {error}
            </Text>
          </View>

          <View style={tw`px-5`}>
            <Text style={[tw`text-center leading-5`, { color: colors.darkGray }]}>
              By tapping Next, you've accepted
            </Text>
            <View style={tw`flex-row items-center justify-center mb-6`}>
              <TouchableOpacity
                onPress={() => navigator.navigate('TermsAndConditions')}>
                <Text style={[{ color: colors.orange }]}>Terms & Conditions</Text>
              </TouchableOpacity>
              <Text style={[{ color: colors.darkGray }]}> and </Text>
              <TouchableOpacity
                onPress={() => navigator.navigate('PrivacyPolicy')}>
                <Text style={[{ color: colors.orange }]}>Privacy Policy</Text>
              </TouchableOpacity>
            </View>
            <PrimaryButton
              text={'Next'}
              disabled={isLoading || mobile?.length < 8}
              isLoading={isLoading}
              onPress={handleNext}
            />
          </View>
        </View>

        {isOpen ? (
          <View
            style={tw`flex-1 flex-row items-center justify-center rounded-lg px-5 py-32 absolute inset-0`}>
            <Blur50 onPress={() => setIsOpen(false)} />
            <View
              nativeID=" jyg"
              style={tw`bg-gray-50 p-5 rounded-lg w-full h-9/10 relative`}>
              <TouchableOpacity onPress={() => setIsOpen(false)}>
                <Svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  style={tw`w-8 h-8 text-gray-800 ml-auto`}>
                  <Path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </Svg>
              </TouchableOpacity>

              <FlatList
                data={countryCodes}
                keyExtractor={item => item.country}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => handleOptionSelect(item)}
                    style={tw`p-2 w-full`}>
                    <Text style={tw`text-gray-800 text-xl text-center`}>
                      ({item.code}) {item.country}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        ) : (
          <></>
        )}
      </LinearGradient>
    </>
  );
};

export default Login;
