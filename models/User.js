const mongoose = require("mongoose");
const { Schema } = mongoose;

//describes all the properties that the schema might have
const userSchema = new Schema({
	googleID: String,
	credits: {
		type: Number,
		default: 0
	}
});

mongoose.model("users", userSchema);
