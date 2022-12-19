import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import ANav from './ANav';

export default function MyApplications() {

    const history = useHistory();
    const [job, setjobs] = useState([]);

    const fetchUsers = async (id) => {
        const data = await fetch(`http://localhost:4000/jobs/${id}/applicants/alljobs`);
        const jobs = await data.json();
        setjobs(jobs);
    };

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (!loggedInUser) {
            history.push('/login');
        }
        else {
            const foundUser = JSON.parse(loggedInUser);
            fetchUsers(foundUser._id);
        }
    }, []);

    return (
        <div class="table-responsive">
            <ANav />
            <h1>These are the list of jobs you applied for</h1>
            <h3>Wait till recruiter finds your profile interesting ;-))</h3>
            <table class="table">
                <thead class="thead-dark">
                    <tr>
                        <th scope="col">S. No.</th>
                        <th scope="col">Title</th>
                        <th scope="col">Salary</th>
                        <th scope="col">Name of Recruiter</th>
                        <th scope="col">Rating</th>
                    </tr>
                </thead>
                <tbody>
                    {job.map((val, ind) =>
                        <tr key={ind}>
                            <td><h3>{ind + 1}</h3></td>
                            <td><h3> {val.title} </h3></td>
                            <td><h3> {val.salary} </h3></td>
                            <td><h3> {val.name} </h3></td>
                            <td><h3> {val.rating} </h3></td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}