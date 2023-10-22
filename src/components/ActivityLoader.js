import { View, ActivityIndicator as Loader, Image } from 'react-native';
import React from 'react';
import tw from 'twrnc';
import { colors } from '../utils/colors';

const ActivityLoader = ({ image, containerClass = '' }) => {
  return (
    <View style={[tw`flex-1 justify-center items-center ${containerClass}`]}>
      {
        image ?
          <Image source={image} style={tw`w-40 h-40`} resizeMode='contain' />
          :
          <Loader size={50} color={colors.purple} />
      }
    </View>
  );
};

export default ActivityLoader;
