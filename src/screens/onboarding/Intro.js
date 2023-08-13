import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import tw from 'twrnc';
import LinearGradient from 'react-native-linear-gradient';
import {colors, intro} from '../../utils/colors';
import PagerView from 'react-native-pager-view';
import {useNavigation} from '@react-navigation/native';

const Intro = () => {
  const navigator = useNavigation();
  const [currentPage, setCurrentPage] = React.useState(1);

  const handlePageChange = selectedPage => {
    setCurrentPage(selectedPage);
  };

  return (
    <>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        colors={intro.orange}
        style={tw`flex-1`}>
        <PagerView
          style={{flex: 1}}
          initialPage={0}
          onPageSelected={event =>
            handlePageChange(event.nativeEvent.position)
          }>
          <View
            key="1"
            style={tw`absolute bottom-20 left-0 right-0 w-full p-10`}>
            <Text style={[tw`text-4xl font-bold`, {color: colors.white}]}>
              Find Your
            </Text>
            <Text style={[tw`text-4xl font-bold`, {color: colors.white}]}>
              Someone Special
            </Text>
            <Text style={[tw`text-xl my-3`, {color: colors.white}]}>
              With our new exciting feature
            </Text>
            <Image
              source={require('../../assets/images/hero1.jpg')}
              style={{
                height: 100,
                width: 100,
                borderRadius: 20,
                position: 'absolute',
                top: 10,
                transform: [
                  {translateX: 20},
                  {translateY: 250},
                  {rotate: '-15deg'},
                ],
              }}
            />
            <Image
              source={require('../../assets/images/hero2.jpg')}
              style={{
                height: 100,
                width: 100,
                borderRadius: 20,
                position: 'absolute',
                top: -30,
                left: 100,
                transform: [
                  {translateX: 50},
                  {translateY: 250},
                  {rotate: '-5deg'},
                ],
              }}
            />
            <Image
              source={require('../../assets/images/hero3.jpg')}
              style={{
                width: 100,
                height: 100,
                borderRadius: 20,
                position: 'absolute',
                top: 130,
                left: -50,
                transform: [
                  {translateX: 50},
                  {translateY: 250},
                  {rotate: '15deg'},
                ],
              }}
            />
            <Image
              source={require('../../assets/images/hero2.jpg')}
              style={{
                height: 200,
                width: 200,
                borderRadius: 20,
                position: 'absolute',
                top: 110,
                left: 100,
                transform: [
                  {translateX: 50},
                  {translateY: 250},
                  {rotate: '-15deg'},
                ],
              }}
            />
          </View>
          <View
            key="2"
            style={tw`absolute bottom-20 left-0 right-0 w-full p-10`}>
            <Text style={[tw`text-4xl font-bold`, {color: colors.white}]}>
              More Profiles,
            </Text>
            <Text style={[tw`text-4xl font-bold`, {color: colors.white}]}>
              More Dates
            </Text>
            <Text style={[tw`text-xl my-3`, {color: colors.white}]}>
              Connecting you with more profiles
            </Text>
            <Image
              source={require('../../assets/images/hero1.jpg')}
              style={{
                height: 100,
                width: 100,
                borderRadius: 20,
                position: 'absolute',
                top: 10,
                transform: [
                  {translateX: 20},
                  {translateY: 250},
                  {rotate: '-15deg'},
                ],
              }}
            />
            <Image
              source={require('../../assets/images/hero2.jpg')}
              style={{
                height: 100,
                width: 100,
                borderRadius: 20,
                position: 'absolute',
                top: -30,
                left: 100,
                transform: [
                  {translateX: 50},
                  {translateY: 250},
                  {rotate: '-5deg'},
                ],
              }}
            />
            <Image
              source={require('../../assets/images/hero3.jpg')}
              style={{
                width: 100,
                height: 100,
                borderRadius: 20,
                position: 'absolute',
                top: 130,
                left: -50,
                transform: [
                  {translateX: 50},
                  {translateY: 250},
                  {rotate: '15deg'},
                ],
              }}
            />
            <Image
              source={require('../../assets/images/hero2.jpg')}
              style={{
                height: 200,
                width: 200,
                borderRadius: 20,
                position: 'absolute',
                top: 110,
                left: 100,
                transform: [
                  {translateX: 50},
                  {translateY: 250},
                  {rotate: '-15deg'},
                ],
              }}
            />
          </View>
          <View
            key="3"
            style={tw`absolute bottom-20 left-0 right-0 w-full p-10`}>
            <Text style={[tw`text-4xl font-bold`, {color: colors.white}]}>
              Interact Around
            </Text>
            <Text style={[tw`text-4xl font-bold`, {color: colors.white}]}>
              The World
            </Text>
            <Text style={[tw`text-xl my-3`, {color: colors.white}]}>
              Send direct message to your matches
            </Text>
            <Image
              source={require('../../assets/images/hero1.jpg')}
              style={{
                height: 100,
                width: 100,
                borderRadius: 20,
                position: 'absolute',
                top: 10,
                transform: [
                  {translateX: 20},
                  {translateY: 250},
                  {rotate: '-15deg'},
                ],
              }}
            />
            <Image
              source={require('../../assets/images/hero2.jpg')}
              style={{
                height: 100,
                width: 100,
                borderRadius: 20,
                position: 'absolute',
                top: -30,
                left: 100,
                transform: [
                  {translateX: 50},
                  {translateY: 250},
                  {rotate: '-5deg'},
                ],
              }}
            />
            <Image
              source={require('../../assets/images/hero3.jpg')}
              style={{
                width: 100,
                height: 100,
                borderRadius: 20,
                position: 'absolute',
                top: 130,
                left: -50,
                transform: [
                  {translateX: 50},
                  {translateY: 250},
                  {rotate: '15deg'},
                ],
              }}
            />
            <Image
              source={require('../../assets/images/hero2.jpg')}
              style={{
                height: 200,
                width: 200,
                borderRadius: 20,
                position: 'absolute',
                top: 110,
                left: 100,
                transform: [
                  {translateX: 50},
                  {translateY: 250},
                  {rotate: '-15deg'},
                ],
              }}
            />
          </View>
        </PagerView>
      </LinearGradient>
      <View
        style={tw`absolute bottom-0 left-0 right-0 w-full p-10 flex-row items-center justify-between`}>
        <View style={tw`flex-row items-center`}>
          {[...Array(3).fill(1).keys()].map(key => (
            <View
              key={key}
              style={[
                tw`w-2 h-2 mx-1 rounded-full`,
                {backgroundColor: colors.white, opacity: 1},
              ]}></View>
          ))}
        </View>
        <TouchableOpacity onPress={() => navigator.navigate('Login')}>
          <Text
            style={[
              tw`text-lg py-2 px-5 rounded-xl`,
              {color: colors.black, backgroundColor: colors.white},
            ]}>
            Get Started
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Intro;
