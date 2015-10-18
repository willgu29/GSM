
'use strict'
import React from 'react'
import { Router, Route, Link } from 'react-router'

var GSMNavBar = require('./GSMHeader');
var Hello = require('./Hello');

var pathName = window.location.pathname;


const App = React.createClass({
	render() {
		return(
			<div>
			<GSMNavBar currentURL={pathName} />
			<ul>
          		<li><Link to="/">Home</Link></li>
          		<li><Link to="/editAccount">My Profile</Link></li>
        	</ul>
				<p>Hello world!</p>
			</div>
		);
	}
});

React.render((<Router>
				<Route path="/" component={App} />
				<Route path="/editAccount" component={Hello} />
			</Router>
			), document.getElementById("content"));



