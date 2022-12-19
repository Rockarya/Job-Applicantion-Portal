import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";

export default function Register() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    useEffect(() => {
        // const initClient = () => {
        //     gapi.client.init({
        //         clientId: clientId,
        //         scope: ''
        //     });
        // };
        // gapi.load('client:auth2', initClient);

        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
            const foundUser = JSON.parse(loggedInUser);
            history.push(`/${foundUser.role}`);
        }
    }, []);

    const onChangeName = (event) => {
        setName(event.target.value);
    }

    const onChangeEmail = (event) => {
        setEmail(event.target.value);
    }

    const onChangePassword = (event) => {
        setPassword(event.target.value);
    }

    const onSubmit = (e) => {
        e.preventDefault();

        var ind = document.getElementById("role");
        const newUser = {
            name: name,
            email: email,
            password: password,
            role: ind.options[ind.selectedIndex].value
        }

        const registerhere = async () => {
            try {
                const res = await axios.post('http://localhost:4000/api/user/register', newUser);
                if (res.status === 200) {
                    alert("Created user " + res.data.name);
                    localStorage.setItem("user", JSON.stringify(res.data));
                    history.push(`/${res.data.role}`);
                }
                if (res.status === 205) {
                    alert("Ensure that email id is valid\nName,Email and Password must be atleast 4 characters long");
                }
                if (res.status === 204) {
                    alert("Email already exists!");
                }
            }
            catch (err) {
                //  alert(err);
            }
        };
        registerhere();
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Name: </label>
                    <input type="text"
                        className="form-control"
                        value={name}
                        onChange={onChangeName}
                    />
                </div>
                <div className="form-group">
                    <label>Email: </label>
                    <input type="text"
                        className="form-control"
                        value={email}
                        onChange={onChangeEmail}
                    />
                </div>
                <div className="form-group">
                    <label>Password: </label>
                    <input type="password"
                        className="form-control"
                        value={password}
                        onChange={onChangePassword}
                    />
                </div>
                <h4>Select Your Role</h4>
                <select id="role" defaultValue={"applicant"}>
                    <option value="applicant">Applicant</option>
                    <option value="recruiter">Recruiter</option>
                </select>
                <br />
                <br />
                <div className="form-group">
                    <input type="submit" value="Register" className="btn btn-primary" />
                </div>
                <h5>Already registered!</h5>
                <a href="http://localhost:3000/login">Login Here</a>
            </form>
        </div>
    )
}