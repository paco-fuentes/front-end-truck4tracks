import { useEffect, useState } from 'react';
import { profileCall } from '../../services/apiCalls';
import './UserProfile.css'
import { useSelector } from 'react-redux';
import { userData } from '../userTokenSlice';

export const UserProfile = () => {
    const userCredentialsRedux = useSelector(userData);
    const token = userCredentialsRedux.credentials;

    const [userProfileData, setUserProfileData] = useState(null);

    useEffect(() => {
        const getProfile = async () => {
            try {
                const response = await profileCall(token);
                console.log('Respuesta del servidor:', response.data);
                setUserProfileData(response.data);
            } catch (error) {
                console.error('Error al obtener el perfil:', error);
            }
        };
        getProfile();
    }, [token]);

    const [profile, setProfile] = useState({
        username: '',
        email: '',
        activity: '',
        img_url: '',
    })

    useEffect(() => {
        // manejar si hay o no hay datos
        if (userProfileData && userProfileData.data) {
            const { username, email, activity, img_url } = userProfileData.data;
            setProfile({
                username: username || '',
                email: email || '',
                activity: activity || '',
                img_url: img_url || '',
            });
        }
    }, [userProfileData]);

    return (
        <>
            <p>User Profile:</p>
            <div>username: {profile.username}</div>
            <div>email: {profile.email}</div>
            <div>activity: {profile.activity.activity}</div>
            <div>Imagen default: <img src={profile.img_url} alt="user image" width="200" /></div>
            <div>Imagen username: <img src={`https://unavatar.io/${profile.username}`} width="200" /></div>
        </>
    );
};
