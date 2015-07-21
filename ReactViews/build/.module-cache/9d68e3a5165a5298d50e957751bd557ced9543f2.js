

var GSMNavBarItems = React.createClass({displayName: "GSMNavBarItems",

	render: function() {
		return(
			React.createElement("ul", null, 
				React.createElement("li", null, React.createElement("a", {href: "/editAccount"}, "Edit Account ")), 
        		React.createElement("li", null, React.createElement("a", {href: "/messages"}, "Messages"))
			)
		);
	}

});



React.render(React.createElement(GSMNavBarItems, null), document.getElementById("gsmNavBarItems"));