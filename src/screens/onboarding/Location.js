// import {View, Text, Dimensions} from 'react-native';
// import React, {useEffect, useState} from 'react';
// import tw from 'twrnc';
// import PrimaryButton from '../../components/PrimaryButton';
// import LinearGradient from 'react-native-linear-gradient';
// import {colors, gradient} from '../../utils/colors';
// import BackButton from '../../components/BackButton';
// import MultiSlider from '@ptomasroos/react-native-multi-slider';
// import RNLocation from 'react-native-location';
// import Bar from '../../components/Bar';

// const WIDTH = Dimensions.get('screen').width;

// RNLocation.configure({
//   distanceFilter: 1,
// });

// const Location = () => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [value, setValue] = useState(250);
//   const [userLocation, setUserLocation] = useState();
//   const [currentTime, setCurrentTime] = useState(Date.now());

//   const permissionHandle = async () => {
//     let location = '';
//     let permission = await RNLocation.checkPermission({
//       ios: 'whenInUse', // or 'always'
//       android: {
//         detail: 'coarse', // or 'fine'
//       },
//     });
//     // console.log('here', permission, new Date().toLocaleTimeString())

//     if (!permission) {
//       permission = await RNLocation.requestPermission({
//         ios: 'whenInUse',
//         android: {
//           detail: 'coarse',
//           rationale: {
//             title: 'We need to access your location',
//             message: 'We use your location to show where you are on the map',
//             buttonPositive: 'OK',
//             buttonNegative: 'Cancel',
//           },
//         },
//       });
//       location = await RNLocation.getLatestLocation({timeout: 1000});
//       setUserLocation(location);
//       setCurrentTime(Date.now());
//     } else {
//       location = await RNLocation.getLatestLocation({timeout: 1000});
//       setUserLocation(location);
//       setCurrentTime(Date.now());
//     }
//   };

//   useEffect(() => {
//     permissionHandle();
//   }, []);

//   useEffect(() => {
//     if (userLocation) {
//       // fetch city country etc
//     } else {
//       permissionHandle();
//     }
//   }, [userLocation, currentTime]);

//   setTimeout(() => !userLocation && permissionHandle(), 10000);

//   return (
//     <>
//       <Bar value={12} />
//       <LinearGradient
//         colors={gradient.orange}
//         style={tw`flex-1 p-5 flex-col justify-between`}>
//         <BackButton />
//         <View style={tw`flex-grow py-5`}>
//           <Text
//             style={[
//               tw`text-3xl font-medium text-center`,
//               {color: colors.black},
//             ]}>
//             Location Range
//           </Text>
//           <View style={tw`flex-1 justify-center items-stretch my-8 relative`}>
//             <MultiSlider
//               selectedStyle={{backgroundColor: '#78349880'}}
//               trackStyle={{height: 6, borderRadius: 10}}
//               unselectedStyle={{backgroundColor: '#78349833'}}
//               markerStyle={{
//                 backgroundColor: colors.blue,
//                 width: 20,
//                 height: 20,
//                 marginTop: 4,
//               }}
//               containerStyle={[tw`flex-row justify-center`]}
//               sliderLength={WIDTH > 360 ? 300 : 280}
//               min={0}
//               max={1000}
//               step={1}
//               allowOverlap
//               snapped
//               values={[value]}
//               customMarker={CustomMarker}
//               onValuesChangeFinish={value => setValue(value[0])}
//               animateTransitions={true}
//               animationType="spring"
//               animationConfig={{useNativeDriver: false}}
//             />
//           </View>
//         </View>
//         <PrimaryButton
//           text={'Continue'}
//           disabled={false}
//           isLoading={false}
//           onPress={() => {}}
//         />
//       </LinearGradient>
//     </>
//   );
// };

// export default Location;

// const CustomMarker = props => {
//   return (
//     <View style={tw`mt-8 z-20 w-24 flex-col items-center`}>
//       <View
//         style={[
//           tw`w-5 h-5 rounded-full`,
//           {backgroundColor: colors.blue},
//         ]}></View>
//       <Text style={tw`text-lg text-gray-900 mt-2 font-medium`}>
//         {props.currentValue}km
//       </Text>
//     </View>
//   );
// };


import { View, Text } from 'react-native'
import React from 'react'

const Location = () => {
  return (
    <View>
      <Text>Location</Text>
    </View>
  )
}

export default Location