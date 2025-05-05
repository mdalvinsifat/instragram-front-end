import React, { useState } from 'react';
import { RxBorderDotted } from 'react-icons/rx';
import { IoClose } from 'react-icons/io5'; // Import a close icon
import FollowUnFollowDilog from './FollowUnFollowDilog';
import { FaRegComment, FaRegHeart, FaRegPaperPlane } from 'react-icons/fa';
import { CiBookmark } from 'react-icons/ci';
import { useSelector } from 'react-redux';

const CommantviewDilog = ({ commant, setCommant }) => {
  const handleClose = (e) => {
    if (e.target.id === 'backdrop') setCommant(false);
  };


  const [text , settext] = useState()
  const [open , setOpen ] = useState("")
  const handleChange = (e) =>{
    const inputs = e.target.value; 
    if(inputs.trim())
    {
        settext(inputs)
    }
    else{
        settext("")
    }
  }
  return (
    <>
      {commant && (
        <div
          id="backdrop"
          className="fixed inset-0 z-40 backdrop-blur-sm flex justify-center items-center"
          onClick={handleClose}
        >

            
          <div
            className="bg-white relative rounded-xl shadow-lg flex flex-col md:flex-row w-full max-w-6xl h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setCommant(false)}
              className="absolute top-2 right-2 text-2xl text-gray-600 hover:text-black z-50"
            >
              <IoClose />
            </button>

            {/* Left: Post Image */}
            <div className="flex-1 bg-black flex items-center justify-center overflow-hidden">
              {/* <img
                src="https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg"
                alt="Post"
                className="object-contain w-full max-h-full"
              /> */}
            </div>

            {/* Right: Comments + User Info */}
            <div className="w-full md:w-[400px] flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center">
                  <img
                    src="https://5.imimg.com/data5/UU/PW/LI/ANDROID-80573741/product-jpeg.jpg"
                    alt="Profile"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <h1 className="ml-3 font-semibold text-sm">userName</h1>
                </div>
  <div
            className="ml-auto text-xl text-gray-600 cursor-pointer"
            onClick={() => setOpen(true)}
          >
            <RxBorderDotted />
          </div>
              </div>

              {/* Comments List */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 text-sm">
                <p><span className="font-semibold">user1:</span> Awesome picture!</p>
                <p><span className="font-semibold">user2:</span> Love this 🔥🔥</p>
                <p><span className="font-semibold">user3:</span> Where is this taken?</p>
              </div>




 <div className="flex items-center gap-4 text-xl px-4 py-3 text-gray-800">
          <FaRegHeart className="cursor-pointer hover:scale-110 transition" />
          <FaRegComment className="cursor-pointer hover:scale-110 transition" />
          <FaRegPaperPlane className="cursor-pointer hover:scale-110 transition" />
          <CiBookmark className="cursor-pointer hover:scale-110 transition ml-auto" />
        </div>


              {/* Comment Input */}
              <div className="flex items-center border-t p-3">

                  <input
                    type="text"
                    placeholder="Add a comment..."
                    className="flex-1 outline-none text-sm px-3 py-2"
                    onChange={handleChange}
                    value={text}
                  />
                {
                    text ? 

                    <button className="text-blue-600 font-semibold px-3">Post</button>
                    : " "
                }
              </div>
            </div>
          </div>
        </div>
      )}

<FollowUnFollowDilog open ={open} setOpen={setOpen}/>
    </>
  );
};

export default CommantviewDilog;
