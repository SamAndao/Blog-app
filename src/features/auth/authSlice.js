import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { accessToken: null, username: null, userId: null },
  reducers: {
    setToken: (state, action) => {
      const { accessToken } = action.payload;
      state.accessToken = accessToken;
    },
    setCredentials: (state, action) => {
      const { username, userId } = action.payload;
      state.userId = userId;
      state.username = username;
    },
    logout: (state, action) => {
      state.userId = null;
      state.username = null;
      state.accessToken = null;
    },
  },
});

export const { setCredentials, logout, setToken } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentToken = (state) => state.auth.token;
export const selectCurrentUsername = (state) => state.auth.username;
export const selectCurrentUserId = (state) => state.auth.userId;
