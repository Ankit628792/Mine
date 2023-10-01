import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import tw from 'twrnc'
import { colors } from '../utils/colors';
import { Path, Svg } from 'react-native-svg';

const windowHeight = Dimensions.get('window').height;

const CardComponent = ({ cardData }) => {
  const cardHeight = windowHeight - 340;

  return (
    <View
      style={[tw`items-center justify-center m-2 rounded-3xl overflow-hidden`, { height: cardHeight, }]}
      key={cardData.phoneNumber}>
      <Image
        source={{ uri: cardData.profileImage }}
        style={styles.profileImage}
      />
      <View style={tw`absolute inset-0 bottom-1 bg-purple-800 rounded-xl bg-opacity-30 justify-between`}>
        <View style={tw`bg-white bg-opacity-50 rounded-full py-1.5 px-3 m-4 mr-auto flex-row items-center gap-1`}>
          <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style={tw`text-white w-5 h-5`}>
            <Path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
          </Svg>
          <Text style={tw`text-sm font-medium relative tracking-tight`}>10 Km away</Text>
        </View>

        <LinearGradient
          colors={['rgba(0,0,0,0)', 'rgba(128,102,255,0.5)']}
          style={tw`w-full h-24 rounded-xl`}>
          <View style={tw`items-center`}>
            <Text numberOfLines={1} style={tw`text-2xl font-medium text-white`}>{cardData.fullName}</Text>
            <Text style={[tw`text-base my-1`, { color: colors.white }]}>{cardData.profession || "Profession"}</Text>
          </View>
        </LinearGradient>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    position: 'absolute',
    width: '100%',
    padding: 20,
    bottom: 1,
  },
  card: {
    borderRadius: 10,
    borderWidth: 0,
    borderColor: '#E8E8E8',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    marginBottom: 10,
  },
  fullName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#F0F0F0',
  },

});

export default CardComponent;
