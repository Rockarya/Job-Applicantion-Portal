import React, {Component} from 'react';
import axios from 'axios';

//DO NOT REMOVE THESE CREDENTIALS FROM HERE OTHERWISE APP WILL CRASH !!!
const newUser = {
    name: 'Aryan Jain',
    email: 'aryan.jain@students.iiit.ac.in',
    password: 'Rockarya_IIITH',
    role: 'recruiter'
}

const loginme = async () => {
    try {
            const res = await axios.post('http://localhost:4000/api/user/register', newUser);
            if(res.status === 200)
            {
                //entering the first id in database itself so that app do not crash
                const id = {
                    identity: res.data._id
                }
                try {
                    await axios.post('http://localhost:4000/ids',id)
                }
                catch (err) {
                    // alert(err)
                }
            }
        } 
    catch (err) {
        //  alert(err);
        }    
};

export default class Register extends Component {
    render() {
        loginme();
        return(
            <div> 
            <h1>Hello there!!!</h1>
            <h4>Welcome to my Web page!!! Click one of these links to continue...Happy Journey :-)</h4>
            <li>
            <a href="http://localhost:3000/register">Register Here</a>
            </li>
            <li>
            <a href="http://localhost:3000/login">Login?</a>
            </li>
            </div>
        );
    }
}

