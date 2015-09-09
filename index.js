
//INITIALIZATION


var express = require('express'),
	bodyParser = require('body-parser'),
  hbs = require('hbs'),
	React = require('react'),
	cookieParser = require('cookie-parser');
	passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
	session = require('express-session'),
	User = require('./Models/User.js'),
  Group = require('./Models/Group.js'),
  Media = require('./Models/Media.js'),
  Comment = require('./Models/Comment.js'),
  MessageThread = require("./Models/MessageThread.js"),
  Message = require("./Models/Message.js"),
  Group = require("./Models/Group.js"),
  Event = require("./Models/Event.js"),
  KnownNetwork = require("./Models/KnownNetwork.js"),
  aws = require('aws-sdk');



var app = express();

app.set('views', __dirname + '/templates/views/');
app.set('view engine', 'hbs');

app.use(bodyParser());
app.use(cookieParser());
app.use(session({secret: 'baeMaxLoving'}))
app.use(passport.initialize());
app.use(passport.session());

app.use("/ReactViews/build", express.static(__dirname + '/ReactViews/build'));
app.use("/public/", express.static(__dirname + '/public/'));



//**********************************
app.get("/gsm", ensureAdmin, function(req, res) {
  console.log("/gsm GET");
  //res.sendFile(__dirname + "/public/adminPanel.html");
  res.render("adminPanel", {layout: "/layouts/main"});
});

//ROUTING

	//VIEWS 



app.get("/", function (req, res) {
	console.log('/ GET');
  if (!req.user) {
    res.render('landingPage', {layout: "/layouts/main"});
  } else {
    res.render('index', {layout: "/layouts/main"});
  }
});

//Main Nav Bar

app.get("/editAccount", loggedIn, function (req, res) {
  console.log("/editAccount GET");

  res.render("editAccount", {layout: "/layouts/main"});
});

app.get("/messages", loggedIn, function (req, res) {
  console.log("/messages GET");
  res.render("messages", {layout: "/layouts/main"});
}); 

app.get("/groups", loggedIn, function (req, res) {
  console.log("/groups GET");
  res.render("groups", {layout:"/layouts/main"});
});

app.get("/events", loggedIn, function (req, res) {
  console.log("/events GET");
  res.render("events", {layout:"/layouts/main"});
});
//---

app.get("/groups/:groupID", loggedIn, function (req, res) {
  console.log("/groups/:groupID GET " + req.params.groupID);
  console.log("/query string: " + req.query.groupName);
  res.render("groupView", {layout:"/layouts/main",
                            groupID: req.params.groupID,
                            groupName: req.query.groupName});
});

app.get("/messages/:convoID", loggedIn, function (req, res) {
  console.log("/messages/:convoID GET " + req.params.convoID);
  console.log("query string: " + req.query.convoTitle);
  var participantsArray = req.query.convoTitle.split(",");
  res.render("messageThread", {layout: "/layouts/main",
                                convoID: req.params.convoID,
                                convoTitle: participantsArray});
})

app.get("/users/:userID", loggedIn, function (req, res) {
  console.log("/users/:userID GET " + req.params.userID);
  res.render("userPage", {layout: "/layouts/main"});
});




//Other

app.get("/individuals", loggedIn, function (req, res) {
  console.log('/individuals GET');
  res.sendFile(__dirname + "/public/browseIndividuals.html");
});

app.get("/login" ,function (req, res) {
  console.log("/login GET");

  res.sendFile(__dirname + "/public/login.html");
});

app.get("/suggestions/:userID", loggedIn, function (req, res) {
  res.sendFile(__dirname + "/public/suggestionsPage.html");
}); 


//---



	//***************

	//API Calls

app.get("/api/appLoginStatus", function (req, res) {
  if (!req.user) {
    res.json({_id:"0"});
  } else {
    res.json({_id:req.user._id});
  }

});

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
                  var htmlLazyMe = "<p>Account created! Feel free to login and update your user profile!</p>" + "<a href=/>Back</a>";
                	return res.send(htmlLazyMe);
                }
        });
});

 

