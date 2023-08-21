import ImagePicker from 'react-native-image-crop-picker';

const ImageSelector = async (type) => {
  try {
    const image = await ImagePicker.openPicker({
      width: 400,
      height: type == 'multiple' ? 500 : 400,
      cropping: true,
      multiple: false,
    });
    return image.path;
  } catch (error) {
    throw error;
  }
};

export default ImageSelector;
