import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuth: false,
  userInfo: null,
  profileFilter: {
    distance: 1000,
    maxAge: 60,
    minAge: 18
  },
  userLocation: null
}

export const userSlice = createSlice({
  name: 'USER',
  initialState,
  reducers: {
    setAuth: state => {
      state.isAuth = !state.isAuth;
    },
    setUser: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      if (action.payload?._id)
        AsyncStorage.setItem("user", action.payload?._id);
      state.userInfo = action.payload || null
    },
    setIntoUser: (state, action) => {
      if (action.payload)
        state.userInfo = { ...state.userInfo, ...action.payload }
    },

    setProfileFilter: (state, action) => {
      if (action.payload)
        state.profileFilter = action.payload
    },
    setUserLocation: (state, action) => {
      state.userLocation = action.payload
    },
  },
});

export const { setAuth, setUser, setIntoUser, setProfileFilter, setUserLocation } = userSlice.actions;

export const selectUser = state => state.user.userInfo
export const selectFilter = state => state.user.profileFilter
export const selectUserLocation = state => state.user.userLocation

export default userSlice.reducer

