import React from 'react';
import {Image, View} from 'react-native';
import {globalStyles} from '../../shared/global.styles';

const HeroSection = () => {
  return (
    <View style={globalStyles.logoContainer}>
      <Image
        source={require('../../assets/images/logo.png')}
        style={{height: 100, width: 100}}
      />
    </View>
  );
};

export default HeroSection;
