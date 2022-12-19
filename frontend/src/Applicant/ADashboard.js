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
import { Link } from 'react-router-dom';
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
                const appliedApplicantIDs = res.data.applicantid;
                var ind = appliedApplicantIDs.indexOf(id);
                if (ind !== -1) {
                    jobParams["buttonText"] = "Applied";
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

    // Note that this is sorting only at front-end
    const sortSalary = () => {
        var array = jobs;
        var flag = salaryTitle;
        array.sort(function (a, b) {
            if (a.salary !== undefined && b.salary !== undefined) {
                return (1 - flag * 2) * (new Number(a.salary) - new Number(b.salary));
            }
            else {
                return 1;
            }
        });
        setJobs(array);
        setSalaryTitle(!salaryTitle)
    }

    console.log(jobs, 'yahi');
    const sortDuration = () => {
        var array = jobs;
        var flag = durationTitle;
        array.sort(function (a, b) {
            if (a.duration !== undefined && b.duration !== undefined) {
                return (1 - flag * 2) * (new Number(a.duration) - new Number(b.duration));
            }
            else {
                return 1;
            }
        });
        setJobs(array);
        setDurationTitle(!durationTitle);
    }

    const sortRating = () => {
        var array = jobs;
        var flag = ratingTitle;
        array.sort(function (a, b) {
            if (a.rating !== undefined && b.rating !== undefined) {
                return (1 - flag * 2) * (new Number(a.rating) - new Number(b.rating));
            }
            else {
                return 1;
            }
        });
        setJobs(array);
        setRatingTitle(!ratingTitle);
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
                                    <TableCell> Salary<Button onClick={sortSalary}>{salaryTitle ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}</Button></TableCell>
                                    <TableCell> Duration<Button onClick={sortDuration}>{durationTitle ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}</Button></TableCell>
                                    <TableCell> Rating<Button onClick={sortRating}>{ratingTitle ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}</Button></TableCell>
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
                                            <TableCell>{val.skills}</TableCell>
                                            <TableCell>{val.jobtype}</TableCell>
                                            <TableCell>{val.salary}</TableCell>
                                            <TableCell>{val.duration}</TableCell>
                                            <TableCell>{val.rating}</TableCell>
                                            <TableCell>{val.postingdate}</TableCell>
                                            <TableCell>{val.deadline}</TableCell>
                                            <TableCell><Button onClick={event => onApply(event, val._id, val.buttonText)} disabled={val.buttonText === "Applied" ? true : false}>{val.buttonText}</Button></TableCell>
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