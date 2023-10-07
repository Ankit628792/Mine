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

const windowHeight = Dimensions.get('window').height;
const swipeRef = React.createRef()

const Home = () => {
  const { cardsData: cards } = useSelector(state => state.cardsData);
  const filter = useSelector(selectFilter);
  const user = useSelector(selectUser);
  const navigator = useNavigation();
  const dispatch = useDispatch();
  const [page, setPage] = useState(0)
  const [currentIndex, setCurrentIndex] = useState(0);

  // const { data: cardsData, refetch, isLoading } = useQuery('fetchAllProfiles',() => SwipeService.fetchAllProfiles(page), {
  //   retry: false
  // })
  //  useQuery('getFilters', UserService.getFilters, {
  //   retry: false,
  //   onSuccess: res => dispatch(setProfileFilter(res.data))
  // })

  useEffect(() => {
    // refetch();
  }, [filter, page])

  const { mutate: profileAction } = useProfileAction(() => { })

  const onSwipeLeft = card => {
    setCurrentIndex(currentIndex + 1);
  };

  const onSwipeRight = card => {
    setCurrentIndex(currentIndex + 1);
    profileAction({
      action: "LIKED",
      receiverId: card.id
    })
  };

  const onSwipeUp = card => {
    navigator.navigate('ViewProfile', { id: card?.id });
    swipeRef.current.swipeBack()
  };

  const onSwipedAllCards = () => {
    console.log('onSwipedAllCards');
    setPage(0)
    // SwipeService.fetchCards();
  };

  return (
    <LinearGradient
      style={tw`flex-1 flex-col justify-between relative`}
      colors={gradient.purple}>
      <View style={tw`py-3 pb-5 px-5 flex-row items-center justify-between`}>
        <Text style={tw`text-2xl font-semibold text-white`}>Hi, {user?.username}</Text>
        <TouchableOpacity onPress={() => navigator.navigate("Filter")} style={tw`p-2 bg-white rounded-xl`}>
          <Svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={tw`w-7 h-7 text-gray-800`}>
            <Path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
          </Svg>
        </TouchableOpacity>
      </View>
      <View style={[tw`flex-1 rounded-t-[40px] relative`, { backgroundColor: colors.white }]}>
        <Swiper
          ref={swipeRef}
          containerStyle={{
            marginTop: 10,
            borderRadius: 40,
            backgroundColor: 'transparent',
            height: windowHeight - 240

          }}
          onSwipedLeft={() => onSwipeLeft(cards[currentIndex])}
          onSwipedRight={() => onSwipeRight(cards[currentIndex])}
          onSwipedTop={() => onSwipeUp(cards[currentIndex])}
          onTapCard={() => navigator.navigate('Match')}
          swipeBackCard={true}
          disableBottomSwipe={true}
          cards={cards}
          cardVerticalMargin={20}
          renderCard={cardData => <CardComponent cardData={cardData} />}
          onSwipedAll={onSwipedAllCards}
          stackSize={3}
          stackSeparation={12}
          animateOverlayLabelsOpacity
          animateCardOpacity
          verticalThreshold={40}
          overlayLabels={{
            left: {
              element:
                <View style={[tw`absolute top-2 right-2 rounded-3xl bg-rose-600 bg-opacity-60 items-center justify-center w-full`, { height: windowHeight - 325 }]}>
                  <Svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" style={tw`text-white w-20 h-20`}>
                    <Path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </Svg>
                </View>
            },
            right: {
              element:
                <View style={[tw`absolute top-2 left-2 rounded-3xl bg-sky-600 bg-opacity-60 items-center justify-center w-full`, { height: windowHeight - 325 }]}>
                  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style={tw`text-white w-20 h-20`}>
                    <Path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                  </Svg>
                </View>
            }

          }}
          backgroundColor={colors.white}
        />
        <View style={tw`absolute bottom-24 flex-row items-center justify-center gap-20 w-full`}>
          <TouchableOpacity onPress={() => swipeRef.current.swipeLeft()} style={tw`w-14 h-14 rounded-full bg-white shadow-lg shadow-gray-400 items-center justify-center`}>
            <Svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" style={tw`w-8 h-8 text-sky-500`}>
              <Path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </Svg>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => swipeRef.current.swipeRight()} style={tw`w-14 h-14 rounded-full bg-white shadow-lg shadow-gray-400 items-center justify-center`}>
            <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style={tw`w-8 h-8 text-rose-500`}>
              <Path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
            </Svg>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};


export default Home;
