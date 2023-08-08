import { View, ActivityIndicator as Loader } from 'react-native';
import React from 'react';
import tw from 'twrnc';
import { colors } from '../utils/colors';

const ActivityLoader = () => {
  return (
    <View style={tw`flex-1 justify-center items-center`}>
      <Loader size={50} color={colors.orange} />
    </View>
  );
};

export default ActivityLoader;
