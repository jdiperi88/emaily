const mongoose = require("mongoose");
const { Schema } = mongoose;

//describes all the properties that the schema might have
const userSchema = new Schema({
	googleID: String
});

mongoose.model("users", userSchema);
