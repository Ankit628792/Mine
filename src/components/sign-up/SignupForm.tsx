import React from 'react';
import {View, Alert, StyleSheet, TextInput} from 'react-native';
import * as Yup from 'yup';
import {Formik} from 'formik';
import {useNavigation} from '@react-navigation/native';
import {TOTPScreenNavigationProp} from '../../shared/shared.interface';
import PressableButton from '../../generic-components/buttons/PressableButton';

const SignupForm = () => {
  const navigator = useNavigation<TOTPScreenNavigationProp>();

  const SignUpFormSchema = Yup.object().shape({
    phoneNumber: Yup.string()
      .required('Phone number is required')
      .matches(/^\d{10}$/, 'Phone number must be exactly 10 digits'),
  });

  const onSignUp = async (phoneNumber: any) => {
    try {
      console.log('signup', phoneNumber);
      navigator.navigate('OTPScreen', {
        phoneNumber: phoneNumber,
      });
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };

  return (
    <View style={styles.wrapper}>
      <Formik
        initialValues={{phoneNumber: ''}}
        onSubmit={values => {
          onSignUp(values.phoneNumber);
        }}
        validationSchema={SignUpFormSchema}
        validateOnMount={true}>
        {({handleBlur, handleChange, handleSubmit, values, isValid}) => (
          <>
            <View
              style={[
                styles.inputField,
                {
                  borderColor:
                    values.phoneNumber.length !== 10 &&
                    values.phoneNumber.length !== 0
                      ? 'red'
                      : '#ccc',
                },
              ]}>
              <TextInput
                placeholderTextColor="#444"
                placeholder="Phone number"
                autoCapitalize="none"
                keyboardType="number-pad"
                textContentType="telephoneNumber"
                autoFocus={true}
                onChangeText={handleChange('phoneNumber')}
                onBlur={handleBlur('phoneNumber')}
                value={values.phoneNumber}
              />
            </View>
            <PressableButton
              text="Sent OTP"
              isValid={isValid}
              onPress={() => handleSubmit()}
            />
          </>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 80,
  },
  inputField: {
    borderRadius: 4,
    padding: 12,
    backgroundColor: '#FAFAFA',
    marginBottom: 10,
    borderWidth: 1,
  },
});

export default SignupForm;
