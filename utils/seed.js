const Comic = require('../models/comic');
const Review = require('../models/review');

const comic_seeds = [
	{
	title: "Batman",
	description: "Batman is a fictional character created by Bob Kane and Bill Finger for DC Comics and the main protagonist in the DC Universe. He is DC's flagship character. Batman is the secret identity of the very rich businessman Bruce Wayne. He is one of the most famous and popular superheroes.",
	author: "By Joseph",
	publisher: "DC",
	date: "1999-09-01",
	series: "The Dark Night",
	issues: 2,
	genre: "Superhero",
	color: true,
	image: "https://cdn.pixabay.com/photo/2020/03/19/07/28/batman-4946610_960_720.jpg"
	},
	{
	title: "Spider-Man",
	description: "Spider-Man is a fictional superhero created by writer-editor Stan Lee and writer-artist Steve Ditko. He first appeared in the anthology comic book Amazing Fantasy #15 (Aug. 1962) in the Silver Age of Comic Books. He appears in American comic books published by Marvel Comics, as well as ... In the stories, Spider-Man is the alias of Peter Parker, an orphan raised by his mother",
	author: "By Joseph",
	publisher: "Marvel",
	date: "2017-09-01",
	series: "Miles Morales or black Spider-man",
	issues: 1,
	genre: "Superhero",
	color: true,
	image: "https://cdn.pixabay.com/photo/2018/05/06/13/05/spiderman-3378544_960_720.jpg"
	},
	{
	title: "Iron Man",
	description: "Iron Man: An Origin Story (Origin Story, An) and millions of other books are ... Publisher : Marvel Press (October 11, 2011); Language : English; Hardcover : 48 ... old soon who is starting to show some interest in some comic book characters.",
	author: "By Joseph",
	publisher: "Marvel",
	date: "01-24-2008",
	series: "Iron man ",
	issues: 1,
	genre: "Superhero",
	color: true,
	image: "https://cdn.pixabay.com/photo/2019/05/31/02/08/iron-man-4241268_1280.jpg"
	}
	
]
const seed = async () =>{
	// Delele all the current comics and review
    await Comic.deleteMany();
	console.log("Deleted All The Comics!")
	
	await Review.deleteMany();
	console.log("Deleted All The Reviews!")
	
	// // Create three new comics
	// for(const comic_seed of comic_seeds){
	// 	let comic = await Comic.create(comic_seed);
	// 	console.log("Created an new comic: ", comic.title)
	// 	await Review.create({
	// 		user: "Anonymous",
	// 		text: "I ruved this Comic Book!",
	// 		comicID: comic._id
	// 	})
	// 	console.log("Created a new Comment!")
	// }	
}

module.exports = seed;