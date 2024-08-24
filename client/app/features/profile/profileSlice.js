import { createSlice } from '@reduxjs/toolkit';

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    addresses: [],
    recentItems: [],
    likedItems: [],
    orders: [],
  },
  reducers: {
    setAddresses(state, action) {
      state.addresses = action.payload;
    },
    setRecentItems(state, action) {
      state.recentItems = action.payload;
    },
  },
});

export const { setAddresses, setRecentItems } = profileSlice.actions;
export default profileSlice.reducer;
