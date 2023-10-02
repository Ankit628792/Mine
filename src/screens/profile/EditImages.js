import { Dimensions, Text, View, Image } from 'react-native'
import React, { useState } from 'react'
import { ScrollView } from 'react-native'
import tw from 'twrnc'
import { colors, gradient } from '../../utils/colors'
import { TouchableOpacity } from 'react-native'
import ImageSelector from '../../components/ImageSelector'
import { Path, Svg } from 'react-native-svg'
import PrimaryButton from '../../components/PrimaryButton'
import Blur50 from '../../components/Blue50'
import LinearGradient from 'react-native-linear-gradient'
import BackButton from '../../components/BackButton'
import { UserService } from '../../services/user.service'
import { useQuery } from 'react-query'
import { ActivityIndicator } from 'react-native'

const cardWidth = (Dimensions.get('window').width - 90) / 3

const EditImages = ({ navigation }) => {
    const [popUp, setPopUp] = useState({ open: false });
    const [loading, setLoading] = useState(false);

    const { data, isLoading } = useQuery('getImages', UserService.getImages, {
        retry: false,
        onSuccess: res => console.log(res)
    })
    const userData = data?.data

    const [images, setImages] = useState([
        { id: 1, image: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' },
        { id: 2, image: 'https://cdn-icons-png.flaticon.com/512/2202/2202112.png' },
        { id: 3, image: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' },
    ])

    const handleImage = async () => {
        try {
            const image = await ImageSelector('multiple');
            if (image) {
                // upload image and set url to images
            }
        } catch (error) {
            console.error('handleImage -> Error:', error);
        }
    };

    const editImage = async (image) => {
        await handleImage();
        setPopUp({ open: false })
    }
    const deleteImage = async (image) => {
        console.log('delete image')
        /// delete image
        setPopUp({ open: false })
    }


    return (
        <>
            <LinearGradient colors={gradient.purple} style={tw`flex-1`}>
                <View style={tw`p-5 flex-row items-center justify-between`}>
                    <BackButton />
                    <Text style={[tw`text-2xl font-semibold text-white text-center`]}>Edit Pictures</Text>
                    <BackButton disabled={true} buttonClass='opacity-0' />
                </View>
                <View style={[tw`p-5 flex-1 rounded-t-[40px]`, { backgroundColor: colors.white }]}>
                    {loading ? <View style={tw`absolute inset-0 bg-purple-500 bg-opacity-20 z-20 items-center justify-center`}>
                        <ActivityIndicator size={50} color={colors.purple} />
                    </View> : <></>}
                    <ScrollView style={tw`px-1 py-5`}>
                        <View style={tw`flex-row flex-wrap items-center justify-evenly gap-y-6`}>
                            {
                                images.map((image, i) => <View style={[tw`h-34 bg-white border border-gray-100 rounded-lg items-center justify-center`, { width: cardWidth - 2 }]} key={i}>
                                    <Image source={{ uri: image.image }} resizeMode='cover' style={tw`w-full h-full`} />
                                    <TouchableOpacity onPress={() => setPopUp({ open: true, type: 'delete', onClick: () => deleteImage(image) })} style={tw`p-1 bg-white rounded-full absolute -bottom-2 -left-2 w-7 h-7 items-center justify-center`}>
                                        <Svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={tw`w-5 h-5 text-rose-500`}>
                                            <Path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                        </Svg>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => setPopUp({ open: true, type: 'edit', onClick: () => editImage(image) })} style={tw`p-1 bg-white rounded-full absolute -bottom-2 -right-2 w-7 h-7 items-center justify-center`}>
                                        <Svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={tw`w-5 h-5 text-sky-500`}>
                                            <Path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                                        </Svg>
                                    </TouchableOpacity>
                                </View>)
                            }

                            {
                                Array(6 - images.length).fill(1).map((item, i) => (
                                    <TouchableOpacity key={i} onPress={() => handleImage()} style={[tw`h-34 bg-white border border-gray-100 rounded-lg items-center justify-center mt-5`, { width: cardWidth }]}>
                                        <Text
                                            style={[tw`text-5xl font-extralight`, { color: colors.purple }]}>
                                            +
                                        </Text>
                                    </TouchableOpacity>
                                ))
                            }
                        </View>
                    </ScrollView>
                    <PrimaryButton text={'Back'} textClass='text-lg' onPress={() => navigation.pop()} />
                </View>
            </LinearGradient >
            {
                popUp.open ? (
                    <View
                        style={tw`flex-1 flex-row items-center justify-center rounded-lg px-5 py-32 absolute inset-0`}>
                        <Blur50 onPress={() => setPopUp({ open: false })} />
                        <View
                            nativeID=" jyg"
                            style={tw`bg-gray-50 p-5 rounded-lg w-full relative`}>
                            <TouchableOpacity onPress={() => setPopUp({ open: false })}>
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
                            <View style={tw`items-center justify-center p-5`}>
                                {
                                    popUp.type == 'delete'
                                        ?
                                        <>
                                            <Text style={[tw`text-xl text-center mb-10`, { color: colors.gray }]}>Are you sure, you want remove the image?</Text>
                                            <PrimaryButton textClass='text-lg' text={'Delete'} onPress={popUp.onClick} />
                                        </>
                                        :
                                        popUp.type == 'edit'
                                            ?
                                            <>
                                                <Text style={[tw`text-xl text-center mb-10`, { color: colors.gray }]}>Uplaod new image</Text>
                                                <PrimaryButton textClass='text-lg' text={'Upload'} onPress={popUp.onClick} />
                                            </>
                                            :
                                            <></>
                                }
                            </View>

                        </View>
                    </View>
                ) : (
                    <></>
                )
            }
        </>
    )
}

export default EditImages