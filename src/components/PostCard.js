import React from 'react';
import {View, Image, StyleSheet, Dimensions} from 'react-native';

const PostCard = ({item}) => {
  const {imageUrl} = item;
  return (
    <View style={styles.gridItem}>
      <Image
        style={styles.image}
        source={{uri: imageUrl}}
        resizeMode="contain"
      />
    </View>
  );
};

export default PostCard;

const styles = StyleSheet.create({
  gridItem: {
    margin: 2,
    width: Dimensions.get('window').width / 3.2,
    height: 160,
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#000',
    borderRadius: 10,
  },
});
