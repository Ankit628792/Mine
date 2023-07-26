import React, {useState} from 'react';
import tw from 'twrnc';
import OTPTextView from 'react-native-otp-textinput';
import HeroSection from '../../generic-components/hero-section/HeroSection';
import PressableButton from '../../generic-components/buttons/PressableButton';
import {StyleSheet, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {setAuth} from '../../redux/user/user-slice';
import {globalStyles} from '../../shared/global.styles';

const OtpScreen = () => {
  const [OTP, setOTP] = useState('');
  const [error, setError] = useState('');
  const [isValid, setIsValid] = useState(false);
  const dispatch = useDispatch();

  const handleOtp = (text: string) => {
    setOTP(text);
    if (text.length === 6) {
      setIsValid(true);
    }
  };

  const handleSubmit = async () => {
    if (OTP === undefined || OTP === '' || OTP?.length !== 6) {
      setError('Invalid OTP');
    } else {
      setError('');
      dispatch(setAuth());
    }
  };

  return (
    <View style={globalStyles.container}>
      <HeroSection />
      <View style={styles.wrapper}>
        <OTPTextView
          handleTextChange={e => handleOtp(e)}
          inputCount={6}
          inputCellLength={1}
          offTintColor="lightgray"
          tintColor="gray"
        />
        <Text style={tw`text-right text-red-400 text-base mt-2 mb-2`}>
          {error}
        </Text>
        <PressableButton
          text="Submit OTP"
          isValid={isValid}
          onPress={() => handleSubmit()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 80,
  },
});

export default OtpScreen;
