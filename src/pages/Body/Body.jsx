import { Navigate, Route, Routes } from "react-router-dom"
import { Home } from "../Home/Home"
import { Register } from "../Register/Register"
import { UserProfile } from "../UserProfile/UserProfile"
import { Login } from "../Login/Login"
import { Bands } from "../Bands/Bands"
import { BandPage } from "../BandPage/BandPage"
import { Admin } from "../Admin/Admin"
import { BandMembers } from "../BandMembers/BandMembers"

export const Body = () => {
    return (
        <>
            <Routes>
                <Route path="*" element={<Navigate to="/" />} />
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<UserProfile />} />
                <Route path="/allbands" element={<Bands />} />
                <Route path="/band/:id" element={<BandPage />} />
                <Route path="/bandmembers/:id" element={<BandMembers />} />
                <Route path="/admin" element={<Admin />} />
            </Routes>
        </>
    );
};
