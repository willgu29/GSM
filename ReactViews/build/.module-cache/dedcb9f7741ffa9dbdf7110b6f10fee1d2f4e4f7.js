var ulStyle = {
    listStyleType: "none",
    margin: "0",
    padding: "0"
}
var liStyle = {
    display: "inline"
}

var GSMNavBarItems = React.createClass({displayName: "GSMNavBarItems",

	render: function() {
		return(
			React.createElement("ul", {style: ulStyle}, 
				React.createElement("li", {style: liStyle}, React.createElement("a", {href: "/editAccount"}, "Edit Account"))
			)
		);
	}

});

//        		<li><a href="/messages">Messages</a></li>


React.render(React.createElement(GSMNavBarItems, null), document.getElementById("gsmNavBarItems"));