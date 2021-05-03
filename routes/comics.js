const express = require('express');
const router = express.Router();
const Comic = require('../models/comic');
const Review = require('../models/review');
const isLoggedIn = require('../utils/isLoggedIn');
const checkComicOwner = require('../utils/checkComicOwner')

// Index
router.get("/", async (req, res) => {
	console.log(req.user);
	try{
		const comics = await Comic.find().exec();
		res.render("comics", {comics});
	} catch (err) {
		console.log(err);
		res.send("you broke it.../ index");
	}
})

// Create
router.post("/", isLoggedIn, async (req, res) =>{
	console.log(req.body)
	const genre = req.body.genre.toLowerCase();
	const newComic = {
		title: req.body.title,
		description: req.body.description,
		author: req.body.author,
		publisher: req.body.publisher,
		date: req.body.date,
		series: req.body.series,
		issues: req.body.issues,
		genre,
		color: !!req.body.color,
		image: req.body.image,
		owner: {
			id: req.user._id,
			username: req.user.username
		}
	}
	
	try{
		const comic = await Comic.create(newComic);
		console.log(comic);
		res.redirect("/comics/" + comic._id);
	} catch (err){
		console.log(err);
		res.send("You broke it... /comics POST");
	}
})

// New
router.get("/new", isLoggedIn, (req, res) =>{
	res.render("comics_new");
})

// Search
router.get("/search", async (req, res) =>{
	try{
		const comics = await Comic.find({
			$text:{
				$search: req.query.term
			}
		});
		res.render("comics", {comics});
		
	}catch(err){
		console.log(err);
		res.send("Broken... Search");
	}
})

//Genre
router.get("/genre/:genre", async (req, res) =>{
	// Check it the given genre is valid
	const validGeneres = ["superhero", "manga", "slice-of-life", "humor", "sci-fi", "fantasy", "horror"];
	if(validGeneres.includes(req.params.genre.toLowerCase())){
		// If yes, continue
		const comics = await Comic.find({genre: req.params.genre}).exec();
		res.render("comics", {comics});
	   
	} else{
			// if no, send the error
		   res.send("Please Enter a valid genre");
	}
})

// Show
router.get("/:id", async (req, res) =>{
	try{
		const comic = await Comic.findById(req.params.id).exec()
		const reviews = await Review.find({comicId: req.params.id});
		res.render("comics_display", {comic, reviews})
	}catch(err){
		console.log(err);
		res.send("you broke it.../comics/:id");
	}
})

//Edit
router.get('/:id/edit', checkComicOwner, async (req, res) =>{
		
	const comic = await Comic.findById(req.params.id).exec();
	res.render("comics_edit", {comic});
});	

// Update
router.put('/:id', checkComicOwner, async (req, res)=>{
	const genre = req.body.genre.toLowerCase();
	const comic = {
		title: req.body.title,
		description: req.body.description,
		author: req.body.author,
		publisher: req.body.publisher,
		date: req.body.date,
		series: req.body.series,
		issues: req.body.issues,
		genre,
		color: !!req.body.color,
		image: req.body.image
	}

	try{
		const newComic = await Comic.findByIdAndUpdate(req.params.id, comic, {new: true}).exec();
		res.redirect(`/comics/${req.params.id}`);
	}catch(err){
		console.log(err);
		res.send("Broken.../comics/:id PUT");
	}
})

// Delete
router.delete("/:id", checkComicOwner, async (req, res) =>{
	
	try{
		const comicDeleted = await Comic.findByIdAndDelete(req.params.id).exec();
		console.log(comicDeleted);
		res.redirect("/comics");
	}catch(err){
		console.log(err);
		res.send("Broken.../comics/:id/delete DELETED");
	}
});


module.exports = router;

