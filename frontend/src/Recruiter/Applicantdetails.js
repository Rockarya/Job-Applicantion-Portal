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
import { IconButton } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from "react-router-dom";
import Rating from '@mui/material/Rating';
import './Recruiter.css';
import RNav from './RNav';



export default function ApplicantDetails() {

    const [applicants, setApplicants] = useState([]);
    const [ratingTitle, setRatingTitle] = useState(true);
    const [nameTitle, setNameTitle] = useState(true);
    const history = useHistory();
    const params = useParams();

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (!loggedInUser) {
            history.push('/login');
        }
        else {
            const foundUser = JSON.parse(loggedInUser);

            axios.get(`http://localhost:4000/users/alljobs/${params.id}`)
                .then(res => {
                    // getting details about the applied, shortlisted, accepted applicants
                    axios.get(`http://localhost:4000/jobs/${params.id}`)
                        .then(response => {
                            settingParams(res.data, response.data);
                        })
                        .catch(function (error) {
                            //  console.log(error);
                        })
                })
                .catch(function (error) {
                    //  console.log(error);
                })
        }
    }, []);

    const settingParams = (applicantData, applicantStatus) => {
        var params_arr = [];
        const appliedStatus = applicantStatus.appliedstatus;
        const shortlistedStatus = applicantStatus.shortlistedstatus;
        const acceptedStatus = applicantStatus.acceptedstatus;

        for (let i = 0; i < applicantData.length; i++) {
            var params_dict = {
                "_id": applicantData[i]._id,
                "name": applicantData[i].name,
                "skills": applicantData[i].skills,
                "education": applicantData[i].education,
                "rating": applicantData[i].rating,
                "sop": "",
                "status": "",
                "reject": "Reject",
                "resumeURL" : applicantData[i].resumeURL
            };

            // setting SOP of the applicant 
            const SOP_arr = applicantData[i].SOP;
            for (let j = 0; j < SOP_arr.length; j++) {
                if (SOP_arr[j][0] === params.id) {
                    params_dict["sop"] = SOP_arr[j][1];
                    break;
                }
            }

            // setting the job status of the applicant
            if (appliedStatus.includes(applicantData[i]._id)) {
                params_dict["status"] = "Shortlist";
            }
            else if (shortlistedStatus.includes(applicantData[i]._id)) {
                params_dict["status"] = "Accept";
            }
            else if (acceptedStatus.includes(applicantData[i]._id)) {
                params_dict["status"] = "Accepted";
                params_dict["reject"] = "";
            }

            params_arr.push(params_dict);
        }
        setApplicants(params_arr);
    };

    const sortName = () => {
        var array = applicants;
        var flag = nameTitle;
        array.sort(function (a, b) {
            if (a.name !== undefined && b.name !== undefined) {
                var s1 = a.name, s2 = b.name
                return (1 - flag * 2) * (s1.localeCompare(s2));
            }
            else {
                return 1;
            }
        });
        setApplicants(array);
        setNameTitle(!nameTitle);
    }

    const sortRating = () => {
        var array = applicants;
        var flag = ratingTitle;
        array.sort(function (a, b) {
            if (a.rating !== undefined && b.rating !== undefined) {
                return (1 - flag * 2) * (new Number(a.rating) - new Number(b.rating));
            }
            else {
                return 1;
            }
        });
        setApplicants(array);
        setRatingTitle(!ratingTitle);
    }

    const onClickStatus = async (event, applicantID, applicantStatus) => {
        event.preventDefault();
        if (applicantStatus === "Shortlist") {
            try {
                await axios.patch(`http://localhost:4000/jobs/shortlist/${params.id}/${applicantID}`);
                alert("Applicant Shortlisted");
                window.location.reload()
            }
            catch (err) {
                // console.log(err);
            }
        }
        else if (applicantStatus === "Accept") {
            try {
                await axios.patch(`http://localhost:4000/jobs/accept/${params.id}/${applicantID}`);
                alert("Applicant Accepted");
                window.location.reload()
            }
            catch (err) {
                // console.log(err);
            }
        }
    }

    const onClickReject = async (event, applicantID) => {
        event.preventDefault();
        try {
            await axios.patch(`http://localhost:4000/jobs/reject/${params.id}/${applicantID}`);
            alert("Applicant Rejected");
            window.location.reload()
        }
        catch (err) {
            // console.log(err);
        }
    }

    console.log(applicants, 'appli');

    return (
        <div>
            <RNav />
            <h1>List of applicants who have applied under you for this job</h1>
            <Grid container>
                <Grid item xs={12}>
                    <Paper>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell> Sr No.</TableCell>
                                    <TableCell> Name <Button onClick={sortName}>{nameTitle ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}</Button></TableCell>
                                    <TableCell> Skills</TableCell>
                                    <TableCell> Education</TableCell>
                                    <TableCell> Rating<Button onClick={sortRating}>{ratingTitle ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}</Button></TableCell>
                                    <TableCell> SOP</TableCell>
                                    <TableCell> Resume</TableCell>
                                    <TableCell> Status</TableCell>
                                    <TableCell> Reject</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    applicants.map((val, ind) => (
                                        <TableRow key={ind}>
                                            <TableCell>{ind + 1}</TableCell>
                                            <TableCell> {val.name}</TableCell>
                                            <TableCell>{val.skills.map((skill) => skill.name).join(', ')}</TableCell>
                                            <TableCell>{
                                                val.education.length ?
                                                    <table>
                                                        <tr key={"header"}>
                                                            {Object.keys(val.education[0]).map((key) => (
                                                                <th>{key}</th>
                                                            ))}
                                                        </tr>
                                                        {val.education.map((item) => (
                                                            <tr key={item.id}>
                                                                {Object.values(item).map((val) => (
                                                                    <td>{val}</td>
                                                                ))}
                                                            </tr>
                                                        ))}
                                                    </table>
                                                    : null
                                            }</TableCell>
                                            <TableCell><Rating name="simple-controlled" value={val.rating} readOnly={true}/></TableCell>
                                            <TableCell>{val.sop}</TableCell>
                                            <TableCell><p><a href={val.resumeURL} target='_blank'>{val.resumeURL?'Download':'Not Uploaded'}</a></p></TableCell>
                                            <TableCell><IconButton disabled={val.status === "Accepted" ? true : false} onClick={event => onClickStatus(event, val._id, val.status)}>{val.status}</IconButton></TableCell>
                                            <TableCell><IconButton onClick={event => onClickReject(event, val._id)}>{val.reject}</IconButton></TableCell>
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