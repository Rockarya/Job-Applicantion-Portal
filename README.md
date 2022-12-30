# BASIC OVERVIEW:

Job Application Portal is a web application build using REST principles using MERN stack:

● React.js for Frontend

● Backend Framework using Express JS implementing REST API

● Node.js for Backend Engine

● MongoDB - Database



# HOW TO RUN?

● Firstly install and setup mongodb, node in your system. (node version: v16.16.0 & npm version: 9.2.0)

● Clone the repository and go inside the folder.

● Now open 2 terminals one for backend and another for frontend

● Go to backend folder and write:

        -> npm install (needed only once)
        
        -> npm start

● Go to frontend folder and write:

        -> npm install (needed only once)
        
        -> npm start



# COMPONENT-WISE APPLICATION BREAKDOWN:

The application provides 2 profiles which are applicant and recruiter. Recruiter posts jobs and the applicant can apply to various jobs posted by recruiter. 

The application can be divided into 3 components:

## 1) Login/Register:

● User needs to necessarily login/register to the application to use it.

● User can register using the name, email id, password and choosing the role either applicant or recruiter.

● For login only the email id and password is required. The user is redirected to respective profile after sucessfull login or register.

● Google SignIn and SignUp is also provided.

● A logout button is provided in the navigation bar to both the profiles to log out of the appliaction.

● Implemented validation of data at the time of login/register using @hapi/joi.(Invalidity of data ,Existing email ids, Empty fields etc.)

● Used bcryptjs for hashing passwords and storing hashed passwords only



## 2) Recruiter Profile:

###### Home:

● Page welcoming the recruiter


###### Create Job:

● Recruiter can create a job here by entering the necessary field like job title, number of position available for the job, max number of application allowed for the job, deadline, skill set required, salary per month, duration in months (1 to 6), job type (full-time/part-time/work from home)


###### Active Jobs:

● Lists all the jobs created by the recruiter showing job title, date of posting, deadline, number of applications. Along with this for each job 2 buttons are provided to update (number of application, number of positions and deadline can be updated) and delete the job.  

● On clicking on the title of the job, the recruiter will be directed to a dashboard which shows all the applicants who have applied for this job with their name, skills, education, rating, SOP, resume link, job status and reject option.

● The recruiter can shortlist/accept the applicant using the button provided under job status column and reject the applicant using button provided under the reject column. The applicant can rejected anytime till it is not accepted into the job.

● sorting the applicants based on their name and rating is also provided.


###### Accepted Applicants:

● Lists all the applicants accepted by the recruiter under any job. The page contains details like job title, joining date, applicant name, job type, rating.
● Sorting the applicants based on job title, joining date, applicant name, job type, rating is provided.
● The recruiter can rate the applicant from 1 to 5 stars here, and this rating will be reflected on the applicant's profile page.


###### Profile:

● Recruiter can here update it's name, email id, add contact number and their bio.



## Applicant Profile:

###### Home:

● Page welcoming the applicant


###### My Application:

● Lists the jobs the applicant has applied for showing the job title, job salary, name of recruiter, job rating and job status(applied or shortlisted or accepted or rejected).

● The applicant can rate the job to which he/she is accepted from 1 to 5 stars.

###### Dashboard:

● Lists all the jobs posted by the recruiter showing job title, recruiter name, recruiter's mail id, max number of applications allowed by the recruiter, number of available positions for the job, skills needed for the job, job type, salary, duration, rating, date of posting, deadline, and a button to apply for the job.

● The button value is "Apply" if the number of applications / number of positions are not full else "Full" would be shown. The button value would be shown as "Applied" if the applicant has already applied for the job.

● When the applicant applies for the job, he/she will be prompted to write a SOP to the recruiter, and the SOP is sent to the recruiter after applicant submits the SOP.

● Provided an option to sort the jobs based on Salary, Duration, Rating.


###### Profile:

● In the profile section applicant can update their name, email, add a profile image URL (if you sign in/ sign up with google, then it's automatically taken), add a resume URL, add education instance (instituion name, start year, end year), add skills (multiselect drop down).

● Rating of the applicant is also shown which is the rating given by the recruiter of the job for which applicant was accepted into and is not editable. By default the value is 2 stars.



# ENABLING SIGN IN/UP USING GOOGLE:
● Use this [link](https://support.google.com/workspacemigrate/answer/9222992?hl=en) to get the OAuth Web Client ID and paste this ID in the file: OAuthWebClientID.js file located in ./frontend/src/Components folder.
