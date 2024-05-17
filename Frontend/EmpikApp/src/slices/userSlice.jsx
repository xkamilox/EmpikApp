import { createSlice } from '@reduxjs/toolkit';

const user = JSON.parse(localStorage.getItem("user"))

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLoggedIn: user ? true : false,
        failedLogins: 0,
        user: user ? user : null,
    },
    reducers: {
        setUser: (state, action) => {
            state.isLoggedIn = true;
            state.user = action.payload.user;
            state.user.failedLogins = 0;
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.user = null;
        },
        incrementLoginFail: (state) => {
            state.failedLogins += 1;
        },
        refreshToken: (state, action) => {
            state.user.accessToken = action.payload;
        },
    }
})

export const { setUser, incrementLoginFail, refreshToken, logout } = userSlice.actions;

export default userSlice.reducer;
