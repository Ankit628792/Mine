import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
// import PushNotification from 'react-native-push-notification';
import { useNavigation } from '@react-navigation/native';

export async function requestNotificationPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
        console.log('Authorization status:', authStatus);
        getFCMToken()
    }
}


const getFCMToken = async () => {
    let checkToken = await AsyncStorage.getItem('fcmToken');
    if (!checkToken) {
        try {
            const fcmToken = await messaging().getToken();
            console.log(fcmToken)
            if (fcmToken) {
                await AsyncStorage.setItem('fcmToken', fcmToken)
            }
        } catch (error) {
            console.log("FCM TOKEN ERR ", error)
        }
    }
}




export const notificationListener = async () => {
    const navigator = useNavigation();
    messaging().onNotificationOpenedApp(remoteMessage => {
        console.log(
            'Notification caused app to open from background state:',
            remoteMessage,
        );
        let data = {
            chatId: remoteMessage.data.chatId,
            receiver: JSON.parse(remoteMessage.data.receiver)
        }
        navigator.navigate("PersonalChat", data)
    });

    messaging().onMessage(async remoteMessage => {
        console.log('notification in foreground', remoteMessage)
    })

    // Check whether an initial notification is available
    messaging()
        .getInitialNotification()
        .then(remoteMessage => {
            // console.log(remoteMessage)
            if (remoteMessage) {
                console.log(
                    'Notification caused app to open from quit state:',
                    remoteMessage,
                );
                // setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
            }
        });
}


export const sendChatNotification = async ({ title, body, token, data }) => {
    const message = {
        "to": token,
        "notification": {
            "title": title,
            "body": body,
            "sound": "chat",
            "android_channel_id": "chat_channel"
        },
        "data": data,
        "content_available": true,
        "priority": "high",
        vibrate: true
    };
    try {
        const res = await fetch('https://fcm.googleapis.com/fcm/send', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "key=" + 'AAAAvZizRjg:APA91bEpAj2zMrtJNdNR7cnXlBwbfuGaaEtPOOKzImzP9dAeUUK1tdpshLt4mMQoJje_RcgAbbcNSZZQW21yBOTou97GsFE4KmdQTWVmLv3GZu-sjR2u1QWnFqMMFpszq0PnSc741zWX'
            },
            body: JSON.stringify(message),
        })
        const data = await res.json();
        console.log(data)
    } catch (error) {
        console.log('message error    ', error)
    }
}

export const sendAppNotification = async ({ title, body, token, data }) => {
    const message = {
        "to": token,
        "notification": {
            "title": title,
            "body": body,
            "sound": "chat",
            "android_channel_id": "mine_channel"
        },
        "data": data,
        "content_available": true,
        "priority": "high",
        vibrate: true
    };
    try {
        const res = await fetch('https://fcm.googleapis.com/fcm/send', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "key=" + 'AAAAvZizRjg:APA91bEpAj2zMrtJNdNR7cnXlBwbfuGaaEtPOOKzImzP9dAeUUK1tdpshLt4mMQoJje_RcgAbbcNSZZQW21yBOTou97GsFE4KmdQTWVmLv3GZu-sjR2u1QWnFqMMFpszq0PnSc741zWX'
            },
            body: JSON.stringify(message),
        })
        const data = await res.json();
        console.log(data)
    } catch (error) {
        console.log('message error    ', error)
    }
}