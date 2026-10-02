import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  order: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    hydrateCart: (state, action) => {
      state.items = Array.isArray(action.payload) ? action.payload : [];
    },
    addToCart: (state, action) => {
      const existing = state.items.find((entry) => entry.product.id === action.payload.id);
      if (existing) existing.quantity += 1;
      else state.items.push({ product: action.payload, quantity: 1 });
    },
    decrementCartItem: (state, action) => {
      const entry = state.items.find((item) => item.product.id === action.payload);
      if (!entry) return;
      if (entry.quantity <= 1) {
        state.items = state.items.filter((item) => item.product.id !== action.payload);
      } else {
        entry.quantity -= 1;
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.product.id !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
    },
    placeDemoOrder: (state, action) => {
      state.order = { ...action.payload, currentStep: 0 };
      state.items = [];
    },
    advanceDemoOrder: (state) => {
      if (state.order) state.order.currentStep = Math.min(state.order.currentStep + 1, 3);
    },
    clearDemoOrder: (state) => {
      state.order = null;
    },
  },
});

export const {
  hydrateCart,
  addToCart,
  decrementCartItem,
  removeFromCart,
  clearCart,
  placeDemoOrder,
  advanceDemoOrder,
  clearDemoOrder,
} = cartSlice.actions;

export default cartSlice.reducer;
