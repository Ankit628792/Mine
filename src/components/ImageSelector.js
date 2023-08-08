import ImagePicker from 'react-native-image-crop-picker';

const ImageSelector = async () => {
  try {
    const image = await ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      multiple: false,
    });
    return image.path;
  } catch (error) {
    throw error;
  }
};

export default ImageSelector;
