import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { URL } from '../components/Constent';
import { setPosts } from '../redux/postSlice';

const FollowUnFollowDilog = ({ open, setOpen, item }) => {
  const handleClose = (e) => {
    if (e.target.id === 'backdrop') setOpen(false);
  };

  const { user } = useSelector((store) => store.auth);
  const {posts} = useSelector(store => store.post)

  const dispatch = useDispatch()

  // Check if user._id and item.author._id are the same
  const isAuthor = user?._id === item?.author?._id;



  const deletePosthandler = async() =>{
    try {
      const res = await axios.delete(`${URL}/post/${item._id}`, {withCredentials:true})
      const updateDelete = posts.filter((postItem) => postItem?._id !== item._id)
      dispatch(setPosts(updateDelete))
      toast.success(res.data.message)
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.error || " Somthing with Wrong")
    }
  }

  return (
    <div>
      {open && (
        <div
          id="backdrop"
          className="fixed inset-0 z-40 backdrop-blur-sm flex justify-center items-center"
          onClick={handleClose}
        >
          <div className="bg-white rounded-xl w-72 text-center overflow-hidden z-50 shadow-lg">
            {isAuthor && (
              <button
                className="w-full py-3 text-red-600 font-semibold border-b hover:bg-gray-100"
                onClick={() => {
                  alert('Deleted');
                  setOpen(false);
                  deletePosthandler()
                }}
              >
                Delete
              </button>
            )}
            <button
              className="w-full py-3 text-red-600 font-semibold border-b hover:bg-gray-100"
              onClick={() => {
                alert('Unfollowed');
                setOpen(false);
              }}
            >
              Unfollow
            </button>
            <button
              className="w-full py-3 font-medium border-b hover:bg-gray-100"
              onClick={() => {
                alert('Followed');
                setOpen(false);
              }}
            >
              Follow
            </button>
            <button
              className="w-full py-3 text-gray-600 font-medium hover:bg-gray-100"
              onClick={() => setOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FollowUnFollowDilog;
