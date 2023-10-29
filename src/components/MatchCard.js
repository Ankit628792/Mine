import { Dimensions } from "react-native"
import { View, Text, Image, TouchableOpacity } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import { Path, Svg } from "react-native-svg"
import tw from 'twrnc'
import { colors } from "../utils/colors"

const MatchCard = ({ item, navigator }) => {
    let receiver = {
        id: item?.id,
        image: item?.profileImage,
        name: item?.userName,
    }
    return (
        <TouchableOpacity onPress={() => navigator.navigate('PersonalChat', { chatId: item?.chatId, receiver })} style={[tw`items-center justify-center bg-white h-40 rounded-2xl overflow-hidden relative`, { width: (Dimensions.get('window').width - 100) / 2 }]}>
            <Image
                source={{
                    uri: item?.profileImage,
                }}
                style={tw`w-full h-full rounded-lg`}
            />
            <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(119,44,232,0.5)']} style={tw`absolute inset-0 w-full p-2 pl-3 items-end justify-between`}>
                {item.distance ? <View style={tw`bg-white bg-opacity-40 rounded-full py-0.5 px-1.5 flex-row items-center`}>
                    <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style={tw`text-white w-3 h-3 mr-0.5`}>
                        <Path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                    </Svg>
                    <Text style={tw`text-[10px] font-medium text-white`}>{item.distance || '-'} Km away</Text>
                </View> : <></>}
                <View></View>
                <View style={tw`w-full`}>
                    <Text numberOfLines={1} style={[tw`text-lg font-medium text-white text-left w-full`]}>{item?.userName}</Text>
                    {item.profession ? <Text style={[tw`text-xs text-white text-left w-full`, { color: colors.white }]}>{item.profession || '-'}</Text> : <></>}
                </View>
            </LinearGradient>
        </TouchableOpacity>
    )
}

export default MatchCard
