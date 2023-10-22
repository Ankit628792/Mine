import ImagePicker from 'react-native-image-crop-picker';

const ImageSelector = async (type) => {
  try {
    const image = await ImagePicker.openPicker({
      width: type == 'multiple' ? 400 : 300,
      height: type == 'multiple' ? 600 : 300,
      cropping: true,
      multiple: false,
    });
    return image.path;
  } catch (error) {
    throw error;
  }
};

export default ImageSelector;
