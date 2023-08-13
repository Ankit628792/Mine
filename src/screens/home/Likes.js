import {View, Text} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {gradient} from '../../utils/colors';
import tw from 'twrnc';

const Likes = () => {
  return (
    <LinearGradient
      style={tw`flex-1 flex-col justify-between relative`}
      colors={gradient.orange}>
      <View style={tw`flex-1 flex-col justify-between relative`}>
        <Text style={tw`text-white text-2xl text-center`}>Likes</Text>
      </View>
    </LinearGradient>
  );
};

export default Likes;
