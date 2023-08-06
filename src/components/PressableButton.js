import React from 'react';
import { Pressable, StyleProp, Text, ViewStyle } from 'react-native';
import { globalStyles } from '../shared/global.styles';

const getButtonStyle = (isValid) => ({
  backgroundColor: isValid ? 'black' : 'gray',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: 42,
  borderRadius: 4,
});

const PressableButton = ({ ...props }) => {
  return (
    <Pressable
      style={getButtonStyle(props.isValid)}
      onPress={() => props.onPress()}
      disabled={!props.isValid}>
      <Text style={globalStyles.buttonText}>{props.text}</Text>
    </Pressable>
  );
};

export default PressableButton;
