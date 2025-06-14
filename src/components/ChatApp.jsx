import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedUser } from '../redux/userSlice';
import useGetAllMessage from '../hooks/useGetAllMessage';
import Message from './Message';
import { URL } from './Constent';
import axios from 'axios';
import { setMessages } from '../redux/chatSlice';

const ChatApp = () => {
  const [textMessage, setTextMessage] = useState('');
  const { user, suggestedUsers, selectedUser } = useSelector((store) => store.auth);
  const { onlineUsers, messages } = useSelector((store) => store.chat);
  const dispatch = useDispatch();
  const [isUserListVisible, setIsUserListVisible] = useState(true); // Add state to control visibility
  const isOnline = true; // Simulating online status for now

  // Send message handler
  const sendMessageHandler = async (receiverId) => {
    try {
      const res = await axios.post(
        `${URL}/chat/send/${receiverId}`,
        { textMessage },
        { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
      );
      if (res.data.success) {
        dispatch(setMessages([...messages, res.data.newMessage]));
        setTextMessage('');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useGetAllMessage();

  // Cleanup function when component unmounts
  useEffect(() => {
    return () => {
      dispatch(setSelectedUser(null));
    };
  }, [dispatch]);

  const handleBackButton = () => {
    dispatch(setSelectedUser(null)); // Reset selected user
    setIsUserListVisible(true); // Show user list again
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-gray-100 md:flex-row">
      {/* Sidebar - Only visible on larger screens */}
      <aside className="hidden md:flex flex-col w-72 bg-white border-r p-4 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Chats</h2>
        <div className="space-y-3 overflow-y-auto h-full pr-1">
          {suggestedUsers?.map((suggested) => (
            <div
              key={suggested._id}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition cursor-pointer"
              onClick={() => {
                dispatch(setSelectedUser(suggested));
                setIsUserListVisible(false); // Hide the user list when a user is selected
              }}
            >
              <img
                src={suggested?.profilePicture || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'}
                alt={suggested.userName}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="font-medium text-gray-800">{suggested.userName}</p>
                <p className={`text-xs font-bold ${isOnline ? 'text-green-600' : 'text-red-600'}`}>
                  {isOnline ? 'Online' : 'Offline'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* Main Chat Section */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-4 border-b bg-white shadow-sm">
          {selectedUser ? (
            <button
              onClick={handleBackButton}
              className="text-blue-600 hover:text-blue-800"
            >
              Back to Users
            </button>
          ) : (
            <h1 className="text-xl font-semibold text-gray-700">
              Welcome, <span className="text-blue-600">{user?.userName || 'Guest'}</span>
            </h1>
          )}
        </header>

        {/* Chat Area */}
        <section className="flex-1 p-6 overflow-y-auto flex flex-col md:flex-row">
          {/* User List (Mobile View) */}
          <div className={`md:hidden flex flex-col w-full mb-4 ${isUserListVisible ? '' : 'hidden'}`}>
            {suggestedUsers?.map((suggested) => (
              <div
                key={suggested._id}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition cursor-pointer"
                onClick={() => {
                  dispatch(setSelectedUser(suggested));
                  setIsUserListVisible(false); // Hide the user list when a user is selected
                }}
              >
                <img
                  src={suggested?.profilePicture || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'}
                  alt={suggested.userName}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium text-gray-800">{suggested.userName}</p>
                  <p className={`text-xs font-bold ${isOnline ? 'text-green-600' : 'text-red-600'}`}>
                    {isOnline ? 'Online' : 'Offline'}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Chat with selected user */}
          {selectedUser ? (
            <div className="flex-1 flex flex-col w-full max-w-2xl mx-auto">
              {/* Message List */}
              <div className="flex-1 overflow-y-auto mb-4">
                <Message selectedUser={selectedUser} />
              </div>

              {/* Send Message Section - Always at Bottom */}
              <div className="flex p-2 border-t bg-white sticky bottom-0">
                <input
                  type="text"
                  placeholder="Enter your message..."
                  value={textMessage}
                  onChange={(e) => setTextMessage(e.target.value)}
                  className="flex-1 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                  className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                  onClick={() => sendMessageHandler(selectedUser?._id)}
                >
                  Send
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-500 space-y-2">
              <h2 className="text-2xl font-semibold">Your Messages</h2>
              <p className="text-sm">Send a message to start chatting.</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default ChatApp;
