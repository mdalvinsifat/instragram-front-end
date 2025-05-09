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
import { setLikeNotification } from './redux/rtnSlice';
import ProtectedRoutes from './components/ProtectedRoutes';
import NotFound from './components/NotFound';
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
        dispatch(setLikeNotification(notification));
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
  <Route path={SIGNUP} element={<SignUp />} />
  <Route path={LOGIN} element={<Login />} />
  <Route path="*" element={<NotFound />} />

  <Route element={<ProtectedRoutes />}>
    <Route path="/" element={<Home />} />
    <Route path="/:id/profile" element={<Profile />} />
    <Route path="/account/edit" element={<EditSidebar />} />
    <Route path="/chat" element={<ChatSideBar />} />
  </Route>
</Routes>


    </div>
  );
};

export default App;