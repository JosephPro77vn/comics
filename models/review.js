const mongoose = require("mongoose");

const reviewSchema= new mongoose.Schema({
	user: {
		id:{
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	},
	text: String,
	comicId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Comic"
	}
});

const Review = mongoose.model("review", reviewSchema);
module.exports = Review;