import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { CiSettings } from "react-icons/ci";
import { MdGridOn, MdVideoLibrary, MdBookmarkBorder, MdPersonPin } from "react-icons/md";
import { FaHeart, FaComment } from "react-icons/fa";
import { Link } from 'react-router-dom';

const ViewAdminProfile = () => {
  const viewProfile = useSelector((store) => store.auth.ViewProfile);

  console.log(viewProfile.image)
  const { posts } = useSelector((store) => store.post);
  const { user } = useSelector((store) => store.auth);

  const isLoggedIn = viewProfile?._id === user?._id;
  const isFollowed = false; // Replace with real logic
  const [activeTab, setActiveTab] = useState("posts");

  const displayedPost =
    activeTab === "posts"
      ? posts.filter((post) => viewProfile?.posts?.includes(post._id))
      : posts.filter((post) => viewProfile?.bookmarks?.includes(post._id));

  const tabs = [
    { name: "Posts", key: "posts", icon: <MdGridOn size={20} /> },
    { name: "Reels", key: "reels", icon: <MdVideoLibrary size={20} /> },
    { name: "Saved", key: "saved", icon: <MdBookmarkBorder size={20} /> },
    { name: "Tagged", key: "tagged", icon: <MdPersonPin size={20} /> },
  ];

  return (
    <div className="bg-white min-h-screen px-4 sm:px-20 py-10">
      {/* Top Section */}
      <div className="flex flex-col sm:flex-row sm:items-start gap-10">
        {/* Profile Picture */}
        <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full p-[3px] bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600">
          <div className="w-full h-full rounded-full bg-white p-[2px]">
            <img
              src={
                viewProfile?.profilePicture ||
                "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              }
              alt="Profile"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </div>

        {/* User Info */}
        <div className="w-full">
          <div className="flex flex-wrap items-center gap-4">
            <h1 className="text-xl sm:text-2xl font-semibold">
              {viewProfile?.userName || "Loading..."}
            </h1>

            {isLoggedIn ? (
              <>
              <Link to="/account/edit">
              
                <button className="bg-gray-100 px-4 py-2 rounded-lg text-sm font-medium">Edit Profile</button>
              </Link>
                <button className="bg-gray-100 px-4 py-2 rounded-lg text-sm font-medium">View Archive</button>
                <button className="bg-gray-100 px-4 py-2 rounded-lg text-sm font-medium">Ad Tools</button>
              </>
            ) : isFollowed ? (
              <button className="bg-gray-100 px-4 py-2 rounded-lg text-sm font-medium">Unfollow</button>
            ) : (
              <button className="bg-gray-100 px-4 py-2 rounded-lg text-sm font-medium">Follow</button>
            )}

            <button className="text-3xl text-gray-600 mt-1">
              <CiSettings />
            </button>
          </div>

          {/* Stats */}
          <div className="flex gap-8 mt-6 text-sm sm:text-base">
            <div><span className="font-semibold">{viewProfile?.posts?.length || 0}</span> posts</div>
            <div><span className="font-semibold">{viewProfile?.followers?.length || 0}</span> followers</div>
            <div><span className="font-semibold">{viewProfile?.following?.length || 0}</span> following</div>
          </div>

          {/* Bio */}
          <div className="mt-4 text-sm sm:text-base">
            <p className="font-semibold">{viewProfile?.fullName || ''}</p>
            <p>{viewProfile?.bio}</p>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="mt-10 border-t border-gray-300">
        <div className="flex justify-center gap-10 py-4 text-sm font-semibold text-gray-500">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-3 py-1 border-b-2 ${
                activeTab === tab.key ? "border-black text-black" : "border-transparent"
              }`}
            >
              {tab.icon}
              <span className="hidden sm:inline">{tab.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {displayedPost?.map((item, index) => (
          <div
            key={index}
            className="relative group aspect-square overflow-hidden rounded-md cursor-pointer"
          >
            {/* Post Image */}
            <img
              src={item.image}
              alt={`Post ${index + 1}`}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-10 flex items-center justify-center gap-8 opacity-0 group-hover:opacity-30 transition-opacity duration-300">
              <div className="flex items-center gap-2 text-white text-lg font-semibold">
                <FaHeart className="text-xl" />
                <span>{item?.likes?.length || 0}</span>
              </div>
              <div className="flex items-center gap-2 text-white text-lg font-semibold">
                <FaComment className="text-xl" />
                <span>{item?.comments?.length || 0}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewAdminProfile;
