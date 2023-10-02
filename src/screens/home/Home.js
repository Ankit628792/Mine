import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors, gradient } from '../../utils/colors';
import SwipeableProfile from './SwipeableProfile';
import tw from 'twrnc';
import { useSelector } from 'react-redux';
import { Path, Svg } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import { selectUser } from '../../redux/user/user-slice';

const Home = () => {
  const { cardsData } = useSelector(state => state.cardsData);
  const navigator = useNavigation();
  const user = useSelector(selectUser)

  return (
    <LinearGradient
      style={tw`flex-1 flex-col justify-between relative`}
      colors={gradient.purple}>
      <View style={tw`py-3 pb-5 px-5 flex-row items-center justify-between`}>
        <Text style={tw`text-2xl font-semibold text-white`}>Hi, {user?.username}</Text>
        <TouchableOpacity onPress={() => navigator.navigate("Filter")} style={tw`p-2 bg-white rounded-xl`}>
          <Svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={tw`w-7 h-7 text-gray-800`}>
            <Path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
          </Svg>
        </TouchableOpacity>
      </View>
      <View style={[tw`flex-1 rounded-t-[40px] relative`, { backgroundColor: colors.white }]}>
        <SwipeableProfile cards={cardsData} navigator={navigator} />
      </View>
    </LinearGradient>
  );
};


export default Home;
