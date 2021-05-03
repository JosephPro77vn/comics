const Comic = require('../models/comic');

const checkComicOwner = async(req, res, next) =>{
	if(req.isAuthenticated()){ // Check if the user is logged in 
		// If logged in, check if they own the comics
		
		const comic = await Comic.findById(req.params.id).exec();
		console.log(comic.owner.id);
		console.log(req.user._id);
	
		if(comic.owner.id.equals(req.user._id)){
			next();
		}else {// If not, redirect back to show page
			req.flash("error", "You don't have permission to do that")
			res.redirect('back')	
		}	
	}else{ 	// If not logged in, check if they comics
		req.flash("error", "You must login to do that");
		res.redirect("/login");
	}
}

module.exports = checkComicOwner;