import { View, Text, TextInput, Pressable, Alert, Dimensions, Image } from 'react-native';
import React, { useState } from 'react';
import tw from 'twrnc';
import PrimaryButton from '../../components/PrimaryButton';
import LinearGradient from 'react-native-linear-gradient';
import { colors, gradient } from '../../utils/colors';
import { useNavigation } from '@react-navigation/native';
import Bar from '../../components/Bar'
import { useUpdateProfile } from '../../hooks';
import { useDispatch } from 'react-redux';
import { setIntoUser } from '../../redux/user/user-slice';
import BackButton from '../../components/BackButton';

const width = Dimensions.get('screen').width

const ProfileImage = ({ route }) => {
  const dispatch = useDispatch();
  const navigator = useNavigation();
  const [profile, setProfile] = useState(route.params?.images[0]);

  const { mutate: updateProfile, isLoading } = useUpdateProfile(() => { dispatch(setIntoUser({ profileImage: profile })); navigator.navigate('UserInterest') })

  const validateSelect = () => {
    if (!profile) {
      Alert.alert('Please choose a picture for profile');
    } else {
      updateProfile({ profileImage: profile, onBoardingProcess: 10 })
    }
  };

  return (
    <>
      <Bar value={1} />
      <LinearGradient colors={gradient.bg} style={tw`flex-1 p-5`}>
        <BackButton />
        <Text
          style={[
            tw`text-3xl font-medium text-center pt-5`,
            { color: colors.black },
          ]}>
          Your Profile Picture
        </Text>
        <View style={tw`flex-grow flex-row flex-wrap py-10 items-center justify-center`}>
          {
            route.params?.images?.map(image => {
              return <Pressable
                onPress={() => setProfile(image)}
                style={[
                  tw`w-[${width / 4}px] h-32 m-2 shadow shadow-gray-400 rounded-xl overflow-hidden relative border-4 ${profile == image ? 'border-orange-500' : 'border-white'}`,
                  { zIndex: 10000 },
                ]}>
                <Image
                  source={{ uri: image }}
                  resizeMode="cover"
                  style={tw`h-full w-full`}
                />
              </Pressable>
            })
          }
        </View>
        <PrimaryButton
          text={'Continue'}
          disabled={!profile}
          isLoading={isLoading}
          onPress={validateSelect}
        />
      </LinearGradient >
    </>
  );
};

export default ProfileImage;
