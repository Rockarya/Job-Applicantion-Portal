const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const IDSchema = new Schema({
	identity: {
		type: String,
		required: false
	}
});

module.exports=mongoose.model("ID", IDSchema);