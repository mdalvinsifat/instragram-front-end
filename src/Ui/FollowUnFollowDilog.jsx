import React from 'react';

const FollowUnFollowDilog = ({open , setOpen}) => {

    const handleClose = (e) => {
        if (e.target.id === 'backdrop') setOpen(false);
      };

      
    return (
        <div>
               {open && (
        <div
          id="backdrop"
          className="fixed inset-0 z-40 backdrop-blur-sm flex justify-center items-center"
          onClick={handleClose}
        >
          <div className="bg-white rounded-xl w-72 text-center overflow-hidden z-50 shadow-lg">
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