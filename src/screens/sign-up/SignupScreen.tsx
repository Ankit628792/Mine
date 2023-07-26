import React from 'react';
import HeroSection from '../../generic-components/hero-section/HeroSection';
import SignupForm from '../../components/sign-up/SignupForm';
import {globalStyles} from '../../shared/global.styles';
import {Text, TouchableOpacity, StyleSheet, View} from 'react-native';

const SignupScreen = ({navigation}: any) => {
  return (
    <View style={globalStyles.container}>
      <HeroSection />
      <SignupForm />
      <View style={styles.signupContainer}>
        <Text>Already have an account ?</Text>
        <TouchableOpacity onPress={() => navigation.push('LoginScreen')}>
          <Text style={{color: 'gray'}}> Log In</Text>
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

export default SignupScreen;
