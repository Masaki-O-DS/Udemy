import { createSlice } from "@reduxjs/toolkit";

//買い物かごの初期化
const initialState = {
  cartItems: [],
  amount: 0,
  total: 0,
};

const cartSlice = createSlice({
  name: "cart", //ｓliceの名前
  initialState, //初期状態
  reducers: {},
});

export default cartSlice.reducer;
