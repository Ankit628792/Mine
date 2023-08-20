import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {gradient} from '../../utils/colors';
import tw from 'twrnc';

const TabComponent = ({content}) => {
  return (
    <LinearGradient
      style={tw`flex-1 flex-col justify-between relative`}
      colors={gradient.orange}>
      {content}
    </LinearGradient>
  );
};

export default TabComponent;
