import { View, Text, Image } from 'react-native'
import React, { useState } from 'react'
import BackButton from '../../components/BackButton'
import LinearGradient from 'react-native-linear-gradient'
import { colors, gradient } from '../../utils/colors'
import tw from 'twrnc'
import { ScrollView } from 'react-native'
import ImageSelector from '../../components/ImageSelector'
import { uploadProfileImage } from '../../services/user.service'
import { TouchableOpacity } from 'react-native'
import { ActivityIndicator } from 'react-native'
import { TextInput } from 'react-native'

const EditProfile = ({ route }) => {
    const [userData, setUserData] = useState(route.params.userData)
    const [loading, setLoading] = useState(false);

    const handleImage = async i => {
        try {
            const profile = await ImageSelector('single');
            if (profile) {
                setLoading(true)
                let nameImg = profile.split('/')[profile.split('/').length - 1];

                let type =
                    nameImg.split('.')[nameImg.split('.').length - 1] === 'png'
                        ? 'image/png'
                        : 'image/jpeg';

                let formdata = new FormData();
                formdata.append('profile_pic', {
                    type: type,
                    uri: profile,
                    name: nameImg,
                });
                let res = await uploadProfileImage(formdata);

                if (res.data.status) {

                }
                setLoading(false)
            }
        } catch (error) {
            setLoading(false)
            console.error('handleImage -> Error:', error);
        }
    };


    return (
        <LinearGradient colors={gradient.white} style={tw`flex-1 p-5`}>
            <View style={tw`flex-row items-center`}>
                <BackButton buttonClass='mr-4' />
                <Text style={[tw`text-2xl font-medium`, { color: colors.black }]}>Edit Profile</Text>
            </View>
            <ScrollView style={tw`py-8`}>
                <TouchableOpacity style={tw`w-32 h-32 border border-gray-200 rounded-lg bg-white items-center justify-center mx-auto`}>
                    {
                        loading ?
                            <ActivityIndicator size={30} color={colors.orange} />
                            :
                            <Image source={{ uri: userData?.image }} />
                    }
                </TouchableOpacity>
                <View style={tw`mt-4 px-2`}>
                    <Text style={[tw`text-lg mb-1`, { color: colors.black }]}>Name</Text>
                    <TextInput style={tw`w-full bg-white rounded-lg px-4 shadow-lg shadow-gray-100`} value={userData?.name} onChangeText={(txt) => setUserData({ ...userData, name: txt })} />
                </View>
                <View style={tw`mt-4 px-2`}>
                    <Text style={[tw`text-lg mb-1`, { color: colors.black }]}>Bio</Text>
                    <TextInput style={tw`w-full bg-white rounded-lg px-4 shadow-lg shadow-gray-100`} value={userData?.bio} onChangeText={(txt) => setUserData({ ...userData, bio: txt })} />
                </View>

            </ScrollView>
        </LinearGradient>
    )
}

export default EditProfile