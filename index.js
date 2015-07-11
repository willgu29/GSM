
//INITIALIZATION


var express = require('express'),
	bodyParser = require('body-parser'),
	React = require('react'),
	cookieParser = require('cookie-parser');
	passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
	session = require('express-session'),
	User = require('./Models/User.js'),
  Media = require('./Models/Media.js'),
  Comment = require('./Models/Comment.js'),
  KnownNetwork = require("./Models/KnownNetwork.js"),
  aws = require('aws-sdk');




var app = express();
app.use(bodyParser());
app.use(cookieParser());
app.use(session({secret: 'baeMaxLoving'}))
app.use(passport.initialize());
app.use(passport.session());

app.use("/react-0.13.3/build", express.static(__dirname + "/react-0.13.3/build"));
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

app.get("/individuals", loggedIn, function (req, res) {
  console.log('/individuals GET');
  res.sendFile(__dirname + "/public/browseIndividuals.html");
});

app.get("/login" ,function (req, res) {
  console.log("/login GET");

  res.sendFile(__dirname + "/public/login.html");
});

app.get("/editAccount", loggedIn, function (req, res) {
  console.log("/editAccount GET");

  res.sendFile(__dirname + "/public/editAccount.html");
});
app.get("/users/:userID", loggedIn, function (req, res) {
  console.log("/users/:userID GET " + req.params.userID);
  res.sendFile(__dirname + "/public/userPage.html");
});


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
                  var htmlLazyMe = "<p>Account created! Feel free to login and update your user profile!</p>" + "<a href=/login>Back</a>";
                	return res.send(htmlLazyMe);
                }
        });
});


app.post('/login',  passport.authenticate('local', { failureRedirect: '/login'}),
  function (req, res) {
  		console.log("/login POST");
        res.redirect('/');
 });

app.get('/logout', function (req, res){

  req.logout(); //not working for some reason. Stack overflow says use below
  req.session.destroy(function (err) {
        res.redirect("/login");
    
  });

});
//*************************


//GET CONTENT

app.get("/api/users", loggedIn, function (req, res) { ///limit, skip, user
	User.find({}, function (err, users) {
                if (err) return console.error(err);
                res.json(users);
    }).limit(req.body.limit).skip(req.body.skip);
});
app.get("/api/users/:userID", function (req, res) {
  console.log("/api/users/:userID GET " +  req.params.userID);

  var searchEmail;
  if (req.params.userID == "me") {
    searchEmail = req.user.email;
  } else {
    searchEmail = req.params.userID;
  }
  User.findOne({email:searchEmail}, function (err, user) {
    if (err) { 
      console.log(err);
    } else {
      res.json(user);
    }
  });

});

app.get("/api/media/:userID", loggedIn, function (req, res) {
  console.log("/api/media/:userID GET " + req.params.userID);
  var searchEmail;
  if (req.params.userID == "me") {
    searchEmail = req.user.email;
  } else {
    searchEmail = req.params.userID;
  }
  Media.find({user_id:searchEmail}, function (err, mediaObjects) {
                if (err) return console.error(err);
                res.json(mediaObjects);
    }).limit(req.body.limit).skip(req.body.skip);
});

app.get("/api/comments/:userID", loggedIn, function (req, res) {
  console.log("/api/comments/:userID GET " + req.params.userID);
  var searchEmail;
  if (req.params.userID == "me") {
    searchEmail = req.user.email;
  } else {
    searchEmail = req.params.userID;
  }
  Comment.find({user_id:searchEmail}, function (err, commentObjects) {
                if (err) return console.error(err);
                res.json(commentObjects);
    }).limit(req.body.limit).skip(req.body.skip);
});

app.get("/api/network/:userID", loggedIn, function (req, res) {
  console.log("/api/network/:userID GET " + req.params.userID);
  var searchEmail;
  if (req.params.userID == "me") {
    searchEmail = req.user.email;
  } else {
    searchEmail = req.params.userID;
  }
  KnownNetwork.findOne({user_id:searchEmail}, function (err, knownNetwork) {
                if (err) return console.error(err);
                res.json(knownNetwork);
    }).limit(req.body.limit).skip(req.body.skip);
});

///
  //Database Edits
