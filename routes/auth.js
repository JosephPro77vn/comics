const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');


router.get('/about', (req, res) =>{
	res.render('about');
})
// Sign Up - New
router.get('/signup', (req, res) =>{
	res.render('signup');
});

// Sign Up - Create
router.post('/signup', async (req, res)=>{
	try{
		const newUser = await User.register(new User({  // we Use register insted of Create because of passport is not because of Mongoose
			username: req.body.username, 
			email: req.body.email
		}), req.body.password); 
		req.flash("success", `Signed up as ${newUser.username}`);
		passport.authenticate('local')(req, res, ()=>{
			res.redirect('/comics');
		});
	}catch(err){
		console.log(err);
		res.send(err)
	}
});

// Login - Show form
router.get("/login", (req, res) =>{
	res.render('login');
});

// Login
router.post("/login", passport.authenticate('local', {
	successRedirect: '/comics',
	failureRedirect: '/login',
	failureFlash: true,
	successFlash: "logged in successfully!"
}));

//Logout
router.get("/logout", (req, res) =>{
	req.logout();
	req.flash("success", "Logged you out!");
	res.redirect('/comics');
});

module.exports = router;