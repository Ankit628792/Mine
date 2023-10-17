import { useMutation, useQuery, useQueryClient } from "react-query"
import { showToast } from "../utils/FunctionHelper"
import { useDispatch } from "react-redux"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useNavigation } from "@react-navigation/native"
import { AUTH_TOKEN_KEY } from '../utils/constants'
import { AuthService } from "../services/auth.service"
import { UserService } from "../services/user.service"
import { ROUTES } from "../utils/routes"
import { setUser } from "../redux/user/user-slice"
import { SwipeService } from "../services/swipe.service"

export const useSendOtp = (callback) => {
    return useMutation(AuthService.sendOtp, {
        onSuccess: (response) => {
            if (response.status) {
                console.log("OTP sent successfully!!")
                showToast("OTP sent successfully!!")
                if (typeof callback == 'function') {
                    callback({ initialOtp: response.data.actualOtp })
                }
            } else {
                console.error(response.message)
            }
        },
        onError: (e) => {
            showToast("Oops! Unable to send OTP")
            console.error("Oops! Unable to send OTP")
        }
    })
}

export const useLogout = (callback) => {
    const queryClient = useQueryClient();
    return useMutation(AuthService.logOut, {
        onSuccess: (response) => {
            if (response.success === true) {
                socketServices.disconnect();
                if (typeof callback == 'function') {
                    callback();
                }
                //invalidate queries
                console.log("Logout successfully!!")
            } else {
                console.error(response.message)
            }
        },
        onError: (e) => {
            console.error("Oops! Unable to logout")
        }
    });
};

export const useVerifyOtp = (callback) => {
    const dispatch = useDispatch();
    const navigator = useNavigation();
    let { refetch } = useQuery('validateToken', AuthService.auth, {
        enabled: false,
        retry: false,
        onSuccess: (res) => {
            if (res.status && res.data) {
                dispatch(setUser(res.data));
            }
        },
    })
    return useMutation(AuthService.verifyOtp, {
        onSuccess: async (response) => {
            if (response.data.jwtToken) {
                showToast("OTP Verified successfully!!")
                if (typeof callback == 'function') {
                    callback()
                }
                await AsyncStorage.setItem(AUTH_TOKEN_KEY, response.data.jwtToken);
                refetch();
                if (response.data.onBoardingProcess) {
                    navigator.navigate(ROUTES[response.data.onBoardingProcess - 1].name)
                }
                else {
                    navigator.navigate("Name")
                }
            } else {
                showToast(response.message)
            }
        },
        onError: (e) => {
            showToast("Oops! Unable to verify OTP")
            console.error("Oops! Unable to verify OTP")
        }

    })
}

export const useUpdateProfile = callback => {
    return useMutation(UserService.updateProfile, {
        onSuccess: response => {
            if (response.status === true) {
                // showToast('Profile Updated successfully!!');
                if (typeof callback == 'function') {
                    callback();
                }
            } else {
                showToast(response.message);
            }
        },
        onError: e => {
            showToast('Oops! Unable to Update profile');
            console.error('Oops! Unable to Update profile');
        },
    });
};

export const useUpdateFilter = callback => {
    return useMutation(UserService.updateFilter, {
        onSuccess: response => {
            if (response.status === true) {
                showToast("Filter Applied Successfully!")
                if (typeof callback == 'function') {
                    callback();
                }
            } else {
                showToast(response.message);
            }
        },
        onError: e => {
            console.log(e)
            showToast('Oops! Unable to Update filter');
            console.error('Oops! Unable to Update filter');
        },
    });
};

export const useAcceptLike = callback => {
    const queryClient = useQueryClient()
    return useMutation(SwipeService.acceptLike, {
        onSuccess: response => {
            if (response.status === true) {
                queryClient.invalidateQueries('getAllUserMatch')
                if (typeof callback == 'function') {
                    callback();
                }
            } else {
                showToast(response.message);
            }
        },
        onError: e => {
            showToast('Oops! Unable to accept request');
            console.error('Oops! Unable to accept request');
        },
    });
};

export const useProfileAction = callback => {
    return useMutation(SwipeService.profileAction, {
        onSuccess: response => {
            console.log("useProfileAction", response)
            if (response.status === true) {
                if (typeof callback == 'function') {
                    callback(response?.data);
                }
            } else {
                showToast(response.message);
            }
        },
        onError: e => {
            console.log(e)
            console.error('Oops! Unable to like profile');
        },
    });
};
