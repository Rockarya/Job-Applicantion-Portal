import axios from 'axios';
import Button from '@material-ui/core/Button';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from "react-router-dom";
import './Recruiter.css';
import RNav from './RNav';
import Rating from '@mui/material/Rating';

export default function AcceptedApplicants() {

    const [applicants, setApplicants] = useState([]);
    const [sortNameIcon, setSortNameIcon] = useState(true);
    const [sortTitleIcon, setSortTitleIcon] = useState(true);
    const [sortDateIcon, setSortDateIcon] = useState(true);
    const [sortJobTypeIcon, setSortJobTypeIcon] = useState(true);
    const [sortRatingIcon, setSortRatingIcon] = useState(true);
    const history = useHistory();

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (!loggedInUser) {
            history.push('/login');
        }
        else {
            const foundUser = JSON.parse(loggedInUser);
            settingApplicantParams(foundUser._id);
        }
    }, []);

    const settingApplicantParams = async (recruiterID) => {
        var params_arr = [];
        var user_map = {};

        await axios.get('http://localhost:4000/users')
            .then(res => {
                const users_arr = res.data;
                for (let i = 0; i < users_arr.length; i++) {
                    user_map[users_arr[i]._id] = {name : users_arr[i].name, rating : users_arr[i].rating};
                }
            })

        await axios.get(`http://localhost:4000/jobs/${recruiterID}/recruiters/alljobs`)
            .then(res => {
                var jobs_arr = res.data;
                var key = 0;  //we can't assign either job or applicant ID here, because both of them can repeat
                for (let i = 0; i < jobs_arr.length; i++) {
                    for (let j = 0; j < jobs_arr[i]["acceptedstatus"].length; j++) {
                        var applicantID = jobs_arr[i]["acceptedstatus"][j];
                        var params = {
                            "_id" : key,
                            "applicantID": applicantID,
                            "date": jobs_arr[i].deadline,
                            "name": user_map[applicantID].name,
                            "rating": user_map[applicantID].rating,
                            "jobtype": jobs_arr[i].jobtype,
                            "title": jobs_arr[i].title,
                        }
                        key += 1;
                        params_arr.push(params);
                    }
                }
            })
            .catch(function (error) {
                //  console.log(error);
            })

        setApplicants(params_arr);
    };

    const onChangeRating = async (event, newRating, params) => {
        event.preventDefault();
        axios.patch(`http://localhost:4000/users/rating/${params.applicantID}`,{rating: newRating});
        alert(`Rated applicant ${params.name} with ${newRating} stars`);
        window.location.reload();
    }

    const sortRating = () => {
        var array = applicants;
        var flag = sortRatingIcon;
        array.sort(function (a, b) {
            if (a.rating !== undefined && b.rating !== undefined) {
                return (1 - flag * 2) * (new Number(a.rating) - new Number(b.rating));
            }
            else {
                return 1;
            }
        });
        setApplicants(array);
        setSortRatingIcon(!sortRatingIcon);
    }

    const sortColumn = (event, column_name) => {
        event.preventDefault();
        var array = applicants;
        if (column_name === "name") {
            var flag = sortNameIcon;
        }
        else if (column_name === "title") {
            var flag = sortTitleIcon;
        }
        else if (column_name === "jobtype") {
            var flag = sortJobTypeIcon;
        }
        else if (column_name === "date") {
            var flag = sortDateIcon;
        }

        array.sort(function (a, b) {
            if (a[column_name] !== undefined && b[column_name] !== undefined) {
                var s1 = a[column_name], s2 = b[column_name]
                return (1 - flag * 2) * (s1.localeCompare(s2));
            }
            else {
                return 1;
            }
        });

        if (column_name === "name") {
            setSortNameIcon(!sortNameIcon);
        }
        else if (column_name === "title") {
            setSortTitleIcon(!sortTitleIcon);
        }
        else if (column_name === "jobtype") {
            setSortJobTypeIcon(!sortJobTypeIcon);
        }
        else if (column_name === "date") {
            setSortDateIcon(!sortDateIcon);
        }

        setApplicants(array);
    }

    return (
        <div className="table-responsive">
            <RNav />
            <h1>These are the applicants accepted by you for a job!</h1>
            <table className="table">
                <thead className="thead-dark">
                    <tr>
                        {/* <th scope="col">#</th> */}
                        <th scope="col">Title <Button onClick={event => sortColumn(event, "title")}>{sortTitleIcon ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}</Button></th>
                        <th scope="col">Joining Date <Button onClick={event => sortColumn(event, "date")}>{sortDateIcon ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}</Button> </th>
                        <th scope="col">Applicant Name <Button onClick={event => sortColumn(event, "name")}>{sortNameIcon ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}</Button></th>
                        <th scope="col">Job Type <Button onClick={event => sortColumn(event, "jobtype")}>{sortJobTypeIcon ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}</Button></th>
                        <th scope="col">Rating <Button onClick={sortRating}>{sortRatingIcon ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}</Button> </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{applicants.map(vals => (<h2 key={vals._id}> {vals.title} </h2>))}</td>
                        <td>{applicants.map(vals => (<h2 key={vals._id}> {vals.date} </h2>))}</td>
                        <td>{applicants.map(vals => (<h2 key={vals._id}> {vals.name} </h2>))}</td>
                        <td>{applicants.map(vals => (<h2 key={vals._id}> {vals.jobtype} </h2>))}</td>
                        <td>{applicants.map(vals => (<h2 key={vals._id}> <Rating name="simple-controlled" value={vals.rating} onChange={(event, newValue) => onChangeRating(event, newValue, vals)}/> </h2>))}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
