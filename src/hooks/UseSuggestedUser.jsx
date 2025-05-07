import axios from 'axios';
import React, { useEffect } from 'react';
import { URL } from '../components/Constent';
import { useDispatch } from 'react-redux';
import { suggestedUsers } from '../redux/userSlice';

const UseSuggestedUser = () => {

const dispatch  = useDispatch()
const FetchSuggestedProduct = async() =>{
    try {
        const res = await axios.get(`${URL}/auth/suggested-user`, {withCredentials:true})
        if(res.data.success){
            dispatch(suggestedUsers(res.data.users))
        }
    } catch (error) {
        console.log(error)
    }
}

useEffect(() =>{
FetchSuggestedProduct()
},[])




    return (
        <div>
            
        </div>
    );
};

export default UseSuggestedUser;