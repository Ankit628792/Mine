import {View} from 'react-native';
import React from 'react';
import tw from 'twrnc';
import {colors} from '../utils/colors';
const Bar = ({value = 1}) => {
  return (
    <View style={[tw`h-1.5 relative`, {backgroundColor: colors.white}]}>
      <View
        style={[
          tw`h-1.5  rounded-r-full`,
          {backgroundColor: colors.orange, width: `${(100 * value) / 12}%`},
        ]}></View>
    </View>
  );
};

export default Bar;
