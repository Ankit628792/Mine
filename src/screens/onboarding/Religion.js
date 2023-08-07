import { View, Text, Pressable, Modal, FlatList } from 'react-native';
import React, { useState } from 'react';
import tw from 'twrnc';
import PrimaryButton from '../../components/PrimaryButton';
import LinearGradient from 'react-native-linear-gradient';
import { colors, gradient } from '../../utils/colors';
import BackButton from '../../components/BackButton';
import Bar from '../../components/Bar';
import {useNavigation} from '@react-navigation/native';

const Religion = () => {
  const navigator = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedReligion, setSelectedReligion] = useState('');
  const religions = ['Hindu', 'Christian', 'Muslim', 'Buddhist', 'Other'];

  const handleReligionSelect = (religion) => {
    setSelectedReligion(religion);
    setModalVisible(false);
  };

  const handleContinue = () => {
    if (selectedReligion) {
      //navigate to the next screen
      navigator.navigate('Profession');
    }
  };

  return (
    <>
      <Bar value={6} />
      <LinearGradient colors={gradient.bg} style={tw`flex-1 p-5`}>
        <BackButton />
        <View style={tw`flex-grow py-10`}>
          <Text
            style={[
              tw`text-3xl font-medium text-center`,
              { color: colors.black },
            ]}>
            Your Religion
          </Text>

          <Pressable
            onPress={() => setModalVisible(true)}
            style={[
              tw`border border-gray-50 p-2 rounded-lg mt-1`,
              { backgroundColor: colors.white },
            ]}>
            <Text style={[tw`text-lg`, { color: colors.black }]}>
              {selectedReligion || 'Select Religion'}
            </Text>
          </Pressable>
        </View>

        <PrimaryButton
          text={'Continue'}
          disabled={!selectedReligion}
          isLoading={false}
          onPress={handleContinue}
        />

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}>
          <View style={tw`flex-1 justify-center items-center bg-opacity-70 bg-black`}>
            <View style={tw`bg-white p-4 rounded-lg`}>
              <FlatList
                data={religions}
                renderItem={({ item }) => (
                  <Pressable
                    onPress={() => handleReligionSelect(item)}
                    style={tw`p-2`}>
                    <Text style={[tw`text-lg`, { color: colors.black }]}>{item}</Text>
                  </Pressable>
                )}
                keyExtractor={(item) => item}
              />
            </View>
          </View>
        </Modal>
      </LinearGradient>
    </>
  );
};

export default Religion;
