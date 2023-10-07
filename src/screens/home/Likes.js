import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { colors, gradient } from '../../utils/colors'
import tw from 'twrnc'
import { Dimensions } from 'react-native'
import { ScrollView } from 'react-native'
import { Path, Svg } from 'react-native-svg'
import { useNavigation } from '@react-navigation/native'
import { useQuery } from 'react-query'
import { SwipeService } from '../../services/swipe.service'
import { useAcceptLike } from '../../hooks'
import ActivityLoader from '../../components/ActivityLoader'
import Blur50 from '../../components/Blue50'
import PrimaryButton from '../../components/PrimaryButton'
import moment from 'moment'

const Likes = () => {
  const navigator = useNavigation();
  const [popUp, setPopUp] = useState(false)
  const { data, isLoading } = useQuery('getAllLikes', SwipeService.getAllLikes, {
    retry: false,
    onSuccess: res => console.log(res)
  })

  const { mutate: handleLike, isLoading: updating } = useAcceptLike(() => { })

  const handleRequest = ({ type, id }) => {
    setPopUp({
      type,
      onClick: () => handleLike({
        acceptUserId: id,
        matchStatus: type?.toUpperCase()
      })
    })

  }

  return (
    <>
      <LinearGradient colors={gradient.purple} style={tw`flex-1`}>
        <View style={tw`p-5`}>
          <Text style={[tw`text-2xl font-semibold text-white text-center`]}>Your Likes</Text>
        </View>
        <View style={[tw`p-5 flex-1`, { borderRadius: 40, backgroundColor: colors.white }]}>
          {
            isLoading ? <ActivityLoader />
              :
              data?.length ?
                <ScrollView showsVerticalScrollIndicator={false} style={tw`pt-5`}>
                  <View style={tw`flex-row flex-wrap justify-center gap-4`}>
                    {
                      data?.map((item, i) => (<LikeCard item={item} navigator={navigator} handleRequest={handleRequest} key={i} />))
                    }
                  </View>
                  <View style={tw`h-32`}></View>
                </ScrollView>
                :
                <NoLike />
          }
        </View>
      </LinearGradient>
      {
        popUp ? (
          <View
            style={tw`flex-1 flex-row items-center justify-center px-5 py-32 absolute inset-0`}>
            <Blur50 onPress={() => setPopUp(false)} />
            <View
              style={tw`rounded-xl w-full relative items-center justify-center p-10 ${popUp.type == 'accept' ? 'bg-purple-50' : 'bg-rose-50'}`}>
              <Text style={[tw`text-xl text-center mt-5 mb-10`, { color: colors.gray }]}>Are you sure, you want to {popUp.type} the request?</Text>
              <View style={tw`flex-row justify-between gap-6 w-full`}>
                <TouchableOpacity onPress={() => setPopUp(false)} style={[tw`py-2 rounded-xl flex-grow bg-gray-800`]}>
                  <Text style={tw`text-lg text-white text-center`}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={popUp.onClick} style={[tw`py-2 rounded-xl flex-grow`, { backgroundColor: popUp.type == 'accept' ? colors.purple : colors.red }]}>
                  <Text style={tw`text-lg text-white text-center capitalize`}>{popUp.type}</Text>
                </TouchableOpacity>
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

export default Likes

export const LikeCard = ({ item, navigator, handleRequest }) => {

  return (
    <TouchableOpacity onPress={() => navigator.navigate('ViewProfile')} style={tw`flex-row py-3 px-4 bg-white rounded-2xl shadow-lg shadow-gray-300`}>
      <Image
        source={{
          uri: item?.profileImage,
        }}
        style={tw`w-14 h-14 rounded-full mr-3`}
      />
      <View style={[tw`relative flex-grow`, { width: Dimensions.get('window').width - 140 }]}>
        <Text style={[tw`text-xl font-medium`, { color: colors.black }]}>{item?.userName}</Text>
        <Text numberOfLines={1} style={[tw`text-sm`, { color: colors.gray, width: Dimensions.get('window').width - 180 }]}>Liked you {moment(item?.createdAt).fromNow()}</Text>
        <View style={tw`flex-row items-center gap-4 absolute top-4 right-2`}>
          <TouchableOpacity onPress={() => handleRequest({ type: 'reject', id: 'jjv' })}>
            <Svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" style={[tw`w-6 h-6`, { color: colors.red }]}>
              <Path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </Svg>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleRequest({ type: 'accept', id: 'fvghjb' })}>
            <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style={[tw`w-6 h-6`, { color: colors.purple }]}>
              <Path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
            </Svg>
          </TouchableOpacity>
        </View>

      </View>
    </TouchableOpacity>
  )
}


const NoLike = () => {
  return (
    <View style={tw`flex-1 items-center justify-center`}>
      <Image source={require('../../assets/images/heart.png')} style={tw`w-28 h-28`} />
      <Text style={[tw`text-xl mt-4`, { color: colors.gray }]}>No Likes Available</Text>
    </View>
  )
}