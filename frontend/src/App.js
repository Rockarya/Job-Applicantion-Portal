import React from 'react';
import Home from './Components/Home';
import Login from './Components/Login';
import Logout from './Components/Logout';
import Register from './Components/Register';
import Applicant from './Applicant/Applicant';
import Recruiter from './Recruiter/Recruiter';
import ADashboard from './Applicant/ADashboard';
import RProfile from './Recruiter/RProfile';
import AProfile from './Applicant/AProfile';
import Createjob from './Recruiter/Createjob';
import Activejob from './Recruiter/Activejob';
import Jobdetails from './Recruiter/Jobdetails';
import Applicantdetails from './Recruiter/Applicantdetails';
import MyApplications from './Applicant/MyApplications';
import SOP from './Applicant/SOP';
import AcceptedApplicants from './Recruiter/AcceptedApplicants';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
    <div className="App">
      <Switch>
      <Route path="/" exact component={Home}/>
      <Route path="/login" exact component={Login}/>
      <Route path="/logout" exact component={Logout}/>
      <Route path="/register" exact component={Register}/>
      <Route path="/applicant" exact component={Applicant}/>
      <Route path="/recruiter" exact component={Recruiter}/>
      <Route path="/adashboard" exact component={ADashboard}/>
      <Route path="/acceptedapplicants" exact component={AcceptedApplicants}/>
      <Route path="/rprofile" exact component={RProfile}/>
      <Route path="/aprofile" exact component={AProfile}/>
      <Route path="/createjob" exact component={Createjob}/>
      <Route path="/activejob" exact component={Activejob}/>
      <Route path="/edit_delete_job/:id" exact component={Jobdetails}/>
      <Route path="/SOP/:id" exact component={SOP}/>
      <Route path="/myapplications" exact component={MyApplications}/>
      <Route path="/applicantdetails/:id" exact component={Applicantdetails}/>
      </Switch>
    </div>
    </Router>
  );
}

export default App;
