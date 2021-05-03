const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
	email: {type: String, required: true, unique: true},
	username: {type: String, required: true, unique: true}
});

// this add or plugin passportLocalMongoose to our Schema
userSchema.plugin(passportLocalMongoose);

// This insert data to the mongo DB
module.exports = mongoose.model("user", userSchema);