app.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return res.json(err); }
    if (!user) { return res.json(info); }
    req.logIn(user, function(err) {
      if (err) { return res.json(info); }
      return res.json('/');
    });
  })(req, res, next);
});

app.get('/logout', function (req, res){

  req.logout(); //not working for some reason. Stack overflow says use below
  req.session.destroy(function (err) {
        req.user = undefined;
        var htmlLazyMe = "<p>Successfully logged out</p>" + "<a href=/>Main Page</a>";
        res.send(htmlLazyMe);    
  });

});
//*************************


//GET CONTENT

app.get("/api/users", loggedIn, function (req, res) { ///limit, skip, user

  var query = User.find({}).limit(req.body.limit).skip(req.body.skip);
  query.select('-password -phoneNumber');
  query.exec(function (err, users) {
    if (err) { console.log(err);} 
    else { res.json({users:users});}
  });


});

//Email find one
app.get("/api/users/:userID", function (req, res) {
  var searchID;
  if (req.params.userID == "me") {
    searchID = req.user._id;
  } else {
    searchID = req.params.userID;
  }

  var query = User.findOne({_id:searchID}).limit(req.body.limit).skip(req.body.skip);
  query.select('-password -phoneNumber');
  query.exec(function (err, user) {
    if (err) { console.log(err);} 
    else { res.json(user);}
  });


});

app.get("/api/searchUsers/", function (req, res) {
  //reset search form

  var query = User.find({}).limit(req.body.limit).skip(req.body.skip);
  query.select('-password -phoneNumber');
  query.exec(function (err, users) {
    if (err) { console.log(err);} 
    else { res.json(users);}
  });

 
});

//Full text search
app.get("/api/searchUsers/:searchText", function (req, res) {
  console.log("/api/searchUsers/:searchID GET " +  req.params.searchText);
  var searchText = req.params.searchText;

  var query = User.find({}).limit(req.body.limit).skip(req.body.skip);
  query.where({$text : {$search : searchText}});
  //             { score : {$meta: "textScore"}});
  // query.sort({score : {$meta : "textScore"}});
  query.select('-password -phoneNumber');
  query.exec(function (err, users) {
    if (err) { console.log(err);} 
    else { res.json(users);}
  });
  

});

app.get("/api/messages/:convoID", loggedIn, function (req, res) {
  console.log("/api/messages/:convoID GET " + req.params.convoID);
  var searchID;
  if (req.params.userID == "me") {
    searchID = req.user._id;
  } else {
    searchID = req.params.convoID;
  }

  //sort by date created (does this by default)
  Message.find({toMessageThread_id:searchID}, function (err, messageObjects) {
                if (err) {return console.error(err);}
                else {
                  res.json(messageObjects);
                }
  }).limit(req.body.limit).skip(req.body.skip);
});

app.get("/api/messages/", loggedIn, function (req, res) {
  console.log("/api/messages/ GET");
  MessageThread.find({participant_ids:req.user._id}, function (err, threadObjects) {
                if (err) return console.error(err);
                res.json(threadObjects);
  }).limit(req.body.limit).skip(req.body.skip);
});


//?level=# required
app.get("/api/groups", loggedIn, function (req, res) {
  console.log("/api/groups GET");
  var levelQuery = req.query.level;
  Group.find({userIds_inGroup: req.user._id, level: levelQuery}, function (err, groupObjects) {
    if (err) return console.error(err);
    res.json(groupObjects);
  }).limit(req.body.limit).skip(req.body.skip);
});

app.get("/api/groups/:groupID", loggedIn, function (req, res) {
  console.log("/api/groups/:groupID GET " + req.params.groupID);
  Group.findOne({_id:req.params.groupID}, function (err, group) {
    if (err) return console.error(err);
    res.json(group);
  });
});

