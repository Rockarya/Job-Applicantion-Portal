import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';
import axios from 'axios';
import RNav from './RNav';
import Button from '@material-ui/core/Button';


export default function ActiveJob() {

    const [jobs, setJobs] = useState([]);
    const history = useHistory();

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (!loggedInUser) {
            history.push('/login');
        }
        else {
            const foundUser = JSON.parse(loggedInUser);
            fetchJobs(foundUser._id);
        }
    }, []);

    const fetchJobs = async (id) => {
        try {
            const data = await fetch(`http://localhost:4000/jobs/${id}/recruiters/alljobs`);
            const json_data = await data.json();
            setJobs(json_data);
        }
        catch (err) {
            console.log(err);
        }
    };

    const onUpdate = (event, jobID) => {
        event.preventDefault();
        history.push(`/edit_delete_job/${jobID}`);
    }

    const onDelete = async (event, jobID) => {
        event.preventDefault();

        try {
            await axios.delete(`http://localhost:4000/jobs/${jobID}`);
            alert("Job Deleted");
            window.location.reload()
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="table-responsive">
            <RNav />
            <h1>These are the list of jobs posted by you!</h1>
            <table className="table">
                <thead className="thead-dark">
                    <tr>
                        {/* <th scope="col">#</th> */}
                        <th scope="col">Title</th>
                        <th scope="col">Date of Posting</th>
                        <th scope="col">Deadline</th>
                        <th scope="col">Number of Applications</th>
                        <th scope="col">Max Number of Positions</th>
                        <th scope="col">Update job?</th>
                        <th scope="col">Delete this job?</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{jobs.map(vals => (<h2 key={vals._id}><Link to={`/applicantdetails/${vals._id}`}> {vals.title} </Link> </h2>))}</td>
                        <td>{jobs.map(vals => (<h2 key={vals._id}> {vals.postingdate} </h2>))}</td>
                        <td>{jobs.map(vals => (<h2 key={vals._id}> {vals.deadline} </h2>))}</td>
                        <td>{jobs.map(vals => (<h2 key={vals._id}> {vals.applications} </h2>))}</td>
                        <td>{jobs.map(vals => (<h2 key={vals._id}> {vals.positions} </h2>))}</td>
                        <td>{jobs.map(vals => (<h2 key={vals._id}> {<Button onClick={event => onUpdate(event, vals._id)}>Update</Button>} </h2>))}</td>
                        <td>{jobs.map(vals => (<h2 key={vals._id}> {<Button onClick={event => onDelete(event, vals._id)}>Delete</Button>} </h2>))}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}