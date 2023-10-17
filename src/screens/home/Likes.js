import { View, Text, Image } from 'react-native'
import React, { useEffect } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { colors, gradient } from '../../utils/colors'
import tw from 'twrnc'
import { ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useQuery } from 'react-query'
import { SwipeService } from '../../services/swipe.service'
import ActivityLoader from '../../components/ActivityLoader'
import LikeCard from '../../components/LikeCard'

const Likes = () => {
  const navigator = useNavigation();
  const { data: likeData, isLoading, refetch } = useQuery('getAllLikes', SwipeService.getAllLikes, {
    retry: false,
    enabled: false
    // onSuccess: res => console.log(res)
  })

  useEffect(() => { refetch() }, [])

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