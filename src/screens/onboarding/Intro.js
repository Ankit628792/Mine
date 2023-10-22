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
                source={require('../../assets/images/o1.png')}
                style={[tw`mx-auto h-full mt-28`, { width: width - 70 }]}
                resizeMode='contain'
              />
            </View>
            <View style={[tw`w-full bg-white items-center justify-end px-10 pb-5`, { minHeight: 200 }]}>
              <Text style={[tw`text-3xl font-semibold text-center`, { color: colors.black }]}>
                Discover the
              </Text>
              <Text style={[tw`text-3xl font-semibold text-center`, { color: colors.purple }]}>
                Magic of Love
              </Text>
              <Text style={[tw`text-lg text-center mt-3`, { color: colors.gray }]}>
                Find your perfect match by exploring the diverse community.
              </Text>
            </View>
          </View>

          <View
            key="2"
            style={tw`flex-1 items-center justify-between bg-white`}>
            <View style={[tw`flex-grow rounded-b-full overflow-hidden`, { transform: [{ scaleX: 1 }], backgroundColor: colors.white, height: height - 300, width: 1000 }]}>
              <Image
                source={require('../../assets/images/o2.png')}
                style={[tw`mx-auto h-full mt-14`, { width: width - 70 }]}
                resizeMode='contain'
              />
            </View>
            <View style={[tw`w-full bg-white items-center justify-end px-10 pb-5`, { minHeight: 200 }]}>
              <Text style={[tw`text-3xl font-semibold text-center`, { color: colors.black }]}>
                Connect with
              </Text>
              <Text style={[tw`text-3xl font-semibold text-center`, { color: colors.purple }]}>
                Like-minded People
              </Text>
              <Text style={[tw`text-lg text-center mt-3`, { color: colors.gray }]}>
                Connect with people having similar interests and values.
              </Text>
            </View>
          </View>

          <View
            key="3"
            style={tw`flex-1 items-center justify-between bg-white`}>
            <View style={[tw`flex-grow rounded-b-full overflow-hidden`, { transform: [{ scaleX: 1 }], backgroundColor: colors.white, height: height - 300, width: 1000 }]}>
              <Image
                source={require('../../assets/images/o3.png')}
                style={[tw`mx-auto h-full mt-14`, { width: width - 70 }]}
                resizeMode='contain'
              />
            </View>
            <View style={[tw`w-full bg-white items-center justify-end px-10 pb-5`, { minHeight: 200 }]}>
              <Text style={[tw`text-3xl font-semibold text-center`, { color: colors.black }]}>
                Meaningful
              </Text>
              <Text style={[tw`text-3xl font-semibold text-center`, { color: colors.purple }]}>
                Relationships
              </Text>
              <Text style={[tw`text-lg text-center mt-3`, { color: colors.gray }]}>
                Create lasting relationships with like-minded individuals.
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
            Skip & Continue
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Intro;
