import axios from "axios"
import { GetLocalStorage } from "../utils/FunctionHelper"
import fetch_ from "../utils/axios-interceptor"
import { endpoints } from "./config"
import { TOKEN_PAYLOAD_KEY } from "../utils/constants"

export const UserService = {
    updateProfile: (data) => {
        return fetch_({
            url: endpoints.profile,
            method: 'PATCH',
            data: data
        })
    },
    updateProfilePic: (data) => {
        return fetch_({
            url: endpoints.profilePic,
            method: 'PATCH',
            data: data
        })
    },

    deleteImage: (data) => {
        return fetch_({
            url: endpoints.image + "/" + data,
            method: 'DELETE',
        })
    },
}

export const uploadImage = async (data) => {
    const jwtToken = await GetLocalStorage(AUTH_TOKEN_KEY)
    return axios.patch(`${API_URL}${API_BASE_PATH}/image`, data, {
        headers: {
            'Content-Type': 'multipart/form-data',
            [TOKEN_PAYLOAD_KEY]: `Bearer ${jwtToken}`
        }
    })
}
export const updateImage = async (data) => {
    const jwtToken = await GetLocalStorage(AUTH_TOKEN_KEY)
    return axios.patch(`${API_URL}${API_BASE_PATH}/image/${data.id}`, data, {
        headers: {
            'Content-Type': 'multipart/form-data',
            [TOKEN_PAYLOAD_KEY]: `Bearer ${jwtToken}`
        }
    })
}
