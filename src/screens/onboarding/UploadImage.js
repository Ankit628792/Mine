import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  Alert,
  Vibration,
  Image,
  Platform,
} from 'react-native';
import React, { useState } from 'react';
import tw from 'twrnc';
import { colors, gradient } from '../../utils/colors';
import LinearGradient from 'react-native-linear-gradient';
import BackButton from '../../components/BackButton';
import PrimaryButton from '../../components/PrimaryButton';
import { Path, Svg } from 'react-native-svg';
import ImageSelector from '../../components/ImageSelector';
import { useNavigation } from '@react-navigation/native';
import DragSortableView from '../../components/DragSortableView';
import Bar from '../../components/Bar';
import { uploadImage } from '../../services/user.service';

const { width, height } = Dimensions.get('window');
const parentWidth = width - 20;
const childrenWidth = width / 4;
const childrenHeight = 150;
const marginChildrenTop = 10;
const marginChildrenBottom = 0;
const marginChildrenLeft = 10;
const marginChildrenRight = 10;

const UploadImage = () => {
  const navigator = useNavigation();
  const [imageUrl, setImageUrl] = useState(
    Array.from({ length: 6 }, () => ({ image: '' })),
  );
  const [loading, setLoading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [deleteStatus, setDeleteStatus] = useState(0);

  const handleImage = async i => {
    try {
      const image = await ImageSelector();
      if (image) {
        setImageUrl(prevState => {
          const newState = [...prevState];
          newState[i].image = image;
          return newState;
        });
      }
    } catch (error) {
      console.error('handleImage -> Error:', error);
    }
  };

  const handleNext = async () => {
    let imageData = imageUrl.filter(item => item.image !== '');
    if (imageData.length < 2) {
      Alert.alert('Please Upload At Least Two Image');
    } else {
      Alert.alert(
        '',
        "Kindly ensure it's your actual picture preferably a formal one, for better curation.",
        [
          { text: 'Next', onPress: () => handleImageSending(imageData) },
          { text: 'Cancel' },
        ],
        {
          cancelable: true,
        },
      );
    }
  };

  const handleImageSending = async imageData => {
    const serveImages = [];
    setLoading(true)
    await Promise.all(imageData.map(async img => {
      let nameImg = img.image.split('/')[img.image.split('/').length - 1];

      let type =
        nameImg.split('.')[nameImg.split('.').length - 1] === 'png'
          ? 'image/png'
          : 'image/jpeg';

      let formdata = new FormData();
      formdata.append('image', {
        type: type,
        uri: img.image,
        name: nameImg,
      });
      let res = await uploadImage(formdata)
      console.log(res.data)
      if (res.data?.data) {
        serveImages.push(res.data?.data?.url)
      }
      // upload image and handle error
    }))
    if (serveImages.length) {
      navigator.navigate("ProfileImage", { images: serveImages })
    }
    setLoading(false)
  };

  const RenderImage = ({ item, index }) => {
    return (
      <>
        {!Boolean(item.image) ? (
          <TouchableOpacity
            style={tw`w-[${width / 4
              }px] h-32 mx-2 m-2 shadow shadow-gray-400 rounded-lg`}
            onPress={() => handleImage(index)}>
            <View
              style={tw`w-full h-full items-center justify-center bg-white rounded-lg`}>
              <Text
                style={[tw`text-5xl font-extralight`, { color: colors.orange }]}>
                +
              </Text>
            </View>
          </TouchableOpacity>
        ) : (
          <View
            style={[
              tw`w-[${width / 4}px] h-32 m-2 shadow shadow-gray-400 rounded-lg`,
              { zIndex: 10000 },
            ]}>
            <Image
              source={{ uri: item.image }}
              resizeMode="contain"
              style={tw`h-full w-full rounded-lg`}
            />
          </View>
        )}
      </>
    );
  };

  const RenderDeleteView = () => {
    if (deleteStatus === 1 || deleteStatus === 2) {
      return (
        <View
          style={[
            tw`w-full absolute bottom-0 flex-row justify-center pb-[4%]`,
            { zIndex: 100, height: Platform.OS === 'ios' ? 200 : 140 },
          ]}>
          <View
            style={tw`${deleteStatus === 2
              ? 'w-10 h-10 p-2 border border-red-500'
              : 'w-8 h-8 p-1'
              } bg-white rounded-full`}>
            <Svg
              style={tw`text-red-500`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1}>
              <Path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </Svg>
          </View>
        </View>
      );
    }
    return null;
  };

  function handleOnDragging(gestureState) {
    if (this.isBuffer) return;
    const currentDeleteStatus = gestureState.moveY >= 500 ? 2 : 1;
    if (deleteStatus !== currentDeleteStatus) {
      setDeleteStatus(currentDeleteStatus);
    }
  }

  return (
    <>
      <RenderDeleteView />
      <Bar value={10} />
      <LinearGradient
        colors={gradient.bg}
        style={tw`flex-1 p-5 flex-col justify-between`}>
        <BackButton />
        <View style={tw`flex-grow py-5`}>
          <Text
            style={[
              tw`text-3xl font-medium text-center`,
              { color: colors.black },
            ]}>
            Upload Your Images
          </Text>
          {loading ? (
            <ActivityIndicator
              size="large"
              color={colors.orange}
              style={{ marginTop: 40 }}
            />
          ) : (
            <View style={tw`flex-1 items-center`}>
              <DragSortableView
                dataSource={imageUrl}
                parentWidth={parentWidth}
                childrenWidth={childrenWidth}
                childrenHeight={childrenHeight}
                marginChildrenTop={marginChildrenTop}
                marginChildrenBottom={marginChildrenBottom}
                marginChildrenLeft={marginChildrenLeft}
                marginChildrenRight={marginChildrenRight}
                isDragFreely={true}
                onDataChange={function (data) {
                  if (this.deleteIndex != null) {
                    const deleteIndex = this.deleteIndex;
                    this.deleteIndex = null;
                    const newData = [...data];
                    newData.splice(deleteIndex, 1);
                    newData.push({ image: '' });
                    newData.sort(
                      (a, b) =>
                        Number(Boolean(b.image)) - Number(Boolean(a.image)),
                    );
                    setImageUrl(newData);
                  } else {
                    data.sort(
                      (a, b) =>
                        Number(Boolean(b.image)) - Number(Boolean(a.image)),
                    );
                    setImageUrl(data);
                  }
                }}
                onDragEnd={(startIndex, endIndex) => {
                  if (deleteStatus === 2) {
                    setImageUrl(prevState => {
                      const newArr = [...prevState];
                      newArr.splice(startIndex, 1, { image: '' });
                      return newArr;
                    });
                    setDeleteStatus(0);
                  }
                  setDeleteStatus(0);
                }}
                onDragging={handleOnDragging}
                keyExtractor={(item, index) => index}
                renderItem={(item, index) => {
                  return <RenderImage item={item} index={index} key={index} />;
                }}
                delayLongPress={10}
              />
            </View>
          )}
        </View>
        <PrimaryButton
          text={'Continue'}
          disabled={false}
          isLoading={false}
          onPress={() => handleNext()}
        />
      </LinearGradient>
    </>
  );
};

export default UploadImage;
