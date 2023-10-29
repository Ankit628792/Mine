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
import { Path, Svg } from 'react-native-svg';
import { useState } from 'react';
import moment, { min } from 'moment';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { colors, gradient } from '../../utils/colors';
import BackButton from '../../components/BackButton';
import { useDispatch, useSelector } from 'react-redux';
import { selectMessages, selectUser, setMessage, setMessages } from '../../redux/user/user-slice';
import { SwipeService } from '../../services/swipe.service';
import { useQuery } from 'react-query';
import WebSocketService from '../../services/socketService';
import { sendChatNotification } from '../../services/notificationService';

const ChatItem = React.memo(({ item, mine, last, next }) => {
  const { image, message, createdAt } = item;

  return (
    <TouchableHighlight
      activeOpacity={1}
      underlayColor="none"
      style={tw`${mine ? 'flex-row-reverse' : 'flex-row'} items-start ${last ? 'mt-0' : 'mt-8'
        }`}>
      <>
        <View
          style={[
            tw`w-11 h-11 rounded-full overflow-hidden shadow-md ${mine ? 'ml-2 bg-gray-100' : 'mr-2 bg-gray-800'
              } ${last ? 'opacity-0' : ''}`,
          ]}>
          <Image
            source={{ uri: image }}
            resizeMode="cover"
            style={tw`w-full h-full`}
          />
        </View>
        <View
          style={[
            tw`relative`,
            { transform: [{ translateX: 0 }, { translateY: 10 }] },
          ]}>
          <View
            style={[tw`p-2 rounded-xl max-w-[240px] mb-1 ${mine ? 'rounded-tr-0' : 'rounded-tl-0'}`, { backgroundColor: mine ? colors.purple : '#fff' }]}>
            <Text numberOfLines={1000} style={{ color: mine ? colors.white : colors.black }}>
              {message}
            </Text>
          </View>
          <Text
            style={tw`absolute -bottom-4 z-20 w-[200px] text-xs text-gray-300 ${mine ? 'text-right right-0' : 'text-left left-0'
              } ${next ? '' : 'hidden'}`}>
            {moment(createdAt).fromNow()}
          </Text>
        </View>
      </>
    </TouchableHighlight>
  );
});


