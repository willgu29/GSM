'use strict'
import React from 'react'
import { Router, Route, Link } from 'react-router'
import LoginActions from "../actions/LoginActions";

var iGrouplyHeaderStyle = {
	fontFamily: "Avenir Medium",
	fontSize: "30px",
	fontStyle: "oblique",
	color: "white",
	display: "inline",
	marginLeft: "10",
}

var ulStyle = {
	display: "inline",
	float: "right",
    listStyleType: "none",
    marginTop: "14",
    padding: "0"
}
var liStyle = {
	color: "hsl(0, 0%, 85%)",
    display: "inline",
    marginRight: "20"
}

var liStyleSelected = {
	color: "white",
	display: "inline",
	marginRight: "20"
}

var aStyle = {
	color: "inherit",
	textDecoration: "none"
}


var GSMNavBarItems = React.createClass({
	handleClick: function(e) {
		e.preventDefault();
		console.log("handle");
		LoginActions.logout();
	},
	render: function() {
		var style1 = liStyle;
		var style2 = liStyle;
		var style3 = liStyle;
		var style4 = liStyle;
		var style5 = liStyle;
	
		return(
			<ul style={ulStyle}>
				<li style={style1}><Link style={aStyle} to="/">Home</Link></li>
				<li style={style2}><Link style={aStyle} to="/messages">Messages</Link></li>
				
				<li style={style5}><Link style={aStyle} to="/editAccount">My Profile</Link></li>
				<li style={style5}><a style={aStyle} onClick={this.handleClick}>Logout</a></li>
			</ul>
		);
	}

});

//<li style={style3}><a href="/groups">Groups</a></li>
	//			<li style={style4}><a href="/events">Events</a></li>


module.exports  = React.createClass({

	render: function() {
		return(
			<div id="navBar">
				<h1 style={iGrouplyHeaderStyle}>iGrouply</h1>
				<GSMNavBarItems />
			</div>
		);
	}
});


// var pathName = window.location.pathname;

// React.render(<GSMHeader currentURL={pathName} />, document.getElementById("gsmHeader"));