// export const API_URL = 'https://8ae3-103-165-28-24.ngrok-free.app';
export const API_URL = 'http://3.137.159.219';

// export const SOCKET_URL = 'ws://68be-2401-4900-5fc3-c502-2450-6a93-b968-a8b0.ngrok-free.app' 
export const SOCKET_URL = 'ws://3.137.159.219' 

const SWAGGER = 'http://3.137.159.219/swagger-ui.html';

export const API_BASE_PATH = '/api/v1';

export const endpoints = {
  auth: '/validateToken',
  sendOtp: '/generateOtp',
  verifyOtp: '/verifyOtp',
  logout: '/auth/logout',
  profile: '/profile',
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
