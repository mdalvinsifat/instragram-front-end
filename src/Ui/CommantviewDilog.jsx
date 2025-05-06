import React, { useState } from 'react';
import { RxBorderDotted } from 'react-icons/rx';
import { IoClose } from 'react-icons/io5';
import { FaRegComment, FaRegHeart, FaRegPaperPlane } from 'react-icons/fa';
import { CiBookmark } from 'react-icons/ci';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { URL } from '../components/Constent';

const CommantviewDilog = ({ commant, setCommant, post, setPosts, selectedPost, setSelectedPost }) => {
  const handleClose = (e) => {
    if (e.target.id === 'backdrop') setCommant(false);
  };

  const [text, setText] = useState('');
  const { user } = useSelector(store => store.auth);

  const handleChange = (e) => {
    const input = e.target.value;
    setText(input.trim() ? input : "");
  };

  const commantHandler = async (e, postId) => {
    e.preventDefault();
    if (!text.trim()) return;

    try {
      const res = await axios.post(`${URL}/post/${postId}/commant`, { text }, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      });

      if (res.data.success) {
        const newComment = res.data.comment;
        setPosts(prevPosts =>
          prevPosts.map(p =>
            p._id === postId
              ? { ...p, comments: [...p.comments, newComment] }
              : p
          )
        );
        if (selectedPost?._id === postId) {
          setSelectedPost(prev => ({
            ...prev,
            comments: [...prev.comments, newComment],
          }));
        }
        setText('');
        toast.success("Comment added successfully");
      } else {
        toast.error(res.data.message || "Failed to add comment");
      }
    } catch (error) {
      toast.error(error?.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <>
      {commant && post && (
        <div
          id="backdrop"
          className="fixed inset-0 z-40 backdrop-blur-sm flex justify-center items-center"
          onClick={handleClose}
        >
          <div
            className="bg-white relative rounded-xl shadow-lg flex flex-col md:flex-row w-full max-w-6xl h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setCommant(false)}
              className="absolute top-2 right-2 text-2xl text-gray-600 hover:text-black z-50"
            >
              <IoClose />
            </button>

            {/* Post Image */}
            <div className="flex-1 bg-black flex items-center justify-center overflow-hidden">
              <img src={post?.image} alt="Post" className="object-contain w-full max-h-full" />
            </div>

            {/* Comments Panel */}
            <div className="w-full md:w-[400px] flex flex-col">
              <div className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center">
                  <img
                    src={post?.author?.profilePicture}
                    alt="Profile"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <h1 className="ml-3 font-semibold text-sm">{post?.author?.userName}</h1>
                </div>
                <RxBorderDotted className="ml-auto text-xl text-gray-600 cursor-pointer" />
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-3 text-sm">
                {post?.comments?.length > 0 ? (
                  post.comments.map((comment, i) => (
                    <div key={i} className='flex gap-3 items-start'>
                      <img src={comment?.user?.profilePicture || post?.author?.profilePicture} alt="" className='w-8 h-8 rounded-full' />
                      <div>
                        <p className="font-semibold">{comment?.user?.userName || post?.author?.userName}</p>
                        <p>{comment.text}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400">No comments yet</p>
                )}
              </div>

              <div className="flex items-center gap-4 text-xl px-4 py-3 text-gray-800">
                <FaRegHeart className="cursor-pointer hover:scale-110 transition" />
                <FaRegComment className="cursor-pointer hover:scale-110 transition" />
                <FaRegPaperPlane className="cursor-pointer hover:scale-110 transition" />
                <CiBookmark className="cursor-pointer hover:scale-110 transition ml-auto" />
              </div>

              <form onSubmit={(e) => commantHandler(e, post._id)} className="flex items-center px-4 py-3 border-t">
                <input
                  type="text"
                  className="flex-1 text-sm outline-none placeholder:text-gray-400 p-2"
                  placeholder="Add a comment..."
                  value={text}
                  onChange={handleChange}
                />
                {text && (
                  <button type="submit" className="text-blue-700 font-semibold ml-2">Post</button>
                )}
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CommantviewDilog;
