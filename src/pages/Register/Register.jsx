import { useState } from 'react';
import { FieldInput } from '../../common/FieldInput/FieldInput';
import { registerCall } from '../../services/apiCalls';
import './Register.css'

export const Register = () => {
    const [userBody, setUserBody] = useState({
        activity_id: 1,
        username: '',
        email: '',
        password: ''
    })

    const userBodyHandler = (e) => {
        setUserBody((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const submit = () => {
        registerCall(userBody)
            .then(
                result => {
                    console.log(userBody);
                }
            )
            .catch(error => console.log(error));
    }

    return (

        <div>
            <FieldInput
                design={``}
                type={"username"}
                name={"username"}
                placeholder={"Your username..."}
                functionProp={userBodyHandler}
            />
            <FieldInput
                design={``}
                type={"email"}
                name={"email"}
                placeholder={"email@email.email"}
                functionProp={userBodyHandler}
            />
            <FieldInput
                design={``}
                type={"password"}
                name={"password"}
                placeholder={"Password"}
                functionProp={userBodyHandler}
            />
            <div onClick={submit}>Submit</div>
        </div>

    );
};