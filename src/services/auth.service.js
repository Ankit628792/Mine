import {endpoints} from './config';
import HttpService from '../utils/axios-interceptor';

const auth = () => {
  return HttpService.get(endpoints.auth);
};

const sendOtp = data => {
  return HttpService.post(
    endpoints.sendOtp + `/${data.countryCode}/${data.mobile}`,
    data,
  );
};

const verifyOtp = data => {
  return HttpService.post(
    endpoints.verifyOtp +
      `?phoneNumber=${data.phoneNumber}&otp=${data.otp}&deviceToken=${data.deviceToken}`,
    data,
  );
};

const logOut = ({_id}) => {
  return HttpService.patch(endpoints.logout, {_id});
};

export const AuthService = {
  auth,
  sendOtp,
  verifyOtp,
  logOut,
};
