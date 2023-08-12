import React, {useState} from 'react';
import Swiper from 'react-native-deck-swiper';
import {StyleSheet, Text, View, Image} from 'react-native';

const SwipeableProfile = ({profiles}) => {
  const [cards] = useState(profiles);

  const renderCard = () => {
    const profile = cards[0];
    return (
      <View style={styles.card} key={profile.phoneNumber}>
        <Image
          source={{uri: profile.profileImage}}
          style={styles.profileImage}
        />
        <View style={styles.cardDetails}>
          <Text style={styles.fullName}>{profile.fullName}</Text>
          <Text style={styles.bio}>{profile.bio}</Text>
        </View>
      </View>
    );
  };

  const onSwiped = type => {
    console.log(`on swiped ${type}`);
  };

  const onSwipedAllCards = () => {
    console.log('All cards swiped');
  };

  const swipeLeft = () => {
    swiperRef.current.swipeLeft();
  };

  return (
    <View style={styles.container}>
      <Swiper
        onSwiped={() => onSwiped('general')}
        onSwipedLeft={() => onSwiped('left')}
        onSwipedRight={() => onSwiped('right')}
        onSwipedTop={() => onSwiped('top')}
        onSwipedBottom={() => onSwiped('bottom')}
        onTapCard={swipeLeft}
        cards={cards}
        cardVerticalMargin={20}
        renderCard={renderCard}
        onSwipedAll={onSwipedAllCards}
        stackSize={3}
        stackSeparation={15}
        animateOverlayLabelsOpacity
        animateCardOpacity
        swipeBackCard
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    flex: 1,
    borderColor: '#E8E8E8',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  profileImage: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    marginBottom: 10,
    objectFit: 'cover',
  },
  cardDetails: {
    width: '100%',
    padding: 15,
    paddingBottom: 20,
  },
  fullName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  bio: {
    fontSize: 16,
  },
});

export default SwipeableProfile;
