import axios from "axios"
import { GetLocalStorage } from "../utils/FunctionHelper"
import { API_BASE_PATH, API_URL, endpoints } from "./config"
import { AUTH_TOKEN_KEY, TOKEN_PAYLOAD_KEY } from "../utils/constants"

import HttpService from '../utils/axios-interceptor';

const updateFilter = data => HttpService.patch(endpoints.filter, data);
const getFilters = () => HttpService.get(endpoints.filter);

const updateProfile = data => HttpService.patch(endpoints.profile, data);

const getProfile = () => HttpService.get(endpoints.profile);
const getImages = () => HttpService.get(endpoints.images);

const fetchProfileById = (id) => id ? HttpService.get(endpoints.profile + '/' + id) : {}

const deleteImage = (id) => HttpService.delete(endpoints.images + "/" + id);

export const uploadImage = async (data) => {
    const jwtToken = await GetLocalStorage(AUTH_TOKEN_KEY)
    return axios.post(`${API_URL}${API_BASE_PATH}/images`, data, {
        headers: {
            'Content-Type': 'multipart/form-data',
            [TOKEN_PAYLOAD_KEY]: `Bearer ${jwtToken}`
        }
    })
}
export const uploadProfileImage = async (data) => {
    const jwtToken = await GetLocalStorage(AUTH_TOKEN_KEY)
    return axios.patch(`${API_URL}${API_BASE_PATH}/ProfilePic`, data, {
        headers: {
            'Content-Type': 'multipart/form-data',
            [TOKEN_PAYLOAD_KEY]: `Bearer ${jwtToken}`
        }
    })
}
export const updateImage = async (id, data) => {
    const jwtToken = await GetLocalStorage(AUTH_TOKEN_KEY)
    return axios.patch(`${API_URL}${API_BASE_PATH}/images/${id}`, data, {
        headers: {
            'Content-Type': 'multipart/form-data',
            [TOKEN_PAYLOAD_KEY]: `Bearer ${jwtToken}`
        }
    })
}

export const UserService = {
    updateProfile,
    getProfile,
    getImages,
    deleteImage,
    updateFilter,
    getFilters,
    fetchProfileById
};
