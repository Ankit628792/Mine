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
  userLocation: null,
  messages: [],
  stompClient: null
}

export const userSlice = createSlice({
  name: 'USER',
  initialState,
  reducers: {
    setAuth: state => {
      state.isAuth = !state.isAuth;
    },
    setUser: (state, action) => {
      if (action.payload?.id)
        AsyncStorage.setItem("user", action.payload?.id);
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
    setMessages: (state, action) => {
      if (action.payload) {
        state.messages = [...action.payload]
      }
    },
    setMessage: (state, action) => {
      if (action.payload) {
        state.messages.push(action.payload)
      }
    },
    setStompClient: (state, action) => {
      if (action.payload) {
        state.stompClient = action.payload.client
      }
    },
  },
});

export const { setAuth, setUser, setIntoUser, setProfileFilter, setUserLocation, setMessage, setMessages, setStompClient } = userSlice.actions;

export const selectUser = state => state.user.userInfo
export const selectFilter = state => state.user.profileFilter
export const selectUserLocation = state => state.user.userLocation
export const selectMessages = state => state.user.messages
export const selectStompClient = state => state.user.stompClient

export default userSlice.reducer

