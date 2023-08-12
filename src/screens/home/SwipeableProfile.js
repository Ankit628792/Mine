import React, {useState} from 'react';
import Swiper from 'react-native-deck-swiper';
import {StyleSheet, Text, View, Image, Dimensions} from 'react-native';

const SwipeableProfile = ({profiles}) => {
  const [cards] = useState(profiles);
  const [count, setCount] = useState(0);
  const windowHeight = Dimensions.get('window').height;
  const cardHeight = windowHeight - 170;

  const renderCard = () => {
    const profile = cards[count];
    return (
      <View
        style={[styles.card, {height: cardHeight}]}
        key={profile.phoneNumber}>
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

  const onSwiped = name => {
    console.log(`on swiped ${name}`);
    setCount(count + 1);
  };

  const onSwipedAllCards = () => {
    console.log('All cards swiped');
  };

  return (
    <Swiper
      onSwipedLeft={() => onSwiped(profiles[0].fullName)}
      onSwipedRight={() => onSwiped(profiles[0].fullName)}
      onSwipedTop={() => onSwiped(profiles[0].fullName)}
      onSwipedBottom={() => onSwiped(profiles[0].fullName)}
      cards={cards}
      cardVerticalMargin={20}
      renderCard={renderCard}
      onSwipedAll={onSwipedAllCards}
      stackSize={3}
      stackSeparation={15}
      animateOverlayLabelsOpacity
      animateCardOpacity
      overlayLabels={{
        left: {title: 'NOPE', style: styles.overlayLabelLeft},
        right: {title: 'LIKED', style: styles.overlayLabelRight},
      }}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#E8E8E8',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    height: '80%',
    width: '100%',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    marginBottom: 10,
    padding: 20,
  },
  cardDetails: {
    position: 'absolute',
    width: '100%',
    padding: 15,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  fullName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#fff',
  },
  bio: {
    fontSize: 16,
    color: '#fff',
  },
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
