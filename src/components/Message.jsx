import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import useGetAllMessage from '../hooks/useGetAllMessage';
import useGetRTM from '../hooks/useGetRTM';

const Message = () => {
  const [loading, setLoading] = useState(true);
  const { messages } = useSelector((store) => store.chat);
  const { user } = useSelector((store) => store.auth);

  useGetAllMessage();
    useGetRTM();

  useEffect(() => {
    if (messages) {
      setLoading(false);
    }
  }, [messages]);

  if (loading) {
    return (
      <div className="text-center text-gray-500">
        <p>Loading messages...</p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-3">
      {messages && messages.length > 0 ? (
        messages.map((msg) => {
          // Handle both cases where senderId could be a string or object
          const senderId =
            typeof msg.senderId === 'string'
              ? msg.senderId
              : msg.senderId?._id;

          const isUserSender =
            senderId?.toString?.() === user?._id?.toString?.();

          return (
            <div
              key={msg._id}
              className={`w-full flex ${isUserSender ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`p-3 rounded-xl max-w-xs md:max-w-md break-words ${
                  isUserSender
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-800'
                }`}
              >
                {msg.message}
              </div>
            </div>
          );
        })
      ) : (
        <div className="text-center text-gray-500">
          <p>No messages found.</p>
        </div>
      )}
    </div>
  );
};

export default Message;
