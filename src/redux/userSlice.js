import { createSlice } from "@reduxjs/toolkit";





const AuthSlice = createSlice({

name:"auth", 
initialState:{
    user : null
},

reducers:{
    setAuthUser:(state, action) =>{
            state.user = action.payload
    }
}
})


export const {setAuthUser } = AuthSlice.actions ; 
export default AuthSlice.reducer