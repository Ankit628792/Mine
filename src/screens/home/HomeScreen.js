import React from 'react';
import HeroSection from '../../generic-components/hero-section/HeroSection';
import Button from '../../generic-components/buttons/Button';
import {View} from 'react-native';
import {setAuth} from '../../redux/user/user-slice';
import {useDispatch} from 'react-redux';
import {globalStyles} from '../../shared/global.styles';

const HomeScreen = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(setAuth());
  };

  return (
    <View style={globalStyles.container}>
      <HeroSection />
      <Button text="Log out" handleClick={() => handleLogout()} />
    </View>
  );
};

export default HomeScreen;