app.get("/api/events/all", loggedIn, function (req, res) {
  console.log("/api/events/all GET");

  //TODO: Only get events from date xx and further
  Event.find({}, function (err, eventObjects) {
    if (err) return console.error(err);
    res.json(eventObjects);
  }).limit(req.body.limit).skip(req.body.skip);
});

app.get("/api/events", loggedIn, function (req, res) {
  console.log("/api/events GET");

  //TODO: Only get events from date xx and further
  Event.find({peopleInvited_ids: req.user._id, status: "PRE"}, function (err, eventObjects) {
    if (err) return console.error(err);
    res.json(eventObjects);
  }).limit(req.body.limit).skip(req.body.skip);
});

app.get("/api/media/:userID", loggedIn, function (req, res) {
  console.log("/api/media/:userID GET " + req.params.userID);
  var searchID;
  if (req.params.userID == "me") {
    searchID = req.user._id;
  } else {
    searchID = req.params.userID;
  }
  Media.find({user_id:searchID}, function (err, mediaObjects) {
                if (err) return console.error(err);
                res.json(mediaObjects);
    }).limit(req.body.limit).skip(req.body.skip);
});

app.get("/api/comments/:userID", loggedIn, function (req, res) {
  console.log("/api/comments/:userID GET " + req.params.userID);
  var searchID;
  if (req.params.userID == "me") {
    searchID = req.user._id;
  } else {
    searchID = req.params.userID;
  }
  Comment.find({user_id:searchID}, function (err, commentObjects) {
                if (err) return console.error(err);
                res.json(commentObjects);
    }).limit(req.body.limit).skip(req.body.skip);
});

app.get("/api/network/:userID", loggedIn, function (req, res) {
  console.log("/api/network/:userID GET " + req.params.userID);
  var searchID;
  if (req.params.userID == "me") {
    searchID = req.user._id;
  } else {
    searchID = req.params.userID;
  }
  KnownNetwork.findOne({user_id:searchID}, function (err, knownNetwork) {
                if (err) return console.error(err);
                res.json(knownNetwork);
    }).limit(req.body.limit).skip(req.body.skip);
});

///
  //Database Edits

//Create new message thread
app.post("/api/messages/", loggedIn, function (req, res) {
  console.log("/api/messages/ POST ");

    var startID = req.user._id;
    var clientOneFullName = req.user.fullName;
    var participantID = req.body._id;
    var clientTwoFullName = req.body.fullName;
    var participant_ids = [startID, participantID];

    var query = {'user_id':startID,
                  "participant_ids": participant_ids};

    

    MessageThread.findOne(query, function (err, thread) {
    if (err) { 
      console.log(err);

    } else {

      if (thread) {
          return res.json({info: "success", _id: thread._id, convoTitle: [clientOneFullName, clientTwoFullName]});
      } else {
        //Create it
        var newThread =new MessageThread({ user_id: startID, 
                              fullName: clientOneFullName,
                              participant_ids: participant_ids,
                              participant_fullNames: [clientOneFullName, clientTwoFullName],
                              messageCount: 0,
                              unseenMessagesCount: 0});

        newThread.save(function (err, newThread) {
         if (err) {
           console.error(err);
           return res.json({info: "There was an error. Please try again in a minute."});
          } else {
           console.log(newThread);
           return res.json({info: "success", _id: newThread._id, convoTitle: [clientOneFullName, clientTwoFullName]});
          }
        });
      }

    }
  });
});

app.post("/api/messages/:convoID", loggedIn, function (req, res) {
  console.log("/api/messages/:convoID POST", req.params.convoID);

  var convoID = req.params.convoID;
    var ObjectId = require('mongoose').Types.ObjectId; 
    var query = { "_id" : new ObjectId(convoID)};
    MessageThread.findOne(query, function (err, thread) {
      if (err){console.log(err);}
      else {
          if (thread.messageCount == null){
            thread.messageCount = 1;
          } else {
            thread.messageCount++;
          }
          console.log("Message count: ", thread.messageCount);
        thread.save(function (err, thread) {

        });   
      }
     
    });  

  


  var newMessage = new Message({
                          user_id: req.user._id,
                          fullName: req.user.fullName,
                          text: req.body.text,
                          toMessageThread_id: convoID});

  newMessage.save(function (err, newMessage) {
     if (err) {console.error(err); return res.json({info: 
      "There was an error. Please try again in a minute."});
      } else { console.log(newMessage); return res.json({info:
       "success", _id: newMessage._id});}
    });




});

