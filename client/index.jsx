
'use strict'
import React from 'react'
import { Router, Route, Link } from 'react-router'

var LandingPage = require("./LandingPage/LandingPage");

var GSMNavBar = require('./Mixins/GSMHeader');
var GSMUserTableView = require("./GSMUserTableView");
var Hello = require('./Hello');
var Message = require('./Message');
var EditAccount = require('./EditAccountForm');
var pathName = window.location.pathname;


const App = React.createClass({
	getInitialState: function() {
		return({
			isLoggedIn: false

		})
	},
	render: function() {

		var content = [];

		if (this.state.isLoggedIn) {
			//Display tableview and shit
						//<GSMNavBar currentURL={pathName} />

			content.push(<GSMUserTableView />);
		} else {
			//landing page
			content.push(<LandingPage />);
		}

		return(
			<div>
				{content}
				{this.props.children}
			</div>
		);
	}
});

React.render((<Router>
				<Route path="/" component={App}>
					<Route path="/editAccount" componen={EditAccount} />
					<Route path="/groups" component={Hello} />
					<Route path="/messages" component={Message} />
				</Route>
			</Router>
			), document.getElementById("content"));

/*
<ul>
          		<li><Link to="/">Home</Link></li>
          		<li><Link to="/editAccount">My Profile</Link></li>
          		<li><Link to="/groups">Groups</Link></li>


        	</ul>
        	*/

