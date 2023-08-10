import { View, Text, TextInput, Pressable } from 'react-native';
import React, { useState } from 'react';
import tw from 'twrnc';
import PrimaryButton from '../../components/PrimaryButton';
import LinearGradient from 'react-native-linear-gradient';
import { colors, gradient } from '../../utils/colors';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import BackButton from '../../components/BackButton';
import Bar from '../../components/Bar';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { useUpdateProfile } from '../../hooks';

const DOB = () => {
  const navigator = useNavigation();
  const [date, setDate] = useState(new Date(moment().subtract(18, 'years')));
  const [showPicker, setShowPicker] = useState(false);

  const { mutate: updateProfile, isLoading } = useUpdateProfile(() => { navigator.navigate('Gender') })


  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPicker(false);
    setDate(currentDate);
  };

  const onSelectDate = () => {
    updateProfile({ dob: moment(date).format('yyyy-DD-MM'), onBoardingProcess: 3 })
  };

  const showDatePicker = () => {
    setShowPicker(true);
  };

  return (
    <>
      <Bar value={2} />
      <LinearGradient colors={gradient.bg} style={tw`flex-1 p-5`}>
        <BackButton />
        <View style={tw`flex-grow py-10`}>
          <View style={tw`p-5`}>
            <Text
              style={[
                tw`text-3xl font-medium text-center`,
                { color: colors.black },
              ]}>
              {' '}
              Your Date of Birth
            </Text>
            <View style={tw`p-5`}>
              <Pressable
                onPress={showDatePicker}
                style={[
                  tw`border border-gray-50 p-2 rounded-lg mt-1`,
                  { backgroundColor: colors.white },
                ]}>
                <Text style={[tw` text-base text-center`, { color: colors.black }]}>
                  {date ? moment(date)?.format('DD MMM YYYY') : 'Select Date'}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
        <PrimaryButton
          text={'Continue'}
          isLoading={isLoading}
          onPress={onSelectDate}
        />
        {showPicker && (
          <DateTimePicker
            value={date}
            maximumDate={new Date(moment().subtract(16, 'years'))}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}
      </LinearGradient>
    </>
  );
};

export default DOB;
