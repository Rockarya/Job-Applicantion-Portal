const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const JobSchema = new Schema({
	title: {
		type: String,
		required: true
    },
    name: {
        type: String,
        required: true
    },
	email: {
		type: String,
		required: true
    },
    applications : {            
        type: Number,
        required: true
    },
    positions : {
        type: Number,
        required: true
    },
    postingdate: {
        type: String,
        required: true,
    },
    deadline: {             
        type: String,
        required: true 
    },
	skills: {
        type: Array,
        required: true
    },
    jobtype: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        default: 2
    },
    recruiterid: {
        type: String,
        required: true
    },
    SOP: {
        type: [Array],
        required: false
    },
    appliedstatus: {
        type: [String],
        required: false
    },
    shortlistedstatus: {
        type: [String],
        required: false
    },
    acceptedstatus: {
        type: [String],
        required: false
    },
    rejectedstatus: {
        type: [String],
        required: false
    }
});

module.exports=mongoose.model("Jobs", JobSchema);