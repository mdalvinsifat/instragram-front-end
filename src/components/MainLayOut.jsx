import React from 'react';
import SideBar from './SideBar';
import { Outlet } from 'react-router-dom';

const MainLayOut = () => {
    return (
        <div>
         <SideBar/>
        <div>
            <Outlet/>
        </div>
    </div>
    );
};

export default MainLayOut;