const PersonalChat = ({ route }) => {
  let receiver = route?.params?.receiver;
  let chatId = route?.params?.chatId;
  const navigator = useNavigation();
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(true);
  const [menu, setMenu] = useState(false);
  const user = useSelector(selectUser)
  const messages = useSelector(selectMessages)
  const { sendMessage } = WebSocketService(chatId)

  const flatListRef = useRef(null);
  const [text, setText] = useState('');

  const { refetch: getAllMessage } = useQuery('getAllMessages', () => SwipeService.getAllMessages(chatId), {
    retry: false,
    enabled: false,
    onSuccess: res => { dispatch(setMessages(res)); setIsLoading(false) }
  })

  useEffect(() => {
    if (chatId) {
      getAllMessage()
    }
  }, [chatId]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        flatListRef.current?.scrollToEnd({ animated: true });
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        flatListRef.current?.scrollToEnd({ animated: true });
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
    flatListRef.current?.scrollToEnd({ animated: true });
  };

  const handleSendMessage = async text => {
    if (text) {
      setText('');
      sendMessage({
        "content": text,
        "createdTym": new Date().toISOString(),
        userId: user?.id
      })
      dispatch(setMessage({
        "content": text,
        "createdTym": new Date().toISOString(),
        userId: user?.id
      }))
      if (receiver?.deviceToken) {
        sendChatNotification({
          title: receiver?.name, body: text, token: receiver?.deviceToken, data: { chatId, receiver }
        })
      }
    }
  };

  return (
    <>
      <LinearGradient colors={gradient.purple} style={tw`flex-1`}>
        <View style={tw`p-5 flex-row items-center justify-between gap-2`}>
          <BackButton />
          <Text style={[tw`text-2xl font-semibold ml-3 text-white text-center`]}>{receiver?.name}</Text>
          <BackButton disabled={true} buttonClass='opacity-0' />
          {/* <TouchableOpacity style={tw`w-12 h-12 items-center justify-center`} onPress={() => setMenu(true)}>
            <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style={tw`w-9 h-9 text-gray-50`}>
              <Path fillRule="evenodd" d="M10.5 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm0 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm0 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" clipRule="evenodd" />
            </Svg>
          </TouchableOpacity> */}
        </View>
        <View style={[tw`p-5 flex-1 rounded-t-[40px]`, { backgroundColor: colors.white }]}>
          {isLoading ? (
            <View style={tw`flex-1 items-center justify-center`}>
              <ActivityIndicator size={50} color={colors.purple} />
            </View>
          ) : messages?.length ? (
            <>
              <ScrollView showsVerticalScrollIndicator={false} ref={flatListRef}>
                {messages?.map((item, index) => (
                  <ChatItem
                    key={index}
                    item={{
                      image: item?.userId != user?.id ? receiver?.image : user?.profileImage,
                      message: item?.content,
                      createdAt: item?.createdTym
                    }}
                    mine={item?.userId == user?.id}
                    last={messages[index - 1]?.userId == messages[index]?.userId}
                    next={messages[index + 1]?.userId != messages[index]?.userId}
                  />
                ))}
                <View style={tw`w-full h-5 mt-8`}></View>
              </ScrollView>
            </>
          ) : (
            <View style={tw`flex-1 items-center justify-center`}>
              <Text style={[tw`text-xl text-center px-10`, { color: colors.gray }]}>
                Initiate a Conversation
              </Text>
            </View>
          )}

          <View
            style={tw`bg-white rounded-full flex-row items-center justify-between px-2 mt-3`}>
            <TextInput
              returnKeyType={text ? 'send' : 'none'}
              onSubmitEditing={({ nativeEvent: { text } }) => handleSendMessage(text)}
              value={text}
              onChangeText={setText}
              style={tw`text-base text-gray-600 w-full ml-1 h-auto max-w-[${Dimensions.get('window').width - 110
                }px]`}
              placeholder="Type here..."
              placeholderTextColor="#999"
            />
            <TouchableOpacity
              disabled={!text?.length}
              style={tw`w-11 h-11 p-2 ${text?.length ? 'opacity-100' : 'opacity-0'
                }`}
              onPress={() => handleSendMessage(text)}>
              <Svg
                viewBox="0 0 24 24"
                fill="currentColor"
                style={{ color: colors.purple }}>
                <Path d="M5.521,19.9h5.322l3.519,3.515a2.035,2.035,0,0,0,1.443.6,2.1,2.1,0,0,0,.523-.067,2.026,2.026,0,0,0,1.454-1.414L23.989,1.425Z" />
                <Path d="M4.087,18.5,22.572.012,1.478,6.233a2.048,2.048,0,0,0-.886,3.42l3.495,3.492Z" />
              </Svg>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
      {menu && <View style={[tw`absolute flex-1 z-20 inset-0`,]}>
        <TouchableHighlight style={tw`flex-1 bg-black bg-opacity-40`} activeOpacity={1} underlayColor='none' onPress={() => setMenu(false)}>
          <></>
        </TouchableHighlight>
        <View style={tw`p-3 rounded-lg bg-white absolute top-16 right-10`}>
          <TouchableOpacity style={tw`p-2`} onPress={() => { setMenu(false) }}>
            <Text style={tw`text-gray-800`}>Clear Chat</Text>
          </TouchableOpacity>
          <TouchableOpacity style={tw`p-2`} onPress={() => { setMenu(false) }}>
            <Text style={tw`text-gray-800`}>Un-Match</Text>
          </TouchableOpacity>
          <TouchableOpacity style={tw`p-2`} onPress={() => { navigator.navigate("Report", { userId: receiver?.id }); setMenu(false) }}>
            <Text style={tw`text-gray-800`}>Report User</Text>
          </TouchableOpacity>
          <TouchableOpacity style={tw`p-2`} onPress={() => { navigator.navigate("Block", { userId: receiver?.id }); setMenu(false) }}>
            <Text style={tw`text-rose-500`}>Block User</Text>
          </TouchableOpacity>
        </View>
      </View>}
    </>
  );
};

export default PersonalChat;
