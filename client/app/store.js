import { configureStore } from '@reduxjs/toolkit';
import productReducer from "./features/product/productSlice"
import authReducer from './features/auth/authSlice';
import userReducer from "./features/user/userSlice"


import { authApi } from './features/auth/authAPI';
import { userApi } from "./features/user/userAPI"
import { productApi } from './features/product/productAPI';


export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    product:productReducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, userApi.middleware,productApi.middleware,),
  devTools: true,
});
