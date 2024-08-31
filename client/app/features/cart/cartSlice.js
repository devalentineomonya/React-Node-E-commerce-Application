import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], 
  },
  reducers: {
    addItem(state, action) {
      const { product, quantity } = action.payload;
      const existingItem = state.items.find(item => item.product === product);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({ product, quantity });
      }
    },

    removeItem(state, action) {
      const productId = action.payload;
      state.items = state.items.filter(item => item.product !== productId);
    },

    updateQuantity(state, action) {
      const { product, quantity } = action.payload;
      const item = state.items.find(item => item.product === product);

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
