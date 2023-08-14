import {configureStore} from '@reduxjs/toolkit';
import userReducer from './user/user-slice';
import cardsReducer from './card/card-slice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    cardsData: cardsReducer,
  },
});
