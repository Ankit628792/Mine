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
import MatchCard from '../../components/MatchCard'
import LikeCard from '../../components/LikeCard'

const Likes = () => {
  const navigator = useNavigation();
  const [popUp, setPopUp] = useState(false)
  const { data: likeData, isLoading } = useQuery('getAllLikes', SwipeService.getAllLikes, {
    retry: false,
    // onSuccess: res => console.log(res)
  })

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
              likeData?.data?.length ?
                <ScrollView showsVerticalScrollIndicator={false} style={tw`pt-5`}>
                  <View style={tw`flex-row flex-wrap justify-center gap-4`}>
                    {
                      likeData?.data?.map((item, i) => (<LikeCard item={item} navigator={navigator} key={i} />))
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


const NoLike = () => {
  return (
    <View style={tw`flex-1 items-center justify-center`}>
      <Image source={require('../../assets/images/heart.png')} style={tw`w-28 h-28`} />
      <Text style={[tw`text-xl mt-4`, { color: colors.gray }]}>No Likes Available</Text>
    </View>
  )
}