import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cart/CartSlice";
//Storeの設定をする

export const store = configureStore({ reducer: { cart: cartReducer } });
