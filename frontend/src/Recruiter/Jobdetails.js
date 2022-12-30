import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from "react-router-dom";
import axios from 'axios';
import RNav from './RNav';

export default function JobDetails() {

    const [applications, setApplications] = useState(1);
    const [positions, setPositions] = useState(1);
    const [deadline, setDeadline] = useState('');
    const params = useParams();
    const history = useHistory();

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (!loggedInUser) {
            history.push('/login');
        }
        else {
            fetchJobDetails(params.id);
        }
    }, []);

    const fetchJobDetails = async (id) => {
        try {
            const res = await axios.get(`http://localhost:4000/jobs/${id}`);
            setApplications(res.data.applications);
            setPositions(res.data.positions);

            var from = res.data.deadline.split("/");
            var deadlineDate = from[2].toString() + '-' + from[1].toString() + '-' + from[0].toString();
            setDeadline(deadlineDate);
        }
        catch (err) {
            // alert(err);
        }
    };

    const onChangeApplications = (event) => {
        setApplications(event.target.value);
    }

    const onChangePositions = (event) => {
        setPositions(event.target.value);
    }

    const onChangeDeadline = (event) => {
        setDeadline(event.target.value);
    }

    const formatDate = (inputDate) => {
        let date, month, year;

        date = inputDate.getDate();
        month = inputDate.getMonth() + 1;
        year = inputDate.getFullYear();

        date = date
            .toString()
            .padStart(2, '0');

        month = month
            .toString()
            .padStart(2, '0');

        return `${date}/${month}/${year}`;
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const newUser = {
            applications: applications,
            positions: positions,
            deadline: formatDate(new Date(deadline)),
        }

        console.log(newUser, 'newuser');
        const postdetails = async () => {
            axios.patch(`http://localhost:4000/jobs/${params.id}`, newUser)
                .then(res => {
                    alert("Job Updated");
                    history.push('/activejob');
                })
                .catch(function (error) {
                    // alert(error)
                })
        };
        postdetails();
    }

    const onDelete = (e) => {
        e.preventDefault();
        const deletejob = async () => {
            try {
                await axios.delete(`http://localhost:4000/jobs/${params.id}`);
                alert("Job Deleted");
                history.push('/activejob');
            }
            catch (err) {
                // alert(err);
            }
        }
        deletejob();
    }

    return (
        <div>
            <RNav />
            <h1>Here are the details of the this job you created before</h1>
            <h3>Something wrong in this job? Update it!</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Positions*  : </label>
                    <input type="number" min={1}
                        className="form-control"
                        value={positions}
                        onChange={onChangePositions}
                        required={true}
                        placeholder={"available openings"}
                    />
                </div>

                <div className="form-group">
                    <label>Applications*  : </label>
                    <input type="number" min={positions}
                        className="form-control"
                        value={applications}
                        onChange={onChangeApplications}
                        required={true}
                        placeholder={"max allowed applications"}
                    />
                </div>

                <div className="form-group">
                    <label>Deadline for Application: </label>
                    <input type="date" min={new Date().toISOString().split("T")[0]}
                        className="form-control"
                        value={deadline}
                        onChange={onChangeDeadline}
                        required={true}
                    />

                </div>
                <div className="form-group">
                    <input type="submit" value="Update" className="btn btn-primary" />
                </div>
                <br />
                <br />
                {/* DELETE THE JOB */}
            </form>
            <form onSubmit={onDelete}>
                <div className="form-group">
                    <input type="submit" value="Delete this job?" className="btn btn-primary" />
                </div>
            </form>
        </div>
    )
}