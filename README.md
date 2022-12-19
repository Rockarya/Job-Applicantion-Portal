MY APP CRASHES FOR THE FIRST TIME YOU START. IT'S NOT BUGGY. REFRESH THE PORTAL AND EVERYTHING WILL WORK FINE THEN

These are the features of my JOB APPLICATION PORTAL:-
-> Implemented validation of data at the time of login/register using @hapi/joi.(Invalidity,Already exists,Empty fields)

-> Used bcryptjs for hashing passwords and storing hashed passwords only

-> After succesfull login users will be redirected to their respective UI's 

-> Website is responsive

->If some data is not fetched then do try that operation again, data will be fetched.

-> About Recruiter UI :
    -> Welcoming Home Page
    
    -> Create Job bar to create a new job
    
    -> Active job bar to see the active jobs and option to edit/delete the job
    
    -> Dashboard to see the details of all applicants who have applied under you under a specific job
    
    -> Profile bar to update your profile.
    
    -> Log Out bar to leave the portal

-> About Applicant UI :
    -> Welcoming Home Page
    
    -> My Applications bar to see the all jobs you have registerd for
    
    -> Applicant will not be able to apply for more than 10 jobs at a time
    
    -> Dashboard to see all the jobs posted by different recruiters alongwith necessary details.Click on them to see more details and apply for them by writing SOP to the recruiter
    
    ->Profile bar to update your profile
    
    ->Log Out bar to leave the portal

How to run?

(Open 2 terminals one for backend and another for frontend)

1)Go to backend folder and write 

        -> npm install
        
        -> npm start

2)Go to frontend folder and write

        -> npm install
        
        -> npm start


nodemon is used to prevent starting servers again and again.
after adding nodemon in backend run: npm run start



<!-- EXTRA TO IMPLEMENT -->
-> on changing the url with random shit, on going to other link should also change the browser url shown
-> redirecting to the last page he was visting
=> saving the option of sorting in myapplications in cookies.

<!-- TO DO -->
-> rating ka chakkar
-> adding use effect login waala hook in each of recruiter files
-> making some fields mandatory in adding education
-> removing the cusotm added values in skills -> how?
-> uploading pdf and images 
-> sync and async calls
-> errors in console log for the applicants ko thik krna hai