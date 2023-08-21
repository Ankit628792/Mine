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
        onSwipedLeft={() => onSwipeLeft(cards[currentIndex])}
        onSwipedRight={() => onSwipeRight(cards[currentIndex])}
        onSwipedTop={() => onSwipeUp(cards[currentIndex])}
        disableBottomSwipe
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
              <View style={[tw`absolute top-0 right-0 rounded-xl bg-red-600 bg-opacity-50  items-center justify-center h-full w-full`, { height: windowHeight - 280 }]}>
                <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style={tw`text-white w-20 h-20`}>
                  <Path d="M15.73 5.25h1.035A7.465 7.465 0 0118 9.375a7.465 7.465 0 01-1.235 4.125h-.148c-.806 0-1.534.446-2.031 1.08a9.04 9.04 0 01-2.861 2.4c-.723.384-1.35.956-1.653 1.715a4.498 4.498 0 00-.322 1.672V21a.75.75 0 01-.75.75 2.25 2.25 0 01-2.25-2.25c0-1.152.26-2.243.723-3.218C7.74 15.724 7.366 15 6.748 15H3.622c-1.026 0-1.945-.694-2.054-1.715A12.134 12.134 0 011.5 12c0-2.848.992-5.464 2.649-7.521.388-.482.987-.729 1.605-.729H9.77a4.5 4.5 0 011.423.23l3.114 1.04a4.5 4.5 0 001.423.23zM21.669 13.773c.536-1.362.831-2.845.831-4.398 0-1.22-.182-2.398-.52-3.507-.26-.85-1.084-1.368-1.973-1.368H19.1c-.445 0-.72.498-.523.898.591 1.2.924 2.55.924 3.977a8.959 8.959 0 01-1.302 4.666c-.245.403.028.959.5.959h1.053c.832 0 1.612-.453 1.918-1.227z" />
                </Svg>
              </View>
          },
          right: {
            element:
              <View style={[tw`absolute top-0 left-0 rounded-xl bg-blue-600 bg-opacity-50  items-center justify-center h-full w-full`, { height: windowHeight - 280 }]}>
                <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style={tw`text-white w-20 h-20`}>
                  <Path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                </Svg>
              </View>
          }

        }}
        backgroundColor={colors.bg}
      />
      <View style={tw`absolute bottom-20 flex-row items-center justify-evenly w-full`}>
        <TouchableOpacity onPress={() => swiperRef.current.swipeLeft()} style={tw`w-14 h-14 rounded-full bg-white shadow-md items-center justify-center`}>
          <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style={tw`w-8 h-8 text-sky-500`}>
            <Path d="M15.73 5.25h1.035A7.465 7.465 0 0118 9.375a7.465 7.465 0 01-1.235 4.125h-.148c-.806 0-1.534.446-2.031 1.08a9.04 9.04 0 01-2.861 2.4c-.723.384-1.35.956-1.653 1.715a4.498 4.498 0 00-.322 1.672V21a.75.75 0 01-.75.75 2.25 2.25 0 01-2.25-2.25c0-1.152.26-2.243.723-3.218C7.74 15.724 7.366 15 6.748 15H3.622c-1.026 0-1.945-.694-2.054-1.715A12.134 12.134 0 011.5 12c0-2.848.992-5.464 2.649-7.521.388-.482.987-.729 1.605-.729H9.77a4.5 4.5 0 011.423.23l3.114 1.04a4.5 4.5 0 001.423.23zM21.669 13.773c.536-1.362.831-2.845.831-4.398 0-1.22-.182-2.398-.52-3.507-.26-.85-1.084-1.368-1.973-1.368H19.1c-.445 0-.72.498-.523.898.591 1.2.924 2.55.924 3.977a8.959 8.959 0 01-1.302 4.666c-.245.403.028.959.5.959h1.053c.832 0 1.612-.453 1.918-1.227z" />
          </Svg>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => swiperRef.current.swipeRight()} style={tw`w-14 h-14 rounded-full bg-white shadow-md items-center justify-center`}>
          <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style={tw`w-8 h-8 text-rose-500`}>
            <Path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
          </Svg>

        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  overlayLabelLeft: {
    label: {
      color: 'red',
    },
    wrapper: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
  overlayLabelRight: {
    label: {
      color: 'blue',
    },
    wrapper: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
});

export default SwipeableProfile;
