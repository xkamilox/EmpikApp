import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice.jsx";
import messageReducer from "./slices/messageSlice.jsx";
import basketReducer from "./slices/basketSlice.js";


const store = configureStore({
  reducer: {
    user: userReducer,
    message: messageReducer,
    basket: basketReducer,
    }
})

export default store;
