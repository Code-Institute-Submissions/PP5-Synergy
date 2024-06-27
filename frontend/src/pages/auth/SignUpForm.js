import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import React, { useContext, useState } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Message } from 'primereact/message';

const SignUpForm = () => {
    const [signUpData, setSignUpData] = useState({
        username: "",
        password1: "",
        password2: "",
    });
    const { username, password1, password2 } = signUpData;
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    
    const handleChange = (event) => {
        setSignUpData({
            ...signUpData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post("/dj-rest-auth/registration/", signUpData);
            navigate('/signin')
        } catch (err) {
            setErrors(err.response?.data);
        }
    };

    return (
        
    <div className="flex align-items-center justify-content-center mt-2">
        <div className="surface-card p-4 shadow-2 border-round w-full sm:w-6 lg:w-4">
            <div className="text-center mb-5">
                <img src="/demo/images/blocks/logos/hyper.svg" alt="hyper" height={50} className="mb-3" />
                <div className="text-900 text-3xl font-medium mb-3">Create Account</div>
                <span className="text-600 font-medium line-height-3">Already have an account?</span>
                <Link className="font-medium no-underline ml-2 text-blue-500 cursor-pointer" to="/signin">
                    Login
                </Link>
                {errors.non_field_errors?.map((message, idx) => (
                    <Message className="w-full mb-1" severity="error" text={message} />
                ))}
            </div>
            <label htmlFor="username" className="block text-900 font-medium mb-2">Username</label>
            <InputText value={username} onChange={handleChange} id="username" name="username" type="text" placeholder="username" className="w-full mb-3" />
            {errors.username?.map((message, idx) => (
                <Message className="w-full mb-1" severity="error" text={message} key={idx}/>
            ))}
            

            <label htmlFor="password1" className="block text-900 font-medium mb-2">Password</label>
            <Password value={password1} onChange={handleChange} className="w-12 mb-3" feedback={false} pt={{ iconField: { root: { className: "w-12" } },input: { className: "w-12", name: "password1", id: "password1" }}} toggleMask/>
            {errors.password1?.map((message, idx) => (
                <Message className="w-full mb-1" severity="error" text={message} key={idx}/>
            ))}

            <label htmlFor="password2" className="block text-900 font-medium mb-2">Confirm Password</label>
            <Password value={password2} onChange={handleChange} className="w-12 mb-3" feedback={false} pt={{ iconField: { root: { className: "w-12" } },input: { className: "w-12", name: "password2", id: "password2" }}} toggleMask/>
            {errors.password2?.map((message, idx) => (
                <Message className="w-full mb-1" severity="error" text={message} key={idx}/>
            ))}

            <Button label="Submit" icon="pi pi-check" className="w-full" onClick={handleSubmit}/>
        </div>
    </div>
    );
};

export default SignUpForm;