const Review = require('../models/review');

const checkReviewOwner = async(req, res, next) =>{
	if(req.isAuthenticated()){ // Check if the user is logged in 
		// If logged in, check if they own the Comment
		
		const review = await Review.findById(req.params.reviewId).exec();
		console.log(review.user.id);
		console.log(req.user._id);
	
		if(review.user.id.equals(req.user._id)){
			next();
		}else {// If not, redirect back to show page
			req.flash("error", "You do not have a permission to do that!");
			res.redirect('back')	
		}	
	}else{ 	// If not logged in, check if they Comment
		req.flash("error", "You must login to do that!")
		res.redirect("/login");
	}
}

module.exports = checkReviewOwner;