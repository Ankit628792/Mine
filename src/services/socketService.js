import React, { useState, useEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { Client } from '@stomp/stompjs';
import { useDispatch } from 'react-redux';
import { TextEncoder, TextDecoder } from 'text-encoding';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

const WebSocketService = (chatId) => {
    const dispatch = useDispatch()
    const [stompClient, setStompClient] = useState(null);

    const connect = () => {
        const client = new Client();
        client.configure({
            brokerURL: 'ws://3.137.159.219',
            onConnect: () => {
                console.log('Connected to the WebSocket');
                client.subscribe(`/channel/chat/${chatId}`, (message) => {
                    const receivedMessage = JSON.parse(message.body);
                    console.log(receivedMessage)
                });
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
        client.activate();
        setStompClient(client);
    };

    const sendMessage = (message) => {
        if (stompClient && stompClient.connected) {
            stompClient.publish({
                destination: '/app/messages',
                body: JSON.stringify(message),
            });
        } else {
            console.log('WebSocket is not connected');
        }
    };

    const disconnect = () => {
        stompClient.unsubscribe();
    }

    useEffect(() => {
        connect();
        return () => {
            if (stompClient) {
                stompClient.deactivate();
            }
        };
    }, []);

    return {
        sendMessage,
        disconnect
    };
};

export default WebSocketService;
