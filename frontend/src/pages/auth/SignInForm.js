import { Link } from "react-router-dom";
import axios from "axios";
import React, { useContext, useState } from 'react';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Message } from 'primereact/message';

const SignInForm = () => {
    const [checked, setChecked] = useState(false);
    const [signInData, setSignInData] = useState({
        username: "",
        password: "",
    });
    const { username, password } = signInData;
    const [errors, setErrors] = useState({});
    
    const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
          const { data } = await axios.post("/dj-rest-auth/login/", signInData);
        } catch (err) {
            setErrors(err.response?.data);
        }
    };

    const handleChange = (event) => {
        setSignInData({
          ...signInData,
          [event.target.name]: event.target.value,
        });
    };

    return (
        
    <div className="flex align-items-center justify-content-center mt-2">
        <div className="surface-card p-4 shadow-2 border-round w-full sm:w-6 lg:w-4">
            <div className="text-center mb-5">
                <img src="/demo/images/blocks/logos/hyper.svg" alt="hyper" height={50} className="mb-3" />
                <div className="text-900 text-3xl font-medium mb-3">Welcome Back</div>
                <span className="text-600 font-medium line-height-3">Don't have an account?</span>
                <Link className="font-medium no-underline ml-2 text-blue-500 cursor-pointer" to="/signup">
                    Create today!
                </Link>
                {errors.non_field_errors?.map((message, idx) => (
                    <Message className="w-full mb-1" severity="error" text={message} key={idx}/>
                ))}
            </div>
            <label htmlFor="username" className="block text-900 font-medium mb-2">Username</label>
            <InputText value={username} onChange={handleChange} id="username" name="username" type="text" placeholder="username" className="w-full mb-3" />
            {errors.username?.map((message, idx) => (
                <Message className="w-full mb-1" severity="error" text={message} key={idx}/>
            ))}
            

            <label htmlFor="password" className="block text-900 font-medium mb-2">Password</label>
            <Password value={password} onChange={handleChange} className="w-12 mb-3" feedback={false} pt={{ input: { className: "w-12", name: "password", id: "password" }}}/>
            {errors.password?.map((message, idx) => (
                <Message className="w-full mb-1" severity="error" text={message} key={idx}/>
            ))}

            <div className="flex align-items-center justify-content-between mb-6">
                <div className="flex align-items-center">
                    <Checkbox id="rememberme" onChange={e => setChecked(e.checked)} checked={checked} className="mr-2" />
                    <label htmlFor="rememberme">Remember me</label>
                </div>
                <span className="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer">Forgot your password?</span>
            </div>

            <Button label="Sign In" icon="pi pi-user" className="w-full" onClick={handleSubmit}/>
        </div>
    </div>
    );
};

export default SignInForm;