import { createSlice } from "@reduxjs/toolkit";
const postSlice = createSlice({
    name:'post',
    initialState:{
        posts:[],
        setSelectPost:null,
    },
    reducers:{
        //actions
        setPosts:(state,action) => {
            state.posts = action.payload;
        },
        setSelectPost:(state,action) => {
            state.setSelectPost = action.payload;
        }
    }
});
export const {setPosts, setSelectPost} = postSlice.actions;
export default postSlice.reducer;