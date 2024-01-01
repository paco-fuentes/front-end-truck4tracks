import { useSelector } from "react-redux";
import { userData } from "../userTokenSlice";
import { useEffect, useState } from "react";
import { deleteUserByBodyIdCall, getAllUsersCall } from "../../services/apiCalls";
import "./Admin.css";

export const Admin = () => {
    const userCredentialsRedux = useSelector(userData);
    const token = userCredentialsRedux.credentials;
    const [allUsers, setAllUsers] = useState([]);

    useEffect(() => {
        const getAllUsers = async () => {
            try {
                const response = await getAllUsersCall(token);
                setAllUsers(response.data.data);
            } catch (error) {
                console.error('Error getting all users:', error);
            }
        };
        getAllUsers();
    }, []);

    const [modalMessages, setModalMessages] = useState({});
    const [showModals, setShowModals] = useState({});

    const deleteUser = async (userId) => {
        try {
            const response = await deleteUserByBodyIdCall(userId, token);
            const updatedUsers = allUsers.filter((user) => user.id !== userId);
            setModalMessages({ ...modalMessages, [userId]: response.data.message });
            setShowModals({ ...showModals, [userId]: true });

            setTimeout(() => {
                setShowModals({ ...showModals, [userId]: false });
                setAllUsers(updatedUsers);
            }, 2000);
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return (
        <div className="adminDesign">
            {allUsers ? (
                allUsers.map((user) => {
                    const createdAtDate = new Date(user.created_at);
                    const updatedAtDate = new Date(user.updated_at);
                    const formattedCreatedAt = `${createdAtDate.getDate()}/${createdAtDate.getMonth() + 1}/${createdAtDate.getFullYear()} ${createdAtDate.getHours()}:${String(createdAtDate.getMinutes()).padStart(2, '0')}`;
                    const updatedCreatedAt = `${updatedAtDate.getDate()}/${updatedAtDate.getMonth() + 1}/${updatedAtDate.getFullYear()} ${updatedAtDate.getHours()}:${String(updatedAtDate.getMinutes()).padStart(2, '0')}`;
                    return (
                        <div key={user.id} className="adminCard">
                            <img src={`https://unavatar.io/github/${user.username}`} width="100" className="imgAdminCard" />
                            <div className="infoUsersAdmin">
                                <div>Username: {user.username}</div>
                                <div>Email: {user.email}</div>
                                <div>Created: {formattedCreatedAt}</div>
                                <div>Updated: {updatedCreatedAt}</div>
                                <div>Active: {user.is_active ? 'yes' : 'no'}</div>
                            </div>
                            {(!showModals[user.id]) ? (
                                <div onClick={() => deleteUser(user.id)} className="buttonDeleteUser">Delete</div>
                            ) : (
                                <div>adios: {modalMessages[user.id]}</div>
                            )}
                        </div>
                    );
                })
            ) : (
                allUsers.length === 0 && <div>Waiting for users retrieving ... </div>
            )}
        </div>
    );
};
