import { configureStore } from '@reduxjs/toolkit';
import productReducer from "./features/product/productSlice"
import authReducer from './features/auth/authSlice';
import userReducer from "./features/user/userSlice"
import categoryReducer from "./features/category/categorySlice"
import brandReducer from './features/brand/brandSlice';
import cartReducer from './features/cart/cartSlice';

import { authApi } from './features/auth/authAPI';
import { userApi } from "./features/user/userAPI"
import { productApi } from './features/product/productAPI';
import { categoryApi } from './features/category/categoryAPI'
import { brandApi } from './features/brand/brandAPI';
import { cartApi } from './features/cart/cartAPI';


export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    product: productReducer,
    category: categoryReducer,
    brand: brandReducer,
    cart: cartReducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [brandApi.reducerPath]: brandApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, userApi.middleware, productApi.middleware, categoryApi.middleware, brandApi.middleware, cartApi.middleware),
  devTools: true,
});
