import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextEncoder, TextDecoder } from 'text-encoding';
import { selectUser, setMessage } from '../redux/user/user-slice';
import { Client } from '@stomp/stompjs';
import { API_URL, SOCKET_URL } from './config';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

var stomp = null;
const WebSocketService = () => {
    const dispatch = useDispatch();
    const user = useSelector(selectUser)
    const [stompClient, setStompClient] = useState(null);
    const [subscription, setSubscription] = useState(null)

    const connect = () => {

        let client = new Client({
            brokerURL: `${SOCKET_URL}/ichat`,
            // debug: (str) => { console.log("#### DEBUG STOMP: #####", str); },
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
            forceBinaryWSFrames: true,
            appendMissingNULLonIncoming: true,
            logRawCommunication: true,
            onConnect: () => {
                console.log('Connected to the WebSocket');
                setStompClient({ client });
                stomp = { client }
            },
            onChangeState: (e) => {
                console.log(e)
            },
            onStompError: (frame) => {
                console.error('STOMP error:', frame);
            },
            onWebSocketClose: () => {
                console.log('WebSocket is closed');
            },
            onWebSocketError: (event) => {
                console.error('WebSocket error:', event);
            },
        })

        try {
            client.activate()
        } catch (error) {
            console.log(error)
        }

    };


    const subscribe = (chatId) => {
        if (stomp && stomp.client && stomp.client.connected) {
            const subscribe = stomp.client.subscribe(`/channel/chat/${chatId}`, (message) => {
                const receivedMessage = JSON.parse(message.body);
                if (receivedMessage?.userId !== user?.id)
                    dispatch(setMessage(receivedMessage))
            });

            setSubscription(subscribe)

            setStompClient({ ...stompClient, subscription: subscribe });
        } else {
            console.log('WebSocket is not connected');
        }
    }

    const sendMessage = (message) => {
        if (stomp && stomp.client && stomp.client.connected) {
            stomp.client.publish({
                destination: `/app/message`,
                body: JSON.stringify(message),
            });
        } else {
            console.log('WebSocket is not connected');
        }
    };

    const unsubscribe = () => {
        if (subscription && subscription.unsubscribe) {
            subscription.unsubscribe();
        }
    };

    const disconnect = () => {
        stomp.client.deactivate();
    }

    return {
        connect,
        subscribe,
        unsubscribe,
        sendMessage,
        disconnect,
    };
};

export default WebSocketService;
