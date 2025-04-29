import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SignUp from './components/SignUp';
import { LOGIN, SIGNUP } from './components/Constent';
import Login from './components/Login';

const App = () => {
  return (
    <div>
<Routes>
  <Route path={SIGNUP} element={<SignUp/>}/>
  <Route path={LOGIN} element={<Login/>}/>
</Routes>

    </div>
  );
};

export default App;