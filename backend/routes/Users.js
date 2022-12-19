var express = require("express");
var router = express.Router();
const {SOPValidation} = require('../Validations');

// Load User model
const User = require("../models/Users");

//FIND A SPECIFIC USER
router.get('/:userId', async (req,res) => {                         //async is written as a promising statement
    try {
        const userid = await User.findById(req.params.userId);      //await statement waits for the information to get extracted from the db
        res.json(userid);
    } catch (err) {
        res.json({message : err});
    }
});

//GET ALL THE USERS    
router.get('/', async (req, res) => {
    try{
        const users =  await User.find();
        res.json(users);
    } catch (err) {
        res.json({message: err});
    }
});


//DELETE SPECIFIC USER
router.delete('/:userId', async (req,res) => {
    try {
        const removeduser = await User.remove({_id : req.params.userId});
        res.json(removeduser);
    } catch (err) {
        res.json({message : err});
    }
});

//REMOVE ALL USERS AT ONCE <--DANGER-->
router.delete('/', async (req,res) => {
    try {
        const removeduser = await User.remove();
        res.json(removeduser);
    } catch (err) {
        res.json({message : err});
    }
});

//UPDATE A RECRUITER
router.patch('/recruiter/:userId' , async (req,res) => {
    try {
        const updatedrecruiter = await User.updateOne(
            {_id : req.params.userId},
            {$set: {name : req.body.name, email: req.body.email, contact: req.body.contact, bio: req.body.bio}}
        );
        res.json(updatedrecruiter);
    }
    catch (err) {
        res.json({message : err});
    }
});

//UPDATE AN APPLICANT
router.patch('/applicant/:userId' , async (req,res) => {
    try {
        const updatedapplicant = await User.updateOne(
            {_id : req.params.userId},
            {$set: {name : req.body.name, email: req.body.email, education: req.body.education, skills: req.body.skills, rating: req.body.rating}}
        );
        res.json(updatedapplicant);
    }
    catch (err) {
        res.json({message : err});
    }
});

// //UPDATE SOP OF AN APPLICANT
// router.patch('/sop/:userId' , async (req,res) => {
//     //VALIDATING THE DATA BY HAPI JOI
//     const { error } = SOPValidation(req.body);
//     if (error) return res.status(205).send(error.details[0].message);
    
//         const updatedsop = await User.updateOne(
//             {_id : req.params.userId},
//             {$set: {sop : req.body.sop}}
//         );
//         res.status(200).json(updatedsop);
// });

// GET ALL SOPs FROM HERE FOR A PARTICULAR APPLICANT AND FILTER OUT FOR A PARTICULAR JOB IN FRONTEND
router.get('/SOP/:applicantId', async (req,res) => {
    try {
        const user = await User.findById(req.params.applicantId);
        res.json(user.SOP);
    }
    catch (err) {
        res.json({message : err});
    }
});

//GET ALL APPLICANT UNDER A JOB
router.get('/alljobs/:jobId', async (req,res) => {                         //async is written as a promising statement
    try {
        const allusers = await User.find(
            {jobids : req.params.jobId}
        );      //await statement waits for the information to get extracted from the db
        res.json(allusers);
    } catch (err) {
        res.json({message : err});
    }
});

module.exports = router;