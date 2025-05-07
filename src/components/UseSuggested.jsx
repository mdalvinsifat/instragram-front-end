import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const UseSuggested = () => {
    const { suggestedUsers } = useSelector((store) => store.auth);

    return (
        <div>
            {
                suggestedUsers.slice(0, 3).map((item, index) => (
                    <div className="flex items-center mb-4" key={index}>
                        <div>
                            <img
                                src={item?.profilePicture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                                alt="Profile"
                                className="w-10 h-10 rounded-full mt-2"
                            />
                        </div>

                        <div className="ml-3 mt-2">
                            <p className="text-sm">{item?.userName}</p>
                        </div>

                        <div className="ml-auto mt-2">
                            <Link to="/login" className="text-blue-400">Follow+</Link>
                        </div>
                    </div>
                ))
            }
        </div>
    );
};

export default UseSuggested;
