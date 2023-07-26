import React from 'react';
import HeroSection from '../../generic-components/hero-section/HeroSection';
import LoginForm from '../../components/login/LoginForm';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {globalStyles} from '../../shared/global.styles';

const LoginScreen = ({navigation}: any) => {
  return (
    <View style={globalStyles.container}>
      <HeroSection />
      <LoginForm />
      <View style={styles.signupContainer}>
        <Text>Don't have an account ?</Text>
        <TouchableOpacity onPress={() => navigation.push('SignupScreen')}>
          <Text style={{color: 'gray'}}> Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  signupContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    marginTop: 50,
  },
});

export default LoginScreen;
