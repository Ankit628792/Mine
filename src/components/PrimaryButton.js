import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import tw from 'twrnc';
import { gradient } from '../utils/colors';

function PrimaryButton({
  text,
  disabled,
  isLoading,
  onPress,
  extra = '',
  textClass = '',
  outer = '',
}) {
  return (
    <LinearGradient
      start={{ x: 1, y: 1 }}
      end={{ x: 0, y: 0 }}
      colors={isLoading ? gradient.purple : disabled ? gradient.gray : gradient.purple}
      style={tw`w-full rounded-xl ${outer}`}>
      <TouchableOpacity
        disabled={disabled || isLoading}
        onPress={() => (typeof onPress == 'function' ? onPress() : {})}
        style={tw`py-2 px-6 rounded-xl ${extra} items-center justify-center`}>
        {isLoading ? (
          <ActivityIndicator size={36} color={'#FFF'} />
        ) : (
          <Text
            style={tw`text-2xl ${disabled ? 'text-gray-700' : 'text-white'
              } text-center ${textClass}`}>
            {text}
          </Text>
        )}
      </TouchableOpacity>
    </LinearGradient>
  );
}

export default PrimaryButton;
