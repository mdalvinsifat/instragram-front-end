import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import SignUp from './components/SignUp';
import { LOGIN, SIGNUP, URL } from './components/Constent';
import Login from './components/Login';
import Home from './components/Home';
import Profile from './components/Profile';
import EditSidebar from './components/EditSidebar';
import ChatSideBar from './components/ChatSideBar';
import { io } from "socket.io-client";
import { setSocket } from './redux/socketSlice';
import { setOnlineUsers } from './redux/chatSlice';
import { useDispatch, useSelector } from 'react-redux';
const App = () => {
  const { user } = useSelector(store => store.auth);
const { socket } = useSelector(store => store.socket);
  const dispatch = useDispatch();

useEffect(() =>{

  if(user){
    const socketio = io(`${URL}`,{
      query:{
        userId : user?._id 
      }, 
      transports:["websocket"]
    }); 
    dispatch(setSocket(socketio));



      // listen all the events
      socketio.on('getOnlineUsers', (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers));
      });

      socketio.on('notification', (notification) => {
        dispatch(setLikeNotification (notification));
      });

  
      return () => {
        socketio.close();
        dispatch(setSocket(null));
      }
    } else if (socket) {
      socket.close();
      dispatch(setSocket(null));
    }
  }, [user, dispatch]);




  return (
    <div>
<Routes>
  <Route path={SIGNUP} element={<SignUp/>}/>
  <Route path={LOGIN} element={<Login/>}/>
  <Route path="/" element={<Home/>}/>
  <Route path='/:id/profile' element={<Profile/>}/>
  <Route path='/account/edit' element={<EditSidebar/>}/>
  <Route path='/chat' element={<ChatSideBar/>}/>
</Routes>

    </div>
  );
};

export default App;