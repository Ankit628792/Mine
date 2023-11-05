import React, { useState } from 'react';
import {
  Image,
  ScrollView,
  Text,
  View,
} from 'react-native';
import tw from 'twrnc';
import LinearGradient from 'react-native-linear-gradient';
import { colors, gradient } from '../../utils/colors';
import { TouchableOpacity } from 'react-native';
import { Path, Svg } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from 'react-query';
import { UserService } from '../../services/user.service';
import ActivityLoaderRound from '../../components/ActivityLoaderRound';

const Profile = () => {
  const navigator = useNavigation()
  const { data, isLoading } = useQuery('getProfile', UserService.getProfile, {
    retry: false,
  })
  const userData = data?.data

  return (
    <LinearGradient colors={gradient.purple} style={tw`flex-1`}>
      <View style={tw`p-5`}>
        <Text style={[tw`text-2xl font-semibold text-white text-center`]}>Profile</Text>
      </View>
      <TouchableOpacity style={tw`absolute top-5 right-5 bg-white w-10 h-10 items-center justify-center rounded-lg`} onPress={() => navigator.navigate('Setting')}>
        <Svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={[tw`w-6 h-6`, { color: colors.black }]}>
          <Path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
          <Path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </Svg>
      </TouchableOpacity>
      <View style={[tw`p-5 flex-1`, { borderRadius: 40, backgroundColor: colors.white }]}>
        {
          isLoading ? <ActivityLoaderRound image={require('../../assets/images/loading.png')} /> :

            <ScrollView showsVerticalScrollIndicator={false} style={tw`p-2`}>
              <View
                style={tw`justify-center items-center`}>
                <TouchableOpacity onPress={() => navigator.navigate('EditProfile', { userData })} style={tw`h-32 w-32 rounded-full border-2 border-white items-end justify-end`}>
                  <Image
                    style={tw`h-full w-full rounded-full bg-white`}
                    source={{
                      uri: userData?.profileImage
                        ? userData?.profileImage
                        : 'https://w0.peakpx.com/wallpaper/470/485/HD-wallpaper-the-batman-robert-pattinson-the-batman-batman-superheroes-movies-2021-movies-robert-pattinson.jpg',
                    }}
                  />
                  <TouchableOpacity onPress={() => navigator.navigate('EditProfile', { userData })} style={[tw`p-1 rounded-full absolute bottom-0.5 right-0.5 border border-white w-9 h-9 items-center justify-center`, { backgroundColor: colors.purple }]}>
                    <Svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={tw`w-5 h-5 text-white`}>
                      <Path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                    </Svg>
                  </TouchableOpacity>
                </TouchableOpacity>
                <Text style={[tw`text-2xl font-medium mt-2 text-center`, { color: colors.black }]}>{userData?.fullName}</Text>
                <Text style={[tw`text-lg mt-1 text-center`, { color: colors.gray }]}>+91 {userData?.phoneNumber}</Text>

                <TouchableOpacity onPress={() => navigator.navigate('ViewProfile', { ...userData })} style={tw`bg-white flex-row w-full items-center justify-between py-3 px-5 my-2 mt-10 rounded-md shadow-lg shadow-gray-300`}>
                  <Text style={tw`text-base text-gray-700`}>View Profile</Text>
                  <Svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={tw`text-gray-700 w-7 h-7`}>
                    <Path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </Svg>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigator.navigate('EditImages')} style={tw`bg-white flex-row w-full items-center justify-between py-3 px-5 my-2 rounded-md shadow-lg shadow-gray-300`}>
                  <Text style={tw`text-base text-gray-700`}>Edit Pictures</Text>
                  <Svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={tw`text-gray-700 w-7 h-7`}>
                    <Path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </Svg>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigator.navigate('Setting')} style={tw`bg-white flex-row w-full items-center justify-between py-3 px-5 my-2 rounded-md shadow-lg shadow-gray-300`}>
                  <Text style={tw`text-base text-gray-700`}>Settings</Text>
                  <Svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={tw`text-gray-700 w-7 h-7`}>
                    <Path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </Svg>
                </TouchableOpacity>

              </View>
            </ScrollView>
        }
      </View>
    </LinearGradient>
  );
};

export default Profile;
