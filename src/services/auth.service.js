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
    sendOtp: ({ mobile, hash }) => {

        return fetch_({
            url: endpoints.sendOtp,
            method: 'POST',
            headers: {
                [PUBLIC_REQUEST_KEY]: true
            },
            data: {
                mobile,
                hash
            }
        })
    },
    verifyOtp: (data) => {
        return fetch_({
            url: endpoints.verifyOtp,
            method: 'POST',
            headers: {
                [PUBLIC_REQUEST_KEY]: true
            },
            data: data
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