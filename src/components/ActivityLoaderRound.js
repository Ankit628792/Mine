import { View, ActivityIndicator as Loader, Image } from 'react-native';
import React from 'react';
import tw from 'twrnc';
import { colors } from '../utils/colors';

const ActivityLoaderRound = ({ image }) => {
  return (
    <View style={[tw`p-5 flex-1 items-center justify-center`, { borderRadius: 40, backgroundColor: colors.white }]}>
      {
        image ?
          <Image source={image} style={tw`w-40 h-40`} resizeMode='contain' />
          :
          <Loader size={50} color={colors.purple} />
      }
    </View>
  );
};

export default ActivityLoaderRound;
