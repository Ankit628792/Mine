import React, { useState } from 'react';
import Swiper from 'react-native-deck-swiper';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CardComponent from './CardComponent';
import SwipeService from '../../services/swipe.service';
import { colors } from '../../utils/colors';
import tw from 'twrnc'

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
        onSwipedLeft={() => onSwipeLeft(cards[currentIndex])}
        onSwipedRight={() => onSwipeRight(cards[currentIndex])}
        onSwipedTop={() => onSwipeUp(cards[currentIndex])}
        onSwipedBottom={() => onSwipeDown(cards[currentIndex])}
        cards={cards}
        cardVerticalMargin={20}
        renderCard={cardData => <CardComponent cardData={cardData} />}
        onSwipedAll={onSwipedAllCards}
        stackSize={5}
        stackSeparation={15}
        animateOverlayLabelsOpacity
        animateCardOpacity
        overlayLabels={{
          left: { title: 'NOPE', style: styles.overlayLabelLeft },
          right: { title: 'LIKED', style: styles.overlayLabelRight },
        }}
        backgroundColor={colors.bg}
      />
      <View style={tw`absolute bottom-20 flex-row items-center justify-evenly w-full`}>
        <TouchableOpacity style={tw`w-14 h-14 rounded-full bg-blue-500`}>
          <Text>Hello</Text>
        </TouchableOpacity>
        <TouchableOpacity style={tw`w-14 h-14 rounded-full bg-blue-500`}>
          <Text>Hello</Text>
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
