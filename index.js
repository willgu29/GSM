var express = require('express'),
	bodyParser = require('body-parser'),
	React = require('react');




var app = express();
app.use(bodyParser());
app.set('views', __dirname + '/ReactViews/src');
app.set('view engine', 'js');
app.engine('js', require('express-react-views').createEngine());


app.get("/", function (req, res) {
	res.render('GSMHeaderBar');

});

// app.get("/ReactViews/build/:componentName", function (req, res) {
// 	res.sendFile(__dirname + req.url);
// });


app.listen(3000);