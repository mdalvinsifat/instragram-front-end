import React from 'react';
import { useSelector } from 'react-redux';
import UseSuggested from './UseSuggested';

const RightBar = () => {
    const {user} = useSelector(store => store.auth)

    return (
        <div className='flex-row '>
   <div className='flex items-center  gap-4 border-b-1 p-3 '>
   <img src={user?.profilePicture} alt="" className='w-10 h-10 rounded-full mt-5 ' />
<div>
<h1 className='text-semibold mt-4'>{user?.userName}</h1>

   <p className='text-sm'>{user?.bio}</p>
    </div>   
    
    </div>
    <p className='text-sm my-5'>Suggested for you </p>

<UseSuggested/>

        </div>
    );
};

export default RightBar;