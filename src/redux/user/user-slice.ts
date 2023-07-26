import {createSlice} from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'USER',
  initialState: {
    isAuth: false,
  },
  reducers: {
    setAuth: state => {
      state.isAuth = !state.isAuth;
    },
  },
});

export const {setAuth} = userSlice.actions;
