import { createSlice } from "@reduxjs/toolkit";

export const basketSlice = createSlice({
  name: "basket",
  initialState: {
    items: [],
    price: 0,
  },
  reducers: {
    setBasket: (state, action) => {
      state.items = action.payload.items;
      //state.price =
    },
  }
})

export const { setBasket } = basketSlice.actions;

export default basketSlice.reducer;
