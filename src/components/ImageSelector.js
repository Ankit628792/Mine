import ImagePicker from 'react-native-image-crop-picker'
/*
Image picker
index : index of the image container,
imageUrl : array with image info,
Location : Which screen is using the Image picker
*/
const ImageSelector = (index, imageUrl) => {

    let TestPromise = new Promise((resolve, reject) => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
            multiple: false,
        })
            .then((image) => {
                console.log('image', image)
                // console.log('image', image)
                // let newImageUrl = [...imageUrl]
                let newImageUrl = imageUrl
                newImageUrl[index] = image.path
                resolve({ success: true, response: newImageUrl })
            })
            .catch((error) => {
                reject({ success: false, response: error })
            })
    })
    return TestPromise
}


export default ImageSelector
