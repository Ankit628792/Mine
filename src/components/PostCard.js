import React from 'react';
import {View, Image, Dimensions} from 'react-native';
import tw from 'twrnc';

const PostCard = ({item, onDelete}) => {
  const {imageUrl} = item;
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;
  return (
    <View style={tw`w-${width} h-${height} m-2 bg-gray-300 rounded-md`}>
      <Image
        source={{uri: imageUrl}}
        style={tw`flex-1 w-full h-full`}
        resizeMode="contain"
      />
    </View>
  );
};

export default PostCard;
