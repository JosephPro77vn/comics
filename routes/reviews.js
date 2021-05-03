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
		req.flash("success", "Comment Given!")
		res.redirect(`/comics/${req.body.comicId}`)
	}catch(err){
		console.log(err);
		req.flash("error", "Error creating comment")
		res.redirect("/comics");
	}
	
})

// Edit Comment - show the edit from
router.get("/:reviewId/edit", checkReviewOwner, async (req, res) =>{
	try{
		const comic = await Comic.findById(req.params.id).exec();
		const review = await Review.findById(req.params.reviewId).exec();
		res.render("reviews_edit", {comic, review});
		
	}catch(err){
		console.log(err);
		res.redirect("/comics");
	}
})

// Update Comment - Actually update in DB
router.put("/:reviewId", checkReviewOwner, async (req, res) =>{
	try{
		const review = await Review.findByIdAndUpdate(req.params.reviewId, {text: req.body.text}, {new: true});
		console.log(review);
		req.flash("success", "Comment edited");
		res.redirect(`/comics/${req.params.id}`);
		
	}catch(err){
		console.log(err);
		req.flash("error", "Error ediing comment" );
		res.redirect("/comics");
	}
})

// Delete Comment - Remove from DB
router.delete("/:reviewId", checkReviewOwner, async (req, res) => {
	try {
		const review = await Review.findByIdAndDelete(req.params.reviewId);
		req.flash("success", "Comment deleted");
		res.redirect(`/comics/${req.params.id}`);
	}catch(err){
		console.log(err);
		req.flash("error", "Error deleting comment");
		res.redirect("/comics");
	}
})



module.exports = router;