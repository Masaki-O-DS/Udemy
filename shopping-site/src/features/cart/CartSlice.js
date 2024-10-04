import { createSlice } from "@reduxjs/toolkit";

//買い物かごの初期化
const initialState = {
  cartItems: [],
  amount: 0,
  total: 0,
};

//Slice
const cartSlice = createSlice({
  name: "cart", //useSlectorで使う
  initialState, //初期状態
  reducers: {},
});

export default cartSlice.reducer;
