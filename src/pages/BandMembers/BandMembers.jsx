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
                setAllUsers(response.data.bandMembers)
            } catch (error) {
                console.error('Error getting all users:', error);
            }
        };
        getAllUsers();
    }, []);
    // console.log(allUsers[0].user.username);

    const kickMember = async (userId)=>{
        try {
            const body = {"user_id": userId, "band_id": id,}
            const response = await kickBandMemberCall(body, token)
            console.log(response.data.message);
            const updatedUsers = allUsers.filter(user => user.user.id !== userId);
            setModalMessage(response.data.message)
                    setShowModal(true);
                    setTimeout(() => {
                        setShowModal(false);
                        setAllUsers(updatedUsers);
                    }, 2000)
            
        } catch (error) {
            console.error('Error kicking member:', error);
            setModalMessage(error.message)
                setShowModal(true);
                setTimeout(() => {
                    setShowModal(false);
                }, 2000)
        }
    }

    const [modalMessage, setModalMessage] = useState('');
    const [showModal, setShowModal] = useState(false);

    return (
        <div className="bandMembersDesign">
            {allUsers ? (
                allUsers.map((user) => (
                    <div key={user.user.id} className="adminCard">
                        <img src={`https://unavatar.io/${user.user.username}`} width="100" className="imgAdminCard" />
                        <div className="infoUsersAdmin">
                            <div>{user.user.username}</div>
                            {/* <div>Email: {user.email}</div>
                            <div>Active: {user.is_active ? 'yes' : 'no'}</div> */}
                        </div>
                        {(!showModal)?(<div onClick={() => kickMember(user.user.id)} className="buttonDeleteUser">Kick of the band</div>):(<div>adios: {modalMessage}</div>)}
                        
                    </div>
                ))
            ) : (
                allUsers.length === 0 && <div>Waiting for users retrieving ... </div>
            )}
        </div>
    );
    

};
