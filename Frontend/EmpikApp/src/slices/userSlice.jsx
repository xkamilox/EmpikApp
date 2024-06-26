import { createSlice } from '@reduxjs/toolkit';


const auth = JSON.parse(localStorage.getItem("auth"))
//const google = JSON.parse(localStorage.getItem("google"));

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLoggedIn: auth ? true : false,
        isLoggedInGoogle: auth ? true : false,
        failedLogins: 0,
        //user: user ? user : null,
    },
    reducers: {
        setUser: (state, action) => {
            console.log("setting user");
            state.isLoggedIn = true;
            //state.user = action.payload.user;
            state.failedLogins = 0;
        },
        loginGoogle: (state) => {
            state.isLoggedInGoogle = true;
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.isLoggedInGoogle = false;
            //state.user = null;
        },
        incrementLoginFail: (state) => {
            state.failedLogins += 1;
        },
        refreshToken: (state, action) => {
            //state.user.accessToken = action.payload;
        },
    }
})

export const { setUser, incrementLoginFail, refreshToken, logout, loginGoogle } = userSlice.actions;

export default userSlice.reducer;
