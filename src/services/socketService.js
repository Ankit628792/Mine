import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { TextEncoder, TextDecoder } from 'text-encoding';
import { setMessage } from '../redux/user/user-slice';
import { Client } from '@stomp/stompjs';
import { API_URL, SOCKET_URL } from './config';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

const WebSocketService = () => {
    const dispatch = useDispatch();
    const [stompClient, setStompClient] = useState(null);

    const connect = () => {

        let client = new Client({
            brokerURL: `${SOCKET_URL}/ichat`,
            debug: (str) => { console.log("#### DEBUG STOMP: #####", str); },
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
            forceBinaryWSFrames: true,
            appendMissingNULLonIncoming: true,
            logRawCommunication: true,
            onConnect: () => {
                console.log('Connected to the WebSocket');
                setStompClient({ client });
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
        if (stompClient && stompClient.client && stompClient.client.connected) {

            const subscription = stompClient.client.subscribe(SOCKET_URL + `/channel/chat/${chatId}`, (message) => {
                const receivedMessage = JSON.parse(message.body);

                console.log("receivedMessage", receivedMessage);
                dispatch(setMessage(receivedMessage))
            });
            setStompClient({ ...stompClient, subscription });
        } else {
            console.log('WebSocket is not connected');
        }
    }

    const sendMessage = (message) => {
        if (stompClient && stompClient.client && stompClient.client.connected) {
            stompClient.client.publish({
                destination: API_URL + `/app/messages`,
                body: JSON.stringify(message),
            });
        } else {
            console.log('WebSocket is not connected');
        }
    };

    const disconnect = () => {
        if (stompClient && stompClient.subscription) {
            stompClient.subscription.unsubscribe();
        }
    };

    useEffect(() => {
        connect();
        return () => {
            if (stompClient && stompClient.client) {
                stompClient.client.deactivate();
            }
        };
    }, []);

    return {
        subscribe,
        sendMessage,
        disconnect,
    };
};

export default WebSocketService;
