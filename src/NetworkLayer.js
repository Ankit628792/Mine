import React, {useEffect, useState} from 'react';
import NetInfo from '@react-native-community/netinfo';
import NetworkUnavailable from './components/NetworkNotAvailable';
import ActivityLoader from './components/ActivityLoader';
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

  return <NetworkRenderer loading={loading} isConnected={isConnected} />;
};

const NetworkRenderer = ({loading, isConnected}) => {
  if (loading) {
    return <ActivityLoader />;
  } else if (isConnected) {
    return <LocationLayer />;
  } else {
    return <NetworkUnavailable />;
  }
};

export default NetworkLayer;
