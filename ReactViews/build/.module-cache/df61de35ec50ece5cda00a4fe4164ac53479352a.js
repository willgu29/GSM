var ulStyle = {
    listStyleType: "none",
    margin: "0",
    padding: "0"
}
var liStyle = {
    display: "inline"
}

var liStyleSelected = {
	display: "inline",
	backgroundColor: "green"
}

var GSMNavBarItems = React.createClass({displayName: "GSMNavBarItems",
	
	render: function() {
		var style1 = liStyle;
		var style2 = liStyle;
		var style3 = liStyle;
		if (this.props.currentURL == "/") {
			style1 = liStyleSelected;
		} else if (this.props.currentURL == "/editAccount") {
			style2 = liStyleSelected;
		} else if (this.props.currentURL == "/messages") {
			style3 = liStyleSelected;
		}
		return(
			React.createElement("ul", {style: ulStyle}, 
				React.createElement("li", {style: style1}, React.createElement("a", {href: "/"}, "Member List")), 
				React.createElement("li", {style: style2}, React.createElement("a", {href: "/editAccount"}, "Edit Account")), 
				React.createElement("li", {style: style3}, React.createElement("a", {href: "/messages"}, "Messages"))
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