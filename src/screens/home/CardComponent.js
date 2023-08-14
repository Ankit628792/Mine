import React from 'react';
import {View, Text, StyleSheet, Dimensions, Image} from 'react-native';

const CardComponent = ({cardData}) => {
  const windowHeight = Dimensions.get('window').height;
  const cardHeight = windowHeight - 170;
  return (
    <View
      style={[styles.card, {height: cardHeight}]}
      key={cardData.phoneNumber}>
      <Image
        source={{uri: cardData.profileImage}}
        style={styles.profileImage}
      />
      <View style={styles.cardDetails}>
        <Text style={styles.fullName}>{cardData.fullName}</Text>
        <Text style={styles.bio}>{cardData.bio}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#E8E8E8',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    height: '80%',
    width: '100%',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    marginBottom: 10,
    padding: 20,
  },
  cardDetails: {
    position: 'absolute',
    width: '100%',
    padding: 15,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  fullName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#fff',
  },
  bio: {
    fontSize: 16,
    color: '#fff',
  },
});

export default CardComponent;
