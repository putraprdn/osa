const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
	username: {
		type: String,
		minLength: 3,
		unique: true,
		required: true,
	},
	name: String,
	password: String,
});

userSchema.set("toJSON", {
	transform: (_, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

module.exports = mongoose.model("User", userSchema);
