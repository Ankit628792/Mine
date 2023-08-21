import React from 'react';
import tw from 'twrnc';
import { View } from 'react-native';

const TabComponent = ({ content }) => {
  return (
    <View
      style={tw`flex-1 flex-col justify-between relative`}>
      {content}
    </View>
  );
};

export default TabComponent;
