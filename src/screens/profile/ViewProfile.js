import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import tw from 'twrnc'
import moment from 'moment'
import { colors, gradient } from '../../utils/colors'
import { TouchableOpacity } from 'react-native'
import { ScrollView } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { Image } from 'react-native'
import { Dimensions } from 'react-native'
import { Path, Svg } from 'react-native-svg'
import BackButton from '../../components/BackButton'
import { useQuery } from 'react-query'
import { UserService } from '../../services/user.service'
import ActivityLoader from '../../components/ActivityLoader'
import { useAcceptLike, useProfileAction } from '../../hooks'
import { showToast } from '../../utils/FunctionHelper'
import { useSelector } from 'react-redux'
import { selectUser } from '../../redux/user/user-slice'
import { ActivityIndicator } from 'react-native'

const height = Dimensions.get('window').height

const ViewProfile = ({ navigation, route }) => {
    const user = useSelector(selectUser)
    const [profileData, setProfileData] = useState();
    const [loading, setLoading] = useState(true);

    const { refetch, isLoading } = useQuery('fetchProfileById', () => UserService.fetchProfileById(route.params?.id), {
        retry: false,
        enabled: false,
        onSuccess: res => { setProfileData(res.data); setLoading(false) }
    })

    const { mutate: profileAction, isLoading: sending } = useProfileAction((data) => {
        if (data?.isMatch) {
            navigator.navigate("Match", {
                sender: { name: user?.username, image: user?.profileImage },
                receiver: { name: data?.name, image: data?.profilePic, id: data?.userId, deviceToken: data?.deviceToken },
                chatId: data?.chatId
            })
        }
        else {
            navigation.pop();
        }
    })

    useEffect(() => {
        if (route.params?.fullName) {
            setProfileData(route.params);
            setLoading(false)
        }
        else {
            refetch()
        }
    }, [route.params])

    const { mutate: handleLike, isLoading: updating } = useAcceptLike(() => { navigation.pop() })

    const handleRequest = ({ type }) => {
        if (route.params?.from == 'likes') {
            handleLike({
                acceptUserId: route.params?.id,
                matchStatus: type?.toUpperCase()
            });
            showToast(type == 'accept' ? "Request Accepted!" : type == 'reject' ? "Request Rejected!" : '')
        }
        else if (route.params?.from == 'home') {
            if (type == 'reject') {
                navigation.pop();
            }
            else if (type == 'accept') {
                profileAction({
                    action: "LIKED",
                    receiverId: route.params?.id
                })
            }
        }
    }

    return (
        (loading || isLoading)
            ?
            <ActivityLoader image={require('../../assets/images/loading.png')} containerClass='bg-white' />
            :
            <>
                {(updating || sending) ? <View style={tw`absolute inset-0 bg-purple-500 bg-opacity-20 z-20 items-center justify-center`}>
                    <ActivityIndicator size={50} color={colors.purple} />
                </View> : <></>}
                <BackButton buttonClass='absolute top-5 left-5 z-10' />
                <View style={[tw`w-full absolute left-0 top-0 right-0`, { height: 400, backgroundColor: colors.purple }]}>
                    <Image source={{ uri: profileData?.images?.length ? profileData?.images[0]?.url : profileData?.profileImage ? profileData?.profileImage : 'https://w0.peakpx.com/wallpaper/470/485/HD-wallpaper-the-batman-robert-pattinson-the-batman-batman-superheroes-movies-2021-movies-robert-pattinson.jpg' }} style={tw`w-full h-full`} resizeMode='cover' />
                </View>
                <ScrollView style={tw`flex-1`} showsVerticalScrollIndicator={false}>
                    <View style={[tw`flex-1 bg-white pt-10 pb-5 px-7 rounded-t-[40px] gap-4 items-center`, { marginTop: 375 }]}>
                        {route.params?.from ? <View style={tw`absolute -top-8 flex-row items-center justify-center gap-20 w-full`}>
                            <TouchableOpacity disabled={updating} onPress={() => handleRequest({ type: 'reject' })} style={tw`w-14 h-14 rounded-full bg-white shadow-lg shadow-gray-400 items-center justify-center`}>
                                <Svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" style={tw`w-8 h-8 text-sky-500`}>
                                    <Path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </Svg>
                            </TouchableOpacity>
                            <TouchableOpacity disabled={updating} onPress={() => handleRequest({ type: 'accept' })} style={tw`w-14 h-14 rounded-full bg-white shadow-lg shadow-gray-400 items-center justify-center`}>
                                <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style={tw`w-8 h-8 text-rose-500`}>
                                    <Path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                                </Svg>
                            </TouchableOpacity>
                        </View> : <></>}
                        <View style={tw`w-full`}>
                            <Text style={[tw`text-2xl font-semibold`, { color: colors.black }]}>{profileData?.fullName}, {profileData?.age}</Text>
                            <View style={[tw`py-1 flex-row items-center gap-1`]}>
                                <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style={[tw`w-6 h-6`, { color: colors.purple }]}>
                                    <Path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                                </Svg>
                                <Text style={[tw`text-base font-medium tracking-tight`, { color: colors.purple }]}>{profileData?.distance} Km away</Text>
                            </View>
                        </View>
                        <View style={tw`w-full`}>
                            <Text style={[tw`text-xl font-medium`, { color: colors.black }]}>About</Text>
                            <Text style={[tw`text-base`, { color: colors.gray }]}>{profileData?.bio}</Text>
                        </View>
                        <View style={tw`w-full`}>
                            <Text style={[tw`text-xl font-medium`, { color: colors.black }]}>Date of Birth</Text>
                            <Text style={[tw`text-base`, { color: colors.gray }]}>{moment(profileData?.dob).format('DD MMM YYYY')}</Text>
                        </View>
                        <View style={tw`w-full`}>
                            <Text style={[tw`text-xl font-medium`, { color: colors.black }]}>Gender</Text>
                            <Text style={[tw`text-base`, { color: colors.gray }]}>{profileData?.gender}</Text>
                        </View>

                        <View style={tw`w-full`}>
                            <Text style={[tw`text-xl font-medium`, { color: colors.black }]}>Profession</Text>
                            <Text style={[tw`text-base capitalize`, { color: colors.gray }]}>{profileData?.profession}</Text>
                        </View>

                        <View style={tw`w-full`}>
                            <Text style={[tw`text-xl font-medium`, { color: colors.black }]}>Religion</Text>
                            <Text style={[tw`text-base capitalize`, { color: colors.gray }]}>{profileData?.religion}</Text>
                        </View>

                        <View style={tw`w-full`}>
                            <Text style={[tw`text-xl font-medium`, { color: colors.black }]}>Interested</Text>
                            <View style={tw`flex-row items-center flex-wrap gap-2 py-2`}>
                                {
                                    profileData?.interest?.map((interest, i) => <Interest key={i} interest={interest} color={colors.purple} />)
                                }
                            </View>
                        </View>
                        <View style={tw`w-full`}>
                            <Text style={[tw`text-xl font-medium`, { color: colors.black }]}>Not Interested</Text>
                            <View style={tw`flex-row items-center flex-wrap gap-2 py-2`}>
                                {
                                    profileData?.notInterest?.map((interest, i) => <Interest key={i} interest={interest} color={colors.red} />)
                                }
                            </View>
                        </View>
                        <View style={tw`h-20 w-full`}></View>
                    </View>
                </ScrollView>
            </>
    )
}

export default ViewProfile

const Interest = ({ interest, color }) => (
    <TouchableOpacity style={[tw`w-auto py-2 px-4 rounded-full`, { backgroundColor: color }]}>
        <Text style={[{ color: colors.white, textTransform: 'capitalize' }]}>
            {interest}
        </Text>
    </TouchableOpacity>
)