import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { URL } from '../components/Constent';
import { setMessages } from '../redux/chatSlice';

const useGetAllMessage = () => {
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((store) => store.auth);

  useEffect(() => {
    const fetchAllMessages = async () => {
      if (!selectedUser?._id) return;

      try {
        const res = await axios.get(`${URL}/chat/all/${selectedUser._id}`, {withCredentials:true});
        if (res.data.success) {
          dispatch(setMessages(res.data.messages));
        }
      } catch (error) {
        console.error("Failed to fetch messages:", error);
      }
    };

    fetchAllMessages();
  }, [selectedUser, dispatch]);
};

export default useGetAllMessage;
