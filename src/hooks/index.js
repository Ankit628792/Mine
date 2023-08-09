import { useMutation, useQuery, useQueryClient } from "react-query"
import { showToast } from "../utils/FunctionHelper"
import { useDispatch } from "react-redux"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useNavigation } from "@react-navigation/native"
import { AUTH_TOKEN_KEY } from '../utils/constants'
import { AuthService } from "../services/auth.service"
import { UserService } from "../services/user.service"
import { ROUTES } from "../utils/routes"

export const useSendOtp = (callback) => {
    return useMutation(AuthService.sendOtp, {
        onSuccess: (response) => {
            if (response.id) {
                console.log("OTP sent successfully!!")
                showToast("OTP sent successfully!!")
                if (typeof callback == 'function') {
                    callback()
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
            if (res.success && res.data) {
                // dispatch(setUser(res.data));
            }
        },
    })
    return useMutation(AuthService.verifyOtp, {
        onSuccess: (response) => {
            if (response.jwtToken) {
                showToast("OTP Verified successfully!!")
                if (typeof callback == 'function') {
                    callback()
                }
                AsyncStorage.setItem(AUTH_TOKEN_KEY, response.jwtToken)
                if (response.on_boarding_process) {
                    navigator.navigate(ROUTES[response.on_boarding_process])
                }
                else {
                    navigator.navigate("Name")
                }
                // if (response.status == 'pending') {
                //     navigator.navigate("CompleteProfile")
                //     // navigate to complete profile
                // }
                // else if (response.status == 'active') {
                //     refetch();
                //     navigator.navigate("HomeScreen")
                // }
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
            if (response.success === true) {
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
