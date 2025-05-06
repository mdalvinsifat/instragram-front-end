import React, { useState, useEffect } from 'react';
import { RxBorderDotted } from 'react-icons/rx';
import { FaRegHeart, FaRegComment, FaRegPaperPlane, FaHeart } from 'react-icons/fa';
import { CiBookmark } from "react-icons/ci";
import FollowUnFollowDilog from '../Ui/FollowUnFollowDilog';
import CommantviewDilog from '../Ui/CommantviewDilog';
import { useDispatch, useSelector } from 'react-redux';
import { URL } from './Constent';
import toast from 'react-hot-toast';
import axios from 'axios';
import { setSelectPost } from '../redux/postSlice';

const Feed = () => {
  const [open, setOpen] = useState(false);
  const [commant, setCommant] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [text, setText] = useState('');
  const { posts: reduxPosts } = useSelector(store => store.post);
  const { user } = useSelector(store => store.auth);
  const dispatch = useDispatch()

  // Use local state for posts to update in real-time
  const [posts, setPosts] = useState(reduxPosts);

  useEffect(() => {
    setPosts(reduxPosts);
  }, [reduxPosts]);

  const [likesMap, setLikesMap] = useState(() => {
    const map = {};
    posts.forEach(post => {
      map[post._id] = {
        liked: post.likes.includes(user._id),
        count: post.likes.length
      };
    });
    return map;
  });

  const handleTextCheck = (e) => {
    const inputText = e.target.value;
    setText(inputText.trim() ? inputText : "");
  };

  const handleOpenDialog = (post) => {
    setSelectedPost(post);
    setOpen(true);
  };

  const likedOrDisLiked = async (postId) => {
    const postLikeData = likesMap[postId];
    const currentlyLiked = postLikeData?.liked;

    try {
      const action = currentlyLiked ? 'dislike' : 'like';
      const res = await axios.get(`${URL}/post/${postId}/${action}`, { withCredentials: true });

      if (res.data.success) {
        setLikesMap(prev => ({
          ...prev,
          [postId]: {
            liked: !currentlyLiked,
            count: currentlyLiked ? prev[postId].count - 1 : prev[postId].count + 1
          }
        }));
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.error || "Something went wrong");
    }
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
        const newComment = res.data.comment; // Ensure backend returns the new comment
        setPosts(prevPosts =>
          prevPosts.map(post =>
            post._id === postId
              ? { ...post, comments: [...post.comments, newComment] }
              : post
          )
        );
        // Update selectedPost comments immediately
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
    <div className="flex flex-col items-center px-4 sm:px-6 md:px-10 py-10 bg-gray-50 min-h-screen gap-10">
      {posts.map((item) => (
        <div key={item._id} className="w-full max-w-md bg-white rounded-xl shadow-md">
          <div className="flex items-center p-4">
            <img src={item.author.profilePicture} alt="profile" className="w-10 h-10 rounded-full object-cover" />
            <h1 className="ml-3 font-semibold text-sm">{item.author.userName}</h1>
            <div className="ml-auto text-xl text-gray-600 cursor-pointer" onClick={() => handleOpenDialog(item)}>
              <RxBorderDotted />
            </div>
          </div>

          <img src={item.image} alt="Post" className="w-full object-cover" />

          <div className="flex items-center gap-4 text-xl px-4 py-3 text-gray-800">
            {likesMap[item._id]?.liked ? (
              <FaHeart className="cursor-pointer text-red-600 hover:scale-110 transition" onClick={() => likedOrDisLiked(item._id)} />
            ) : (
              <FaRegHeart className="cursor-pointer hover:scale-110 transition" onClick={() => likedOrDisLiked(item._id)} />
            )}
            <FaRegComment className="cursor-pointer hover:scale-110 transition" onClick={() => {
              setSelectedPost(item);
              setCommant(true);
            }} />
            <FaRegPaperPlane className="cursor-pointer hover:scale-110 transition" />
            <CiBookmark className="ml-auto cursor-pointer hover:scale-110 transition" />
          </div>

          <div className="px-4 pb-3 text-sm">
            <p className="font-semibold">{likesMap[item._id]?.count || 0} likes</p>
            <p><span className="font-semibold">{item.author.userName}</span> {item.caption}</p>
          </div>

          <div className="px-4 pb-4 text-sm text-gray-500 cursor-pointer" onClick={() => {
            setSelectedPost(item);
            setCommant(true);
            dispatch(setSelectPost(item))
          }}>
            View all {item.comments.length || 0} comments
          </div>

          <form onSubmit={(e) => commantHandler(e, item._id)} className="flex items-center px-4 py-3 border-t">
            <input
              type="text"
              className="flex-1 text-sm outline-none placeholder:text-gray-400 p-2"
              placeholder="Add a comment..."
              value={text}
              onChange={handleTextCheck}
            />
            {text && <button type="submit" className="text-blue-700 font-semibold ml-2">Post</button>}
          </form>
        </div>
      ))}

      {open && <FollowUnFollowDilog open={open} setOpen={setOpen} item={selectedPost} />}
      {commant && <CommantviewDilog 
       commant={commant}
  setCommant={setCommant}
  post={selectedPost}
  setPosts={setPosts}
  selectedPost={selectedPost}
  setSelectedPost={setSelectedPost}
      />}
    </div>
  );
};

export default Feed;
