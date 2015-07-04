
//INITIALIZATION


var express = require('express'),
	bodyParser = require('body-parser'),
	React = require('react'),
	cookieParser = require('cookie-parser');
	passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
	session = require('express-session'),
	User = require('./Models/User.js');




var app = express();
app.use(bodyParser());
app.use(cookieParser());
app.use(session({ secret: 'baeMaxLoving'}))
app.use(passport.initialize());
app.use(passport.session());

app.use("/style", express.static(__dirname + '/style'));
app.use("/ReactViews/build", express.static(__dirname + '/ReactViews/build'));


//**********************************


//ROUTING

	//VIEWS 

app.get("/", function (req, res) {
	if (!req.user) {
		res.sendFile(__dirname + "/public/landingPage.html");
	} else {
		res.sendFile(__dirname + "/public/index.html");
	}
});


app.get("/login" ,function (req, res) {
	res.sendFile(__dirname + "/public/login.html");
});

	//***************

	//API Calls

app.post('/login',  passport.authenticate('local', { failureRedirect: '/login'}),
  function(req, res) {
        res.redirect('/');
 });

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

	//********************

app.listen(3000);





///*********************************







/// MONGOOOSE Database Linking ****

var mongoose = require('mongoose');

var connectDBLink;

if (process.env.NODE_ENV == "production") {
	connectDBLink = "mongodb://"+process.env.MONGO_USERNAME+":"+process.env.MONGO_PASSWORD+"@ds053310.mongolab.com:53310/heroku_lh96h9bg";
} else if (process.env.NODE_ENV == "development") {
	connectDBLink = "mongodb://localhost/gsm";
} else {
	connectDBLink = "mongodb://localhost/gsm";
}

mongoose.connect(connectDBLink);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(callback) {
	console.log("DB opened");
});

//***********************

/////PASSPORT Session///////////////

passport.use(new LocalStrategy({
		usernameField: "email",
		passwordField: "password"
	},
	function (email, password, done) {
		User.findOne({email: email}, function (err, user) {
			if (err) {return done(err);}
			if (!user) {
				console.log("Incorrect email");
       			return done(null, false, { message: 'Incorrect email.' });
      		}
      		if (!(user.password == password)) {
      			console.log("Incorrect password");
        		return done(null, false, { message: 'Incorrect password.' });
      		}
      		return done(null, user);	
		});
	}
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

//*************************