app.post("/api/network/:userID", loggedIn, function (req, res) {
  console.log("/api/network/:userID POST " + req.params.userID);

  //TODO: Add acquaintance / update KnownNetwork model of person

});
app.post("/api/users/:userID", loggedIn, function (req, res) {
  console.log("/api/users/:userID POST " + req.params.userID);

    var skillsArray = req.body.skills.split(',');
    var personalityArray = req.body.personality.split(',');
    var canOfferArray = req.body.canOffer.split(',');
    var wantsArray = req.body.wants.split(',');

    var query = {'email':req.user.email};

    var newData = {
      identity: {
        skills: skillsArray,
        personality: personalityArray,
        contactIf: req.body.contactIf,
        interesting: req.body.interesting,
        canOffer: canOfferArray,
        wants: wantsArray
      }
    }

    User.findOneAndUpdate(query, newData, {upsert:false}, function(err, doc){
      if (err) return res.send(500, { error: err });

      var htmlLazyMe = "<p>Successfully saved</p>" + "<a href=/editAccount>Back</a>";

      return res.send(htmlLazyMe);
    });
});

app.post("/api/comments/:userID", loggedIn, function (req, res) {
    console.log("/api/comments/:userID POST " + req.params.userID);

    var commentTo = req.params.userID;
    var byUser_id = req.user.email;
    var authorFullName = req.user.fullName;
    

    var newComment =new Comment({ user_id: commentTo, 
                                  rating: 0,
                                  text: req.body.text,
                                  isAnonymous: req.body.anonymous,
                                  byUser_id: byUser_id,
                                  authorFullName: authorFullName,
    });


    newComment.save(function (err, newComment) {
                if (err) {
                  console.error(err);
                  return res.send("There was an error in posting in comment. Please try again in a minute.");
                } else {
                  return res.json(newComment);
                }
    });
});


  ///***********

	//********************




app.listen(process.env.PORT || 3000);



///*********************************


// AWS File System

var AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
var AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;
var S3_BUCKET = process.env.S3_BUCKET;

app.get('/sign_s3', function(req, res){
    console.log("Query: ", req.query.file_name, req.query.file_type, S3_BUCKET);
    aws.config.update({accessKeyId: AWS_ACCESS_KEY, secretAccessKey: AWS_SECRET_KEY});
    var s3 = new aws.S3();
    var urlKey = req.user.email+'/'+req.query.file_name;
    var s3_params = {
        Bucket: S3_BUCKET,
        Key: urlKey,
        Expires: 60,
        ContentType: req.query.file_type,
        ACL: 'public-read'
    };
    s3.getSignedUrl('putObject', s3_params, function(err, data){
        if(err){
            console.log(err);
        }
        else{
                console.log("PUT OBJECT");
            var return_data = {
                signed_request: data,
                url: 'https://'+S3_BUCKET+'.s3.amazonaws.com/'+req.user.email+'/'+req.query.file_name
            };
            res.write(JSON.stringify(return_data));
            res.end();

        }
    });
});

app.post('/api/media/:userID', function(req, res){
    console.log("/api/media/:userID POST " + req.params.userID);

    var userEmail;
    if (req.params.userID == "me") {
      userEmail = req.user.email;
    } else {
      userEmail = req.params.userID;
    }

    var parts = req.body.mediaLink.split('.');
    var extension = parts[parts.length-1];

    var mediaType;
    console.log("parts: " + parts);
    console.log("extension : " + extension);
    if (extension == "wav" || extension == "mp3" || extension == "aiff") {
      mediaType = "AUDIO";
    } else {
      mediaType = "UNDETERMINED";
    }

    var newMedia =new Media({ user_id: userEmail, 
                              mediaType: mediaType,
                              mediaLink: req.body.mediaLink,
                              extensionType: extension,
                              displayOnProfile: true });


    newMedia.save(function (err, newMedia) {
                if (err) {
                  console.error(err);
                  return res.send("There was an error in saving your media. Please try again in a minute.");
                } else {
                  console.log(newMedia);
                  var htmlLazyMe = "<p>Media saved! This content will now be displayed on your user profile for others to see!</p>" + "<a href=/editAccount>Back</a>";
                  return res.send(htmlLazyMe);
                }
    });

    // res.json('Response 200');
});



/// MONGOOOSE Database Linking ****

var mongoose = require('mongoose');

var connectDBLink;

if (process.env.NODE_ENV == "production") {
  connectDBLink = "mongodb://localhost/gsm";
} else if (process.env.NODE_ENV == "development") {
	connectDBLink = "mongodb://localhost/gsm";
} else if (process.env.NODE_ENV == "heroku") {
  connectDBLink = "mongodb://"+process.env.MONGO_USERNAME+":"+process.env.MONGO_PASSWORD+"@ds053310.mongolab.com:53310/heroku_lh96h9bg";
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

function loggedIn(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.redirect('/login');
    }
}

function generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
};



