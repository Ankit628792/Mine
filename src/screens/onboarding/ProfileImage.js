import {
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
  Dimensions,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import tw from 'twrnc';
import PrimaryButton from '../../components/PrimaryButton';
import LinearGradient from 'react-native-linear-gradient';
import {colors, gradient} from '../../utils/colors';
import {useNavigation} from '@react-navigation/native';
import Bar from '../../components/Bar';
import {useUpdateProfile} from '../../hooks';
import {useDispatch} from 'react-redux';
import {setIntoUser} from '../../redux/user/user-slice';
import BackButton from '../../components/BackButton';
import ImageSelector from '../../components/ImageSelector';
import {uploadProfileImage} from '../../services/user.service';

const width = Dimensions.get('screen').width;

const ProfileImage = ({route}) => {
  const dispatch = useDispatch();
  const navigator = useNavigation();
  const [profile, setProfile] = useState();
  const [loading, setLoading] = useState(false);

  const handleImage = async i => {
    try {
      const image = await ImageSelector('single');
      if (image) {
        setProfile(image);
      }
    } catch (error) {
      console.error('handleImage -> Error:', error);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    let nameImg = profile.split('/')[profile.split('/').length - 1];

    let type =
      nameImg.split('.')[nameImg.split('.').length - 1] === 'png'
        ? 'image/png'
        : 'image/jpeg';

    let formData = new FormData();
    formData.append('profile_pic', {
      type: type,
      uri: profile,
      name: nameImg,
    });
    let res = await uploadProfileImage(formData);

    if (res.data.status) {
      dispatch(setIntoUser({profileImage: profile}));
      navigator.navigate('UserInterest');
    }
    setLoading(false);
  };

  return (
    <>
      <Bar value={11} />
      <LinearGradient colors={gradient.white} style={tw`flex-1 p-5`}>
        <Text
          style={[
            tw`text-3xl font-medium text-center pt-5`,
            {color: colors.black},
          ]}>
          Your Profile Picture
        </Text>
        <View
          style={tw`flex-grow flex-row flex-wrap py-10 items-center justify-center`}>
          <Pressable
            onPress={() => handleImage()}
            style={[
              tw`w-40 h-40 m-2 rounded-xl overflow-hidden relative bg-white items-center justify-center`,
              {zIndex: 10000},
            ]}>
            {profile ? (
              <Image
                source={{uri: profile}}
                resizeMode="cover"
                style={tw`h-full w-full`}
              />
            ) : (
              <Image
                source={{
                  uri: 'https://cdn-icons-png.flaticon.com/512/848/848043.png',
                }}
                resizeMode="cover"
                style={tw`h-20 w-20 opacity-20`}
              />
            )}
          </Pressable>
        </View>
        <PrimaryButton
          text={'Continue'}
          disabled={!profile}
          isLoading={loading}
          onPress={handleSubmit}
        />
      </LinearGradient>
    </>
  );
};

export default ProfileImage;
