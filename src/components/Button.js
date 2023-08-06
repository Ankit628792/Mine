import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const Button = ({ ...props }) => {
  return (
    <TouchableOpacity
      style={styles.customButton}
      onPress={() => props.handleClick()}>
      <Text style={styles.buttonText}>{props.text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  customButton: {
    marginTop: 20,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 42,
    borderRadius: 4,
  },
  buttonText: {
    fontWeight: '600',
    color: '#fff',
    fontSize: 20,
  },
});

export default Button;
