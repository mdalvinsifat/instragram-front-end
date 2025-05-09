import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { URL } from '../components/Constent';
import { setViewProfile } from '../redux/userSlice';
import { useParams } from 'react-router-dom';
import ViewAdminProfile from '../components/ViewAdminProfile';

const ProfileView = () => {
  const dispatch = useDispatch();
  const { id: userId } = useParams(); // get `id` from URL and rename to userId

  const fetchViewProfile = async () => {
    try {
      const res = await axios.get(`${URL}/auth/${userId}/profile`, {
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setViewProfile(res.data.user));
      
      }
      console.log(res.data.success)
    } catch (error) {
      console.error('Failed to fetch profile:', error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchViewProfile();
    }
  }, [userId]);

  return (
    <div>
<ViewAdminProfile/>
    </div>
  );
};

export default ProfileView;
