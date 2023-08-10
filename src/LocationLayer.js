import React from 'react';
import NavigationLayer from './NavigationLayer';
import { useQuery } from 'react-query';
import { AuthService } from './services/auth.service';
import { useDispatch } from 'react-redux';
import ActivityLoader from './components/ActivityLoader';
import { setUser } from './redux/user/user-slice';


const LocationLayer = () => {

    const dispatch = useDispatch();

    let { isLoading, isError, error, data: res } = useQuery('validateToken', AuthService.auth, {
        retry: false,
        onSuccess: (res) => {
            if (res.status && res.data) {
                dispatch(setUser(res.data));
            }
        },
    });

    return (
        <>
            {
                (isLoading) ?
                    <ActivityLoader />
                    :
                    (
                        <NavigationLayer user={res?.data || null} authenticated={!isError} />
                    )
            }
        </>
    );
};

export default LocationLayer;
