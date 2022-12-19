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
import { useHistory, useParams } from "react-router-dom";
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
                .then(response => {
                    settingParams(response.data);
                })
                .catch(function (error) {
                    //  console.log(error);
                })
        }
    }, []);

    const settingParams = (data) => {
        var params_arr = [];
        for(let i=0;i<data.length;i++)
        {
            var params_dict = {
                "name" : data[i].name,
                "skills" : data[i].skills,
                "education" : data[i].education,
                "rating" : data[i].rating,
                "sop" : "" 
            };
            const SOP_arr = data[i].SOP;
            for(let j=0;j<SOP_arr.length;j++)
            {
                if(SOP_arr[j][0] === params.id)
                {
                    params_dict["sop"] = SOP_arr[j][1];
                    break;
                }
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
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    applicants.map((val, ind) => (
                                        <TableRow key={ind}>
                                            <TableCell>{ind + 1}</TableCell>
                                            <TableCell> {val.name}</TableCell>
                                            <TableCell>{val.skills}</TableCell>
                                            <TableCell>{val.education}</TableCell>
                                            <TableCell>{val.rating}</TableCell>
                                            <TableCell>{val.sop}</TableCell>
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