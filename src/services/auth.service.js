
import { endpoints } from './config';
import HttpService from '../utils/axios-interceptor';

export const AuthService = {
    auth: () => {
        return HttpService.get(endpoints.auth);
    },
    sendOtp: data => {
        return HttpService.post(endpoints.sendOtp + `/${data.countryCode}/${data.mobile}`, data);
    },
    verifyOtp: data => {
        return HttpService.post(endpoints.verifyOtp + `?phoneNumber=${data.phoneNumber}&otp=${data.otp}&deviceToken=${data.fcmToken}`, data);
    },
    logOut: ({ _id }) => {
        return HttpService.patch(endpoints.logout, { _id });
    },
};