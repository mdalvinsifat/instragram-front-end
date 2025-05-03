import React from 'react';
import Feed from './Feed';        // Center feed
import RightBar from './RightBar'; // Suggestions/Chat
import SideBar from './SideBar';   // Includes both desktop sidebar and mobile bottom nav
import UseGetAllPost from '../hooks/UseGetAllPost';

const Home = () => {
    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Fixed Sidebar (left) */}
            <SideBar />

            {/* Main Content */}
            <div className="flex-grow md:ml-20 lg:ml-64 lg:mr-64 px-2 sm:px-4 py-4">
                <Feed />
                <UseGetAllPost/>
            </div>

            {/* Right Sidebar (only on large screens) */}
            <div className="hidden lg:block w-64 fixed right-0 top-0 h-screen overflow-y-auto  px-4 py-4">
                <RightBar />
            </div>
        </div>
    );
};

export default Home;
