import { View, Text, TextInput, Pressable, Alert } from 'react-native';
import React, { useState } from 'react';
import tw from 'twrnc';
import PrimaryButton from '../../components/PrimaryButton';
import LinearGradient from 'react-native-linear-gradient';
import { colors, gradient } from '../../utils/colors';
import { useNavigation } from '@react-navigation/native';
import Bar from '../../components/Bar'

const Name = () => {
  const navigator = useNavigation();
  const [name, setName] = useState('');

  const validateName = () => {
    if (name.trim() === '') {
      Alert.alert('Validation Error', 'Please enter a valid name.');
    } else if (!/^[a-zA-Z]+(\s[a-zA-Z]+)*$/.test(name)) {
      Alert.alert(
        'Validation Error',
        'Name should not start or end with a space.',
      );
    } else {
      // console.log('Valid name:', name); // Print the name to the console
      navigator.navigate('DOB');
      //POST API call
    }
  };

  return (
    <>
      <Bar value={1} />
      <LinearGradient colors={gradient.bg} style={tw`flex-1 p-5`}>
        <View style={tw`flex-grow py-10`}>
          <Text
            style={[
              tw`text-3xl font-medium text-center`,
              { color: colors.black },
            ]}>
            Enter Your Name
          </Text>
          <View style={tw`p-5`}>
            <TextInput
              style={[
                tw`border border-gray-50 p-2 rounded-lg mt-1`,
                { backgroundColor: colors.white },
              ]}
              value={name}
              onChangeText={setName}
            />
          </View>
        </View>
        <PrimaryButton
          text={'Continue'}
          disabled={false}
          isLoading={false}
          onPress={validateName}
        />
      </LinearGradient>
    </>
  );
};

export default Name;
