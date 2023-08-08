import {View, Text, TextInput, Pressable, Image} from 'react-native';
import React, {useState} from 'react';
import tw from 'twrnc';
import PrimaryButton from '../../components/PrimaryButton';
import LinearGradient from 'react-native-linear-gradient';
import {colors, gradient} from '../../utils/colors';
import BackButton from '../../components/BackButton';
import Bar from '../../components/Bar';
import {useNavigation} from '@react-navigation/native';

const Gender = () => {
  const navigator = useNavigation();
  const [gender, setGender] = useState('');

  const [isDisabled, setIsDisabled] = useState(true);

  const handleGenderSelection = selectedGender => {
    setGender(selectedGender);
    setIsDisabled(false);
  };

  const handleContinue = () => {
    if (gender) {
      navigator.navigate('GenderInterested');
      // Perform your task here, e.g., navigate to the next screen
    }
  };

  return (
    <>
      <Bar value={3} />
      <LinearGradient colors={gradient.bg} style={tw`flex-1 p-5`}>
        <BackButton />
        <View style={tw`flex-grow py-10`}>
          <View style={tw`p-5`}>
            <Text
              style={[
                tw`text-3xl font-medium text-center`,
                {color: colors.black},
              ]}>
              Your Gender
            </Text>
            <View style={tw`flex-row items-center justify-evenly mt-10`}>
              <Pressable
                onPress={() => handleGenderSelection('male')}
                style={tw`w-20 h-20 ${
                  gender == 'male' ? 'opacity-100' : 'opacity-60'
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
                onPress={() => handleGenderSelection('female')}
                style={tw`w-20 h-20 ${
                  gender == 'female' ? 'opacity-100' : 'opacity-60'
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
                onPress={() => handleGenderSelection('transgender')}
                style={tw`w-20 h-20 ${
                  gender == 'transgender' ? 'opacity-100' : 'opacity-60'
                }`}>
                <Image
                  style={tw`w-full h-full`}
                  resizeMode="contain"
                  source={{
                    uri: 'https://cdn-icons-png.flaticon.com/512/4646/4646471.png',
                  }}
                />
              </Pressable>
            </View>
          </View>
        </View>
        <PrimaryButton
          text={'Continue'}
          disabled={isDisabled}
          isLoading={false}
          onPress={handleContinue}
        />
      </LinearGradient>
    </>
  );
};

export default Gender;
