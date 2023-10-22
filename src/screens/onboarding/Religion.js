import {
  View,
  Text,
  Pressable,
  Modal,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import tw from 'twrnc';
import PrimaryButton from '../../components/PrimaryButton';
import LinearGradient from 'react-native-linear-gradient';
import { colors, gradient } from '../../utils/colors';
import BackButton from '../../components/BackButton';
import Bar from '../../components/Bar';
import { useNavigation } from '@react-navigation/native';
import { useUpdateProfile } from '../../hooks';
import Blur50 from '../../components/Blue50';
import { Path, Svg } from 'react-native-svg';
import { religions } from '../../utils/constants';

const Religion = () => {
  const navigator = useNavigation();
  const [selectedReligion, setSelectedReligion] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const handleReligionSelect = religion => {
    setSelectedReligion(religion);
    setModalVisible(false);
  };

  const { mutate: updateProfile, isLoading } = useUpdateProfile(() => {
    navigator.navigate('Profession');
  });

  const handleContinue = () => {
    if (selectedReligion) {
      updateProfile({
        religion: selectedReligion?.toUpperCase(),
        onBoardingProcess: 7,
      });
    }
  };

  return (
    <>
      <Bar value={6} />
      <LinearGradient colors={gradient.white} style={tw`flex-1 p-5`}>
        <View style={tw`flex-grow p-5`}>
          <Text
            style={[
              tw`text-3xl font-medium text-center`,
              { color: colors.black },
            ]}>
            Your Religion
          </Text>
          <Text style={tw`text-gray-500 text-base text-center my-1 px-5`}>
            This will help you to personalize app experience
          </Text>
          <Pressable
            onPress={() => setModalVisible(true)}
            style={[
              tw`border border-gray-50 p-3 rounded-lg mt-5 bg-white`,
            ]}>
            <Text style={[tw`text-xl text-center`, { color: colors.black }]}>
              {selectedReligion || 'Select Religion'}
            </Text>
          </Pressable>
        </View>

        <PrimaryButton
          text={'Continue'}
          disabled={!selectedReligion}
          isLoading={isLoading}
          onPress={handleContinue}
        />
      </LinearGradient>
      {modalVisible ? (
        <View
          style={tw`flex-1 flex-row items-center justify-center rounded-lg px-5 py-32 absolute inset-0`}>
          <Blur50 onPress={() => setModalVisible(false)} />
          <View
            nativeID=" jyg"
            style={tw`bg-gray-50 p-5 rounded-lg w-full h-3/4 relative`}>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                style={tw`w-8 h-8 text-gray-800 ml-auto`}>
                <Path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </Svg>
            </TouchableOpacity>

            <FlatList
              data={religions}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => handleReligionSelect(item)}
                  style={tw`p-2 w-full`}>
                  <Text style={tw`text-gray-800 text-xl text-center`}>
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      ) : (
        <></>
      )}
    </>
  );
};

export default Religion;
