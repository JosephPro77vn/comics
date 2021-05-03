const express = require('express');
const router = express.Router({mergeParams: true});
const Review = require('../models/review');
const Comic = require('../models/comic');
const isLoggedIn = require('../utils/isLoggedIn');
const checkReviewOwner = require('../utils/checkReviewOwner');

// New Comment - Show Form
router.get("/new", isLoggedIn, (req, res) =>{
	res.render("reviews_new", {comicId: req.params.id})
})

// Create Comment - Actually Update DB
router.post("/", isLoggedIn, async (req, res)=>{
	try{
		const review = await Review.create({
			user: {
				id: req.user._id,
				username: req.user.username
			},
			text: req.body.text,
			comicId: req.body.comicId
		})
		console.log(review);
		res.redirect(`/comics/${req.body.comicId}`)
	}catch(err){
		console.log(err);
		res.send("Broken... /reviews POST");
	}
	
})

// Edit Comment - show the edit from
router.get("/:reviewId/edit", checkReviewOwner, async (req, res) =>{
	try{
		const comic = await Comic.findById(req.params.id).exec();
		const review = await Review.findById(req.params.reviewId).exec();
		console.log("comic: ", comic);
		console.log("review: ", review);
		res.render("reviews_edit", {comic, review});
		
	}catch(err){
		console.log(err);
		res.send("Broken... Comment Edit GET");
	}
})

// Update Comment - Actually update in DB
router.put("/:reviewId", checkReviewOwner, async (req, res) =>{
	try{
		const review = await Review.findByIdAndUpdate(req.params.reviewId, {text: req.body.text}, {new: true});
		console.log(review);
		res.redirect(`/comics/${req.params.id}`);
		
	}catch(err){
		console.log(err);
		res.send("Brokeeee Comment PUT")
	}
})

// Delete Comment - Remove from DB
router.delete("/:reviewId", checkReviewOwner, async (req, res) => {
	try {
		const review = await Review.findByIdAndDelete(req.params.reviewId);
		res.redirect(`/comics/${req.params.id}`);
	}catch(err){
		console.log(err);
		res.send("Brooken... DELETE Comment.")
	}
})



module.exports = router;