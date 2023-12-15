import { useEffect, useState } from 'react';
import { profileCall } from '../../services/apiCalls';
import './UserProfile.css'

import { useSelector } from 'react-redux';
import { userData } from '../userTokenSlice';

export const UserProfile = () => {
    const datosRdxUser = useSelector(userData);
    console.log('redux --- > '+datosRdxUser.credentials);
    // const token = datosRdxUser.credentials;
    // console.log(token);

    return (
        <>
            User Profile:
        </>
    );
};