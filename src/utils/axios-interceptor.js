import axios from 'axios';
import { GetLocalStorage } from './FunctionHelper';
import { API_BASE_PATH, API_URL } from '../services/config';
import {
  AUTH_TOKEN_KEY,
  DEVICE_PAYLOAD_KEY,
  DEVICE_TOKEN_KEY,
  PUBLIC_REQUEST_KEY,
  TOKEN_PAYLOAD_KEY,
} from './constants';

const _axios = axios.create({
  baseURL: `${API_URL}${API_BASE_PATH}`,
  timeout: 10000,
});

const configure = () => {
  _axios.interceptors.request.use(config => {
    const jwtToken = GetLocalStorage(AUTH_TOKEN_KEY);
    const deviceToken = GetLocalStorage(DEVICE_TOKEN_KEY);
    config.headers['Content-Type'] = 'application/json';
    if (jwtToken) {
      config.headers[TOKEN_PAYLOAD_KEY] = `Bearer ${jwtToken}`;
    }
    if (deviceToken) {
      config.headers[DEVICE_PAYLOAD_KEY] = deviceToken;
    }
    if (!jwtToken && !config.headers[PUBLIC_REQUEST_KEY]) {
      // navigate(ENTRY_ROUTE);
    }
    return config;
  });
  _axios.interceptors.response.use(
    response => {
      const data = response.data;
      if (data.message) {
        // showToast(data.message);
      }
      return data;
    },
    error => {
      const { data = {}, status, statusText } = error?.response || {};
      data.description = data.message || statusText;
      data.message = data.error || statusText;
      data.statusCode = data.statusCode || status;
      return error;
    },
  );
};

const getAxiosClient = () => _axios;

const HttpService = {
  configure,
  getAxiosClient,
  get: getAxiosClient().get,
  post: getAxiosClient().post,
  put: getAxiosClient().put,
  patch: getAxiosClient().patch,
  delete: getAxiosClient().delete,
};

export default HttpService;
