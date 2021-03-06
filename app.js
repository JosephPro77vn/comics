// ================================
// IMPORTS
// ================================

//NPM imports
const express = require('express');
const app= express();
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const morgan = require('morgan');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const expressSession = require('express-session');

// Config Import
try{
	var config = require('./config');
}catch(e){
	console.log("Could not import config. This means Your not working Locally...");
	console.log(e);
}


//Routes imports
const comicRoutes = require('./routes/comics');
const reviewRoutes = require('./routes/reviews');
const mainRoutes =require('./routes/main');
const authRoutes = require('./routes/auth');


// Model Import
const Comic = require('./models/comic');
const Review = require('./models/review');
const User = require('./models/user');
// ================================
// DEVLOPMENT
// ================================
// Morgan
app.use(morgan('tiny'));

// Seed the DB
 // const seed = require('./utils/seed');
 // seed();

// ================================
// CONFIG
// ================================
// Connect to DB
try{
mongoose.connect(config.db.connection, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
}catch(e){
	console.log("Could not connect using config, this means you are not working locally...")
	console.log(e);
	mongoose.connect(process.env.DB_CONNECTION, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
}

// Body Parser Config
app.use(bodyParser.urlencoded({extended: true}));

// Express Config
app.set("view engine", "ejs");
app.use(express.static('public'));

//Express Session Config
app.use(expressSession({
	secret: process.env.ES_SECRET || config.expressSession.secret,
	resave: false,
	saveUninitialized: false
}));

// Method Override Config
app.use(methodOverride('_method'));

// Connect Flash
app.use(flash());

// Passport Config
app.use(passport.initialize());
app.use(passport.session()); // Allows persistence session
passport.serializeUser(User.serializeUser()); // What data should be stored in session
passport.deserializeUser(User.deserializeUser()); // Get the user data from the stored session
passport.use(new LocalStrategy(User.authenticate())); // Use the local Strategy 

// State Config
app.use((req, res, next) =>{
	res.locals.user = req.user; // Midddleware config
	res.locals.errorMessage = req.flash("error");
	res.locals.successMessage = req.flash("success");
	next();
})
// Route Config
app.use("/", mainRoutes);
app.use("/" ,authRoutes);
app.use("/comics", comicRoutes);
app.use("/comics/:id/reviews", reviewRoutes);


// ================================
// LISTEN
// ================================
app.listen( process.env.PORT || 3000, () =>{
	console.log("App is running...");
})
