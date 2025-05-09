import React from 'react';
import SideBar from './SideBar';   // Includes both desktop sidebar and mobile bottom nav
import UseSuggestedUser from '../hooks/UseSuggestedUser';
import EditProfile from './EditProfile';

const EditSidebar = () => {
    return (
        <div className="flex min-h-screen bg-gray-50">
            <UseSuggestedUser/>
     
            <SideBar />

            {/* Main Content */}
            <div className="flex-grow md:ml-20 lg:ml-64 lg:mr-64 px-2 sm:px-4 py-4">
                <EditProfile/>
                
            </div>

          
        </div>
    );
};

export default EditSidebar;
