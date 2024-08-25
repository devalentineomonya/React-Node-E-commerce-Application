import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    setLoggedIn(state, action) {
      state.user = action.payload.data;
      state.token = action.payload.token;
      localStorage.setItem('token', state.token);
      localStorage.setItem('userId', state.user._id);
    },
    setAuthLoading(state, action) {
      state.isLoading = action.payload;
    },
    setAuthError(state, action) {
      state.error = action.payload.data;
    },
    setUser(state, action) {
      state.user = action.payload;
    },
    
    clearUser(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.removeItem('redirectTo');
    },
  },
});

export const {
  setLoggedIn,
  setAuthLoading,
  setAuthError,
  setUser,
  clearUser,
  setToken
} = authSlice.actions;

export default authSlice.reducer;