app.post("/api/groups/" , loggedIn, function (req, res){
  console.log("/api/groups POST");


  var newGroup = new Group({
                    name: req.body.groupName,
                    description: req.body.description,
                    userIds_inGroup: [req.user._id],
                    fullNames_inGroup: [req.user.fullName],
                    adminIds: [req.user._id],
                    adminFullNames: [req.user.fullName], 
                    rootGroup_id: req.body.parentGroupID,
                    rootGroup_name: req.body.parentGroupName,
                    level: req.body.level
  });

  newGroup.save(function (err, newGroup) {
    if (err) {console.error(err); return res.json({info: 
      "There was an error. Please try again in a minute."});
      } else { console.log(newGroup); return res.json({info:
       "success", _id: newGroup._id});}
    });
});

app.post("/api/groups/:rootGroupID" , loggedIn, function (req, res){
  console.log("/api/groups/:rootGroupID POST " + req.params.rootGroupID);


  Group.findOne({_id:req.params.rootGroupID}, function (err, rootGroup) {
    if (err) {console.error(err); return res.json({info: 
      "There was an error. Please try again in a minute."});
      } else { 
        console.log("Root group: " + rootGroup);
        var newLevel = rootGroup.level + 1; //?
        var newGroup = new Group({
                          name: req.body.groupName,
                          description: req.body.description,
                          userIds_inGroup: [req.user._id],
                          fullNames_inGroup: [req.user.fullName],
                          adminIds: [req.user._id],
                          adminFullNames: [req.user.fullName],
                          rootGroup_id: rootGroup._id,
                          rootGroup_name: rootGroup.name,
                          level: newLevel });

        newGroup.save(function (err, newGroup) {
            if (err) {console.error(err); return res.json({info: 
              "There was an error. Please try again in a minute."});
              } else { 
                rootGroup.childrenGroup_ids.push(newGroup._id);
                rootGroup.childrenGroup_names.push(newGroup.name);
                rootGroup.save(function (err, updatedGroup) {
                  if (err) {console.error(err); return res.json({info: 
                    "There was an error. Please try again in a minute."});
                    } else { console.log("Updated Group: " + updatedGroup); return res.json({info:
                    "success", _id:newGroup._id, updatedGroup_id: updatedGroup._id});}
                });
              }
        });
      }
    });
});



app.post("/api/network/:userID", loggedIn, function (req, res) {
  console.log("/api/network/:userID POST " + req.params.userID);

  //TODO: Add acquaintance / update KnownNetwork model of person

});

app.post("/api/events/", loggedIn, function (req, res) {
  console.log("/api/events/ POST ");

  //Get people in groupID
  var peopleInGroup_ids = [];
  var peopleInGroup_fullNames = [];
  Group.findOne({_id:req.body.groupID}, function (err, group) {
    if (group) {
      peopleInGroup_ids = group.userIds_inGroup;
      peopleInGroup_fullNames = group.fullNames_inGroup;

      var newEvent = new Event({
                            name: req.body.name,
                            description: req.body.description,
                            startTime: req.body.startTime,
                            endTime: req.body.endTime,
                            status: "PRE",
                            peopleInvited_fullNames: peopleInGroup_fullNames,
                            peopleInvited_ids: peopleInGroup_ids
      });

      newEvent.save(function (err, newEvent) {
                if (err) {
                  console.error(err);
                  return res.send("There was an error in creating the event. Please try again in a minute.");
                } else {
                  return res.json(newEvent);
                }
      });
    }
  

  });

  
});

