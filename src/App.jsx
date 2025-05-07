import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SignUp from './components/SignUp';
import { LOGIN, SIGNUP } from './components/Constent';
import Login from './components/Login';
import SideBar from './components/SideBar';
import Home from './components/Home';
import Profile from './components/Profile';

const App = () => {
  return (
    <div>
<Routes>
  <Route path={SIGNUP} element={<SignUp/>}/>
  <Route path={LOGIN} element={<Login/>}/>
  <Route path="/" element={<Home/>}/>
  <Route path='/profile/:id' element={<Profile/>}/>
</Routes>

<SideBar/>

    </div>
  );
};

export default App;