import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    verificationStatus: null,
    verificationMessage: null,
    passwordResetRequested: false,
    passwordResetMessage: null,
    passwordResetStatus: null,
    codeRegenerated: false,
    codeRegenerateMessage: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    loginWithPassword(state, action) {
      state.user = action.payload.data;
      state.token = action.payload.token;
      localStorage.setItem('token', state.token);
    },
    loginWithGoogle(state, action) {
      state.user = action.payload.data;
      state.token = action.payload.token;
      localStorage.setItem('token', state.token);
    },
    logout(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
    },
    verifyWithToken(state, action) {
      state.verificationStatus = action.payload.success;
      state.verificationMessage = action.payload.message;
    },
    verifyWithCode(state, action) {
      state.verificationStatus = action.payload.success;
      state.verificationMessage = action.payload.message;
    },
    requestPasswordReset(state, action) {
      state.passwordResetRequested = action.payload.success;
      state.passwordResetMessage = action.payload.message;
    },
    resetPassword(state, action) {
      state.passwordResetStatus = action.payload.success;
      state.passwordResetMessage = action.payload.message;
    },
    regenerateVerificationCode(state, action) {
      state.codeRegenerated = action.payload.success;
      state.codeRegenerateMessage = action.payload.message;
    },
    setAuthLoading(state, action) {
      state.isLoading = action.payload;
    },
    setAuthError(state, action) {
      state.error = action.payload.data;
    },
  },
});

export const { 
  loginWithPassword, 
  loginWithGoogle, 
  logout, 
  verifyWithToken, 
  verifyWithCode, 
  requestPasswordReset, 
  resetPassword, 
  regenerateVerificationCode, 
  setAuthLoading, 
  setAuthError 
} = authSlice.actions;

export default authSlice.reducer;
