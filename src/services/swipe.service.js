import HttpService from '../utils/axios-interceptor';

const rightSwipe = data => {
  //   HttpService.post('/swipe', data);
  console.log('rightSwipe', data);
};

const leftSwipe = data => {
  // HttpService.post('/swipe', data);
  console.log('leftSwipe', data);
};

const upSwipe = data => {
  //   HttpService.post('/swipe', data);
  console.log('upSwipe', data);
};

const fetchCards = () => {
  //   HttpService.get('/swipe');
  console.log('fetchCards');
};

const SwipeService = {
  rightSwipe,
  leftSwipe,
  upSwipe,
  fetchCards,
};

export default SwipeService;
