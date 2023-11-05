import { View, Text, TextInput, Alert } from 'react-native'
import React, { useState } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { colors, gradient } from '../../utils/colors';
import tw from 'twrnc'
import PrimaryButton from '../../components/PrimaryButton';
import BackButton from '../../components/BackButton';
import { showToast } from '../../utils/FunctionHelper';
import { useReportProfile } from '../../hooks';
import { useNavigation } from '@react-navigation/native';

const Block = ({ route }) => {
    let { userId, type } = route.params;
    const navigator = useNavigation()
    const [reason, setReason] = useState('');

    const { mutate, isLoading } = useReportProfile(() => {
        showToast(type + "ed successfully!")
        if (type == 'block')
            navigator.navigate('Main');
        else
            navigator.goBack();
    })

    const handleSubmit = () => {
        if (reason?.trim()?.length < 5) {
            showToast("Reason is too short")
        }
        else {
            if (type == 'block') {
                Alert.alert(
                    '',
                    `All of the data between you and ${type}ed will be deleted`,
                    [
                        { text: 'Continue', onPress: () => mutate({ userId, type, reason: reason?.slice(0, 254) }) },
                        { text: 'Cancel' },
                    ],
                    {
                        cancelable: true,
                    },
                );
            }
            else {
                mutate({ userId, type, reason: reason?.slice(0, 254) })
            }
        }
    }

    return (
        <LinearGradient colors={gradient.purple} style={tw`flex-1`}>
            <View style={tw`p-5 flex-row items-center justify-between`}>
                <BackButton />
                <Text style={[tw`text-2xl font-semibold text-white text-center capitalize`]}>{type} User</Text>
                <BackButton disabled={true} buttonClass='opacity-0' />
            </View>
            <View style={[tw`py-10 px-6 flex-1 rounded-t-[40px] flex-1 justify-between gap-6`, { backgroundColor: colors.white }]}>
                <TextInput multiline={true} value={reason} onChangeText={txt => setReason(txt)} placeholder={'Provide your reason to ' + type} textAlignVertical='top' style={tw`w-full flex-grow shadow rounded-xl p-3 text-base bg-white leading-loose`} />
                <PrimaryButton text={'Submit'} onPress={handleSubmit} isLoading={isLoading} />
            </View>
        </LinearGradient>
    )
}

export default Block