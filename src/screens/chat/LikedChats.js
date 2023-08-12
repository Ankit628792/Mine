import {Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import tw from 'twrnc';
import {useNavigation} from '@react-navigation/native';

const LikedChat = () => {
  const navigator = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigator.goBack()}>
      <Text>Go Back</Text>
    </TouchableOpacity>
  );
};

export default LikedChat;
