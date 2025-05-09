import { createSlice } from "@reduxjs/toolkit";

const AuthSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        suggestedUsers: [],
        ViewProfile:null,
        selectedUser : null 
    },
    reducers: {
        setAuthUser: (state, action) => {
            state.user = action.payload;
        },
        suggestedUsers: (state, action) => {
            state.suggestedUsers = action.payload;
        },
        setViewProfile :(state , action) =>{
            state.ViewProfile = action.payload
        }, 
        setSelectedUser :(state, action) => {
            state.selectedUser = action.payload
        }
    },
});

export const { setAuthUser, suggestedUsers, setViewProfile, setSelectedUser } = AuthSlice.actions;
export default AuthSlice.reducer;
