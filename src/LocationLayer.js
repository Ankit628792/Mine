import React from 'react';
import NavigationLayer from './NavigationLayer';
import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import ActivityLoader from './components/ActivityLoader';
import { selectUser, selectUserLocation, setUser, setUserLocation } from './redux/user/user-slice';
import { AuthService } from './services/auth.service';
import Splash from './components/Splash';
import Geolocation from '@react-native-community/geolocation';
import { RESULTS } from 'react-native-permissions';
import { PermissionsAndroid, Platform, Alert, Linking } from 'react-native';
import LocationNotAvailable from './components/LocationNotAvailable'
import { useState, useEffect } from 'react';
import { useUpdateProfile } from './hooks';
import WebSocketService from './services/socketService';

Geolocation.setRNConfiguration({
  skipPermissionRequests: false,
  authorizationLevel: 'auto',
  locationProvider: 'auto'
})

const LocationLayer = () => {
  const dispatch = useDispatch();
  const [primaryLoading, setPrimaryLoading] = useState(true);
  const [locationPermissionDenied, setLocationPermissionDenied] = useState(false);
  const [loading, setLoading] = useState(true);
  const userLocation = useSelector(selectUserLocation);
  const user = useSelector(selectUser);
  const [intervalId, setIntervalId] = useState()
  const { connect } = WebSocketService();
  const { isFetching, isError, data: res } = useQuery('validateToken', AuthService.auth, {
    retry: false,
    onSuccess: res => {
      if (res?.status && res?.data) {
        dispatch(setUser(res?.data));
      }
    },
  });
  const { mutate: updateProfile, isLoading } = useUpdateProfile(() => setLoading(false))
  useEffect(() => {
    if (userLocation && res?.data) {
      let { latitude, longitude } = userLocation;
      updateProfile({
        longitude: `${longitude}`,
        latitude: `${latitude}`
      })
    }
    else if (res?.status == 401) {
      setLoading(false)
    }
  }, [userLocation, res?.data])

  const openSetting = () => {
    if (Platform.OS === 'android') {
      Linking.openSettings();
      setTimeout(() => requestLocationPermission(), 10000)
    } else if (Platform.OS === 'ios') {
      Linking.openURL('app-settings:');
      setTimeout(() => requestLocationPermission(), 10000)
    }
  }

  const showAlert = () => {
    if (!userLocation && !locationPermissionDenied) {
      Alert.alert(
        'Location is required',
        'Please provide location access to get the profiles nearby you',
        [
          {
            text: 'Ok',
            onPress: () => openSetting()
          },
        ],
      );
    }
  };

  const getCurrentLocation = async () => {
    try {
      Geolocation.getCurrentPosition((info) => {
        if (info?.coords) {
          setLocationPermissionDenied(true);
          dispatch(setUserLocation(info?.coords));
          setPrimaryLoading(false);
        }
        else {
          dispatch(setUserLocation(false));
        }
      }, (err) => {
        dispatch(setUserLocation(false));
        if (err?.message == "No location provider available.") {
          Alert.alert(
            'Location is required',
            'Please provide location access to get the profiles nearby you',
            [
              {
                text: 'Ok',
              },
            ],
          );
        }
      },
        {
          distanceFilter: 0.1,
          interval: 7000,
          fastestInterval: 5000,
        }
      )
    } catch (error) {
      setUserLocation(false)
    }
  };


  const requestLocationPermission = async () => {
    try {
      let result;
      if (Platform.OS == 'ios') {
        Geolocation.requestAuthorization(() => { result = RESULTS.GRANTED }, () => { result = RESULTS.DENIED })
      }
      else {
        result = await PermissionsAndroid.request('android.permission.ACCESS_FINE_LOCATION', {
          title: 'Location is required',
          message: 'Please provide location access to get the profiles nearby you',
          buttonPositive: 'Ok',
        });
      }

      setPrimaryLoading(false);
      if (result == RESULTS.GRANTED) {
        setLocationPermissionDenied(true);
        getCurrentLocation();
      } else if (result === RESULTS.DENIED) {
        showAlert();
      }
      else {
        showAlert()
      }
    } catch (error) {
      console.warn("error.message : ", error.message)
      console.info('No location provider available.')
      if (error.message == 'No location provider available.') {
        Linking.openSettings();
      }
      console.error('Error requesting location permission:', error);
    }
  };



  useEffect(() => {
    requestLocationPermission();
  }, []);

  useEffect(() => {
    if (!primaryLoading) {
      setIntervalId(setInterval(() => {
        getCurrentLocation()
      }, 5000))
    }
    return () => { }
  }, [primaryLoading])

  useEffect(() => {
    if (userLocation) {
      setLoading(false);
      clearInterval(intervalId)
    }
  }, [userLocation])

  useEffect(() => {
    if (res?.data || user) {
      connect();
    }
  }, [res, user])

  return (
    <>
      {(primaryLoading || isFetching) ?
        <Splash />
        :
        (!locationPermissionDenied && !Boolean(userLocation)) ?
          <LocationNotAvailable />
          :
          (res ? loading : false) ?
            <Splash />
            :
            (userLocation) ?
              (
                <NavigationLayer user={res?.data ? res?.data : null} authenticated={!isError} />
              )
              :
              <LocationNotAvailable />
      }
    </>
  );
};

export default LocationLayer;
