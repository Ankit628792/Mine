import { View, Text, TouchableOpacity, ActivityIndicator, Dimensions, Alert, Vibration, Image, Platform } from 'react-native'
import React, { useState } from 'react'
import tw from 'twrnc'
import { colors, gradient } from '../../utils/colors'
import LinearGradient from 'react-native-linear-gradient'
import BackButton from '../../components/BackButton'
import PrimaryButton from '../../components/PrimaryButton'
import { Path, Svg } from 'react-native-svg'
import ImageSelector from '../../components/ImageSelector'
import { useNavigation } from '@react-navigation/native'
import DragSortableView from '../../components/DragSortableView'

const { width, height } = Dimensions.get('window')
const parentWidth = width - 20
const childrenWidth = width / 4
const childrenHeight = 150
const marginChildrenTop = 10
const marginChildrenBottom = 0
const marginChildrenLeft = 10
const marginChildrenRight = 10


const UploadImage = () => {
  const navigator = useNavigation();
  const [imageUrl, setImageUrl] = useState([
    { image: '' },
    { image: '' },
    { image: '' },
    { image: '' },
    { image: '' },
    { image: '' },
  ])
  const [loading, setLoading] = useState(false)
  const [uploadError, setUploadError] = useState('')
  const [deleteStatus, setDeleteStatus] = useState(0)

  const handleImage = async (i = 0) => {
    let Test = await ImageSelector(i, [...imageUrl]) as any
    console.log('handleImage -> Test', Test)
    if (Test.success) {
      let newArr = [...imageUrl]
      let idx = newArr.findIndex((item) => !item.image)
      newArr.splice(idx, 0, { image: Test.response })
      newArr.pop()
      setImageUrl(newArr)
    } else {
      // console.log(Test.response)
    }
  }

  const handleNext = async () => {
    let imageData = imageUrl.filter((item) => item.image !== '')
    if (imageData.length === 0) {
      Alert.alert('Please Upload Atleast One Image')
    } else {
      Alert.alert(
        '',
        "Kindly ensure it's your actual picture preferably a formal one, for better curation.",

        [{ text: 'Next', onPress: () => handleImageSending(imageData) }, { text: 'Cancel' }],
        {
          cancelable: true,
        }
      )
    }
  }

  const handleImageSending = async (imageData: any) => {
    const serveImages = []
    imageData.map(async (img) => {
      // console.log('handleImageSending -> img', img.image)
      let nameImg = img.image.split('/')[img.image.split('/').length - 1]
      // console.log('handleImageSending -> nameImg', nameImg)
      let type = nameImg.split('.')[nameImg.split('.').length - 1] === 'png' ? 'image/png' : 'image/jpeg'
      // console.log('handleImageSending -> type', type)

      let formdata = new FormData() as any
      formdata.append('image', {
        type: type,
        uri: img.image,
        name: nameImg,
      })
      setLoading(true)

      // upload image and handle error

    })
  }


  const RenderImage = ({ item, index }) => {
    return (
      <>
        {!Boolean(item.image) ?
          <TouchableOpacity
            style={tw`w-[${width / 4}px] h-32 mx-2 m-2 shadow shadow-gray-400 rounded-lg`}
            onPress={() => handleImage()}
          >
            <View style={tw`w-full h-full items-center justify-center bg-white rounded-lg`}>
              <Text style={[tw`text-5xl font-extralight`, { color: colors.blue }]}>+</Text>
            </View>
          </TouchableOpacity>
          :
          <View style={[tw`w-[${width / 4}px] h-32 m-2 shadow shadow-gray-400 rounded-lg`, { zIndex: 10000 }]}>
            <Image source={{ uri: item.image }} resizeMode="contain" style={tw`h-full w-full rounded-lg`} />
          </View>

        }
      </>
    )
  }


  const RenderDeleteView = () => {
    if (deleteStatus === 1 || deleteStatus === 2) {
      return (
        <View style={[tw`w-full absolute top-0 flex-row justify-center pt-[4%]`, { zIndex: 100, height: Platform.OS === "ios" ? 200 : 140 }]}>
          <View style={tw`${deleteStatus === 2 ? 'w-10 h-10 p-2 border border-red-500' : 'w-8 h-8 p-1'} bg-white rounded-full`}>
            <Svg style={tw`text-red-500`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <Path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </Svg>
          </View>
        </View>
      )
    }
    return null;
  }

  function handleOnDragging(gestureState) {
    if (deleteStatus !== 1 && deleteStatus !== 2) {
      setDeleteStatus(1)
    }
    if (this.isBuffer) return;
    if (gestureState.moveY <= 120) {
      setDeleteStatus(2);
    } else if (deleteStatus !== 1) {
      setDeleteStatus(1);
    }
  }

  return (
    <>
      <RenderDeleteView />
      <View style={[tw`h-1.5 relative`, { backgroundColor: colors.white }]}>
        <View style={[tw`h-1.5`, { backgroundColor: colors.blue, width: `${(100 * 10) / 12}%` }]}></View>
      </View>
      <LinearGradient colors={gradient.bg} style={tw`flex-1 p-5 flex-col justify-between`}>
        <BackButton />
        <View style={tw`flex-grow py-5`}>
        <Text style={[tw`text-3xl font-medium text-center`, { color: colors.black }]}>Upload Your Images</Text>
          {loading ?
            <ActivityIndicator size="large" color={colors.blue} style={{ marginTop: 40 }} />
            :
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
                      const newData = [...data]
                      newData.splice(deleteIndex, 1)
                      newData.push({ image: "" })
                      newData.sort((a, b) => Number(Boolean(b.image)) - Number(Boolean(a.image)))
                      setImageUrl(newData)
                    } else {
                      data.sort((a: any, b: any) => Number(Boolean(b.image)) - Number(Boolean(a.image)))
                      setImageUrl(data)
                    }
                  }}

                  onDragEnd={(startIndex: any, endIndex: any) => {
                    if (deleteStatus === 2) {
                      const newData = [...imageUrl]
                      newData.splice(startIndex, 1)
                      newData.push({ image: "" })
                      setImageUrl(newData)
                      setDeleteStatus(0)
                    } else {
                      setDeleteStatus(0)
                    }

                  }}

                  onDragging={handleOnDragging}

                  keyExtractor={(item, index) => index}
                  renderItem={(item, index) => {
                    return <RenderImage item={item} index={index} key={index} />
                  }}
                  delayLongPress={10}
                />
            </View>
          }


        </View>

        <PrimaryButton text={'Continue'} disabled={false} isLoading={false} onPress={() => { }} />
      </LinearGradient>
    </>
  )
}

export default UploadImage