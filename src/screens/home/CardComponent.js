import React from 'react';
import {View, Text, StyleSheet, Dimensions, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const CardComponent = ({cardData}) => {
  const windowHeight = Dimensions.get('window').height;
  const cardHeight = windowHeight - 300;
  return (
    <View
      style={[styles.card, {height: cardHeight}]}
      key={cardData.phoneNumber}>
      <Image
        source={{uri: cardData.profileImage}}
        style={styles.profileImage}
      />
      <LinearGradient
        colors={['rgb(225, 29, 72)', '#FCAEAE']}
        style={styles.linearGradient}>
        <Text style={styles.fullName}>{cardData.fullName}</Text>
        <Text style={styles.bio}>{cardData.bio}</Text>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    position: 'absolute',
    width: '100%',
    padding: 15,
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#F0F0F0',
  },
  bio: {
    fontSize: 16,
    color: '#F0F0F0',
  },
});

export default CardComponent;
