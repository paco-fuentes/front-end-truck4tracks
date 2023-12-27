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
    currentRole = decToken?.role;
  }

  const logOutMe = () => {
    dispatch(logout({ credentials: "" }))
  }

  return (
    <div className="headerDesign txtHead">
      <div className="buttonContainerHome">
        <NavButton path={"/"} title={"Home"} design={"buttonHome"} />
      </div>
      <div className="buttonContainerAllBands">
        <NavButton path={"/allbands"} title={"Bands"} design={"buttonAllBands"} />
      </div>
      {!currentRole ? (
        <>
          <div className="buttonContainerLogin">
            <NavButton path={"/login"} title={"Login"} design={"buttonLogin"} />
          </div>
          <div className="buttonContainerReg">
            <NavButton path={"/register"} title={"Register"} design={"buttonReg"} />
          </div>
        </>
      ) : (currentRole === 1 && (
        <>
          <div className="buttonContainerProfile">
            <NavButton path={"/profile"} title={"Profile"} design={"buttonProfile"} />
          </div>
          <div className="buttonContainerLogin" onClick={logOutMe}>
            <NavButton path={"/"} title={"Log Out"} design={"buttonLogin"} />
          </div>
        </>
      )) || (currentRole === 2 && (
        <>
          <div className="buttonContainerProfile">
            <NavButton path={"/admin"} title={"Admin"} design={"buttonProfile"} />
          </div>
          <div className="buttonContainerLogin" onClick={logOutMe}>
            <NavButton path={"/"} title={"Log Out"} design={"buttonLogin"} />
          </div>
        </>
      ))
      }
    </div>
  );
};
