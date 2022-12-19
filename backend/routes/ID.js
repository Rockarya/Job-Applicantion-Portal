var express = require("express");
var router = express.Router();

// Load ID model
const ID = require("../models/ID");

//SUBMIT ID
router.post('/', async (req, res) => {
    const id = new ID({
        identity: req.body.identity
    });
    try {
        const savedid = await id.save();
        res.json(savedid);
    } catch (err) {
        res.json({message: err});
    }
});

//GET LATEST IDENTITY
router.get('/', async (req,res) => {                         //async is written as a promising statement
    try {
        const id = await ID.find({}).sort({_id:-1}).limit(1);     //await statement waits for the information to get extracted from the db
        res.json(id);
    } catch (err) {
        res.json({message : err});
    }
});

//GET ALL IDENTITY
router.get('/all', async (req,res) => {                         //async is written as a promising statement
    try {
        const id = await ID.find()     //await statement waits for the information to get extracted from the db
        res.json(id);
    } catch (err) {
        res.json({message : err});
    }
});

//DELETE ALL ID'S AT ONCE
router.delete('/', async (req,res) => {                         //async is written as a promising statement
    try {
        const id = await ID.remove();     //await statement waits for the information to get extracted from the db
        res.json(id);
    } catch (err) {
        res.json({message : err});
    }
});
module.exports = router;
