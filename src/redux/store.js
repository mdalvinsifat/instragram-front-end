import { combineReducers, configureStore } from "@reduxjs/toolkit";
import AuthSlice  from './userSlice.js'
import postSlice  from './postSlice.js'
import socketSlice from './socketSlice.js'
import chatSlice from './chatSlice.js'
import rtnSlice from './rtnSlice.js'

import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist'
  import storage from 'redux-persist/lib/storage'


const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  blacklist: ['socket'], // do NOT persist socketSlice
}


const rootReducer = combineReducers({
    auth : AuthSlice, 
    post : postSlice, 
    socket: socketSlice, 
    chat : chatSlice, 
    likeNotification : rtnSlice 
})

  const persistedReducer = persistReducer(persistConfig, rootReducer)
  

const store = configureStore({
    reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})


export default store
