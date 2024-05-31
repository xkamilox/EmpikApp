import { createSlice } from "@reduxjs/toolkit";

export const basketSlice = createSlice({
  name: "basket",
  initialState: {
    products: [],
    price: 0,
  },
  reducers: {
    setBasket: (state, action) => {
      state.products = action.payload.products;
      state.price = action.payload.price;
    },
  }
})

export const { setBasket } = basketSlice.actions;

export default basketSlice.reducer;
