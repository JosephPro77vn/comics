
const isLoggedIn = function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}else{
		req.flash("error", "Hey! WTF Log in first!");
		res.redirect("/login");
	}
};

module.exports = isLoggedIn;