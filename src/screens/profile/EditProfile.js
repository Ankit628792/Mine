import { View, Text, Image, StyleSheet, Button } from 'react-native'
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
import moment from 'moment'
import DateTimePicker from '@react-native-community/datetimepicker';
import { FlatList } from 'react-native'
import { professions, religions } from '../../utils/constants'
import Blur50 from '../../components/Blue50'
import { Path, Svg } from 'react-native-svg'
import {
    BottomSheetModal,
    BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import { useRef } from 'react'
import { useMemo } from 'react'
import { Pressable } from 'react-native'
import PrimaryButton from '../../components/PrimaryButton'
import { useUpdateProfile } from '../../hooks'
import { showToast } from '../../utils/FunctionHelper'
import { useQueryClient } from 'react-query'
import ActivityLoader from '../../components/ActivityLoader'
import { setIntoUser, setUser } from '../../redux/user/user-slice'
import { useDispatch } from 'react-redux'

const EditProfile = ({ route }) => {
    const queryClient = useQueryClient()
    const dispatch = useDispatch()
    const [userData, setUserData] = useState(route.params.userData)
    const [loading, setLoading] = useState(false);
    const [showPicker, setShowPicker] = useState(false);
    const [modalVisible, setModalVisible] = useState('');
    const [sheet, setSheet] = useState('');
    // console.log(userData)

    const { mutate: updateProfile, isLoading } = useUpdateProfile(() => {
        queryClient.invalidateQueries('getProfile');
        showToast("Profile Updated Successfully!");
        dispatch(setIntoUser({ profileImages: userData?.profileImage, username: userData?.fullName }))
    });

    const handleSave = () => {
        updateProfile({ ...userData, dob: moment(userData?.dob).format('yyyy-DD-MM'), userName: userData?.fullName?.trim(), fullName: userData?.fullName?.trim() });
    }

    const handleGenderInterestedSelection = selectedGender => setUserData({ ...userData, genderInterest: selectedGender });

    const handleModal = (value) => {
        setUserData({ ...userData, [modalVisible]: value });
        setModalVisible('')
    }

    const handleDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || userData?.dob;
        setUserData({ ...userData, dob: currentDate });
        setShowPicker(false);
    };

    const showDatePicker = () => {
        setShowPicker(true);
    };

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

                let formData = new FormData();
                formData.append('profile_pic', {
                    type: type,
                    uri: profile,
                    name: nameImg,
                });
                let res = await uploadProfileImage(formData);
                // let res = await updateImage(edit, formData);

                if (res.data?.data?.url) {
                    setUserData({ ...userData, profileImage: res.data?.data?.url })
                    dispatch(setIntoUser({ profileImage: res.data?.data?.url }));
                    queryClient.invalidateQueries('getProfile');
                    showToast("Profile Updated Successfully!");
                }
                setLoading(false)
            }
        } catch (error) {
            setLoading(false)
            console.error('handleImage -> Error:', error);
        }
    };

    const bottomSheetModalRef = useRef(null);

    // variables
    const snapPoints = useMemo(() => ['25%', '80%'], []);

    // callbacks
    const openBottomSheet = (value) => {
        bottomSheetModalRef.current.present();
        setSheet(value)
    };

    const closeBottomSheet = () => {
        bottomSheetModalRef.current.dismiss();
        setSheet('')
    };


    return (
        <>
            <BottomSheetModalProvider>
                <LinearGradient colors={gradient.purple} style={tw`flex-1`}>
                    <View style={tw`p-5 flex-row items-center justify-between`}>
                        <BackButton />
                        <Text style={[tw`text-2xl font-semibold text-white text-center`]}>Edit Profile</Text>
                        <TouchableOpacity disabled={isLoading} onPress={() => handleSave()}>
                            <Text style={[tw`text-lg font-medium text-white`]}>Save</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[tw`p-5 pb-0 flex-1 rounded-t-[40px]`, { backgroundColor: colors.white }]}>
                        {
                            isLoading ? <ActivityLoader />
                                :
                                <ScrollView style={tw`py-8`}>
                                    <View style={tw`items-center gap-5 w-full px-2`}>
                                        <TouchableOpacity onPress={handleImage} style={tw`w-32 h-32 border border-gray-100 rounded-xl bg-white items-center justify-center`}>
                                            {
                                                loading ?
                                                    <ActivityIndicator size={30} color={colors.purple} />
                                                    :
                                                    <Image style={tw`h-full w-full rounded-xl bg-white`} resizeMode='cover' source={{ uri: userData ? `https://mine-blob-storage.s3.us-east-2.amazonaws.com/${userData?.profileImage}` : 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' }} />
                                            }
                                        </TouchableOpacity>
                                        <View style={tw`w-full`}>
                                            <Text style={[tw`text-lg mb-1 font-medium`, { color: colors.black }]}>Name</Text>
                                            <TextInput style={tw`w-full bg-white rounded-lg px-4 shadow-lg shadow-gray-100 text-gray-800`} value={userData?.fullName} onChangeText={(txt) => setUserData({ ...userData, fullName: txt })} />
                                        </View>
                                        <View style={tw`w-full`}>
                                            <Text style={[tw`text-lg mb-1 font-medium`, { color: colors.black }]}>Bio</Text>
                                            <TextInput multiline={true} numberOfLines={10} textAlignVertical='top' style={tw`w-full bg-white rounded-lg px-4 shadow-lg shadow-gray-100 text-gray-800`} value={userData?.bio} onChangeText={(txt) => setUserData({ ...userData, bio: txt })} />
                                        </View>

                                        <View style={tw`w-full`}>
                                            <Text style={[tw`text-lg mb-1 font-medium`, { color: colors.black }]}>Date Of Birth</Text>
                                            <TouchableOpacity
                                                onPress={showDatePicker}
                                                style={[
                                                    tw`border border-gray-50 p-2 rounded-lg mt-1 bg-white`,
                                                ]}>
                                                <Text
                                                    style={[tw` text-base text-center text-lg`, { color: colors.black }]}>
                                                    {userData?.dob ? moment(userData?.dob)?.format('DD MMM YYYY') : 'Select Date'}
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={tw`w-full`}>
                                            <Text style={[tw`text-lg mb-1 font-medium`, { color: colors.black }]}>Profession</Text>
                                            <TouchableOpacity
                                                onPress={() => setModalVisible('profession')}
                                                style={[
                                                    tw`border border-gray-50 p-2 rounded-lg mt-1 bg-white`,
                                                ]}>
                                                <Text
                                                    style={[tw` text-base text-center text-lg capitalize`, { color: colors.black }]}>
                                                    {userData?.profession || 'Select Profession'}
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={tw`w-full`}>
                                            <Text style={[tw`text-lg mb-1 font-medium`, { color: colors.black }]}>Religion</Text>
                                            <TouchableOpacity
                                                onPress={() => setModalVisible('religion')}
                                                style={[
                                                    tw`border border-gray-50 p-2 rounded-lg mt-1 bg-white`,
                                                ]}>
                                                <Text
                                                    style={[tw` text-base text-center text-lg capitalize`, { color: colors.black }]}>
                                                    {userData?.religion || 'Select Religion'}
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={tw`w-full`}>
                                            <Text style={[tw`text-lg mb-1 font-medium`, { color: colors.black }]}>Would like to date</Text>

                                            <View style={tw`flex-row items-center justify-start gap-5 my-2`}>
                                                <TouchableOpacity
                                                    onPress={() => handleGenderInterestedSelection('MALE')}
                                                    style={tw`w-20 h-20 ${userData?.genderInterest == 'MALE' ? 'opacity-100' : 'opacity-50'
                                                        }`}>
                                                    <Image
                                                        style={tw`w-full h-full`}
                                                        resizeMode="contain"
                                                        source={{
                                                            uri: 'https://cdn-icons-png.flaticon.com/512/4139/4139981.png',
                                                        }}
                                                    />
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    onPress={() => handleGenderInterestedSelection('FEMALE')}
                                                    style={tw`w-20 h-20 ${userData?.genderInterest == 'FEMALE' ? 'opacity-100' : 'opacity-50'
                                                        }`}>
                                                    <Image
                                                        style={tw`w-full h-full`}
                                                        resizeMode="contain"
                                                        source={{
                                                            uri: 'https://cdn-icons-png.flaticon.com/512/4140/4140060.png',
                                                        }}
                                                    />
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    onPress={() => handleGenderInterestedSelection('EVERYONE')}
                                                    style={tw`w-20 h-20 ${userData?.genderInterest == 'EVERYONE' ? 'opacity-100' : 'opacity-50'
                                                        }`}>
                                                    <Image
                                                        style={tw`w-full h-full`}
                                                        resizeMode="contain"
                                                        source={{
                                                            uri: 'https://cdn-icons-png.flaticon.com/512/3778/3778360.png',
                                                        }}
                                                    />
                                                </TouchableOpacity>
                                            </View>
                                        </View>

                                        <View style={tw`w-full`}>
                                            <View style={tw`flex-row items-center gap-2`}>
                                                <Text style={[tw`text-lg mb-1 font-medium`, { color: colors.black }]}>Your Interests</Text>
                                                <TouchableOpacity onPress={() => openBottomSheet('interest')}>
                                                    <Text style={[tw``, { color: colors.purple }]}>Edit</Text>
                                                </TouchableOpacity>
                                            </View>
                                            <View style={tw`flex-row items-center flex-wrap gap-2 py-2`}>
                                                {
                                                    userData?.interest.map((interest, i) => <Interest key={i} interest={interest} />)
                                                }
                                            </View>
                                        </View>
                                        <View style={tw`w-full`}>
                                            <View style={tw`flex-row items-center gap-2`}>
                                                <Text style={[tw`text-lg mb-1 font-medium`, { color: colors.black }]}>Your Non Interests</Text>
                                                <TouchableOpacity onPress={() => openBottomSheet('nonInterest')}>
                                                    <Text style={[tw``, { color: colors.purple }]}>Edit</Text>
                                                </TouchableOpacity>
                                            </View>
                                            <View style={tw`flex-row items-center flex-wrap gap-2 py-2`}>
                                                {
                                                    userData?.notInterest.map((interest, i) => <Interest key={i} interest={interest} />)
                                                }
                                            </View>
                                        </View>

                                    </View>
                                    <View style={tw`h-32 w-full`}></View>
                                </ScrollView>
                        }
                        <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(255,255,255,1)']} style={tw`absolute left-0 bottom-0 right-0 h-20`} />
                    </View>
                </LinearGradient>

                {sheet ? <Pressable onPress={() => closeBottomSheet()} style={[tw`absolute inset-0`, { backgroundColor: 'rgba(119,44,232,0.1)' }]}></Pressable> : <></>}
                <BottomSheetModal
                    enablePanDownToClose={true}
                    ref={bottomSheetModalRef}
                    index={1}
                    snapPoints={snapPoints}
                    enableDismissOnClose={true}
                    onDismiss={() => { closeBottomSheet() }}
                    closeOnDragDown={true}
                    backdropPressToClose={true}
                    backgroundStyle={{ backgroundColor: colors.white }}
                    style={[tw``]}
                >
                    <View style={tw`p-5`}>
                        <ScrollView>
                            <View style={tw`flex-row gap-2 items-center flex-wrap py-2`}>
                                {
                                    Array(10).fill(1).map((interest, i) => <Interest key={i} interest={interest} />)
                                }
                            </View>
                            <View style={tw`h-32 w-full`}></View>
                        </ScrollView>
                    </View>
                    <View style={tw`absolute bottom-0 w-full bg-white p-5`}>
                        <PrimaryButton text={'Close'} textClass='text-lg' onPress={closeBottomSheet} />
                    </View>
                </BottomSheetModal>
            </BottomSheetModalProvider>

            {showPicker && (
                <DateTimePicker
                    value={moment(userData?.dob)}
                    maximumDate={new Date(moment().subtract(16, 'years'))}
                    mode="date"
                    display="default"
                    onChange={handleDateChange}
                />
            )}

            {modalVisible ? (
                <View
                    style={tw`flex-1 flex-row items-center justify-center rounded-lg px-5 py-32 absolute inset-0`}>
                    <Blur50 onPress={() => setModalVisible('')} />
                    <View
                        nativeID=" jyg"
                        style={tw`bg-gray-50 p-5 rounded-lg w-full h-96 relative`}>
                        <TouchableOpacity onPress={() => setModalVisible('')}>
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
                            data={modalVisible == 'religion' ? religions : modalVisible == 'profession' ? professions : []}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    onPress={() => handleModal(item)}
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
    )
}

export default EditProfile


const Interest = ({ interest }) => (
    <TouchableOpacity
        style={[
            tw`w-auto py-2 px-4 rounded-full`,
            {
                backgroundColor: colors.purple,
            },
        ]}
    >
        <Text
            style={tw`text-white`}>
            {interest}
        </Text>
    </TouchableOpacity>
)