import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import RNav from './RNav';
import Multiselect from 'multiselect-react-dropdown';

export default function CreateJob() {

    const [title, setTitle] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [applications, setApplications] = useState();
    const [positions, setPositions] = useState();
    const [deadline, setDeadline] = useState('');
    const [skills, setSkills] = useState([]);
    const [duration, setDuration] = useState();
    const [salary, setSalary] = useState();
    const [user, setUser] = useState();
    const history = useHistory();
    var languagesArr = ['C','CSS','C++','C#','Dart','Go','HTML','Java','Javascript','Kotlin','MATLAB','Perl','PHP','Python','R','Ruby','Rust','Scala','Swift','SQL'];
    var languagesObjectArr = [];
    for(let i=0;i<languagesArr.length;i++) {
        languagesObjectArr.push({id: i+1, name: languagesArr[i]});
    }

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

    const onChangeDeadline = (event) => {
        setDeadline(event.target.value);
    }

    const onChangeSalary = (event) => {
        setSalary(event.target.value);
    }

    const onChangeDuration = (event) => {
        setDuration(event.target.value);
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

    const onSelectSkills = (selectedList, selectedItem) => {
        setSkills(selectedList);
    }

    const onRemoveSkills = (selectedList, selectedItem) => {
        var array = selectedList;
        array.pop(selectedItem);
        setSkills(array); 
    }

    const onSubmit = (e) => {
        e.preventDefault();

        var ind = document.getElementById("jobtype");
        const newJob = {
            title: title,
            name: name,
            email: email,
            applications: applications,
            positions: positions,
            postingdate: formatDate(new Date()),
            deadline: formatDate(new Date(deadline)),
            skills: skills,
            jobtype: ind.options[ind.selectedIndex].value,
            duration: duration,
            salary: salary,
        }

        axios.post(`http://localhost:4000/jobs/${user._id}`, newJob)
            .then(res => {
                alert("Created job " + res.data.title);
                history.push('/activejob');
            })
            .catch(function (error) {
                alert(error);
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
                    <label>Job Title*  : </label>
                    <input type="text"
                        className="form-control"
                        value={title}
                        onChange={onChangeTitle}
                        required={true}
                        placeholder={"enter job title"}
                    />
                </div>

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
                    <label>Deadline*  : </label>
                    <input type="date" min={new Date().toISOString().split("T")[0]}
                        className="form-control"
                        value={deadline}
                        onChange={onChangeDeadline}
                        required={true}
                    />
                </div>

                <div className="form-group">
                    <h4>Skills  : <Multiselect
                        options={languagesObjectArr} // Options to display in the dropdown
                        selectedValues={skills} // Preselected value to persist in dropdown
                        onSelect={onSelectSkills} // Function will trigger on select event
                        onRemove={onRemoveSkills} // Function will trigger on remove event
                        displayValue="name" // Property name to display in the dropdown options
                    /></h4>
                </div>

                <div className="form-group">
                    <label>Salary*  : </label>
                    <input type="number" step={5000} min={0}
                        className="form-control"
                        value={salary}
                        onChange={onChangeSalary}
                        required={true}
                        placeholder={"salary per month"}
                    />
                </div>

                <div className="form-group">
                    <label>Duration in Months*  : </label>
                    <input type="number" min={1} max={6}
                        className="form-control"
                        value={duration}
                        onChange={onChangeDuration}
                        required={true}
                        placeholder={"enter duration"}
                    />
                </div>

                <h4>Job Type</h4>
                <select id="jobtype" defaultValue={"Full-Time"}>
                    <option value="Full-Time">Full-Time</option>
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
