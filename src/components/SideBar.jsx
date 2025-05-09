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


  const SideBar = () => {
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
      <>
        {/* Sidebar for medium and large screens */}
        <div className="hidden md:flex flex-col justify-between w-20 lg:w-64 h-screen px-2 py-8 bg-white border-r text-black fixed">
          {/* Logo */}
          <div className="flex items-center justify-center  mb-8">
            <FaInstagram className="w-8 h-8 text-pink-500" />
            <span className="hidden lg:inline ml-2 text-2xl font-semibold text-gray-800 dark:text-white">Instagram</span>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col space-y-6 mb-100">
          
          {navItems.map((item, index) => {
    const isNotification = item.label === "Notifications";
    return (
      <div key={index} className="relative">
        <a
          onClick={() => {
            sidebarHandler(item.label);
            if (isNotification) setShowNotifications(!showNotifications);
          }}
          href="#"
          className="flex items-center hover:bg-gray-200 text-black px-4 py-2 rounded-lg"
        >
          <span className="text-xl font-extrabold relative">
            {item.icon}
            {isNotification && likeNotification.length > 0 && (

              <div>

              <span className="absolute -top-1 -right-2 text-xs bg-red-500 text-white px-1.5 py-0.5 rounded-full">
                {likeNotification.length}
              </span>

   {isNotification && showNotifications && (
          <div className="absolute z-10 mt-2 w-64 bg-white border shadow-md rounded-lg overflow-hidden">
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
              </div>
            )}
          </span>
          <span className="hidden lg:inline ml-3">{item.label}</span>
        </a>

        {/* Notification Dropdown */}
     
      </div>
    );
  })}



          </nav>
        </div>

        {/* Bottom navbar for small screens */}
        <div className="fixed bottom-0 left-0 right-0 md:hidden flex justify-around items-center bg-white dark:bg-gray-900 border-t py-2 z-50">
          {navItems.map((item, index) => (
            <a key={index} href="#"   onClick={() => sidebarHandler(item.label)} className="flex flex-col items-center text-gray-600 dark:text-gray-300">
              <span className="text-xl">{item.icon}</span>

              
            </a>
          ))}



        </div>


        <CreatePost open={open}  setOpen={setOpen}/>
      </>
    );
  };

  export default SideBar;
