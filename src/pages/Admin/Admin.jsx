import { useSelector } from "react-redux";
import { userData } from "../userTokenSlice";
import { useEffect, useState } from "react";
import { getAllUsersCall } from "../../services/apiCalls";
import "./Admin.css";

export const Admin = () => {
    const userCredentialsRedux = useSelector(userData);
    const token = userCredentialsRedux.credentials;

    const [allUsers, setAllUsers] = useState([]);

    useEffect(() => {
        const getAllUsers = async () => {
            try {
                const response = await getAllUsersCall(token);
                setAllUsers(response.data.data)
            } catch (error) {
                console.error('Error getting all users:', error);
            }
        };
        getAllUsers();
    }, []);

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
                            <img src={`https://unavatar.io/${user.username}`} width="100" className="imgAdminCard" />
                            <div className="infoUsersAdmin">
                            <div>Username: {user.username}</div>
                            <div>email: {user.email}</div>
                            <div>created: {formattedCreatedAt}</div>
                            <div>updated: {updatedCreatedAt}</div>
                            <div>Active: {user.is_active ? 'yes' : 'no'}</div>
                            </div>
                            <button onClick={() => deleteUser(id)} className="buttonDeleteUser">Delete</button>
                        </div>
                    );
                })
            ) : (
                allUsers.length === 0 && <div>Waiting for users retrieving ... </div>
            )}
        </div>
    );
};
