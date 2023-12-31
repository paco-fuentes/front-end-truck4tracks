import "./Login.css";
import { useState } from "react";
import { FieldInput2 } from "../../common/FieldInput2/FieldInput2";
import { loginCall } from "../../services/apiCalls";
import { useDispatch } from "react-redux";
import { login } from "../userTokenSlice";
import { useNavigate } from "react-router-dom";
import { validator } from "../../services/useful";

export const Login = () => {
    // guardo la accion de dispatch en una const
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // defino mis datos, un objeto, en el estado del hook
    const [loginBody, setLoginBody] = useState({
        email: "",
        password: "",
    });

    // manejo de errores
    const [userError, setUserError] = useState({
        emailError: "",
        passwordError: ""
    })

    // manejo el paquete para llevar cada propiedad a los campos de mi componente input
    const loginBodyHandler = (e) => {
        setLoginBody((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    // manejo de errores
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

    // llamo a la api con el objeto loginBody y recupero los datos de la llamada
    const loginButton = () => {
        // console.log(loginBody);
        loginCall(loginBody)
            .then(result => {
                // guardo el token actual y lo mando a credentials en el userTokenSlice
                const currentToken = result.data.token;
                console.log(currentToken);
                dispatch(login({ credentials: currentToken }));
                setModalMessage(result.data.message)
                    setShowModal(true);
                    setTimeout(() => {
                        setShowModal(false);
                        navigate('/');
                    }, 2000)
            })
            .catch(error => {
                console.log('respuesta del srver: ', error.message);
                setModalMessage(error.message)
                setShowModal(true);
                setTimeout(() => {
                    setShowModal(false);
                }, 2000)
            });
    }
    console.log('el usestate', modalMessage);
    console.log('el shomodal state', showModal);
    return (
        <div className="loginDesign">
            {(!showModal)?(<div className="loginContainer">
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

            </div>):(<div>adios: {modalMessage}</div>)}
            
        </div>
    );
};
