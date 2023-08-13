import {
  View,
  Text,
  Pressable,
  Modal,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import tw from 'twrnc';
import PrimaryButton from '../../components/PrimaryButton';
import LinearGradient from 'react-native-linear-gradient';
import {colors, gradient} from '../../utils/colors';
import BackButton from '../../components/BackButton';
import Bar from '../../components/Bar';
import {useNavigation} from '@react-navigation/native';
import {useUpdateProfile} from '../../hooks';
import Blur50 from '../../components/Blue50';
import {Path, Svg} from 'react-native-svg';

const Religion = () => {
  const navigator = useNavigation();
  const [selectedReligion, setSelectedReligion] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const religions = [
    'Hindu',
    'Christian',
    'Muslim',
    'Buddhist',
    'Sikh',
    'Jain',
    'Other',
  ];

  const {mutate: updateProfile, isLoading} = useUpdateProfile(() => {
    navigator.navigate('Profession');
  });

  const handleReligionSelect = religion => {
    setSelectedReligion(religion);
    setModalVisible(false);
  };

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
      <LinearGradient colors={gradient.orange} style={tw`flex-1 p-5`}>
        <BackButton />
        <View style={tw`flex-grow py-10`}>
          <Text
            style={[
              tw`text-3xl font-medium text-center`,
              {color: colors.black},
            ]}>
            Your Religion
          </Text>

          <Pressable
            onPress={() => setModalVisible(true)}
            style={[
              tw`border border-gray-50 p-2 rounded-lg mt-5`,
              {backgroundColor: colors.white},
            ]}>
            <Text style={[tw`text-lg text-center`, {color: colors.black}]}>
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

        {modalVisible ? (
          <View
            style={tw`flex-1 flex-row items-center justify-center rounded-lg px-5 py-32 absolute inset-0`}>
            <Blur50 onPress={() => setModalVisible(false)} />
            <View
              nativeID=" jyg"
              style={tw`bg-gray-50 p-5 rounded-lg w-full h-96 relative`}>
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
                renderItem={({item}) => (
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
      </LinearGradient>
    </>
  );
};

export default Religion;
