import React, { useEffect, useState } from 'react';
import NetInfo from '@react-native-community/netinfo';
import NetworkUnavailable from './components/NetworkNotAvailable';
import ActivityLoader from './components/ActivityLoader';
import NavigationLayer from './NavigationLayer';
import LocationLayer from './LocationLayer';

const NetworkLayer = () => {
  const [loading, setLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      {loading ? (
        <ActivityLoader />
      ) : isConnected ? (
        <LocationLayer />
        // <NavigationLayer user={null} />
      ) : (
        <NetworkUnavailable />
      )}
    </>
  );
};

export default NetworkLayer;
