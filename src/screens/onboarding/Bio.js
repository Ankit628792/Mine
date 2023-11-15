import {
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  Alert,
  Keyboard,
} from 'react-native';
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

  const { mutate: updateProfile, isLoading } = useUpdateProfile(() => {
    navigator.navigate('Religion');
  });

  const handleContinue = () => {
    Keyboard.dismiss();
    if (bio.split(/\s+/).filter(Boolean).length < 10) {
      Alert.alert('Bio must be at least 10 words');
    } else {
      updateProfile({ bio: bio?.trim(), onBoardingProcess: 6 });
    }
  };
  return (
    <>
      <Bar value={5} />
      <LinearGradient colors={gradient.white} style={tw`flex-1 p-5`}>
        <View style={tw`flex-grow py-5`}>
          <Text
            style={[
              tw`text-3xl font-medium text-center`,
              { color: colors.black },
            ]}>
            Describe the real you in at least 10 words
          </Text>
          <Text style={tw`text-gray-500 text-base text-center my-1 px-5`}>
            This will helps the other what kind of person you are
          </Text>
          <View style={tw`py-5 px-3`}>
            <TextInput
              multiline={true}
              textAlignVertical="top"
              numberOfLines={7}
              placeholderTextColor={'#999'}
              style={[
                tw`border border-gray-50 p-3 rounded-lg mt-1 text-lg bg-white`,
                { color: colors.black },
              ]}
              placeholder="Explain in at least 10 words"
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
