var iGrouplyHeaderStyle = {
	fontFamily: "Avenir Medium",
	fontSize: "40px"
}


var ulStyle = {
    listStyleType: "none",
    margin: "0",
    padding: "0"
}
var liStyle = {
    display: "inline",
    marginRight: "20"
}

var liStyleSelected = {
	display: "inline",
	backgroundColor: "yellow",
	marginRight: "20"
}


var GSMNavBarItems = React.createClass({displayName: "GSMNavBarItems",
	
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
			React.createElement("ul", {style: ulStyle}, 
				React.createElement("li", {style: style1}, React.createElement("a", {href: "/"}, "Member List")), 
				React.createElement("li", {style: style2}, React.createElement("a", {href: "/messages"}, "Messages")), 
				
				React.createElement("li", {style: style5}, React.createElement("a", {href: "/editAccount"}, "Edit Profile"))

			)
		);
	}

});

//<li style={style3}><a href="/groups">Groups</a></li>
	//			<li style={style4}><a href="/events">Events</a></li>


var GSMHeader = React.createClass({displayName: "GSMHeader",

	render: function() {
		return(
			React.createElement("div", {id: "navBar"}, 
				React.createElement("h1", {style: iGrouplyHeaderStyle}, "iGrouply"), 
				React.createElement(GSMNavBarItems, {currentURL: this.props.currentURL})
			)
		);
	}
});


var pathName = window.location.pathname;

React.render(React.createElement(GSMHeader, {currentURL: pathName}), document.getElementById("gsmHeader"));