import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import RNav from './RNav';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

export default function RProfile() {

    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [contact, setContact] = useState();
    const [bio, setBio] = useState();
    const [user, setUser] = useState();
    const history = useHistory();

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (!loggedInUser) {
            history.push('/login');
        }
        else {
            const foundUser = JSON.parse(loggedInUser);
            if(foundUser.name){setName(foundUser.name);}
            if(foundUser.email){setEmail(foundUser.email);}
            if(foundUser.contact){setContact(foundUser.contact);}
            if(foundUser.bio){setBio(foundUser.bio);}
            setUser(foundUser);
        }
    }, []);

    const onChangeName = (event) => {
        setName(event.target.value);
    }

    const onChangeEmail = (event) => {
        setEmail(event.target.value);
    }

    const onChangeContact = (event) => {
        setContact(event.target.value);
    }

    const onChangeBio = (event) => {
        setBio(event.target.value);
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const newUser = {
            name: name,
            email: email,
            contact: contact,
            bio: bio
        }

        axios.patch(`http://localhost:4000/users/recruiter/${user._id}`, newUser).then((res) => {
            var profile = JSON.parse(localStorage.getItem('user'));
            Object.keys(newUser).forEach((key) => {
                profile[key] = newUser[key];
            });
            localStorage.setItem('user', JSON.stringify(profile));
            alert("Profile Updated");
            history.push('/recruiter');
        })
        .catch(function (error) {
            // alert(error);
        });
    }

    return (
        <div>
            <RNav />
            <h1>Update your profile to make applicants know more about you and your jobs!!!</h1>
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
                    <label>Contact: </label>
                    <input type="number" min={1000000000} max={9999999999}
                        className="form-control"
                        value={contact}
                        onChange={onChangeContact}
                    />
                </div>
                <div className="form-group">
                    <label>Bio: </label>
                    <textarea type="text"
                        placeholder="About You (Max 1000 characters)"
                        rows={3}
                        cols={30}
                        className="form-control"
                        value={bio}
                        onChange={onChangeBio}
                        maxLength={1000}   //setting the maximum character length to be 250 words
                    />
                </div>
                <div className="form-group">
                    <input type="submit" value="Update" className="btn btn-primary" />
                </div>
            </form>
        </div>
    )
}