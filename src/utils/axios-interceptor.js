import axios from 'axios'
import { GetLocalStorage } from './FunctionHelper';
import { API_BASE_PATH, API_URL } from '../services/config';
import { AUTH_TOKEN_KEY, DEVICE_PAYLOAD_KEY, DEVICE_TOKEN_KEY, PUBLIC_REQUEST_KEY, TOKEN_PAYLOAD_KEY } from './constants';
import { createNavigationContainerRef } from '@react-navigation/native';

const navigationRef = createNavigationContainerRef()

export function navigate(name, params) {
    if (navigationRef.isReady()) {
        navigationRef.navigate(name, params);
    }
}

const fetch_ = axios.create({
    baseURL: `${API_URL}${API_BASE_PATH}`,
    timeout: 10000
})

// API Request interceptor
fetch_.interceptors.request.use(async config => {
    const jwtToken = await GetLocalStorage(AUTH_TOKEN_KEY)
    const deviceToken = await GetLocalStorage(DEVICE_TOKEN_KEY)
    config.headers['Content-Type'] = 'application/json'

    if (jwtToken) {
        config.headers[TOKEN_PAYLOAD_KEY] = `Bearer ${jwtToken}`;
    }
    if (deviceToken) {
        config.headers[DEVICE_PAYLOAD_KEY] = deviceToken;
    }

    if (!jwtToken && !config.headers[PUBLIC_REQUEST_KEY]) {
        // navigate(ENTRY_ROUTE);
    }

    return config
}, error => {
    Promise.reject(error)
})

// API response interceptor
fetch_.interceptors.response.use((response) => {

    const data = response.data;
    if (data.message) {
        // showToast(data.message);
    }
    return data;

}, (error) => {
    const { data = {}, status, statusText } = error?.response || {};
    data.description = data.message || statusText;
    data.message = data.error || statusText;
    data.statusCode = data.statusCode || status;

    return Promise.reject(data);
});

export default fetch_