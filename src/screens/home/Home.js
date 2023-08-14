import React from 'react';
import {StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {gradient} from '../../utils/colors';
import SwipeableProfile from './SwipeableProfile';
import tw from 'twrnc';
import {useSelector} from 'react-redux';

const Home = () => {
  const {cardsData} = useSelector(state => state.cardsData);
  return (
    <LinearGradient
      style={tw`flex-1 flex-col justify-between relative`}
      colors={gradient.orange}>
      <View style={styles.container}>
        <SwipeableProfile cards={cardsData} />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
  },
});

export default Home;
