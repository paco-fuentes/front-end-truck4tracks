import { useEffect, useState } from 'react';
import { createBandCall, getAllActivitiesCall, profileCall, updateProfileCall } from '../../services/apiCalls';
import { useSelector } from 'react-redux';
import { userData } from '../userTokenSlice';
import { FieldInput } from '../../common/FieldInput/FieldInput';
import { validator } from '../../services/useful';
import './UserProfile.css'
import { useNavigate } from 'react-router-dom';

export const UserProfile = () => {
    const userCredentialsRedux = useSelector(userData);
    const token = userCredentialsRedux.credentials;
    const [userProfileData, setUserProfileData] = useState(null);
    const [activities, setActivities] = useState();
    const navigate = useNavigate();

    const [newBand, setNewBand] = useState({
        band_name: '',
        about: '',
        img_url: '',
    });

    console.log(newBand);
    const [modalMessage, setModalMessage] = useState('');
    const [showModal, setShowModal] = useState(false);
    const createNewBand = async () => {
        try {
            const body = {
                band_name: newBand.band_name,
                about: newBand.about,
            };
            const response = await createBandCall(body, token);
            setNewBand(response.data);
            const newBandId = response.data.band.id
            setModalMessage(response.data.message)
                    setShowModal(true);
                    setTimeout(() => {
                        setShowModal(false);
                        navigate(`/band/${newBandId}`)
                    }, 2000)

        } catch (error) {
            console.error(`Error creating band: ${error}`);
            setModalMessage(error.message)
            setShowModal(true);
            setTimeout(() => {
                setShowModal(false);
            }, 2000)
        }
    };

    const functionHandlerBand = (e, fieldName) => {
        setNewBand((prevState) => ({
            ...prevState,
            [fieldName]: e.target.value,
        }));
    };

    useEffect(() => {
        const getProfile = async () => {
            try {
                const response = await profileCall(token);
                setUserProfileData(response.data);
            } catch (error) {
                console.error('Error al obtener el perfil:', error);
            }
        };
        getProfile();
    }, [token, newBand]);

    useEffect(() => {
        const allActivities = async () => {
            try {
                const response = await getAllActivitiesCall();
                setActivities(response.data.data);
            } catch (error) {
                console.error('Error al obtener las actividades:', error);
            }
        }
        allActivities();
    }, []);

    const [profile, setProfile] = useState({
        username: '',
        email: '',
        activity: '',
    })

    const [profileError, setProfileError] = useState({
        usernameError: '',
        emailError: '',
        activity: '',
    });

    const [isEnabled, setIsEnabled] = useState(true);

    useEffect(() => {
        // manejar si hay o no hay datos
        if (userProfileData && userProfileData.data) {
            const { username, email, activity, img_url } = userProfileData.data;
            setProfile({
                username: username || '',
                email: email || '',
                activity: activity || '',
            });
        }
    }, [userProfileData]);

    const errorCheck = (e) => {
        let error = "";
        error = validator(e.target.name, e.target.value);

        setProfileError((prevState) => ({
            ...prevState,
            [e.target.name + 'Error']: error,
        }));
    };

    const functionHandler = (e, fieldName) => {
        setProfile((prevState) => ({
            ...prevState,
            [fieldName]: e.target.value,
        }));
    };

    const sendProfileData = async () => {
        try {
            const body = {
                username: profile.username,
                email: profile.email,
                activity: profile.activity,
            };

            const response = await updateProfileCall(body, token);
            setIsEnabled(true);
            setUserProfileData(response.data.data);
        } catch (error) {
            console.error(`Error al actualizar el perfil ${error}`);
        }
    };



    return (
        <div className='profileDesign'>
            <div className='profileContainer'>
                <div className='profileInfo' >
                    <div>User Profile:</div>
                    <FieldInput
                        disabled={isEnabled}
                        design={`inputDesign ${profileError.usernameError !== "" ? "inputDesignError" : ""
                            }`}
                        type={"text"}
                        name={"username"}
                        placeholder={"username"}
                        value={profile.username}
                        functionProp={(e) => functionHandler(e, "username")}
                        functionBlur={errorCheck}
                    />
                    <div>email:</div>
                    <FieldInput
                        disabled={isEnabled}
                        design={`inputDesign ${profileError.emailError !== "" ? "inputDesignError" : ""
                            }`}
                        type={"text"}
                        name={"email"}
                        placeholder={"email"}
                        value={profile.email}
                        functionProp={(e) => functionHandler(e, "email")}
                        functionBlur={errorCheck}
                    />
                    <label htmlFor="activity-profile">Select Activity:</label>
                    <select
                        name="activity-profile"
                        id="activity-profile"
                        value={profile.activity.id}
                        onChange={(e) => setProfile({ ...profile, activity: e.target.value })}
                    >
                        {activities && activities.map((activity) => (
                            <option key={activity.id} value={activity.id}>
                                {activity.activity}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <img src={`https://unavatar.io/${profile.username}`} width="200" />
                </div>
                <div>
                    {
                        isEnabled
                            ? (<div className="profileButton" onClick={() => setIsEnabled(!isEnabled)}>Edit</div>)
                            : (<div className="editDesign" onClick={() => sendProfileData()}>Send</div>)
                    }
                </div>
                {(profileError.usernameError === true)
                    ? ""
                    : <div className='errorMsg'>{profileError.usernameError}</div>
                }
                {(profileError.emailError === true)
                    ? ""
                    : <div className='errorMsg'>{profileError.emailError}</div>
                }
            </div>
            {(!showModal) ? (
                <div className='profileContainer'>
                    <div>Start a new band:</div>
                    <FieldInput
                        disabled={''}
                        design={''}
                        type={"text"}
                        name={"band_name"}
                        placeholder={"Your new band name"}
                        value={newBand.band_name}
                        functionProp={(e) => functionHandlerBand(e, "band_name")}
                        functionBlur={errorCheck}
                    />
                    <FieldInput
                        disabled={''}
                        design={''}
                        type={"text"}
                        name={"about"}
                        placeholder={"About your band..."}
                        value={newBand.about}
                        functionProp={(e) => functionHandlerBand(e, "about")}
                        functionBlur={errorCheck}
                    />
                    <div onClick={createNewBand} className='profileButton'>Create</div>
                </div>)
                :
                (<div>adios: {modalMessage}</div>)
            }

        </div>
    );
};
