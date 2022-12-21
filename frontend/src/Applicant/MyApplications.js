import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import ANav from './ANav';

export default function MyApplications() {

    const history = useHistory();
    const [job, setjobs] = useState([]);

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

    const fetchUsers = async (id) => {
        const data = await fetch(`http://localhost:4000/jobs/${id}/applicants/alljobs`);
        const json_data = await data.json();
        settingJobParams(json_data);
    };

    const settingJobParams = (data) => {
        var jobParams = [];

        for(let status in data) {
            for(let i=0;i<data[status].length;i++) {
                const val = data[status][i];
                var params = {
                    "title" : val.title,
                    "salary": val.salary,
                    "name" : val.name,
                    "rating" : val.rating,
                    "status" : status
                }
                jobParams.push(params);
            }
        }

        setjobs(jobParams);
    };


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
                        <th scope="col">Status</th>
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
                            <td><h3> {val.status} </h3></td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}