import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import tw from 'twrnc';
import PrimaryButton from '../../components/PrimaryButton';
import LinearGradient from 'react-native-linear-gradient';
import { colors, gradient } from '../../utils/colors';
import BackButton from '../../components/BackButton';
import Bar from '../../components/Bar';
import { useUpdateProfile } from '../../hooks';
import { useNavigation } from '@react-navigation/native';
import { nonInterests } from '../../utils/constants';

const UserNotInterest = () => {
  const [data, setData] = useState([]);
  const navigator = useNavigation();

  const { mutate: updateProfile, isLoading } = useUpdateProfile(() => {
    navigator.navigate('Instruction');
  });

  const handleSelect = value => {
    let idx = data.findIndex(item => item == value);
    if (idx > -1) {
      let arr = [...data];
      arr.splice(idx, 1);
      setData([...arr]);
    } else {
      setData([...data, value]);
    }
  };

  const handleSubmit = () => {
    if (data.length > 2) {
      updateProfile({
        notInterest: data,
        status: 'ACTIVE',
        onBoardingProcess: 12,
      });
    }
  };

  return (
    <>
      <View style={[tw`px-7`, { backgroundColor: colors.white }]}>
        <Bar value={11} />
      </View>
      <LinearGradient
        colors={gradient.white}
        style={tw`flex-1 p-5 flex-col justify-between`}>
        <Text
          style={[
            tw`text-3xl font-medium text-center pt-5`,
            { color: colors.black },
          ]}>
          Select Non Interest
        </Text>
        <Text style={tw`text-gray-500 text-base text-center my-1 px-5`}>
          Exclude not required connections by selecting option that you have no interest
        </Text>
        <ScrollView style={tw`flex-grow mb-4 mt-6`} showsVerticalScrollIndicator={false}>
          <View style={tw`flex-row items-center flex-wrap`}>
            {nonInterests.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  tw`w-auto py-2 px-4 rounded-full m-2`,
                  {
                    backgroundColor: data.includes(item)
                      ? colors.purple
                      : '#fff',
                  },
                ]}
                onPress={() => handleSelect(item)}>
                <Text
                  style={[
                    {
                      color: data.includes(item)
                        ? '#fff'
                        : colors.black,
                    },
                  ]}>
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
        <PrimaryButton
          text={'Finish'}
          disabled={data.length < 2}
          isLoading={isLoading}
          onPress={() => handleSubmit()}
        />
      </LinearGradient>
    </>
  );
};

export default UserNotInterest;
