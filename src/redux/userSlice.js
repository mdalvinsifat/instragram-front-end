import { createSlice } from "@reduxjs/toolkit";

const AuthSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        suggestedUsers: [],
        ViewProfile:null
    },
    reducers: {
        setAuthUser: (state, action) => {
            state.user = action.payload;
        },
        suggestedUsers: (state, action) => {
            state.suggestedUsers = action.payload;
        },
        ViewProfile :(state , action) =>{
            state.ViewProfile = action.payload
        }
    },
});

export const { setAuthUser, suggestedUsers, ViewProfile } = AuthSlice.actions;
export default AuthSlice.reducer;
