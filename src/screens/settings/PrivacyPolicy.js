import { View, Text } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { colors, gradient } from '../../utils/colors'
import tw from 'twrnc'
import { ScrollView } from 'react-native'
import BackButton from '../../components/BackButton'

const PrivacyPolicy = () => {
    return (
        <LinearGradient colors={gradient.purple} style={tw`flex-1`}>
            <View style={tw`flex-row items-center justify-between relative z-20 p-5`}>
                <BackButton />
                <Text style={[tw`text-2xl font-semibold text-white text-center`]}>Privacy Policy</Text>
                <BackButton disabled={true} buttonClass='opacity-0' />
            </View>
            <View style={[tw`p-5 pb-0 flex-1 rounded-t-[40px]`, { backgroundColor: colors.white }]}>
                <ScrollView showsVerticalScrollIndicator={false} style={tw`pt-5`}>
                    <Text style={[tw`text-base text-gray-500 my-4`]}>There is no fee from The Nature Conservancy to receive text messages. Message and data rates may apply—this can be checked with your mobile service provider. Charges are billed and payable to your mobile service provider or deducted from your prepaid account. Consent is not a requirement for purchase.</Text>
                    <Text style={[tw`text-base text-gray-500 my-4`]}>Data obtained from you in connection with this SMS service may include your mobile phone number, your carrier’s name and the date, time and content of your messages. The Nature Conservancy may use this information to contact you and provide the services you request from The Nature Conservancy. Alerts sent via SMS may not be delivered if the mobile phone is not in range of a transmission site, or if sufficient network capacity is not available at a particular time. Even within a coverage area, factors beyond the control of the wireless operator may interfere with message delivery, including the customer’s equipment, terrain, proximity to buildings, foliage, and weather. Wireless operators do not guarantee message delivery and will not be held liable for delayed or undelivered messages.</Text>


                    <Text style={[tw`text-xl font-medium text-gray-800 mt-4 mb-1`]}>Introduction</Text>
                    <Text style={[tw`text-base text-gray-500`]}>
                        We are committed to protecting your privacy. This Privacy Policy outlines the types of personal information we receive and collect when you use Mine, as well as some of the steps we take to safeguard information. This helps you make an informed decision about sharing personal information with us.
                    </Text>

                    <Text style={[tw`text-xl font-medium text-gray-800 mt-4 mb-1`]}>Data Collection</Text>
                    <Text style={[tw`text-base text-gray-500`]}>
                        We collect personal information, such as your name, email address, and phone number, when you register for our services. Additionally, we may automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device.
                    </Text>

                    <Text style={[tw`text-xl font-medium text-gray-800 mt-4 mb-1`]}>Data Usage</Text>
                    <Text style={[tw`text-base text-gray-500`]}>
                        We use the collected information to provide, maintain, and improve our services, as well as to communicate with you and personalize your experience. The data is also used to monitor the usage of our services and to detect, prevent, and address technical issues.
                    </Text>

                    <Text style={[tw`text-xl font-medium text-gray-800 mt-4 mb-1`]}>Data Protection</Text>
                    <Text style={[tw`text-base text-gray-500`]}>
                        We take appropriate security measures to protect against unauthorized access, alteration, disclosure, or destruction of your personal information. However, please note that no method of transmission over the internet or electronic storage is completely secure.
                    </Text>

                    <Text style={[tw`text-xl font-medium text-gray-800 mt-4 mb-1`]}>Cookies</Text>
                    <Text style={[tw`text-base text-gray-500`]}>
                        We use cookies and similar tracking technologies to track the activity on our app and hold certain information. You have the option to either accept or refuse these cookies and know when a cookie is being sent to your device.
                    </Text>

                    <Text style={[tw`text-xl font-medium text-gray-800 mt-4 mb-1`]}>Third-Party Links</Text>
                    <Text style={[tw`text-base text-gray-500`]}>
                        Our app may contain links to other sites that are not operated by us. If you click on a third-party link, you will be directed to that third party's site. We strongly advise you to review the Privacy Policy of every site you visit.
                    </Text>

                    <Text style={[tw`text-xl font-medium text-gray-800 mt-4 mb-1`]}>Children's Privacy</Text>
                    <Text style={[tw`text-base text-gray-500`]}>
                        Our services do not address anyone under the age of 13. We do not knowingly collect personal identifiable information from children under 13. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact us so that we will be able to do necessary actions.
                    </Text>

                    <Text style={[tw`text-xl font-medium text-gray-800 mt-4 mb-1`]}>Policy Changes</Text>
                    <Text style={[tw`text-base text-gray-500`]}>
                        We reserve the right to modify this Privacy Policy at any time. You should review this Privacy Policy periodically. Your continued use of our app after we post any modifications to the Privacy Policy on this page will constitute your acknowledgment of the modifications and your consent to abide and be bound by the modified Privacy Policy.
                    </Text>

                    <Text style={[tw`text-xl font-medium text-gray-800 mt-4 mb-1`]}>Contact Us</Text>
                    <Text style={[tw`text-base text-gray-500`]}>
                        If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us.
                    </Text>

                    <View style={tw`w-full h-32`}></View>
                </ScrollView>
                <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(255,255,255,1)']} style={tw`absolute left-0 bottom-0 right-0 h-32`} />
            </View>
        </LinearGradient>

    )
}

export default PrivacyPolicy