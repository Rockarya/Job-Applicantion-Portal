import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import ANav from './ANav';
import Rating from '@mui/material/Rating';
import Multiselect from 'multiselect-react-dropdown';

export default function AProfile() {


    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [education, setEducation] = useState([]);
    const [skills, setSkills] = useState([]);
    const [rating, setRating] = useState(0);
    const [profileImgURL, setProfileImgURL] = useState('');
    const [resumeURL, setResumeURL] = useState('');
    const [user, setUser] = useState();
    const history = useHistory();
    const xhr = new XMLHttpRequest();  // this enables browser to get rid out of CORS error and fetch image of the user through his google account
    var languagesArr = ['C', 'CSS', 'C++', 'C#', 'Dart', 'Go', 'HTML', 'Java', 'Javascript', 'Kotlin', 'MATLAB', 'Perl', 'PHP', 'Python', 'R', 'Ruby', 'Rust', 'Scala', 'Swift', 'SQL'];
    var languagesObjectArr = [];
    for (let i = 0; i < languagesArr.length; i++) {
        languagesObjectArr.push({ id: i + 1, name: languagesArr[i] });
    }

    // // uploading pdf
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
                    setProfileImgURL(res.data.profileImgURL);
                    setResumeURL(res.data.resumeURL);
                })
                .catch(function (error) {
                    // alert(error);
                });
        }
    }, []);

    let handleChangeEducation = (i, e) => {
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

    const onChangeProfileImgURL = (event) => {
        setProfileImgURL(event.target.value);
    }

    const onChangeResumeURL = (event) => {
        setResumeURL(event.target.value);
    }

    const onChangeSkills = (selectedList, selectedItem) => {
        setSkills(selectedList);
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const updatedUser = {
            name: name,
            email: email,
            education: education,
            skills: skills,
            profileImgURL: profileImgURL,
            resumeURL: resumeURL
        }

        axios.patch(`http://localhost:4000/users/applicant/${user._id}`, updatedUser)
            .then((res) => {

                // HERE the only reason to update the local storage is to update the email id if profile gets updated. Meanwhile we are also adding new fields in local storage which may not be needed actually
                var profile = JSON.parse(localStorage.getItem('user'));
                Object.keys(updatedUser).forEach((key) => {
                    profile[key] = updatedUser[key];
                });
                localStorage.setItem('user', JSON.stringify(profile));
                alert("Profile Updated");
                history.push('/applicant');
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
                    <label>Name*  : </label>
                    <input type="text"
                        className="form-control"
                        value={name}
                        onChange={onChangeName}
                        required={true}
                        placeholder={"enter name here"}
                    />
                </div>
                <div className="form-group">
                    <label>Email*  : </label>
                    <input type="text"
                        className="form-control"
                        value={email}
                        onChange={onChangeEmail}
                        required={true}
                        placeholder={"enter email here"}
                    />
                </div>

                <br/>
                <div className="form-group">
                    <label>Profile Image URL  : </label>
                    <input type="text"
                        className="form-control"
                        value={profileImgURL}
                        onChange={onChangeProfileImgURL}
                        placeholder={"enter profile image URL"}
                    />
                    {xhr.open("GET", profileImgURL)}
                    {profileImgURL && <img src={profileImgURL} width='100' height='100' />}
                </div>
                <br/>

                <br/>
                <div className="form-group">
                    <label>Resume URL  : </label>
                    <input type="text"
                        className="form-control"
                        value={resumeURL}
                        onChange={onChangeResumeURL}
                        placeholder={"enter resume URL"}
                    />
                </div>
                <br/>

                <div className="form-group">
                    <label>Education  : </label>
                    {education.map((element, index) => (
                        <div key={index}>
                            <label>Institution Name*  : </label>
                            <input type="text" name="name" value={element.name} required={true} placeholder={"enter institute name"} onChange={e => handleChangeEducation(index, e)} />
                            <label>Start Year*  : </label>
                            <input type="number" name="startYear" value={element.startYear} required={true} placeholder={"enter start year"} onChange={e => handleChangeEducation(index, e)} />
                            <label>End Year  : </label>
                            <input type="number" name="endYear" value={element.endYear} required={true} placeholder={"enter end year"} onChange={e => handleChangeEducation(index, e)} />
                            <button type="button" onClick={() => removeEducation(index)}>Remove</button>
                        </div>
                    ))}
                    <div className="button-section">
                        <button className="button add" type="button" onClick={() => addEducation()}>Add</button>
                    </div>
                </div>

                <div className="form-group">
                    <h4>Skills  : <Multiselect
                        options={languagesObjectArr} // Options to display in the dropdown
                        selectedValues={skills} // Preselected value to persist in dropdown
                        onSelect={onChangeSkills} // Function will trigger on select event
                        onRemove={onChangeSkills} // Function will trigger on remove event
                        displayValue="name" // Property name to display in the dropdown options
                    /></h4>
                </div>

                <div>
                    <h4>Rating  : </h4>
                    <Rating name="simple-controlled" value={rating} readOnly={true} />
                </div>

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
            </div> */}
            {/* <button onClick={onButtonClick}>Download PDF</button> */}

        </div>
    )
}
