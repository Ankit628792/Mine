import { View, Text } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import moment from 'moment'
import { colors, gradient } from '../../utils/colors'
import { TouchableOpacity } from 'react-native'
import { ScrollView } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { Image } from 'react-native'
import { Dimensions } from 'react-native'
import { Path, Svg } from 'react-native-svg'
import BackButton from '../../components/BackButton'

const height = Dimensions.get('window').height

const ViewProfile = () => {
    return (
        <>
            <BackButton buttonClass='absolute top-5 left-5 z-10' />
            <View style={[tw`w-full absolute left-0 top-0 right-0`, { height: 400, backgroundColor: colors.purple }]}>
                <Image source={{ uri: 'https://w0.peakpx.com/wallpaper/470/485/HD-wallpaper-the-batman-robert-pattinson-the-batman-batman-superheroes-movies-2021-movies-robert-pattinson.jpg' }} style={tw`w-full h-full`} resizeMode='cover' />
            </View>
            <ScrollView style={tw`flex-1`} showsVerticalScrollIndicator={false}>
                <View style={[tw`flex-1 bg-white p-5 px-7 rounded-t-[40px] gap-4`, { marginTop: 375 }]}>
                    <View>
                        <Text style={[tw`text-xl font-semibold`, { color: colors.black }]}>Batman, 23</Text>
                        <View style={[tw`py-1 flex-row items-center gap-1`]}>
                            <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style={[tw`w-6 h-6`, { color: colors.purple }]}>
                                <Path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                            </Svg>
                            <Text style={[tw`text-base font-medium tracking-tight`, { color: colors.purple }]}>0 Km away</Text>
                        </View>
                    </View>
                    <View>
                        <Text style={[tw`text-xl font-medium`, { color: colors.black }]}>About</Text>
                        <Text style={[tw`text-base`, { color: colors.gray }]}>I'm Batman. who is a superhero appearing in American comic books published by DC Comics. The character was created by artist Bob Kane and writer Bill Finger, and debuted in the 27th issue of the comic book Detective Comics on March 30, 1939</Text>
                    </View>
                    <View>
                        <Text style={[tw`text-xl font-medium`, { color: colors.black }]}>Date of Birth</Text>
                        <Text style={[tw`text-base`, { color: colors.gray }]}>{moment().set('date', 5).set('month', 8).set('year', 2000).format('DD MMM YYYY')}</Text>
                    </View>
                    <View>
                        <Text style={[tw`text-xl font-medium`, { color: colors.black }]}>Gender</Text>
                        <Text style={[tw`text-base`, { color: colors.gray }]}>Male</Text>
                    </View>

                    <View>
                        <Text style={[tw`text-xl font-medium`, { color: colors.black }]}>Profession</Text>
                        <Text style={[tw`text-base capitalize`, { color: colors.gray }]}>Killer</Text>
                    </View>

                    <View>
                        <Text style={[tw`text-xl font-medium`, { color: colors.black }]}>Religion</Text>
                        <Text style={[tw`text-base capitalize`, { color: colors.gray }]}>None</Text>
                    </View>

                    <View>
                        <Text style={[tw`text-xl font-medium`, { color: colors.black }]}>Interested</Text>
                        <View style={tw`flex-row items-center flex-wrap gap-2 py-2`}>
                            {
                                ['Save People', 'Hide Identity', 'Fight for Justice'].map((interest, i) => <Interest key={i} interest={interest} />)
                            }
                        </View>
                    </View>
                    <View>
                        <Text style={[tw`text-xl font-medium`, { color: colors.black }]}>Not Interested</Text>
                        <View style={tw`flex-row items-center flex-wrap gap-2 py-2`}>
                            {
                                ['Revealing Identity', 'Fake People'].map((interest, i) => <Interest key={i} interest={interest} />)
                            }
                        </View>
                    </View>
                    <View style={tw`h-20 w-full`}></View>
                </View>
            </ScrollView>
        </>
    )
}

export default ViewProfile

const Interest = ({ interest }) => (
    <TouchableOpacity
        style={[
            tw`w-auto py-2 px-4 rounded-full`,
            {
                backgroundColor: colors.purple,
            },
        ]}
    >
        <Text
            style={[{ color: colors.white }]}>
            {interest}
        </Text>
    </TouchableOpacity>
)