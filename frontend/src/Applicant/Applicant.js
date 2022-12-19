import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import './Applicant.css';
import ANav from './ANav';

export default function Applicant() {

  const history = useHistory();
  
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (!loggedInUser) {
      history.push('/login');
    }
  }, []);

  return (
    <div className="App">
      <ANav />
      <h1>Welcome to your Home Page</h1>
      <br />
      <h2>Hopefully you are enjoying playing with my website!!!</h2>
    </div>
  );
}
