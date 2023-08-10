import { View, Text, TextInput, Pressable, Image } from 'react-native';
import React, { useState } from 'react';
import tw from 'twrnc';
import PrimaryButton from '../../components/PrimaryButton';
import LinearGradient from 'react-native-linear-gradient';
import { colors, gradient } from '../../utils/colors';
import BackButton from '../../components/BackButton';
import Bar from '../../components/Bar';
import { useNavigation } from '@react-navigation/native';
import { useUpdateProfile } from '../../hooks';

const GenderInterested = () => {
  const navigator = useNavigation();
  const [interestedIn, setInterestedIn] = useState('');


  const { mutate: updateProfile, isLoading } = useUpdateProfile(() => { navigator.navigate('Bio') })

  const handleGenderInterestedSelection = selectedGender => {
    setInterestedIn(selectedGender);
  };

  const handleContinue = () => {
    if (interestedIn) {
      updateProfile({ genderInterest: interestedIn?.toUpperCase(), onBoardingProcess: 5 })
    }
  };

  return (
    <>
      <Bar value={4} />

      <LinearGradient colors={gradient.bg} style={tw`flex-1 p-5`}>
        <BackButton />
        <View style={tw`flex-grow py-10`}>
          <View style={tw`p-5`}>
            <Text
              style={[
                tw`text-3xl font-medium text-center`,
                { color: colors.black },
              ]}>
              Who would you like to date?
            </Text>
            <View style={tw`flex-row items-center justify-evenly mt-10`}>
              <Pressable
                onPress={() => handleGenderInterestedSelection('male')}
                style={tw`w-20 h-20 ${interestedIn == 'male' ? 'opacity-100' : 'opacity-60'
                  }`}>
                <Image
                  style={tw`w-full h-full`}
                  resizeMode="contain"
                  source={{
                    uri: 'https://cdn-icons-png.flaticon.com/512/4139/4139981.png',
                  }}
                />
              </Pressable>
              <Pressable
                onPress={() => handleGenderInterestedSelection('female')}
                style={tw`w-20 h-20 ${interestedIn == 'female' ? 'opacity-100' : 'opacity-60'
                  }`}>
                <Image
                  style={tw`w-full h-full`}
                  resizeMode="contain"
                  source={{
                    uri: 'https://cdn-icons-png.flaticon.com/512/4140/4140060.png',
                  }}
                />
              </Pressable>
              <Pressable
                onPress={() => handleGenderInterestedSelection('everyone')}
                style={tw`w-20 h-20 ${interestedIn == 'everyone' ? 'opacity-100' : 'opacity-60'
                  }`}>
                <Image
                  style={tw`w-full h-full`}
                  resizeMode="contain"
                  source={{
                    uri: 'https://cdn-icons-png.flaticon.com/512/3778/3778360.png',
                  }}
                />
              </Pressable>
            </View>
          </View>
        </View>
        <PrimaryButton
          text={'Continue'}
          disabled={!interestedIn}
          isLoading={isLoading}
          onPress={handleContinue}
        />
      </LinearGradient>
    </>
  );
};

export default GenderInterested;
