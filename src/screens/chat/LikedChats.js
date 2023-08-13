import {Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import tw from 'twrnc';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {gradient} from '../../utils/colors';

const LikedChat = () => {
  const navigator = useNavigation();
  return (
    <LinearGradient style={tw`flex-1 p-5 relatives`} colors={gradient.orange}>
      <View
        style={tw`flex-row items-center justify-between relative z-20 pb-5`}>
        <TouchableOpacity onPress={() => navigator.goBack()}>
          <Text>Go Back</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default LikedChat;
