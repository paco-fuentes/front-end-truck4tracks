import { useEffect, useState } from "react";
import "./BandMembers.css";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { userData } from "../userTokenSlice";
import { getBandMembers, kickBandMemberCall } from "../../services/apiCalls";

export const BandMembers = () => {
    const userCredentialsRedux = useSelector(userData);
    const token = userCredentialsRedux.credentials;
    const [allUsers, setAllUsers] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        const getAllUsers = async () => {
            try {
                const response = await getBandMembers(id, token);
                setAllUsers(response.data.bandMembers);
            } catch (error) {
                console.error('Error getting all users:', error);
            }
        };
        getAllUsers();
    }, []);

    const kickMember = async (userId) => {
        try {
            const body = { "user_id": userId, "band_id": id, };
            const response = await kickBandMemberCall(body, token);
            console.log(response.data.message);
            const updatedUsers = allUsers.filter(user => user.user.id !== userId);

            // Usar el ID del usuario como clave en los estados
            setModalMessage({ ...modalMessage, [userId]: response.data.message });
            setShowModal({ ...showModal, [userId]: true });

            setTimeout(() => {
                setShowModal({ ...showModal, [userId]: false });
                setAllUsers(updatedUsers);
            }, 2000);

        } catch (error) {
            console.error('Error kicking member:', error);

            // Usar el ID del usuario como clave en los estados
            setModalMessage({ ...modalMessage, [userId]: error.message });
            setShowModal({ ...showModal, [userId]: true });

            setTimeout(() => {
                setShowModal({ ...showModal, [userId]: false });
            }, 2000);
        }
    };

    const [modalMessage, setModalMessage] = useState({});
    const [showModal, setShowModal] = useState({});

    return (
        <div className="bandMembersDesign">
            {allUsers ? (
                allUsers.map((user) => (
                    <div key={user.user.id} className="adminCard">
                        <img src={`https://unavatar.io/${user.user.username}`} width="100" className="imgAdminCard" />
                        <div className="infoUsersAdmin">
                            <div>{user.user.username}</div>
                        </div>
                        {(!showModal[user.user.id]) ? (
                            <div onClick={() => kickMember(user.user.id)} className="buttonDeleteUser">Kick of the band</div>
                        ) : (
                            <div>adios: {modalMessage[user.user.id]}</div>
                        )}

                    </div>
                ))
            ) : (
                allUsers.length === 0 && <div>Waiting for users retrieving ... </div>
            )}
        </div>
    );
};
