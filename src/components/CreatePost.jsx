import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { setPosts } from '../redux/postSlice';

const CreatePost = ({ open, setOpen }) => {
  const [image, setImage] = useState(null); // for preview
  const [imageFile, setImageFile] = useState(null); // for backend upload
  const [caption, setCaption] = useState('');

  const dispatch = useDispatch()
  const {posts} = useSelector(store => store.post)

  const handleClose = (e) => {
    if (e.target.id === 'backdrop') setOpen(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setImageFile(file);
    }
  };


  const HandlePostSubmite = async (e) => {
    e.preventDefault();
    if (!imageFile || !caption) {
      toast.error('Please add image and caption');
      return;
    }

    const formData = new FormData();
    formData.append('image', imageFile);
    formData.append('caption', caption);
     const token = localStorage.getItem('token'); // or wherever you store your token


    try {
      const res = await axios.post("https://instragram-back-end-p.onrender.com/post/addPost", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,


        },
        withCredentials:true
      });

      dispatch(setPosts([res.data.post,...posts  ]));
      toast.success(res.data.message || "Post created!");
      setOpen(false);
      setImage(null);
      setImageFile(null);
      setCaption('');

    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.error || 'Something went wrong');
    }
};




  return (
    open && (
      <form onSubmit={HandlePostSubmite}>
        <div
          id="backdrop"
          className="fixed inset-0 bg-opacity-40 backdrop-blur-sm flex justify-center items-center z-50"
          onClick={handleClose}
        >
          <div
            className="bg-white w-96 max-w-full rounded-xl p-4 shadow-lg z-50"
            onClick={(e) => e.stopPropagation()} // prevent click inside modal from closing
          >
            <h2 className="text-center font-semibold text-lg mb-4">Create New Post</h2>

            {!image ? (
              <div className="border-2 border-dashed border-gray-300 p-6 flex flex-col items-center justify-center text-center rounded-lg">
                <p className="text-gray-600 mb-2">Drag photos and videos here</p>
                <label className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md">
                  Select from computer
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>
              </div>
            ) : (
              <div className="flex flex-col gap-4 relative">
                <img
                  src={image}
                  alt="preview"
                  className="w-full h-64 object-cover rounded-md"
                />
                <button
                  type="button"
                  onClick={() => {
                    setImage(null);
                    setImageFile(null);
                  }}
                  className="absolute top-2 right-2 bg-black bg-opacity-60 text-white rounded-full p-1 text-sm hover:bg-opacity-80"
                  title="Remove image"
                >
                  ✖
                </button>
                <textarea
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="Write a caption..."
                  className="border rounded-md p-2 w-full resize-none h-20"
                ></textarea>
              </div>
            )}

            <div className="flex justify-end mt-4 gap-2">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="px-4 py-2 rounded-md border text-gray-600"
              >
                Cancel
              </button>
              {image && (
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                  Post
                </button>
              )}
            </div>
          </div>
        </div>
      </form>
    )
  );
};

export default CreatePost;