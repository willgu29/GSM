
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
	console.log('/ GET');
	if (!req.user) {
		res.sendFile(__dirname + "/public/landingPage.html");
	} else {
		res.sendFile(__dirname + "/public/index.html");
	}
});


app.get("/login" ,function (req, res) {
	console.log("/login GET");

	res.sendFile(__dirname + "/public/login.html");
});

app.get("/editAccount", function (req, res) {
	console.log("/editAccount GET");

	res.sendFile(__dirname = "/public/editAccount.html");
})

	//***************

	//API Calls

//Authentication and Login
app.post('/createAccount', function (req, res) {
        console.log("/createAccount POST");
        var newUser = new User({ email: req.body.email,
        						phoneNumber: req.body.phoneNumber,
                                password: req.body.password,
                                firstName: req.body.firstName,
                                lastName: req.body.lastName,
                                fullName: req.body.firstName+' '+req.body.lastName});
        
        newUser.save(function (err, newUser) {
                if (err) {
                	console.error(err);
                	return res.send("There was an error creating your account. Please try again in a minute.");
                } else {
                	console.log(newUser);
                	return res.send("Account created! Feel free to login and update your user profile!");
                }
        })
})


app.post('/login',  passport.authenticate('local', { failureRedirect: '/login'}),
  function (req, res) {
  		console.log("/login POST");
        res.redirect('/');
 });

app.get('/logout', function (req, res){
  req.logout();
  res.redirect('/');
});
//*************************

app.get("/api/users", function (req, res) { ///limit, skip, user
	User.find({}, function (err, memories) {
                if (err) return console.error(err);
                console.log(memories);
                res.json(memories);
    }).limit(req.body.limit).skip(req.body.skip);
});

  //Database Edits
app.put("/api/users/userID:")

  ///***********

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

//Helpers that should be placed in separate files 

function generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
};



