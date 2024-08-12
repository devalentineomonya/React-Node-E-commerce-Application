import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import userReducer from "./features/user/userSlice"
// import profileReducer from '../features/profile/profileSlice';
// import cartReducer from '../features/cart/cartSlice';
// import couponReducer from '../features/coupon/couponSlice';
// import reviewsReducer from '../features/reviews/reviewsSlice';
// import { productsApi } from '../features/products/productsAPI';
import { authApi } from './features/auth/authAPI';
import { userApi } from "./features/user/userAPI"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    // profile: profileReducer,
    // cart: cartReducer,
    // coupon: couponReducer,
    // reviews: reviewsReducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer
    // [productsApi.reducerPath]: productsApi.reducer,productsApi.middleware,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, userApi.middleware),
  devTools: true,
});
