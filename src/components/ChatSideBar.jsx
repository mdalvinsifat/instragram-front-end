import React, { useState } from 'react';
import { FaInstagram, FaHome  ,FaSearch, FaCompass, FaHeart, FaUserCircle } from 'react-icons/fa';
import { FiMessageCircle } from "react-icons/fi";
import { CiSquarePlus } from "react-icons/ci";
import { LuLogOut } from 'react-icons/lu';
import toast from 'react-hot-toast';
import axios from 'axios';
import { LOGIN, URL } from './Constent';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthUser } from '../redux/userSlice';
import CreatePost from './CreatePost';
import { setPosts, setSelectPost } from '../redux/postSlice';
import image from "../images/Instagram_icon.png"
import ChatApp from './ChatApp';

const ChatSideBar = () => {
const dispatch = useDispatch()
const [open , setOpen ] = useState(false)
  const {likeNotification} = useSelector(store => store.likeNotification)
  const [showNotifications, setShowNotifications] = useState(false);


const navigate = useNavigate()
  const handleSubmit = async(e)=>{
    try {
        const res = await axios.get(`${URL}/auth/logOut`, {withCredentials:true})
        if(res.data.success){
            navigate(`${LOGIN}`)
            dispatch(setAuthUser(null))
            dispatch(setPosts([]))
            dispatch(setSelectPost(null))
            toast.success(res.data.message)
        }

        dispatch(setAuthUser(null))
        
    } catch (error) {
        console.log(error)
        toast.error(error.response?.data?.message || 'Something went wrong');
    }
  }



const {user} = useSelector(store => store.auth)
  const sidebarHandler = (textType) =>{
    if(textType === "LogOut") handleSubmit();
    else if(textType==="Create") setOpen(true)
    else if(textType === "Home")navigate("/")
      else if (textType === "Profile") navigate(`/${user._id}/profile`);
    else if(textType === "Message") navigate("/chat")


  }

  
  const navItems = [
    { icon: <FaHome />, label: 'Home' },
    { icon: <FaSearch />, label: 'Search' },
    { icon: <FaCompass />, label: 'Explore' },
    { icon: <FiMessageCircle /> , label: 'Message' },
    { icon: < CiSquarePlus/> , label: 'Create' },
    { icon: <FaHeart />, label: 'Notifications' },
    { icon: 
      
      
      user?.profilePicture ?
      <img src={user?.profilePicture} alt="" srcset="" className='w-6 h-6 rounded-full' />
      :
      <FaUserCircle/>
      , label: 'Profile' },
    { icon: <LuLogOut />, label: 'LogOut' },
  ];


  return (



 <div className="flex min-h-screen bg-gray-50">
  {/* Sidebar for md+ screens */}
  <div className="hidden md:flex flex-col  w-20  h-screen px-2 py-8 bg-white border-r text-black fixed">
    {/* Logo */}
    <div className="flex items-center justify-center mb-8">
      <FaInstagram className="w-8 h-8 text-pink-500" />
    </div>

    {/* Navigation */}
    <nav className="flex flex-col space-y-6">
      {navItems.map((item, index) => {
        const isNotification = item.label === "Notifications";
        return (
          <a
            key={index}
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (isNotification) {
                setShowNotifications(!showNotifications);
              }
              sidebarHandler(item.label);
            }}
            className="flex items-center relative hover:bg-gray-200 text-black px-4 py-2 rounded-lg"
          >
            <span className="text-xl">{item.icon}</span>

            {isNotification && likeNotification.length > 0 && (
              <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 text-xs bg-red-500 text-white px-1.5 py-0.5 rounded-full">
                {likeNotification.length}
              </span>
            )}

            {/* Notification dropdown */}
            {isNotification && showNotifications && (
              <div className="absolute left-full top-0 ml-2 mt-2 z-20 w-64 bg-white border shadow-md rounded-lg overflow-hidden">
                {likeNotification.length === 0 ? (
                  <p className="p-4 text-gray-600">No Notifications</p>
                ) : (
                  <ul className="max-h-64 overflow-y-auto">
                    {likeNotification.map((notification, idx) => (
                      <li
                        key={idx}
                        className="flex items-center px-4 py-2 hover:bg-gray-100"
                      >
                        <img
                          src={notification.userDetails?.profilePicture}
                          alt="Profile"
                          className="w-8 h-8 rounded-full mr-3"
                        />
                        <span className="text-sm font-medium">
                          {notification.userDetails?.userName} liked your post
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </a>
        );
      })}
    </nav>
  </div>

  {/* Bottom Nav for small screens */}
  <div className="md:hidden fixed bottom-0 left-0 right-0 flex justify-around items-center bg-white border-t py-2 z-50">
   
   {navItems.map((item, index) => {
  const isNotification = item.label === "Notifications";
  return (
    <a
      key={index}
      href="#"
      onClick={(e) => {
        e.preventDefault();
        sidebarHandler(item.label);
      }}
      className="relative flex flex-col items-center text-gray-700"
    >
  <span className="relative text-xl">
  {item.icon}
  {isNotification && likeNotification.length > 0 && (
    <span className="absolute -top-1 -right-1 text-[10px] bg-red-500 text-white px-1.5 py-0.5 rounded-full leading-none">
      {likeNotification.length}
    </span>
  )}
</span>
    </a>
  );
})}



  </div>

  {/* Modal */}
  <CreatePost open={open} setOpen={setOpen} />

  {/* Main Content */}
  <div className="flex-grow pt-4 px-2 sm:px-4 md:ml-20 lg:ml-64 lg:mr-64">
    <ChatApp />
  </div>
</div>





   
  );
};

export default ChatSideBar;
