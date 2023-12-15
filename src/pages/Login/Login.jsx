import React, { useState } from "react";
import "./Login.css";
import { FieldInput } from "../../common/FieldInput/FieldInput";
import { loginCall } from "../../services/apiCalls";

export const Login = () => {

    // defino mis variables en el estado del hook
    const [loginBody, setLoginBody] = useState({
        email: "",
        password: "",
    });

    // las manejo para llevarla a los campos de mi input
    const functionHandler = (e) => {
        setLoginBody((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value
        }));
      };
    
    // llamo a la api con el objeto loginBody y recupero los datos de la llamada
    const logMe = () => {
        console.log(loginBody);
        loginCall(loginBody)
            .then(result => {
                console.log(result.data.token);
            })
            .catch(error => {
                console.log(result.data);
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
                    functionProp={functionHandler}

                />
                <div className='errorMsg'>{''}</div>
                <FieldInput className="logPanel inputDesign"
                    design={''}
                    type={"password"}
                    name={"password"}
                    placeholder={"Enter password"}
                    functionProp={functionHandler}

                />
                <div className='buttonSubmitLog' onClick={logMe}>Login</div>
            </div>
        </div>
    );
};
