// src/hooks/useGetAllPost.js
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { URL } from '../components/Constent';
import { ViewProfile as setViewProfile } from '../redux/userSlice'; // rename to avoid conflict

const ViewProfile = (id) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchGetAllPost = async () => {
      try {
        const res = await axios.get(`${URL}/post/${id}/profile`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setViewProfile(res.data.posts));
        }
        console.log(res);
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      }
    };

    if (id) {
      fetchGetAllPost();
    }
  }, [dispatch, id]);
};

export default ViewProfile;
