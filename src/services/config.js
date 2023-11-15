export const API_URL = 'https://mine-api.delanki.com';

export const SOCKET_URL = 'wss://mine-api.delanki.com';

const SWAGGER = 'http://52.15.196.242/swagger-ui.html';

export const API_BASE_PATH = '/api/v1';

export const endpoints = {
  auth: '/validateToken',
  sendOtp: '/generateOtp',
  verifyOtp: '/verifyOtp',
  logout: '/auth/logout',
  profile: '/profile',
  report: '/report',
  profilePic: '/ProfilePic',
  image: '/image',
  images: '/images',
  allProfile: '/allProfile',
  likes: '/likes',
  match: '/match',
  filter: '/filter',
  chats: '/chats',
  message:'/message'
};
