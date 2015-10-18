'use strict'
import React from 'react'

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
	
	render: function() {
		var style1 = liStyle;
		var style2 = liStyle;
		var style3 = liStyle;
		var style4 = liStyle;
		var style5 = liStyle;
		if (this.props.currentURL == "/") {
			style1 = liStyleSelected;
		} else if (this.props.currentURL == "/messages") {
			style2 = liStyleSelected;
		} else if (this.props.currentURL == "/groups") {
			style3 = liStyleSelected;
		} else if (this.props.currentURL == "/events") {
			style4 = liStyleSelected;
		} else if (this.props.currentURL == "/editAccount") {
			style5 = liStyleSelected;
		} 
		return(
			<ul style={ulStyle}>
				<li style={style1}><a style={aStyle} href="/">Member List</a></li>
				<li style={style2}><a style={aStyle} href="/messages">Messages</a></li>
				
				<li style={style5}><a style={aStyle} href="/editAccount">Edit Profile</a></li>
				<li style={style5}><a style={aStyle} href="/logout">Logout</a></li>
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
				<GSMNavBarItems currentURL={this.props.currentURL} />
			</div>
		);
	}
});


// var pathName = window.location.pathname;

// React.render(<GSMHeader currentURL={pathName} />, document.getElementById("gsmHeader"));