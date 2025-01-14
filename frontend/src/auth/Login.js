import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Login = ({ setToken }) => {

    const navigate = useNavigate(); //Initialize navigate function.

    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    const [ emailError, setEmailError ] = useState('');
    const [ passwordError, setPasswordError ] = useState('');
    const [ error, setErrorMessage ] = useState('');

    let UserData = {
        email: email,
        password: password
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        
        try{
            const response = await axios.post('http://localhost:8000/api/auth/login', UserData);
            localStorage.setItem('token', response.data.token);
            navigate('/');
            window.location.reload();
        } catch(err) {
            console.log("☠️ :: onSubmit Function failed! ERROR : " + err.message);
            setErrorMessage("An error occurred. Please try again later.");
        }
    }

  return (

    <div>

        <div className="formBootstrap">
            <h2 className="mb-4">User Login</h2>

            <form onSubmit={onSubmit}>
                <div className="form-group mb-3">
                    <label htmlFor="emailID">Email</label>
                    <input type="email" className="form-control" id="emailID" placeholder="Email address" onChange={(e) => setEmail(e.target.value)} value={email}/>
                    <small id="emailErrorsID" class="form-text text-muted smallError">{emailError}</small>
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="passwordID">Password</label>
                    <input type="password" className="form-control" id="passwordID" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password}/>
                    <small id="passwordErrorsID" class="form-text text-muted smallError">{passwordError}</small>
                    <small id="otherErrorsID" class="form-text text-muted smallError">{error}</small>
                </div>
                <button type="submit" className="btn btn-warning">Login</button>
                {/* <button type="submit" className="btn btn-warning">Register</button> */}
            </form>
        </div>

    </div>

  )
};

export default Login;
