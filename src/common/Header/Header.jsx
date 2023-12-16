import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css'
import { useDispatch, useSelector } from 'react-redux';
import { logout, userData } from '../../pages/userTokenSlice';
import { NavButton } from '../NavButton/NavButton';


export const Header = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userCredentialsRedux = useSelector(userData);
    const token = userCredentialsRedux.credentials;

    const logOutMe = () => {
        dispatch(logout({ credentials: "" }))
        // navigate("/")
    }


    return (
        <div className="headerDesign txtHead">
            <NavButton path={"/"} title={"Home"} />

        
                <>
                    <NavButton path={"/login"} title={"Login"} />
                    <NavButton path={"/register"} title={"Regístrate"} />

                </>
     
                <>
                    <NavButton path={"/profile"} title={"Profile"} />

                    <div onClick={logOutMe}>
                        <NavButton path={"/"} title={"Log Out"} />
                    </div>
                </>

            
        </div>
    );
};