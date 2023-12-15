import React, { useState } from "react";
import "./Login.css";
import { FieldInput } from "../../common/FieldInput/FieldInput";
import { loginCall } from "../../services/apiCalls";

export const Login = () => {

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
        console.log(loginBody);
        loginCall(loginBody)
            .then(result => {
                console.log(result.data.token);
            })
            .catch(error => {
                console.log(error.message);
            });
    }

    return (
        <div>
            <div>
                <FieldInput
                    design={''}
                    type={"email"}
                    name={"email"}
                    placeholder={"Enter email"}
                    functionProp={loginBodyHandler}

                />
                <div className='errorMsg'>{''}</div>
                <FieldInput className="logPanel inputDesign"
                    design={''}
                    type={"password"}
                    name={"password"}
                    placeholder={"Enter password"}
                    functionProp={loginBodyHandler}

                />
                <div className='buttonSubmitLog' onClick={loginButton}>Login</div>
            </div>
        </div>
    );
};
