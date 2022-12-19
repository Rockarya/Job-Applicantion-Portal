import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from "react-router-dom";
import ANav from './ANav';
import axios from 'axios';

export default function SOP() {

    const [SOP, setSOP] = useState('');
    const [user, setUser] = useState();
    const history = useHistory();
    const params = useParams();

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (!loggedInUser) {
            history.push('/login');
        }
        else {
            const foundUser = JSON.parse(loggedInUser);
            setUser(foundUser);
        }
    }, []);

    const onChangeSOP = (event) => {
        setSOP(event.target.value);
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.patch(`http://localhost:4000/jobs/${params.id}/${user._id}`);

            // adding SOP of the applicant
            const SOP_obj = {
                jobID_SOP: [params.id, SOP],
                applicantID_SOP: [user._id, SOP]
            }
            await axios.patch(`http://localhost:4000/jobs/SOP/${params.id}/${user._id}`, SOP_obj);
            alert("You have applied for this job succesfully!");
            history.push(`/adashboard`);
        }
        catch (err) {
            // console.log(err);
        }
    }

    return (
        <div>
            <ANav />
            <h3>Write a Statement of Purpose to your recruiter</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <textarea type="text"
                        placeholder="Statement of Purpose"
                        rows={10}
                        cols={50}
                        className="form-control"
                        value={SOP}
                        onChange={onChangeSOP}
                    />
                </div>

                <div className="form-group">
                    <input type="submit" value="Submit" className="btn btn-primary" />
                </div>
            </form>
        </div>
    )
}
