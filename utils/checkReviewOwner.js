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
			res.redirect('back')	
		}	
	}else{ 	// If not logged in, check if they Comment
		res.redirect("/login");
	}
}

module.exports = checkReviewOwner;