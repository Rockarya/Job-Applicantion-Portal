import React from 'react';
import './Recruiter.css';
import { Link } from 'react-router-dom';

function RNav() {
    const navstyle = {
        color: 'white'
    };

  return (
        <nav>
            <ul className="nav-Links">
            <Link style={navstyle} to='/recruiter'>
                    <li>Home</li>
                </Link>
                <Link style={navstyle} to='/createjob'>
                    <li>Create Job</li>
                </Link>
                <Link style={navstyle} to='/activejob'>
                    <li>Active Jobs</li>
                </Link>
                <Link style={navstyle} to='/rdashboard'>
                    <li>Dashboard</li>
                </Link>
                <Link style={navstyle} to='/rprofile' >   
                    <li>Profile</li>
                </Link>
                <Link style={navstyle} to='/logout' >   
                    <li>Log Out</li>
                </Link>
            </ul>
        </nav>
  );
}

export default RNav;