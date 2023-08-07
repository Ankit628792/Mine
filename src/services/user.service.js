import HttpService from '../utils/axios-interceptor';
import {endpoints} from './config';

export const UserService = {
  updateProfile: data => {
    return HttpService.patch(endpoints.profile, data);
  },
};
