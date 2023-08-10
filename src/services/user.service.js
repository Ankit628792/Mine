import axios from "axios"
import { GetLocalStorage } from "../utils/FunctionHelper"
import { API_BASE_PATH, API_URL, endpoints } from "./config"
import { AUTH_TOKEN_KEY, TOKEN_PAYLOAD_KEY } from "../utils/constants"

import HttpService from '../utils/axios-interceptor';

const updateProfile = data => {
    return HttpService.patch(endpoints.profile, data);
};

export const uploadImage = async (data) => {
    const jwtToken = await GetLocalStorage(AUTH_TOKEN_KEY)
    return axios.post(`${API_URL}${API_BASE_PATH}/images`, data, {
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


export const UserService = {
    updateProfile
};
