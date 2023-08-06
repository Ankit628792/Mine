import {View, Text, TextInput, Pressable, Image} from 'react-native';
import React, {useState} from 'react';
import tw from 'twrnc';
import PrimaryButton from '../../components/PrimaryButton';
import LinearGradient from 'react-native-linear-gradient';
import {colors, gradient} from '../../utils/colors';
import BackButton from '../../components/BackButton';
import Bar from '../../components/Bar';

const Bio = () => {
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
            />
          </View>
        </View>
        <PrimaryButton
          text={'Continue'}
          disabled={false}
          isLoading={false}
          onPress={() => {}}
        />
      </LinearGradient>
    </>
  );
};

export default Bio;
