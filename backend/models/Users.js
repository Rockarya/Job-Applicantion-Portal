const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
	name: {
		type: String,
		required: true,
		min: 4
	},
	email: {
		type: String,
		required: true,
		min: 4
	},
	role: {
		type: String,
		required: true
	},
	contact: {
		type: String,
		required: false
    },
   bio: {
       type: String,
	   required: false,
	   max: 250
   },
   password: {
		type: String,
		required: true,
		max: 1024,
		min: 4
	},
	education: {
		// type: [] also works
		type: Array,
		required: false

		// Below methods also gives us specific ids for each education instance 
		// type: [{name: {type: String, required: false}, startYear: {type: Number, required: false}, endYear: {type: Number, required: false}}],
		// required: false

		// OR
		// type: [{name: String, startYear:Number, endYear:Number}],
		// required: false
	},

	skills: {
		type: Array,
		required: false
	},
	rating: {
		type: Number,
		required: false,
		default: 2
	},
	jobids: {
		type: [String],
		required: false
	},
	SOP:{
		type: [Array],
		required: false	
	}
});

module.exports=mongoose.model("Users", UserSchema);