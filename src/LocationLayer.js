import React from 'react';
import NavigationLayer from './NavigationLayer';
import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import ActivityLoader from './components/ActivityLoader';
import { setUser } from './redux/user/user-slice';
import { AuthService } from './services/auth.service';
import Splash from './components/Splash';

const LocationLayer = () => {
  const dispatch = useDispatch();

  const queryConfig = {
    retry: false,
    onSuccess: res => {
      if (res.status && res.data) {
        dispatch(setUser(res.data));
      }
    },
  };

  const {
    isLoading,
    isError,
    data: res,
  } = useQuery('validateToken', AuthService.auth, queryConfig);

  return (
    <>
      {isLoading ? (
        <ActivityLoader />
      ) : (
        <RenderNavigationLayer res={res} isError={isError} />
      )}
    </>
  );
};

const RenderNavigationLayer = ({ res, isError }) => {
  if (isError) {
    return <div>Error occurred: {isError}</div>;
  }

  // return <Splash />
  return <NavigationLayer user={res?.data || null} authenticated={!isError} />;
};

export default LocationLayer;
