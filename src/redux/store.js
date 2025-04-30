import { configureStore } from "@reduxjs/toolkit";

import AuthSlice  from './userSlice.js'

const store = configureStore({
    reducer : {
        auth : AuthSlice
    }
})


export default store