import React from 'react';
import {useColorScheme} from 'react-native';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Intro from './screens/onboarding/Intro';
import Name from './screens/onboarding/Name';
import DOB from './screens/onboarding/DOB';
import Gender from './screens/onboarding/Gender';
import GenderInterested from './screens/onboarding/GenderInterested';
import Bio from './screens/onboarding/Bio';
import Religion from './screens/onboarding/Religion';
import Profession from './screens/onboarding/Profession';
import UserInterest from './screens/onboarding/UserInterest';
import UserNotInterest from './screens/onboarding/UserNotInterest';
import UploadImage from './screens/onboarding/UploadImage';
import ProfileImage from './screens/onboarding/ProfileImage';
import Location from './screens/onboarding/Location';
import PersonalChat from './screens/chat/PersonalChat';
import Login from './screens/auth/Login';
import VerifyOTP from './screens/auth/VerifyOTP';
import Profile from './screens/profile/Profile';
import {ROUTES} from './utils/routes';
// import HomeScreen from './screens/home/HomeScreen';
import NavigatorTab from './components/BottomTabs/NavigatorTab';
import LikedChats from './screens/chat/LikedChats';
import Filter from './screens/home/Filter';
import EditProfile from './screens/profile/EditProfile';
import Setting from './screens/settings/Setting';
import ViewProfile from './screens/profile/ViewProfile';
import Match from './screens/home/Match';

const Stack = createNativeStackNavigator();

const NavigationLayer = ({user}) => {
  const theme = useColorScheme();
  const initialRouteName = user
    ? ROUTES[(user?.onBoardingProcess || 0) - 1]?.name || 'Name'
    : 'Intro';

  return (
    <NavigationContainer theme={theme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack.Navigator
        initialRouteName={initialRouteName}
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Intro" component={Intro} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="VerifyOTP" component={VerifyOTP} />
        <Stack.Screen name="Name" component={Name} />
        <Stack.Screen name="DOB" component={DOB} />
        <Stack.Screen name="Gender" component={Gender} />
        <Stack.Screen name="GenderInterested" component={GenderInterested} />
        <Stack.Screen name="Bio" component={Bio} />
        <Stack.Screen name="Religion" component={Religion} />
        <Stack.Screen name="Profession" component={Profession} />
        <Stack.Screen name="UserInterest" component={UserInterest} />
        <Stack.Screen name="UserNotInterest" component={UserNotInterest} />
        <Stack.Screen name="UploadImage" component={UploadImage} />
        <Stack.Screen name="ProfileImage" component={ProfileImage} />
        <Stack.Screen name="Location" component={Location} />
        <Stack.Screen name="PersonalChat" component={PersonalChat} />
        <Stack.Screen name="LikedChat" component={LikedChats} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Filter" component={Filter} />
        <Stack.Screen name="Edit Profile" component={EditProfile} />
        <Stack.Screen name="ViewProfile" component={ViewProfile} />
        <Stack.Screen name="Match" component={Match} />
        <Stack.Screen name="Setting" component={Setting} />
        <Stack.Screen name="Main" component={NavigatorTab} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NavigationLayer;
