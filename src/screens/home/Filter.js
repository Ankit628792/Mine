import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView, Dimensions, TouchableOpacity } from 'react-native'
import MultiSlider from '@ptomasroos/react-native-multi-slider'
import tw from 'twrnc'
import { colors } from '../../utils/colors';
import { useNavigation } from '@react-navigation/native'
import ActivityLoader from '../../components/ActivityLoader'
import BackButton from '../../components/BackButton'
import { useUpdateFilter } from '../../hooks';
import { useDispatch } from 'react-redux';
import { setProfileFilter } from '../../redux/user/user-slice';

const DEFAULT_DISTANCE = 1000
const DEFAULT_AGE_VALUES = [20, 60]
const WIDTH = Dimensions.get('window').width

const Filter = ({ route }) => {
    const navigator = useNavigation();
    const dispatch = useDispatch();
    const [distance, setDistance] = useState(route.params.filter?.distance || DEFAULT_DISTANCE)
    const [ageValues, setAgeValues] = useState([route.params.filter?.minAge || 20, route.params.filter?.maxAge || 60])

    // use query to get initial filters and on success set corresponding states

    const { mutate: updateFilter, isLoading } = useUpdateFilter(() => { navigator.goBack(); dispatch(setProfileFilter({ distance, maxAge: ageValues[1], minAge: ageValues[0] })); })

    const handleDistance = (value) => {
        setDistance(value[0])
    }

    const multiSliderValueChange = (values) => {
        setAgeValues(values)
    }


    const updatingFilter = async () => {

        if (distance == route.params.filter?.distance && route.params.filter?.minAge == ageValues[0] && route.params.filter?.maxAge == ageValues[1]) {
            navigator.goBack();
        }
        else
            updateFilter({
                distance,
                maxAge: ageValues[1],
                minAge: ageValues[0]
            })
    }

    const handleBackButton = () => {
        updatingFilter();
    }

    return (
        <View style={[tw`flex-1`, { backgroundColor: colors.white }]}>
            <View style={tw`flex-row justify-between p-5`}>
                <BackButton />
                <Text style={tw`text-gray-900 font-bold text-2xl`}>Filter</Text>
                <TouchableOpacity disabled={isLoading} onPress={handleBackButton}>
                    <Text style={[tw`text-lg font-medium`, { color: colors.purple }]}>Apply</Text>
                </TouchableOpacity>
            </View>
            {
                isLoading ?
                    <View style={tw`flex-1 justify-center`}>
                        <ActivityLoader />
                    </View>
                    :
                    <View style={tw`px-5 flex-1`}>
                        <View style={tw`mb-2`}>
                            <View style={tw`mb-2`}>
                                <View style={tw`p-3 relative bg-white shadow-lg shadow-gray-200 rounded-md my-2`}>
                                    <Text style={[tw`text-lg font-medium mb-4`, { color: colors.black }]}>Age Preference</Text>
                                    <MultiSlider
                                        selectedStyle={{ backgroundColor: 'rgba(119,44,232,0.5)' }}
                                        trackStyle={{ height: 6, borderRadius: 10 }}
                                        unselectedStyle={{ backgroundColor: 'rgba(119,44,232,0.2)' }}
                                        markerStyle={{ backgroundColor: colors.purple, width: 20, height: 20, marginTop: 4 }}
                                        containerStyle={[tw`flex-row justify-center`]}
                                        values={ageValues}
                                        sliderLength={WIDTH > 360 ? 300 : 280}
                                        onValuesChange={multiSliderValueChange}
                                        min={22}
                                        max={60}
                                        step={1}
                                        allowOverlap
                                        snapped
                                        customMarker={AgeCustomMarker}
                                        animateTransitions={true}
                                        animationType="spring"
                                        animationConfig={{ useNativeDriver: false }}
                                    />
                                </View>
                            </View>
                        </View>

                        <View style={tw`mb-2`}>
                            <View style={tw`p-3 relative bg-white shadow-lg shadow-gray-200 rounded-md my-2`}>
                                <Text style={[tw`text-lg font-medium mb-4`, { color: colors.black }]}>Distance</Text>
                                <MultiSlider
                                    selectedStyle={{ backgroundColor: 'rgba(119,44,232,0.5)' }}
                                    trackStyle={{ height: 6, borderRadius: 10 }}
                                    unselectedStyle={{ backgroundColor: 'rgba(119,44,232,0.2)' }}
                                    markerStyle={{ backgroundColor: colors.purple, width: 20, height: 20, marginTop: 4 }}
                                    containerStyle={[tw`flex-row justify-center`]}
                                    sliderLength={WIDTH > 360 ? 275 : 260}
                                    values={[distance]}
                                    min={0}
                                    max={1000}
                                    step={1}
                                    allowOverlap
                                    snapped
                                    customMarker={LocationCustomMarker}
                                    onValuesChangeFinish={handleDistance}
                                    animateTransitions={true}
                                    animationType="spring"
                                    animationConfig={{ useNativeDriver: false }}
                                />
                            </View>
                        </View>

                        <View style={tw`m-5 mt-auto`}>
                            <TouchableOpacity style={tw`mb-5 rounded-2xl`} onPress={handleBackButton}>
                                <View style={tw`py-4 bg-white rounded-xl shadow-lg shadow-gray-200`}>
                                    <Text style={[tw`text-xl text-center font-medium`, { color: colors.purple }]}>See Matches</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
            }
        </View>
    )
}


export default Filter

const LocationCustomMarker = (props) => {
    return (
        <View style={tw`mt-8 z-20 w-24 flex-col items-center`}>
            <View style={[tw`w-5 h-5 rounded-full`, { backgroundColor: colors.purple }]}></View>
            <Text style={tw`text-lg text-gray-900 mt-2 font-medium`}>{props.currentValue}km</Text>
        </View>
    );
}

const AgeCustomMarker = (props) => {
    return (
        <View style={tw`mt-8`}>
            <View style={[tw`w-5 h-5 rounded-full`, { backgroundColor: colors.purple }]}></View>
            <Text style={tw`text-lg text-gray-900 mt-2 font-medium`}>{props.currentValue}</Text>
        </View>
    );
}
