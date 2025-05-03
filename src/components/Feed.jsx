import React, { useState } from 'react';
import { RxBorderDotted } from 'react-icons/rx';
import { FaRegHeart, FaRegComment, FaRegPaperPlane } from 'react-icons/fa';
import { CiBookmark } from "react-icons/ci";
import FollowUnFollowDilog from '../Ui/FollowUnFollowDilog';
import CommantviewDilog from '../Ui/CommantviewDilog';
import { useSelector } from 'react-redux';

const Feed = () => {
  const [open, setOpen] = useState(false);
  const [commant, setCommant] = useState(false);
  const [text, setText] = useState('');
  const { posts } = useSelector(store => store.post);

  const handleTextCheck = (e) => {
    const inputText = e.target.value;
    setText(inputText.trim() ? inputText : "");
  };

  return (
    <div className="flex flex-col items-center px-4 sm:px-6 md:px-10 py-10 bg-gray-50 min-h-screen gap-10">

      {posts.map((item, index) => (
        <div key={item._id} className="w-full max-w-md bg-white rounded-xl shadow-md">
          {/* Header */}
          <div className="flex items-center p-4">
            <div className="flex items-center">
              <img
                src={item?.author?.profilePicture}
                alt="profile"
                className="w-10 h-10 rounded-full object-cover"
              />
              <h1 className="ml-3 font-semibold text-sm">{item?.author?.userName}</h1>
            </div>
            <div
              className="ml-auto text-xl text-gray-600 cursor-pointer"
              onClick={() => setOpen(true)}
            >
              <RxBorderDotted />
            </div>
          </div>

          {/* Post Image */}
          <img
            src={item?.image}
            alt="Post"
            className="w-full object-cover"
          />

          {/* Action Icons */}
          <div className="flex items-center gap-4 text-xl px-4 py-3 text-gray-800">
            <FaRegHeart className="cursor-pointer hover:scale-110 transition" />
            <FaRegComment className="cursor-pointer hover:scale-110 transition" onClick={() => setCommant(true)} />
            <FaRegPaperPlane className="cursor-pointer hover:scale-110 transition" />
            <CiBookmark className="cursor-pointer hover:scale-110 transition ml-auto" />
          </div>

          {/* Likes + Caption */}
          <div className="px-4 pb-3 text-sm">
            <p className="font-semibold">{item?.likes?.length || 0} likes</p>
            <p>
              <span className="font-semibold">{item?.author?.userName}</span> {item?.caption}
            </p>
          </div>

          {/* Comments */}
          <div
            className="px-4 pb-4 text-sm text-gray-500 cursor-pointer"
            onClick={() => setCommant(true)}
          >
            View all {item?.comments?.length || 0} comments
          </div>

          {/* Add Comment Section */}
          <div className="flex items-center px-4 py-3 border-t">
            <input
              type="text"
              className="flex-1 text-sm outline-none placeholder:text-gray-400 p-2"
              placeholder="Add a comment..."
              onChange={handleTextCheck}
              value={text}
            />
            {text && (
              <button type="submit" className="text-blue-700 font-semibold ml-2">
                Post
              </button>
            )}
          </div>
        </div>
      ))}

      {/* Modals */}
      <FollowUnFollowDilog open={open} setOpen={setOpen} />
      <CommantviewDilog commant={commant} setCommant={setCommant} />
    </div>
  );
};

export default Feed;
