import "./Login.css";
import { useState } from "react";
import { FieldInput2 } from "../../common/FieldInput2/FieldInput2";
import { loginCall } from "../../services/apiCalls";
import { useDispatch } from "react-redux";
import { login } from "../userTokenSlice";
import { useNavigate } from "react-router-dom";
import { validator } from "../../services/useful";

export const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [loginBody, setLoginBody] = useState({
        email: "",
        password: "",
    });

    const [userError, setUserError] = useState({
        emailError: "",
        passwordError: ""
    })

    const loginBodyHandler = (e) => {
        setLoginBody((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    const errorCheck = (e) => {
        let error = "";
        error = validator(e.target.name, e.target.value);

        setUserError((prevState) => ({
            ...prevState,
            [e.target.name + 'Error']: error,
        }));
    }

    const [modalMessage, setModalMessage] = useState('');
    const [showModal, setShowModal] = useState(false);

    const loginButton = () => {
        loginCall(loginBody)
            .then(result => {
                const currentToken = result.data.token;
                dispatch(login({ credentials: currentToken }));
                setModalMessage(result.data.message)
                setShowModal(true);
                setTimeout(() => {
                    setShowModal(false);
                    navigate('/');
                }, 2000)
            })
            .catch(error => {
                setModalMessage(error.message)
                setShowModal(true);
                setTimeout(() => {
                    setShowModal(false);
                }, 2000)
            });
    }

    return (
        <div className="loginDesign">
            {(!showModal)
                ? (<div className="loginContainer">
                    <div className="fieldComp">
                        <FieldInput2
                            design={'inputLogin'}
                            type={"email"}
                            name={"email"}
                            placeholder={"Enter email"}
                            functionProp={loginBodyHandler}
                            functionBlur={errorCheck}
                        />
                        <FieldInput2
                            design={'inputLogin'}
                            type={"password"}
                            name={"password"}
                            placeholder={"Enter password"}
                            functionProp={loginBodyHandler}
                            functionBlur={errorCheck}
                        />
                    </div>
                    {(userError.passwordError === true && userError.emailError === true)
                        ? <div className="loginButton" onClick={loginButton}>Login</div>
                        : <div className="loginButtonInactve">Login</div>
                    }
                    {(userError.emailError === true)
                        ? ""
                        : <div className='errorMsg'>{userError.emailError}</div>
                    }
                    {(userError.passwordError === true)
                        ? ""
                        : <div className='errorMsg'>{userError.passwordError}</div>
                    }
                </div>
                ) :
                (<div className="loginModalContainer">{modalMessage}</div>)}
        </div>
    );
};
