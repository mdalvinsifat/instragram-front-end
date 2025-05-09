import axios from 'axios';
import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setAuthUser } from '../redux/userSlice';
import toast from 'react-hot-toast';
import { URL } from './Constent';

const EditProfile = () => {
  const imageRef = useRef();
  const { user } = useSelector((store) => store.auth);

  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    profilePicture: null,
    bio: user?.bio || '',
    gender: user?.gender || '',
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setInput({ ...input, profilePicture: file });
    }
  };

  const inputChangeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('bio', input.bio);
    formData.append('gender', input.gender);

    if (input.profilePicture) {
      formData.append('profilePicture', input.profilePicture);
    }

    try {
      setLoading(true);
      const res = await axios.post(`${URL}/auth/edit`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });

      if (res.data.success) {
        const updateData = {
          ...user,
          bio:user?.bio,
          profilePicture:user?.profilePicture,
          gender:user?.gender,
         
        };

        dispatch(setAuthUser(updateData));
        toast.success(res.data.message);
        navigate(`/${user?._id}/profile`);
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 px-4">
      <h1 className="text-2xl font-semibold mb-8">Edit Profile</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Profile Image */}
        <div className="flex items-center space-x-4">
          <img
            src={input.profilePicture ? URL.createObjectURL(input.profilePicture) : user?.profilePicture}
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover border"
          />
          <div>
            <label className="text-blue-600 font-medium cursor-pointer">
              Change Profile Photo
              <input
                type="file"
                accept="image/*"
                onChange={fileChangeHandler}
                ref={imageRef}
                className="hidden"
              />
            </label>
          </div>
        </div>


        {/* Bio */}
        <div>
          <label className="block text-sm font-medium mb-1">Bio</label>
          <textarea
            rows="3"
            name="bio"
            value={input.bio}
            onChange={inputChangeHandler}
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          ></textarea>
        </div>


        {/* Gender */}
        <div>
          <label className="block text-sm font-medium mb-1">Gender</label>
          <select
            name="gender"
            value={input.gender}
            onChange={inputChangeHandler}
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="others">Others</option>
          </select>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white px-6 py-2 rounded-md font-medium hover:bg-blue-600 transition"
          >
            {loading ? 'Updating...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
