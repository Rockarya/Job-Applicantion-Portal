import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import './Recruiter.css';
import RNav from './RNav';

export default function Recruiter() {

  const history = useHistory();

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (!loggedInUser) {
      history.push('/login');
    }
  }, []);

  return (
    <div className="App">
      <RNav />
      <h1>Welcome to your Home Page</h1>
      <br />
      <h2>Hopefully you are enjoying playing with my website!!!</h2>
    </div>
  );
}