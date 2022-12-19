import React from 'react';
import './Applicant.css';
import { Link } from 'react-router-dom';

function ANav() {
    const navstyle = {
        color: 'white'
    };

  return (
        <nav>
            <ul className="nav-Links">
            <Link style={navstyle} to='/applicant'>
                    <li>Home</li>
                </Link>
                <Link style={navstyle} to='/myapplications'>
                    <li> My Applications</li>
                </Link>
                <Link style={navstyle} to='/adashboard'>
                    <li>Dashboard</li>
                </Link>
                <Link style={navstyle} to='/aprofile' >   
                    <li>Profile</li>
                </Link>
                <Link style={navstyle} to='/logout' >   
                    <li>Log Out</li>
                </Link>
            </ul>
        </nav>
  );
}

export default ANav;