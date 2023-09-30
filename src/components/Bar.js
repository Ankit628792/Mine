import { Dimensions, Text, View } from 'react-native';
import React from 'react';
import tw from 'twrnc';
import { colors } from '../utils/colors';
import BackButton from './BackButton';

const Bar = ({ value = 1 }) => {
  return (
    <View style={[tw`flex-row items-center justify-center gap-4 p-5 relative`, { backgroundColor: colors.white, width: Dimensions.get('window').width }]}>
      <Text style={tw`absolute text-lg text-gray-800 z-10 top-10 font-medium`}>{Math.round((100 * value) / 12)}%</Text>
      <BackButton />
      <View style={[tw`h-2 relative flex-row flex-grow bg-white rounded-full`]}>
        <View
          style={[
            tw`h-2 rounded-full`,
            { backgroundColor: colors.purple, width: `${(100 * value) / 12}%` },
          ]}></View>
      </View>
      <BackButton buttonClass='opacity-0' disabled={true} />
    </View>
  );
};

export default Bar;
