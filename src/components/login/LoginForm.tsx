import React from 'react';
import * as Yup from 'yup';
import {StyleSheet, Alert, TextInput, View, Text} from 'react-native';
import {Formik} from 'formik';
import {useDispatch} from 'react-redux';
import {setAuth} from '../../redux/user/user-slice';
import PressableButton from '../../generic-components/buttons/PressableButton';

const LoginForm = () => {
  const dispatch = useDispatch();

  const LoginFormSchema = Yup.object().shape({
    phoneNumber: Yup.string().required('Phone Number is required'),
    password: Yup.string()
      .required()
      .min(6, 'Your Password has to have at least 6 characters'),
  });

  const onLogin = async (phoneNumber: string, password: string) => {
    try {
      console.log('logged in', phoneNumber, password);
      dispatch(setAuth());
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };

  return (
    <View style={styles.wrapper}>
      <Formik
        initialValues={{phoneNumber: '', password: ''}}
        onSubmit={values => {
          onLogin(values.phoneNumber, values.password);
        }}
        validationSchema={LoginFormSchema}
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
            <View
              style={[
                styles.inputField,
                {
                  borderColor:
                    values.password.length < 1 || values.password.length >= 6
                      ? '#ccc'
                      : 'red',
                },
              ]}>
              <TextInput
                placeholderTextColor="#444"
                placeholder="Password"
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={true}
                textContentType="password"
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
              />
            </View>
            <View style={{alignItems: 'flex-end', marginBottom: 30}}>
              <Text style={{color: 'black'}}>Forgot password ?</Text>
            </View>
            <PressableButton
              isValid={isValid}
              onPress={() => handleSubmit()}
              text="Log in"
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

export default LoginForm;
