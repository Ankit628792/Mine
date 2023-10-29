import React, { useState, useEffect } from 'react';
import { Client } from '@stomp/stompjs';
import { useDispatch } from 'react-redux';
import { TextEncoder, TextDecoder } from 'text-encoding';
import { setMessage } from '../redux/user/user-slice';
import { SOCKET_URL } from './config';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

const WebSocketService = (chatId) => {
    const dispatch = useDispatch();
    const [stompClient, setStompClient] = useState(null);

    const connect = () => {
        const client = new Client();

        client.configure({
            brokerURL: SOCKET_URL + '/ichat',
            connectionTimeout: 10000,
            debug: e => console.log("debug ", e),
            onConnect: () => {
                console.log('Connected to the WebSocket');
                const subscription = client.subscribe(SOCKET_URL + `/channel/chat/${chatId}`, (message) => {
                    const receivedMessage = JSON.parse(message.body);
                    dispatch(setMessage(receivedMessage))
                });
                setStompClient({ client, subscription });
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
        });
        try {
            client.activate();
        } catch (error) {
            console.log(error)
        }
    };

    const sendMessage = (message) => {
        if (stompClient && stompClient.client && stompClient.client.connected) {
            stompClient.client.publish({
                destination: SOCKET_URL + `/app/messages/${chatId}`,
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
        sendMessage,
        disconnect,
    };
};

export default WebSocketService;
