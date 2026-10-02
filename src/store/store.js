import { configureStore } from '@reduxjs/toolkit';
import { storage } from '../utils/storage';
import cartReducer, {
  addToCart,
  decrementCartItem,
  removeFromCart,
  clearCart,
  placeDemoOrder,
} from './slices/cartSlice';

const cartPersistenceMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  if ([addToCart.type, decrementCartItem.type, removeFromCart.type, clearCart.type, placeDemoOrder.type].includes(action.type)) {
    storage.setItem('quickbite_cart', store.getState().cart.items);
  }
  return result;
};

export const store = configureStore({
  reducer: { cart: cartReducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(cartPersistenceMiddleware),
});
