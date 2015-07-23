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
	backgroundColor: "black"
}

var GSMNavBarItems = React.createClass({displayName: "GSMNavBarItems",
	
	render: function() {
		var style1 = liStyle;
		var style2 = liStyle;
		if (this.props.currentURL == "/") {
			style1 = liStyleSelected;
		} else if (this.props.currentURL == "/editAccount") {
			style2 = liStyleSelected;
		}
		return(
			React.createElement("ul", {style: ulStyle}, 
				React.createElement("li", {style: style1}, React.createElement("a", {href: "/"}, "Main Page")), 
				React.createElement("li", {style: style2}, React.createElement("a", {href: "/editAccount"}, "Edit Account"))
			)
		);
	}

});

//        		<li><a href="/messages">Messages</a></li>

var pathName = window.location.pathname;

React.render(React.createElement(GSMNavBarItems, {currentURL: pathName}), document.getElementById("gsmNavBarItems"));