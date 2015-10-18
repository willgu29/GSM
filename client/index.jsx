
'use strict'
import React from 'react'
import { Router, Route, Link } from 'react-router'

var GSMNavBar = require('./Mixins/GSMHeader');
var Hello = require('./Hello');
var Message = require('./Message');
var EditAccount = require('./EditAccountForm');
var pathName = window.location.pathname;


const App = React.createClass({
	getInitialState: function() {
		return({
			isLoggedIn: false,

		})
	},
	render: function() {

		if (isLoggedIn) {
			//Display tableview and shit
		} else {
			//landing page
			
		}

		return(
			<div>
			<GSMNavBar currentURL={pathName} />
			<ul>
          		<li><Link to="/">Home</Link></li>
          		<li><Link to="/editAccount">My Profile</Link></li>
          		<li><Link to="/groups">Groups</Link></li>

        	</ul>
				<p>Hello world!</p>
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



