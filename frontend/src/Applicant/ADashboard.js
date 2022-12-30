import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import Button from '@material-ui/core/Button';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import './Applicant.css';
import ANav from './ANav';


export default function ADashboard() {

    const [jobs, setJobs] = useState([]);
    const [salaryTitle, setSalaryTitle] = useState(true);
    const [durationTitle, setDurationTitle] = useState(true);
    const [ratingTitle, setRatingTitle] = useState(true);
    const [user, setUser] = useState();
    const history = useHistory();

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (!loggedInUser) {
            history.push('/login');
        }
        else {
            const foundUser = JSON.parse(loggedInUser);
            setUser(foundUser);
            axios.get('http://localhost:4000/jobs').then(response => {
                setJobParams(response.data, foundUser._id);
            })
                .catch(function (error) {
                    console.log(error);
                })
        }
    }, []);

    const setJobParams = async (data, id) => {
        var jobParamsArray = [];
        for (let i = 0; i < data.length; i++) {
            var jobParams = data[i];
            try {
                const res = await axios.get(`http://localhost:4000/jobs/${jobParams._id}`);
                const data = res.data;
                if (data.appliedstatus.indexOf(id) !== -1 || data.shortlistedstatus.indexOf(id) !== -1 || data.acceptedstatus.indexOf(id) !== -1 || data.rejectedstatus.indexOf(id) !== -1) {
                    jobParams["buttonText"] = "Applied";
                }
                // a job listing with the maximum number of applications reached or positions filled
                else if (data.applications === (data.appliedstatus.length + data.shortlistedstatus.length + data.acceptedstatus.length + data.rejectedstatus.length) || data.positions === data.acceptedstatus.length) {
                    jobParams["buttonText"] = "Full";
                }
                else {
                    jobParams["buttonText"] = "Apply";
                }
            }
            catch (err) {
                console.log(err);
            }
            jobParamsArray.push(jobParams);
        }
        setJobs(jobParamsArray);
    }

    const sortColumn = (event, column_name) => {
        var array = jobs;

        if (column_name === 'salary') {
            var flag = salaryTitle;
        }
        else if (column_name === 'duration') {
            var flag = durationTitle;
        }
        else if (column_name === 'rating') {
            var flag = ratingTitle;
        }

        array.sort(function (a, b) {
            if (a[column_name] !== undefined && b[column_name] !== undefined) {
                return (1 - flag * 2) * (new Number(a[column_name]) - new Number(b[column_name]));
            }
            else {
                return 1;
            }
        });

        if (column_name === 'salary') {
            setSalaryTitle(!salaryTitle);
        }
        else if (column_name === 'duration') {
            setDurationTitle(!durationTitle);
        }
        else if (column_name === 'rating') {
            setRatingTitle(!ratingTitle);
        }

        setJobs(array);
    }

    const onApply = (e, jobID, buttonText) => {
        e.preventDefault();

        if (buttonText === "Apply") {
            axios.get(`http://localhost:4000/jobs/${user._id}/applicants/alljobs`)
                .then((res) => {
                    if (res.data.length >= 10) {
                        alert("It seems like that you have exceeded the limit to apply for open jobs\nYou can't apply anymore :-(");
                    }
                    else {
                        history.push(`/SOP/${jobID}`);
                    }
                });
        }
    };

    return (
        <div>
            <ANav />
            <h2>Here are the list of jobs posted by different recruiters</h2>
            <h3>Apply for the job before the deadline reaches ;-)</h3>
            <Grid container>
                <Grid item xs={12} >
                    <Paper>
                        <Table size="large">
                            <TableHead>
                                <TableRow>
                                    <TableCell>#</TableCell>
                                    <TableCell> Title </TableCell>
                                    <TableCell> Recruiter Name</TableCell>
                                    <TableCell> EmailID</TableCell>
                                    <TableCell> Applications </TableCell>
                                    <TableCell> Positions </TableCell>
                                    <TableCell> Skills Needed </TableCell>
                                    <TableCell> Job Type </TableCell>
                                    <TableCell> Salary<Button onClick={event => sortColumn(event, "salary")}>{salaryTitle ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}</Button></TableCell>
                                    <TableCell> Duration<Button onClick={event => sortColumn(event, "duration")}>{durationTitle ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}</Button></TableCell>
                                    <TableCell> Rating<Button onClick={event => sortColumn(event, "rating")}>{ratingTitle ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}</Button></TableCell>
                                    <TableCell> Date of Posting </TableCell>
                                    <TableCell> Deadline </TableCell>
                                    <TableCell> Apply for this job? </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    jobs.map((val, ind) => (
                                        <TableRow key={ind}>
                                            <TableCell>{ind + 1}</TableCell>
                                            <TableCell> {val.title}</TableCell>
                                            <TableCell>{val.name}</TableCell>
                                            <TableCell>{val.email}</TableCell>
                                            <TableCell>{val.applications}</TableCell>
                                            <TableCell>{val.positions}</TableCell>
                                            <TableCell>{val.skills.map((skill) => skill.name).join(', ')}</TableCell>
                                            <TableCell>{val.jobtype}</TableCell>
                                            <TableCell>{val.salary}</TableCell>
                                            <TableCell>{val.duration}</TableCell>
                                            <TableCell>{val.rating}</TableCell>
                                            <TableCell>{val.postingdate}</TableCell>
                                            <TableCell>{val.deadline}</TableCell>
                                            <TableCell><Button onClick={event => onApply(event, val._id, val.buttonText)} variant="contained" color={val.buttonText === 'Apply' ? 'primary' : 'secondary'} aria-readonly={val.buttonText === "Full" ? true : false} disabled={val.buttonText === "Applied" ? true : false}>{val.buttonText}</Button></TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}