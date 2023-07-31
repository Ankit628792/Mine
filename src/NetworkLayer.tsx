import React, { useEffect, useState } from 'react';
import NetInfo from '@react-native-community/netinfo';
import NetworkUnavailable from './components/NetworkNotAvailable'
import ActivityLoader from './components/ActivityLoader';
import NavigationLayer from './NavigationLayer';
import { Text } from 'react-native';

const NetworkLayer = () => {
    const [loading, setLoading] = useState(true)
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener((state: any) => {
            setIsConnected(state.isConnected);
            setLoading(false);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <>
            {
                loading ?
                    <ActivityLoader />
                    :
                    isConnected ? (
                        <NavigationLayer user={null} />
                        // <Text>Hello</Text>
                    ) : (
                        <NetworkUnavailable />
                    )}
        </>
    );
}

export default NetworkLayer