app.post("/api/users/:userID", loggedIn, function (req, res) {
  console.log("/api/users/:userID POST " + req.params.userID);

    //var skillsArray = req.body.skills.split(',');
    //var personalityArray = req.body.personality.split(',');
    var canOfferArray = req.body.canOffer.split(',');
    var wantsArray = req.body.wants.split(',');

    if (JSON.stringify(canOfferArray) == JSON.stringify([""])) {
      canOfferArray = [];
    }
    if (JSON.stringify(wantsArray) == JSON.stringify([""])) {
      wantsArray = [];
    }

    var query = {'_id':req.user._id};

    var newData = {
      identity: {
        //skills: skillsArray,
        //personality: personalityArray,
        //interesting: req.body.interesting,
        topFiveTime: req.body.topFiveTime,
        canOffer: canOfferArray,
        wants: wantsArray
      }
    }

    User.findOneAndUpdate(query, newData, {upsert:false}, function(err, doc){
      if (err) return res.send(500, { error: err });

      var htmlLazyMe = "<p>Successfully saved</p>" + "<a href=/>Back</a>";

      return res.send(htmlLazyMe);
    });
});

app.post("/api/comments/:userID", loggedIn, function (req, res) {
    console.log("/api/comments/:userID POST " + req.params.userID);

    var commentTo = req.params.userID;
    var byUser_id = req.user._id;
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
    var urlKey = req.user._id+'/'+req.query.file_name;
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
                url: 'https://'+S3_BUCKET+'.s3.amazonaws.com/'+req.user._id+'/'+req.query.file_name
            };
            res.write(JSON.stringify(return_data));
            res.end();

        }
    });
});

app.post('/api/media/:userID', function(req, res){
    console.log("/api/media/:userID POST " + req.params.userID);

    var userID;
    if (req.params.userID == "me") {
      userID = req.user._id;
    } else {
      userID = req.params.userID;
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

    var newMedia =new Media({ user_id: userID, 
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


//Mandrill API

var mandrill = require('mandrill-api/mandrill');
var mandrill_client = new mandrill.Mandrill(process.env.MANDRILL_KEY);

app.get("/admin/sendMail", ensureAdmin, function (req,res) {
  res.sendFile(__dirname + "/public/adminPanel.html");
});

app.post("/admin/sendMail", ensureAdmin, function (req,res){

  var toArray = req.body.to_email.split(",");
  var formattedArray = []
  for (var i =0; i < toArray.length; i++) {
    var format = {
      "email": toArray[i],
      "type": "to"
    };
    formattedArray.push(format);
  }


  var tagsArray = req.body.tags.split(",");
  console.log(JSON.stringify(toArray));
  var message = {
    "key": process.env.MANDRILL_MESSAGE_KEY,
    "html": req.body.html,
    "subject": req.body.subject,
    "from_email": req.body.from_email,
    "from_name": req.body.from_name,
    "to": formattedArray,
    "track_opens": true,
    "track_clicks": true,
    "auto_text": true,
    "preserve_recipients": false,  //display recipients
    "tags": tagsArray

  };


  mandrill_client.messages.send({"message": message}, function(result) {
    console.log(result);
    /*
    [{
            "email": "recipient.email@example.com",
            "status": "sent",
            "reject_reason": "hard-bounce",
            "_id": "abc123abc123abc123abc123abc123"
        }]
    */
    res.json(result);
  }, function(e) {
    // Mandrill returns the error as an object with name and message keys
    res.json(e.message);
    console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
    // A mandrill error occurred: Unknown_Subaccount - No subaccount exists with the id 'customer-123'
  });

});
//**************************


//Helpers that should be placed in separate files 

function loggedIn(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.redirect('/');
    }
}

function ensureAdmin(req, res, next) {
  // ensure authenticated user exists with admin role, 
  // otherwise send 401 response status
  if (req.user && req.user.role == 'ADMIN') {
      return next();
  } else {
      return res.send(401);
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



