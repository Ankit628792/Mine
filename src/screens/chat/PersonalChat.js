import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  TextInput,
  FlatList,
  TouchableHighlight,
  ScrollView,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import tw from 'twrnc';
import LinearGradient from 'react-native-linear-gradient';
import {Path, Svg} from 'react-native-svg';
import {useState} from 'react';
import moment from 'moment';
import {useRef} from 'react';
import {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {gradient} from '../../utils/colors';

const ChatItem = React.memo(({item, mine, last, next}) => {
  const {image, message, createdAt} = item;
  return item?.last ? (
    <View style={tw`w-full h-5 mt-8`}></View>
  ) : (
    <TouchableHighlight
      activeOpacity={1}
      underlayColor="none"
      style={tw`${mine ? 'flex-row-reverse' : 'flex-row'} items-start ${
        last ? 'mt-0' : 'mt-8'
      }`}>
      <>
        <View
          style={[
            tw`w-11 h-11 rounded-full overflow-hidden shadow-md ${
              mine ? 'ml-2 bg-gray-100' : 'mr-2 bg-gray-800'
            } ${last ? 'opacity-0' : ''}`,
          ]}>
          <Image
            source={{uri: image}}
            resizeMode="cover"
            style={tw`w-full h-full`}
          />
        </View>
        <View
          style={[
            tw`relative`,
            {transform: [{translateX: 0}, {translateY: 10}]},
          ]}>
          <View
            style={tw`p-2 ${
              mine ? 'bg-gray-100 bg-opacity-15' : 'bg-gray-800 bg-opacity-75'
            } rounded-xl max-w-[240px] mb-1 ${
              mine ? 'rounded-tr-0' : 'rounded-tl-0'
            }`}>
            <Text numberOfLines={1000} style={tw`text-white`}>
              {message}
            </Text>
          </View>
          <Text
            style={tw`text-gray-200 absolute -bottom-4 z-20 w-[200px] text-xs ${
              mine ? 'text-right right-0' : 'text-left left-0'
            } ${next ? '' : 'hidden'}`}>
            {moment(createdAt).fromNow()}
          </Text>
        </View>
      </>
    </TouchableHighlight>
  );
});

// let tempMessage = []

const PersonalChat = ({route}) => {
  let receiver = route?.params?.receiver;
  let conversationId = route?.params?._id;
  const navigator = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

  const flatListRef = useRef(null);
  const user = {
    _id: '789',
    name: 'Ankit',
    image: 'https://cdn-icons-png.flaticon.com/512/1005/1005142.png',
  };
  const [text, setText] = useState('');
  const [messages, setMessages] = useState([
    {
      _id: Math.random()?.toString(),
      sender: '123456',
      receiver: '789',
      image: 'https://cdn-icons-png.flaticon.com/512/2202/2202112.png',
      message: 'Hi',
      createdAt: new Date().toISOString(),
    },
    {
      _id: Math.random()?.toString(),
      sender: '123456',
      receiver: '789',
      image: 'https://cdn-icons-png.flaticon.com/512/2202/2202112.png',
      message: 'How are you doing?',
      createdAt: new Date().toISOString(),
    },
  ]);

  useEffect(() => {
    if (conversationId) {
      // get messages
    }
  }, [conversationId]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        // setKeyboardShow(true);
        flatListRef.current?.scrollToEnd({animated: true});
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        // setKeyboardShow(false);
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, messages.length, isLoading]);

  const scrollToBottom = () => {
    flatListRef.current?.scrollToEnd({animated: true});
  };

  const handleSendMessage = async text => {
    if (text) {
      setMessages([
        ...messages,
        {
          _id: Math.random()?.toString(),
          sender: user?._id,
          receiver: receiver?._id,
          image: user?.image,
          message: text,
          createdAt: new Date().toISOString(),
        },
      ]);
      setText('');
    }
  };

  return (
    <>
      <LinearGradient
        style={tw`flex-1 p-5 relatives`}
        colors={gradient.orange}
        // colors={['#00d2ff', '#3a7bd5']}
      >
        <View
          style={tw`flex-row items-center justify-between relative z-20 pb-5`}>
          <TouchableOpacity onPress={() => navigator.goBack()}>
            <Text>Go Back</Text>
          </TouchableOpacity>
        </View>

        {isLoading ? (
          <View style={tw`flex-1 items-center justify-center`}>
            <ActivityIndicator size={50} color={'#FFF'} />
          </View>
        ) : messages?.length ? (
          <>
            <ScrollView showsVerticalScrollIndicator={false} ref={flatListRef}>
              {messages?.map((item, index) => (
                <ChatItem
                  key={index}
                  item={{
                    ...item,
                    image:
                      item?.sender == user?._id ? user?.image : receiver?.image,
                  }}
                  mine={item?.sender == user?._id}
                  last={messages[index - 1]?.sender == messages[index]?.sender}
                  next={messages[index + 1]?.sender != messages[index]?.sender}
                />
              ))}
              <View style={tw`w-full h-5 mt-8`}></View>
            </ScrollView>
            {/* <FlatList
                                    ref={flatListRef}
                                    onLayout={scrollToBottom}
                                    showsVerticalScrollIndicator={false}
                                    data={[...messages, { _id: 0, last: true }]}
                                    keyExtractor={(item) => item._id}
                                    renderItem={({ item, index }) => <ChatItem item={{ ...item, image: item?.sender == user?._id ? user?.image : receiver?.image }} mine={item?.sender == user?._id} last={messages[index - 1]?.sender == messages[index]?.sender} next={messages[index + 1]?.sender != messages[index]?.sender} />}
                                /> */}
          </>
        ) : (
          <View style={tw`flex-1 items-center justify-center`}>
            <Text style={tw`text-xl text-gray-50 text-center px-10`}>
              Initiate a Conversation
            </Text>
          </View>
        )}

        <View
          style={tw`bg-white rounded-full flex-row items-center justify-between px-2 mt-auto`}>
          <TextInput
            returnKeyType={text ? 'send' : 'none'}
            onSubmitEditing={({nativeEvent: {text}}) => handleSendMessage(text)}
            value={text}
            onChangeText={setText}
            style={tw`text-base text-gray-600 w-full ml-1 h-auto max-w-[${
              Dimensions.get('window').width - 110
            }px]`}
            placeholder="Type here..."
            placeholderTextColor="#999"
          />
          <TouchableOpacity
            disabled={!text?.length}
            style={tw`w-11 h-11 p-2 ${
              text?.length ? 'opacity-100' : 'opacity-0'
            }`}
            onPress={() => handleSendMessage(text)}>
            <Svg
              viewBox="0 0 24 24"
              fill="currentColor"
              style={tw`text-sky-500`}>
              <Path d="M5.521,19.9h5.322l3.519,3.515a2.035,2.035,0,0,0,1.443.6,2.1,2.1,0,0,0,.523-.067,2.026,2.026,0,0,0,1.454-1.414L23.989,1.425Z" />
              <Path d="M4.087,18.5,22.572.012,1.478,6.233a2.048,2.048,0,0,0-.886,3.42l3.495,3.492Z" />
            </Svg>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </>
  );
};

export default PersonalChat;
