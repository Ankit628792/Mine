import React, {useState} from 'react';
import Swiper from 'react-native-deck-swiper';
import {StyleSheet, Text, View} from 'react-native';
import CardComponent from './CardComponent';
import SwipeService from '../../services/swipe.service';

const SwipeableProfile = ({cards}) => {
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
    setCurrentIndex(currentIndex + 1);
    SwipeService.upSwipe(card);
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
          left: {title: 'NOPE', style: styles.overlayLabelLeft},
          right: {title: 'LIKED', style: styles.overlayLabelRight},
        }}
      />
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
