import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import RNav from './RNav';
import { MultiSelect } from "@progress/kendo-react-dropdowns";

export default function CreateJob() {

    const [title, setTitle] = useState('');
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [applications, setApplications] = useState(null);
    const [positions, setPositions] = useState(null);
    const [postingDate, setPostingDate] = useState(Date.now());
    const [deadline, setDeadline] = useState(null);
    const [skills, setSkills] = useState('');
    const [jobType, setJobType] = useState('');
    const [duration, setDuration] = useState(null);
    const [salary, setSalary] = useState(null);
    const [user, setUser] = useState();
    const history = useHistory();
    const languages = ['C', 'C++', 'Python', 'Javascript', 'C#', 'Java'];


    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (!loggedInUser) {
            history.push('/login');
        }
        else {
            const foundUser = JSON.parse(loggedInUser);
            setUser(foundUser);
            setName(foundUser.name);
            setEmail(foundUser.email);
        }
    }, []);

    const onChangeTitle = (event) => {
        setTitle(event.target.value);
    }

    const onChangeApplications = (event) => {
        setApplications(event.target.value);
    }

    const onChangePositions = (event) => {
        setPositions(event.target.value)
    }

    const onChangePostingDate = (event) => {
        setPostingDate(event.target.value)
    }

    const onChangeDeadline = (event) => {
        setDeadline(event.target.value);
    }

    const onChangeSkills = (event) => {
        const values = event.target.value;
        const lastItem = values[values.length - 1];
        if (lastItem) {
            values.pop();
            const sameItem = values.find((value) => value === lastItem);
            if (sameItem === undefined) {
                values.push(lastItem);
            }
        }
        setSkills(values);
    }

    const onChangeSalary = (event) => {
        setSalary(event.target.value);
    }

    const onChangeDuration = (event) => {
        setDuration(event.target.value);
    }

    const onSubmit = (e) => {
        e.preventDefault();

        var ind = document.getElementById("jobtype");
        var ind2 = document.getElementById("rating");
        const newUser = {
            title: title,
            name: name,
            email: email,
            applications: applications,
            positions: positions,
            postingdate: postingDate,
            deadline: deadline,
            skills: skills,
            jobtype: ind.options[ind.selectedIndex].value,
            duration: duration,
            salary: salary,
            rating: ind2.options[ind2.selectedIndex].value
        }

        axios.post(`http://localhost:4000/jobs/${user._id}`, newUser)
        .then(res => {
            // console.log(res);
            alert("Created job " + res.data.title);
            history.push('/activejob');
        })
        .catch(function (error) {
            // alert(error);
        });
    }

    return (
        <div>
            <RNav />
            <h1>Create a Job to recruit applicants for :-)</h1>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Name: </label>
                    <input type="text"
                        className="form-control"
                        value={name}
                        readOnly={true}
                    />
                </div>

                <div className="form-group">
                    <label>Email: </label>
                    <input type="text"
                        className="form-control"
                        value={email}
                        readOnly={true}
                    />
                </div>

                <div className="form-group">
                    <label>Title: </label>
                    <input type="text"
                        className="form-control"
                        value={title}
                        onChange={onChangeTitle}
                    />
                </div>

                <div className="form-group">
                    <label>Applications: </label>
                    <input type="number" min={0}
                        className="form-control"
                        value={applications}
                        onChange={onChangeApplications}
                    />
                </div>

                <div className="form-group">
                    <label>Positions: </label>
                    <input type="number" min={0}
                        className="form-control"
                        value={positions}
                        onChange={onChangePositions}
                    />
                </div>

                <div className="form-group">
                    <label>Posting Date: </label>
                    <input type="date"
                        className="form-control"
                        value={postingDate}
                        onChange={onChangePostingDate}
                    />
                </div>

                <div className="form-group">
                    <label>Deadline: </label>
                    <input type="date"
                        className="form-control"
                        value={deadline}
                        onChange={onChangeDeadline}
                    />
                </div>

                <div className="form-group">
                    Skills: {JSON.stringify(skills)}
                    <MultiSelect
                        data={languages}
                        onChange={onChangeSkills}
                        value={skills}
                        allowCustom={true}
                    />
                </div>

                <div className="form-group">
                    <label>Salary: </label>
                    <input type="number" step={1000} min={0}
                        className="form-control"
                        value={salary}
                        onChange={onChangeSalary}
                    />
                </div>

                <div className="form-group">
                    <label>Duration in Months : </label>
                    <input type="number" min={1} max={6}
                        className="form-control"
                        value={duration}
                        onChange={onChangeDuration}
                    />
                </div>

                <h4>Rating</h4>
                <select id="rating">
                    <option value={0}>0</option>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3} selected>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                </select>
                <br />
                <h4>Job Type</h4>
                <select id="jobtype">
                    <option value="Full-Time" selected>Full-Time</option>
                    <option value="Part-Time">Part-Time</option>
                    <option value="Work-From-Home">Work-From-Home</option>
                </select>
                <br />
                <br />

                <div className="form-group">
                    <input type="submit" value="Create" className="btn btn-primary" />
                </div>
            </form>
        </div>
    )
}
