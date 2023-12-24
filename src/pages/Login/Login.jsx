import "./Login.css";
import { useState } from "react";
import { FieldInput } from "../../common/FieldInput/FieldInput";
import { loginCall } from "../../services/apiCalls";
import { useDispatch } from "react-redux";
import { login } from "../userTokenSlice";
import { useNavigate } from "react-router-dom";

export const Login = () => {
    // guardo la accion de dispatch en una const
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // defino mis datos, un objeto, en el estado del hook
    const [loginBody, setLoginBody] = useState({
        email: "",
        password: "",
    });

    // manejo el paquete para llevar cada propiedad a los campos de mi componente input
    const loginBodyHandler = (e) => {
        setLoginBody((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    // llamo a la api con el objeto loginBody y recupero los datos de la llamada
    const loginButton = () => {
        // console.log(loginBody);
        loginCall(loginBody)
            .then(result => {
                // guardo el token actual y lo mando a credentials en el userTokenSlice
                const currentToken = result.data.token;
                console.log(currentToken);
                dispatch(login({ credentials: currentToken }));
                navigate('/');
            })
            .catch(error => {
                console.log(error.message);
            });
    }

    return (
        <div className="loginDesign">
            <div className="loginContainer">
                <FieldInput
                    design={'inputLogin'}
                    type={"email"}
                    name={"email"}
                    placeholder={"Enter email"}
                    functionProp={loginBodyHandler}
                />
                <div className='errorMsg'>{''}</div>
                <FieldInput
                    design={'inputLogin'}
                    type={"password"}
                    name={"password"}
                    placeholder={"Enter password"}
                    functionProp={loginBodyHandler}
                />
                <div className="loginButton" onClick={loginButton}>Login</div>
            </div>
        </div>
    );
};
