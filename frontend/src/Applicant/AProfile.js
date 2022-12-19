import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import ANav from './ANav';

import { MultiSelect } from "@progress/kendo-react-dropdowns";
const languages = ['C', 'C++', 'Python', 'Javascript', 'C#', 'Java'];

export default function AProfile() {


    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [education, setEducation] = useState([]);
    const [skills, setSkills] = useState([]);
    const [rating, setRating] = useState();
    const [user, setUser] = useState();
    const history = useHistory();

    // uploading pdf
    // const [image, setImage] = useState({ preview: '', data: '' })
    // const [status, setStatus] = useState('')
    // const handleSubmit = async (e) => {
    //     e.preventDefault()
    //     let formData = new FormData()
    //     formData.append('file', image.data)
    //     const response = await fetch('http://localhost:4000/image', {
    //         method: 'POST',
    //         body: formData,
    //     })
    //     if (response) setStatus(response.statusText)
    // }

    // const handleFileChange = (e) => {
    //     const img = {
    //         preview: URL.createObjectURL(e.target.files[0]),
    //         data: e.target.files[0],
    //     }
    //     setImage(img)
    // }


    // providing download pdf button
    // const onButtonClick = () => {
    //     // using Java Script method to get PDF file
    //     fetch('./Screenshot.png').then(response => {
    //         response.blob().then(blob => {
    //             // Creating new object of PDF file
    //             const fileURL = window.URL.createObjectURL(blob);
    //             // Setting various property values
    //             let alink = document.createElement('a');
    //             alink.href = fileURL;
    //             alink.download = 'SamplePDF.pdf';
    //             alink.click();
    //             // console.log(blob);
    //         })
    //         // console.log(response);
    //     })
    // }

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (!loggedInUser) {
            history.push('/login');
        }
        else {
            const foundUser = JSON.parse(loggedInUser);
            setUser(foundUser);

            // here we have 2 choices, either take the data from the local storage(as we are adding updated data into it) or fetch data from API. 
            // Fetching the data is better, because in case when i update the database from backend then those changes should be reflected on frontend by refreshing. 
            // The above thing won't be possible if we use local storage. Storing values in local storage is useful, if the data doesn't change for long time. 
            axios.get(`http://localhost:4000/users/${foundUser._id}`)
                .then(res => {
                    setName(res.data.name);
                    setEmail(res.data.email);
                    setEducation(res.data.education);
                    setSkills(res.data.skills);
                    setRating(res.data.rating);
                })
                .catch(function (error) {
                    // alert(error);
                });
        }
    }, []);

    let handleChange = (i, e) => {
        let newValues = [...education];
        newValues[i][e.target.name] = e.target.value;
        setEducation(newValues);
    }

    let addEducation = () => {
        setEducation([...education, { name: "", startYear: 2019, endYear: 2023 }])
    }

    let removeEducation = (i) => {
        let newValues = [...education];
        newValues.splice(i, 1);
        setEducation(newValues);
    }

    const onChangeName = (event) => {
        setName(event.target.value)
    }

    const onChangeEmail = (event) => {
        setEmail(event.target.value);
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

    const onChangeRating = (event) => {
        setRating(event.target.value);
    }

    const onSubmit = (e) => {
        e.preventDefault();

        var ind = document.getElementById("rating");
        const newUser = {
            name: name,
            email: email,
            education: education,
            skills: skills,
            rating: ind.options[ind.selectedIndex].value
        }

        axios.patch(`http://localhost:4000/users/applicant/${user._id}`, newUser)
            .then((res) => {

                // HERE the only reason to update the local storage is to update the email id if profile gets updated. Meanwhile we are also adding new fields in local storage which may not be needed actually
                var profile = JSON.parse(localStorage.getItem('user'));
                Object.keys(newUser).forEach((key) => {
                    profile[key] = newUser[key];
                });
                localStorage.setItem('user', JSON.stringify(profile));
                alert("Profile Updated");
            })
            .catch(function (error) {
                // alert(error);
            });
    }

    return (
        <div>
            <ANav />
            <h2>Update your Profile to make it look even better :-))</h2>

            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Name: </label>
                    <input type="text"
                        className="form-control"
                        value={name}
                        onChange={onChangeName}
                    />
                </div>
                <div className="form-group">
                    <label>Email: </label>
                    <input type="text"
                        className="form-control"
                        value={email}
                        onChange={onChangeEmail}
                    />
                </div>

                <div className="form-group">
                    <label>Education: </label>
                    {education.map((element, index) => (
                        <div key={index}>
                            <label>Institution Name: </label>
                            <input type="text" name="name" value={element.name} onChange={e => handleChange(index, e)} />
                            <label>Start Year: </label>
                            <input type="number" name="startYear" value={element.startYear} onChange={e => handleChange(index, e)} />
                            <label>End Year: </label>
                            <input type="number" name="endYear" value={element.endYear} onChange={e => handleChange(index, e)} />
                            <button type="button" onClick={() => removeEducation(index)}>Remove</button>
                        </div>
                    ))}
                    <div className="button-section">
                        <button className="button add" type="button" onClick={() => addEducation()}>Add</button>
                    </div>
                </div>

                <div>
                    Skills: {JSON.stringify(skills)}
                    <MultiSelect
                        data={languages}
                        onChange={onChangeSkills}
                        value={skills}
                        allowCustom={true}
                    />
                </div>


                <h4>Rating</h4>
                <select id="rating">
                    <option value="0" >0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3" selected>3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                <br />
                <div className="form-group">
                    <input type="submit" value="Update" className="btn btn-primary" />
                </div>
            </form>


            {/* <div className='App'>
                <h1>Upload to server</h1>
                {image.preview && <img src={image.preview} width='100' height='100' />}
                <hr></hr>
                <form onSubmit={handleSubmit}>
                    <input type='file' name='file' onChange={handleFileChange}></input>
                    <button type='submit'>Submit</button>
                </form>
                {status && <h4>{status}</h4>}
            </div>
            <button onClick={onButtonClick}>Download PDF</button> */}



        </div>
    )
}
