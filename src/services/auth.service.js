import fetch_ from "../utils/axios-interceptor"
import { endpoints } from "./config"
import { PUBLIC_REQUEST_KEY } from "../utils/constants"

export const AuthService = {
    auth: () => {
        return fetch_({
            url: endpoints.auth,
            method: 'GET'
        })
    },
    sendOtp: (data) => {

        return fetch_({
            url: endpoints.sendOtp + `/${data.countryCode}/${data.mobile}`,
            method: 'POST',
            headers: {
                [PUBLIC_REQUEST_KEY]: true
            },
            data
        })
    },
    verifyOtp: (data) => {
        return fetch_({
            url: endpoints.verifyOtp + `?phoneNumber=${data.phoneNumber}&otp=${data.otp}&deviceToken=${data.fcmToken}`,
            method: 'POST',
            headers: {
                [PUBLIC_REQUEST_KEY]: true
            },
        })
    },
    logOut: ({ _id }) => {
        return fetch_({
            url: endpoints.logout,
            method: 'PATCH',
            headers: {
                [PUBLIC_REQUEST_KEY]: true
            },
            data: {
                _id: _id
            }
        })
    },
}
