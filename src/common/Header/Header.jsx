import React from 'react';
import './Header.css'
import { useDispatch, useSelector } from 'react-redux';
import { logout, userData } from '../../pages/userTokenSlice';
import { NavButton } from '../NavButton/NavButton';
import { jwtDecode } from 'jwt-decode';

export const Header = () => {
    const dispatch = useDispatch();
    const userCredentialsRedux = useSelector(userData);
    const token = userCredentialsRedux.credentials;
    let currentRole;

    if ((typeof token) !== "object") {
        const decToken = token ? jwtDecode(token) : null;
        // console.log(decToken?.role);
        // ? ---> cuando esté disponible el .role
        currentRole = decToken?.role;
    }
    // console.log('user role actual ---> ' + currentRole);

    const logOutMe = () => {
        dispatch(logout({ credentials: "" }))
    }

    return (
        <div className="headerDesign txtHead">
            <NavButton path={"/"} title={"Home"} />
            <NavButton path={"/allbands"} title={"Bands"} />
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
