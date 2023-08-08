import {View, Text, TextInput, Pressable, Image,Alert} from 'react-native';
import React, {useState} from 'react';
import tw from 'twrnc';
import PrimaryButton from '../../components/PrimaryButton';
import LinearGradient from 'react-native-linear-gradient';
import {colors, gradient} from '../../utils/colors';
import BackButton from '../../components/BackButton';
import Bar from '../../components/Bar';
import {useNavigation} from '@react-navigation/native';

const Bio = () => {

  const navigator = useNavigation();  
  const [bio, setBio] = useState('');

  const handleContinue = () => {
    if (bio.split(/\s+/).filter(Boolean).length < 100) {
      Alert.alert('Bio must be at least 200 words');
    } else {
      navigator.navigate('Religion');
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
              {color: colors.black},
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
                {backgroundColor: colors.white, color: colors.black},
              ]}
              value={bio}
              onChangeText={setBio}
            />
          </View>
        </View>
        <PrimaryButton
          text={'Continue'}
          disabled={false}
          isLoading={false}
          onPress={handleContinue}
        />
      </LinearGradient>
    </>
  );
};

export default Bio;
