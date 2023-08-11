import { TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Path, Svg } from 'react-native-svg';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';

const BackButton = ({
  onPress = {},
  disabled = false,
  buttonClass = '',
  iconClass = '',
}) => {
  const navigator = useNavigation();

  return (
    navigator.canGoBack()
      ?
      <TouchableOpacity
        onPress={() => (typeof onPress == 'function' ? onPress() : {})}
        disabled={disabled}
        style={tw`w-9 h-9 rounded-lg bg-white shadow-md items-center justify-center ${buttonClass}`}>
        <Svg
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          style={tw`w-7 h-7 text-gray-800 ${iconClass}`}>
          <Path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </Svg>
      </TouchableOpacity>
      :
      <View style={tw`w-9 h-9`}></View>
  );
};

export default BackButton;
