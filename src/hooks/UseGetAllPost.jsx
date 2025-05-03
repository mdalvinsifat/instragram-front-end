// src/hooks/useGetAllPost.js
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setPosts } from '../redux/postSlice';
import { URL } from '../components/Constent';

const useGetAllPost = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    const fetchGetAllPost = async () => {
      try {
        const res = await axios.get(`${URL}/post/allpost`, {withCredentials:true});
        if (res.data.success) {
          dispatch(setPosts(res.data.posts));
        }
        console.log(res);
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      }
    };

    fetchGetAllPost();
  }, []);
};

export default useGetAllPost;
