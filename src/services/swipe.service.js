import HttpService from '../utils/axios-interceptor';
import { endpoints } from './config';

const fetchAllProfiles = (page) => HttpService.get(endpoints.allProfile + `?pageNumber=${page || 0}`);
const getAllLikes = () => HttpService.get(endpoints.likes);
const getAllUserMatch = () => HttpService.get(endpoints.match + endpoints.match + 'es');
const getAllChats = () => HttpService.get(endpoints.chats);
const getAllMessages = (chatId) => chatId ? HttpService.get(endpoints.message + "/" + chatId) : {};

const profileAction = (data) => HttpService.post('/doaction', data);
const acceptLike = (data) => HttpService.post('/acceptUser', data);

export const SwipeService = {
  fetchAllProfiles,
  getAllLikes,
  getAllUserMatch,
  getAllChats,
  profileAction,
  acceptLike,
  getAllMessages
};
