import React from 'react';
import {Button, View} from 'react-native';
import {setAuth} from '../../redux/user/user-slice';
import {useDispatch} from 'react-redux';
import {globalStyles} from '../../shared/global.styles';

const HomeScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(setAuth());
  };

  return (
    <View style={globalStyles.container}>
      <Button title="Log out" handleClick={() => handleLogout()} />
      <Button title="Open Sidebar" onPress={() => navigation.openDrawer()} />
    </View>
  );
};

export default HomeScreen;
