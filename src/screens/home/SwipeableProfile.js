import React, { useState } from 'react';
import Swiper from 'react-native-deck-swiper';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CardComponent from './CardComponent';
import SwipeService from '../../services/swipe.service';
import { colors } from '../../utils/colors';
import tw from 'twrnc'
import { Path, Svg } from 'react-native-svg';
import { Dimensions } from 'react-native';


const windowHeight = Dimensions.get('window').height;
const swiperRef = React.createRef()

const SwipeableProfile = ({ cards }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const onSwipeLeft = card => {
    setCurrentIndex(currentIndex + 1);
    SwipeService.leftSwipe(card);
  };

  const onSwipeRight = card => {
    setCurrentIndex(currentIndex + 1);
    SwipeService.rightSwipe(card);
  };

  const onSwipeDown = card => {
    console.log('onSwipeDown');
  };

  const onSwipeUp = card => {
    // open the bottom
  };

  const onSwipedAllCards = () => {
    console.log('onSwipedAllCards');
    SwipeService.fetchCards();
  };

  return (
    <>
      <Swiper
        ref={swiperRef}
        containerStyle={{
          marginTop: 10,
          borderRadius: 40
        }}
        onSwipedLeft={() => onSwipeLeft(cards[currentIndex])}
        onSwipedRight={() => onSwipeRight(cards[currentIndex])}
        onSwipedTop={() => onSwipeUp(cards[currentIndex])}
        disableBottomSwipe={true}
        disableTopSwipe={true}
        cards={cards}
        cardVerticalMargin={20}
        renderCard={cardData => <CardComponent cardData={cardData} />}
        onSwipedAll={onSwipedAllCards}
        stackSize={5}
        stackSeparation={10}
        animateOverlayLabelsOpacity
        animateCardOpacity
        overlayLabels={{
          left: {
            element:
              <View style={[tw`absolute top-0 right-0 rounded-xl bg-red-600 bg-opacity-50 items-center justify-center w-full`, { height: windowHeight - 345 }]}>
                <Svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" style={tw`text-white w-20 h-20`}>
                  <Path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </Svg>
              </View>
          },
          right: {
            element:
              <View style={[tw`absolute top-0 left-0 rounded-xl bg-blue-600 bg-opacity-50 items-center justify-center w-full`, { height: windowHeight - 345 }]}>
                <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style={tw`text-white w-20 h-20`}>
                  <Path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                </Svg>
              </View>
          }

        }}
        backgroundColor={colors.white}
      />
      <View style={tw`absolute bottom-24 flex-row items-center justify-center gap-20 w-full`}>
        <TouchableOpacity onPress={() => swiperRef.current.swipeLeft()} style={tw`w-14 h-14 rounded-full bg-white shadow-lg shadow-gray-400 items-center justify-center`}>
          <Svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" style={tw`w-8 h-8 text-sky-500`}>
            <Path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </Svg>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => swiperRef.current.swipeRight()} style={tw`w-14 h-14 rounded-full bg-white shadow-lg shadow-gray-400 items-center justify-center`}>
          <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style={tw`w-8 h-8 text-rose-500`}>
            <Path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
          </Svg>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default SwipeableProfile;
