import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors, gradient } from '../../utils/colors';
import tw from 'twrnc';
import { useDispatch, useSelector } from 'react-redux';
import { Path, Svg } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import { selectFilter, selectUser, setProfileFilter } from '../../redux/user/user-slice';
import { useQuery } from 'react-query';
import { UserService } from '../../services/user.service';
import { SwipeService } from '../../services/swipe.service';
import Swiper from 'react-native-deck-swiper';
import CardComponent from '../../components/CardComponent';
import { useProfileAction } from '../../hooks';
import ActivityLoader from '../../components/ActivityLoader';

const windowHeight = Dimensions.get('window').height;
const swipeRef = React.createRef()

const Home = () => {
  const filter = useSelector(selectFilter);
  const user = useSelector(selectUser);
  const navigator = useNavigation();
  const dispatch = useDispatch();
  const [page, setPage] = useState(0)
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true)

  const { data, refetch, isLoading: isFetching } = useQuery('fetchAllProfiles', () => SwipeService.fetchAllProfiles(page), {
    retry: false,
    onSuccess: res => {
      if (res) {
        setCards(res)
      } else {
        console.log(res)
      }
      setLoading(false)
    }
  });

  useQuery('getFilters', UserService.getFilters, {
    retry: false,
    onSuccess: res => res?.data ? dispatch(setProfileFilter(res.data)) : {}
  })

  useEffect(() => {
    refetch();
  }, [filter, page])

  const { mutate: profileAction } = useProfileAction((data) => {
    if (data?.isMatch) {
      navigator.navigate("Match", {
        sender: { name: user?.username, image: user?.profileImage },
        receiver: { name: data?.name, image: data?.profilePic, id: data?.userId },
        chatId: data?.chatId
      })
    }
  })

  const onSwipeLeft = i => {

  };

  const onSwipeRight = i => {
    profileAction({
      action: "LIKED",
      receiverId: cards[i]?.userId
    })
  };

  const onSwipeUp = i => {
    navigator.navigate('ViewProfile', { ...cards[i], id: cards[i]?.userId, from: 'home' });
    swipeRef.current.swipeBack()
  };
  const onTapCard = i => {
    navigator.navigate('ViewProfile', { ...cards[i], id: cards[i]?.userId, from: 'home' });
  };

  const onSwipedAllCards = () => {
    setLoading(true);
    setPage(page + 1);
    setCards([]);
  };

  return (
    <LinearGradient
      style={tw`flex-1 flex-col justify-between relative`}
      colors={gradient.purple}>
      <View style={tw`py-3 pb-5 px-5 flex-row items-center justify-between`}>
        <Text style={tw`text-2xl font-semibold text-white`}>Hi, {user?.username}</Text>
        <TouchableOpacity onPress={() => navigator.navigate("Filter", { filter })} style={tw`p-2 bg-white rounded-xl`}>
          <Svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={tw`w-7 h-7 text-gray-800`}>
            <Path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
          </Svg>
        </TouchableOpacity>
      </View>
      <View style={[tw`flex-1 rounded-t-[40px] relative`, { backgroundColor: colors.white }]}>
        {
          (isFetching || loading) ?
            <ActivityLoader image={require('../../assets/images/search.png')} />
            :
            cards?.length ?
              <>
                <Swiper
                  ref={swipeRef}
                  containerStyle={{
                    marginTop: 10,
                    borderRadius: 40,
                    backgroundColor: 'transparent',
                    height: windowHeight - 180

                  }}
                  onSwipedLeft={onSwipeLeft}
                  onSwipedRight={onSwipeRight}
                  onSwipedTop={onSwipeUp}
                  // onTapCard={onTapCard}
                  swipeBackCard={true}
                  disableBottomSwipe={true}
                  cards={cards}
                  cardVerticalMargin={20}
                  renderCard={cardData => cardData ? <CardComponent cardData={cardData} /> : <></>}
                  onSwipedAll={onSwipedAllCards}
                  stackSize={3}
                  stackSeparation={0}
                  animateOverlayLabelsOpacity
                  animateCardOpacity
                  verticalThreshold={40}
                  overlayLabels={{
                    top: {
                      element:
                        <View style={[tw`absolute top-2 left-2 right-5 bottom-0 rounded-3xl items-center justify-center w-full`, { height: windowHeight - 225 }]}>
                          <Svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" style={tw`text-white w-20 h-20`}>
                            <Path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l7.5-7.5 7.5 7.5m-15 6l7.5-7.5 7.5 7.5" />
                          </Svg>
                        </View>
                    },
                    left: {
                      element:
                        <View style={[tw`absolute top-2 right-2 rounded-3xl bg-rose-600 bg-opacity-70 items-center justify-center w-full`, { height: windowHeight - 225 }]}>
                          <Svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" style={tw`text-white w-20 h-20`}>
                            <Path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </Svg>
                        </View>
                    },
                    right: {
                      element:
                        <View style={[tw`absolute top-2 left-2 rounded-3xl bg-sky-600 bg-opacity-70 items-center justify-center w-full`, { height: windowHeight - 225 }]}>
                          <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style={tw`text-white w-20 h-20`}>
                            <Path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                          </Svg>
                        </View>
                    }

                  }}
                  backgroundColor={colors.white}
                />
                <View style={tw`absolute bottom-24 flex-row items-center justify-center gap-10 w-full`}>
                  <TouchableOpacity onPress={() => swipeRef.current.swipeLeft()} style={tw`w-14 h-14 rounded-full bg-white shadow-lg shadow-gray-400 items-center justify-center`}>
                    <Svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" style={tw`w-8 h-8 text-sky-500`}>
                      <Path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </Svg>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => { swipeRef.current.swipeTop() }} style={tw`w-14 h-14 rounded-full bg-white shadow-lg shadow-gray-400 items-center justify-center`}>
                    <Svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" style={[tw`w-8 h-8`, { color: colors.purple }]}>
                      <Path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l7.5-7.5 7.5 7.5m-15 6l7.5-7.5 7.5 7.5" />
                    </Svg>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => swipeRef.current.swipeRight()} style={tw`w-14 h-14 rounded-full bg-white shadow-lg shadow-gray-400 items-center justify-center`}>
                    <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style={tw`w-8 h-8 text-rose-500`}>
                      <Path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                    </Svg>
                  </TouchableOpacity>
                </View>
              </>
              :
              <View style={tw`flex-1 items-center justify-center`}>
                <Text style={[tw`text-xl`, { color: colors.gray }]}>No profile available to swipe</Text>
              </View>
        }
      </View>
    </LinearGradient>
  );
};


export default Home;
