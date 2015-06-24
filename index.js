var express = require('express'),
	bodyParser = require('body-parser'),
	React = require('react');




var app = express();
app.use(bodyParser());
app.set('views', __dirname + '/ReactViews/src');
app.set('view engine', 'js');
app.engine('js', require('express-react-views').createEngine());


app.get("/", function (req, res) {
	res.render('Pages/HomePage');

});



app.listen(3000);