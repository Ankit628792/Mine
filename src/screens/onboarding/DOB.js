import { View, Text, TextInput, Pressable } from 'react-native';
import React, { useState } from 'react';
import tw from 'twrnc';
import PrimaryButton from '../../components/PrimaryButton';
import LinearGradient from 'react-native-linear-gradient';
import { colors, gradient } from '../../utils/colors';
import moment from 'moment';
import Bar from '../../components/Bar';
import { useNavigation } from '@react-navigation/native';
import { useUpdateProfile } from '../../hooks';
import { DatePicker } from 'react-native-wheel-pick';

const DOB = () => {
  const navigator = useNavigation();
  const [date, setDate] = useState(new Date(moment().subtract(18, 'years').toISOString()));

  const { mutate: updateProfile, isLoading } = useUpdateProfile(() => {
    navigator.navigate('Gender');
  });

  const onSelectDate = () => {
    updateProfile({
      dob: moment(date).format('yyyy-DD-MM'),
      onBoardingProcess: 3,
    });
  };

  return (
    <>
      <Bar value={2} />
      <LinearGradient colors={gradient.white} style={tw`flex-1 p-5`}>
        <View style={tw`flex-grow py-5`}>
          <View style={tw`p-5`}>
            <Text
              style={[
                tw`text-3xl font-medium text-center`,
                { color: colors.black },
              ]}>
              When's your Birthday?
            </Text>
            <Text style={tw`text-gray-500 text-base text-center my-1 px-5`}>
              We need to make sure you are 18+ years old
            </Text>
            <View style={tw`py-5`}>
              <View style={tw`relative items-center justify-center w-full mt-10`}>
                <View style={tw`absolute w-full h-12 bg-white`} />
                <DatePicker
                  date={date}
                  style={{ backgroundColor: 'transparent', height: 240 }}
                  selectTextColor={colors.purple}
                  textSize={24}
                  selectBackgroundColor='#ffffff1A'
                  onDateChange={date => setDate(date)}
                  order='D-M-Y'
                  selectLineSize={1}
                  minimumDate={new Date(moment().subtract(60, 'years').toISOString())}
                  maximumDate={new Date(moment().subtract(18, 'years').toISOString())}
                />
              </View>
            </View>
          </View>
        </View>
        <PrimaryButton
          text={'Continue'}
          isLoading={isLoading}
          onPress={onSelectDate}
        />
      </LinearGradient>
    </>
  );
};

export default DOB;
