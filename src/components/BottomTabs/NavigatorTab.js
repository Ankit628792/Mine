import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import CustomBottomTab from './CustomButtonTab';
import Home from '../../screens/home/Home';
import Likes from '../../screens/home/Likes';
import Chat from '../../screens/home/Chat';
import Profile from '../../screens/profile/Profile';

const Tab = createBottomTabNavigator();

export default function NavigatorTab() {
  return (
    <Tab.Navigator tabBar={props => <CustomBottomTab {...props} />}>
      <Tab.Group screenOptions={{headerShown: false}}>
        <Tab.Screen
          options={{tabBarLabel: 'Home'}}
          name="Main"
          component={Home}
        />
        <Tab.Screen
          options={{tabBarLabel: 'Likes'}}
          name="Likes"
          component={Likes}
        />
        <Tab.Screen
          options={{tabBarLabel: 'Chat'}}
          name="Chat"
          component={Chat}
        />
        <Tab.Screen
          options={{tabBarLabel: 'Profile'}}
          name="Profile"
          component={Profile}
        />
      </Tab.Group>
    </Tab.Navigator>
  );
}
