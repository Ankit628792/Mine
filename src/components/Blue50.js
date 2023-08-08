import React from 'react';
import { BlurView } from '@react-native-community/blur';
import tw from 'twrnc';

const Blur50 = ({ onPress = {}, color = '' }) => {
  return (
    <BlurView
      onTouchStart={() => (typeof onPress == 'function' ? onPress() : {})}
      style={tw`flex-1 bg-gray-900 bg-opacity-50 absolute inset-0 ${color}`}
      blurType="light"
      blurAmount={1}></BlurView>
  );
};

export default Blur50;
