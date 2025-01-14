import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

//import css file
import './Register.css'

const Register = ({ setToken }) => {

    const navigate = useNavigate(); //Initialize navigate function.

    const [ email, setEmail ] = useState('');
    const [ name, setName ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ confirmPassword, setConfirmPassword ] = useState('');

    const [ emailError, setEmailError ] = useState('');
    const [ usernameError, setUsernameError ] = useState('');
    const [ passwordError, setPasswordError ] = useState('');
    const [ error, setError ] = useState('');

    let newUserData = {
        email: email,
        username: name,
        password: password
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        if(password !== confirmPassword){
            setError("🧐 Password do not match!");
            return;
        }
        try{
            const response = await axios.post('http://localhost:8000/api/auth/register', newUserData)
            localStorage.setItem('token', response.data.token)
            navigate('/')
            window.location.reload();
        } catch(err) {
            console.log(err.message);
        }
    }

  return (

    <div>

        <div className="formBootstrap">
            <h2 className="mb-4">User Register</h2>

            <form onSubmit={onSubmit}>
                <div className="form-group mb-3">
                    <label htmlFor="emailID">Email</label>
                    <input type="email" className="form-control" id="emailID" placeholder="Email address" onChange={(e) => setEmail(e.target.value)} value={email}/>
                    <small id="emailErrorsID" className="form-text text-muted smallError">{emailError}</small>
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="usernameID">UserName</label>
                    <input type="text" className="form-control" id="usernameID" placeholder="UserName" onChange={(e) => setName(e.target.value)} value={name}/>
                    <small id="usernameErrorsID" className="form-text text-muted smallError">{usernameError}</small>
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="passwordID">Password</label>
                    <input type="password" className="form-control" id="passwordID" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password}/>
                    <small id="passwordErrorsID" className="form-text text-muted smallError">{passwordError}</small>
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="confirmPasswordID">Confirm Password</label>
                    <input type="password" className="form-control" id="confirmPasswordID" placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword}/>
                    <small id="otherErrorsID" className="form-text text-muted smallError">{error}</small>
                </div>
                <button type="submit" className="btn btn-primary">Register</button>
            </form>
        </div>

    </div>

  )

}

export default Register;
