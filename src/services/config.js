// export const API_URL = 'http://10.0.2.2:9090';
export const API_URL = 'http://3.137.159.219';

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
};
