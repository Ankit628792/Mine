import React, { useState, useEffect } from 'react';
import { Client } from '@stomp/stompjs';
import { useDispatch } from 'react-redux';
import { TextEncoder, TextDecoder } from 'text-encoding';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

const WebSocketService = (chatId) => {
    const dispatch = useDispatch();
    const [stompClient, setStompClient] = useState(null);

    const connect = () => {
        const client = new Client();

        client.configure({
            brokerURL: 'ws://3.137.159.219/ichat',
            connectionTimeout: 10000,
            debug: e => console.log("debug ", e),
            onConnect: () => {
                console.log('Connected to the WebSocket');
                const subscription = client.subscribe(`ws://3.137.159.219/channel/chat/${chatId}`, (message) => {
                    const receivedMessage = JSON.parse(message.body);
                    console.log(receivedMessage);
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
                destination: `ws://3.137.159.219/app/messages/${chatId}`,
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
