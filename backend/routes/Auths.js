var express = require('express');
var router = express.Router();
const User = require('../models/Users');
const { registerValidation, loginValidation } = require('../Validations');
const bcrypt = require('bcryptjs');

router.post('/register', async (req, res) => {
    // //VALIDATING THE DATA BY HAPI JOI
    const { error } = registerValidation(req.body);
    if (error) return res.status(205).send(error.details[0].message);

    //Checking if the user is already in the database
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(204).send('Email already exists!');

    //HASH PASSWORDS
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        role: req.body.role,
        profileImgURL: req.body.profileImgURL
    });
    const savedUser = await user.save();
    res.status(200).send(savedUser);
});

router.post('/login', async (req, res) => {
    //VALIDATING THE DATA BY HAPI JOI
    const { error } = loginValidation(req.body);
    if (error) return res.status(204).send(error.details[0].message);

    //Checking if email exists 
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(205).send("Email not found!");

    //Checking if Password matches
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(206).send("Incorrect Password");

    res.status(200).send(user);

});

router.post('/gsignin', async (req, res) => {
    // Checking if email exists 
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(205).send("Email not found!");
    res.status(200).send(user);
})

module.exports = router;