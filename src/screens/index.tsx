import React from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import {NonProtectedRoutes} from '../routes/NonProtectedRoutes';
import {ProtectedRoutes} from '../routes/ProtectedRoutes';

const AppComponent = () => {
  const {isAuth} = useSelector((store: RootState) => store.user);
  return <>{isAuth ? <ProtectedRoutes /> : <NonProtectedRoutes />}</>;
};

export default AppComponent;
