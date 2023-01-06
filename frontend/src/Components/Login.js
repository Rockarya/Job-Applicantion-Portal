import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';
import clientId from './OAuthWebClientID';

export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    useEffect(() => {
        const initClient = () => {
            gapi.client.init({
                clientId: clientId,
                scope: ''
            });
        };
        gapi.load('client:auth2', initClient);

        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
            const foundUser = JSON.parse(loggedInUser);
            history.push(`/${foundUser.role}`);
        }
    }, []);

    const onChangeEmail = (event) => {
        setEmail(event.target.value);
    }

    const onChangePassword = (event) => {
        setPassword(event.target.value);
    }

    const onSuccess = async (res) => {
        // console.log('success:', res);
        try {
            const response = await axios.post('http://localhost:4000/api/user/gsignin', { email: res.profileObj.email })
            if (response.status === 200) {
                setEmail(res.profileObj.email);
            }
            else {
                alert('You are not registered with this email id!');
                localStorage.setItem("gSignIn", JSON.stringify(res.profileObj));
                history.push('/register');
            }
        }
        catch (err) {
            console.log(err);
        }
    };

    const onFailure = (err) => {
        // console.log('failed:', err);
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        const newUser = {
            email: email,
            password: password
        }

        try {
            const res = await axios.post('http://localhost:4000/api/user/login', newUser);
            if (res.status === 200) {
                try {
                    localStorage.setItem("user", JSON.stringify(res.data));
                    alert("Logged In as " + res.data.name)
                    history.push(`/${res.data.role}`);
                }
                catch (err) {
                    // alert(err)
                }
            }
            if (res.status === 204) {
                alert("Invalid Email!");
            }
            if (res.status === 205) {
                alert("Email not found!");
            }
            if (res.status === 206) {
                alert("Incorrect Password");
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Email*  : </label>
                    <input type="text"
                        className="form-control"
                        value={email}
                        onChange={onChangeEmail}
                        required={true}
                        placeholder={"enter your email id"}
                    />
                </div>
                <div className="form-group">
                    <label>Password*  : </label>
                    <input type="password"
                        className="form-control"
                        value={password}
                        onChange={onChangePassword}
                        required={true}
                        placeholder={"enter your password"}
                    />
                </div>
                <div className="form-group">
                    <input type="submit" value="Login" className="btn btn-primary" />
                </div>
                <h5>Not registered yet!</h5>
                <a href="http://localhost:3000/register">Register Here</a>
            </form>
            <br />
            <GoogleLogin
                clientId={clientId}
                buttonText="Sign in with Google"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
            />
        </div>
    )
}