import { View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import React from 'react';
import tw from 'twrnc';
import { colors } from '../../utils/colors';
import PagerView from 'react-native-pager-view';
import { useNavigation } from '@react-navigation/native';

const height = Dimensions.get('window').height
const width = Dimensions.get('window').width
const Intro = () => {
  const navigator = useNavigation();
  const [currentPage, setCurrentPage] = React.useState(1);

  const handlePageChange = selectedPage => {
    setCurrentPage(selectedPage);
  };

  return (
    <>
      <View
        style={tw`flex-1`}>
        <PagerView
          style={{ flex: 1 }}
          initialPage={0}
          onPageSelected={event =>
            handlePageChange(event.nativeEvent.position)
          }>
          <View
            key="1"
            style={tw`flex-1 items-center justify-between bg-white`}>
            <View style={[tw`flex-grow rounded-b-full overflow-hidden`, { transform: [{ scaleX: 1 }], backgroundColor: colors.white, height: height - 300, width: 1000 }]}>
              <Image
                source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2508/2508651.png' }}
                style={[tw`mx-auto h-full mt-20`, { width: width - 50 }]}
                resizeMode='contain'
              />
            </View>
            <View style={[tw`w-full bg-white items-center justify-end px-10 pb-5`, { minHeight: 200 }]}>
              <Text style={[tw`text-3xl font-semibold text-center`, { color: colors.black }]}>
                Connect with your
              </Text>
              <Text style={[tw`text-3xl font-semibold text-center`, { color: colors.purple }]}>
                Ideal Matches
              </Text>
              <Text style={[tw`text-lg text-center mt-3`, { color: colors.gray }]}>
                Lorem ipsum dolor sit amet, consectetur adipisicing.
              </Text>
            </View>
          </View>

          <View
            key="2"
            style={tw`flex-1 items-center justify-between bg-white`}>
            <View style={[tw`flex-grow rounded-b-full overflow-hidden`, { transform: [{ scaleX: 1 }], backgroundColor: colors.white, height: height - 300, width: 1000 }]}>
              <Image
                source={{ uri: 'https://cdn-icons-png.flaticon.com/512/11728/11728513.png' }}
                style={[tw`mx-auto h-full mt-10`, { width: width - 50 }]}
                resizeMode='contain'
              />
            </View>
            <View style={[tw`w-full bg-white items-center justify-end px-10 pb-5`, { minHeight: 200 }]}>
              <Text style={[tw`text-3xl font-semibold text-center`, { color: colors.black }]}>
                Meet New People
              </Text>
              <Text style={[tw`text-3xl font-semibold text-center`, { color: colors.purple }]}>
                Nearby You
              </Text>
              <Text style={[tw`text-lg text-center mt-3`, { color: colors.gray }]}>
                Lorem ipsum dolor sit amet, consectetur adipisicing.
              </Text>
            </View>
          </View>

          <View
            key="3"
            style={tw`flex-1 items-center justify-between bg-white`}>
            <View style={[tw`flex-grow rounded-b-full overflow-hidden`, { transform: [{ scaleX: 1 }], backgroundColor: colors.white, height: height - 300, width: 1000 }]}>
              <Image
                source={{ uri: 'https://cdn-icons-png.flaticon.com/512/9770/9770584.png' }}
                style={[tw`mx-auto h-full mt-20`, { width: width - 50 }]}
                resizeMode='contain'
              />
            </View>
            <View style={[tw`w-full bg-white items-center justify-end px-10 pb-5`, { minHeight: 200 }]}>
              <Text style={[tw`text-3xl font-semibold text-center`, { color: colors.black }]}>
                Engage and Connect
              </Text>
              <Text style={[tw`text-3xl font-semibold text-center`, { color: colors.purple }]}>
                With your love
              </Text>
              <Text style={[tw`text-lg text-center mt-3`, { color: colors.gray }]}>
                Lorem ipsum dolor sit amet, consectetur adipisicing.
              </Text>
            </View>
          </View>
        </PagerView>
      </View>
      <View
        style={[tw`w-full p-5 flex-row items-center justify-between bg-white`, { height: 100 }]}>
        <View style={tw`flex-row items-center`}>
          {[...Array(3).fill(1).keys()].map(key => (
            <View
              key={key}
              style={[
                tw`w-2.5 h-2.5 mx-1 rounded-full`,
                { backgroundColor: key == currentPage ? colors.purple : colors.gray, opacity: 1 },
              ]}></View>
          ))}
        </View>
        <TouchableOpacity onPress={() => navigator.navigate('Login')}>
          <Text
            style={[
              tw`text-lg py-2 px-5 rounded-xl`,
              { color: colors.white, backgroundColor: colors.purple },
            ]}>
            Get Started
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Intro;
