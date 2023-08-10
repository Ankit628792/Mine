import { View, Text, TextInput, Pressable, Image, Alert, Keyboard } from 'react-native';
import React, { useState } from 'react';
import tw from 'twrnc';
import PrimaryButton from '../../components/PrimaryButton';
import LinearGradient from 'react-native-linear-gradient';
import { colors, gradient } from '../../utils/colors';
import BackButton from '../../components/BackButton';
import Bar from '../../components/Bar';
import { useNavigation } from '@react-navigation/native';
import { useUpdateProfile } from '../../hooks';

const Bio = () => {

  const navigator = useNavigation();
  const [bio, setBio] = useState('');

  const { mutate: updateProfile, isLoading } = useUpdateProfile(() => { navigator.navigate('Religion') })

  const handleContinue = () => {
    Keyboard.dismiss()
    if (bio.split(/\s+/).filter(Boolean).length < 10) {
      Alert.alert('Bio must be at least 10 words');
    } else {
      updateProfile({ bio: bio?.trim(), onBoardingProcess: 6 })
    }
  };
  return (
    <>
      <Bar value={5} />
      <LinearGradient colors={gradient.bg} style={tw`flex-1 p-5`}>
        <BackButton />
        <View style={tw`flex-grow py-10`}>
          <Text
            style={[
              tw`text-3xl font-medium text-center`,
              { color: colors.black },
            ]}>
            Tell us about yourself
          </Text>
          <View style={tw`p-5`}>
            <TextInput
              multiline={true}
              textAlignVertical="top"
              numberOfLines={5}
              style={[
                tw`border border-gray-50 p-2 rounded-lg mt-1`,
                { backgroundColor: colors.white, color: colors.black },
              ]}
              placeholder='explain in at least 10 words'
              value={bio}
              onChangeText={setBio}
            />
          </View>
        </View>
        <PrimaryButton
          text={'Continue'}
          disabled={bio.split(/\s+/).filter(Boolean).length < 10}
          isLoading={isLoading}
          onPress={handleContinue}
        />
      </LinearGradient>
    </>
  );
};

export default Bio;
