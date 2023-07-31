import fetch_ from "../utils/axios-interceptor"
import { endpoints } from "./config"

export const UserService = {
    updateProfile: (data) => {
        return fetch_({
            url: endpoints.profile,
            method: 'PATCH',
            data: data
        })
    },

}