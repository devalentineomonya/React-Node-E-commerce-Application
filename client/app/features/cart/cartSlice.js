import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], 
  },
  reducers: {
    addItem(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.product?._id === newItem.product?._id);

      if (existingItem) {
        existingItem.quantity += newItem.quantity;
      } else {
        state.items.push(newItem);
      }
    },

    removeItem(state, action) {
      const productId = action.payload;
      state.items = state.items.filter(item => item.product?._id !== productId);
    },

    updateQuantity(state, action) {
      const { productId, quantity } = action.payload;
      const item = state.items.find(item => item.product?._id === productId);

      if (item) {
        item.quantity = quantity;
      }
    },

    clearCart(state) {
      state.items = [];
    },

    setCartContent(state, action) {
      state.items = action.payload; 
    },
  },
});

export const { addItem, removeItem, updateQuantity, clearCart, setCartContent } = cartSlice.actions;
export default cartSlice.reducer;
