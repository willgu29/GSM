var ulStyle = {
    listStyleType: "none",
    margin: "0",
    padding: "0"
}
var liStyle = {
    display: "inline",
    margin: "20"
}

var liStyleSelected = {
	display: "inline",
	backgroundColor: "green",
	margin: "20"
}


var GSMNavBarItems = React.createClass({displayName: "GSMNavBarItems",
	
	render: function() {
		var style1 = liStyle;
		var style2 = liStyle;
		var style3 = liStyle;
		var style4 = liStyle;
		if (this.props.currentURL == "/") {
			style1 = liStyleSelected;
		} else if (this.props.currentURL == "/messages") {
			style2 = liStyleSelected;
		} else if (this.props.currentURL == "/groups") {
			style3 = liStyleSelected;
		} else if (this.props.currentURL == "/editAccount") {
			style4 = liStyleSelected;
		}
		return(
			React.createElement("ul", {style: ulStyle}, 
				React.createElement("li", {style: style1}, React.createElement("a", {href: "/"}, "Member List")), 
				React.createElement("li", {style: style2}, React.createElement("a", {href: "/messages"}, "Messages")), 
				React.createElement("li", {style: style3}, React.createElement("a", {href: "/groups"}, "Groups")), 
				React.createElement("li", {style: style4}, React.createElement("a", {href: "/editAccount"}, "Edit Profile"))


			)
		);
	}

});



var GSMHeader = React.createClass({displayName: "GSMHeader",

	render: function() {
		return(
			React.createElement("div", {id: "navBar"}, 
				React.createElement("h1", null, "iGrouply"), 
				React.createElement(GSMNavBarItems, {currentURL: this.props.currentURL})
			)
		);
	}
});


var pathName = window.location.pathname;

React.render(React.createElement(GSMHeader, {currentURL: pathName}), document.getElementById("gsmHeader"));