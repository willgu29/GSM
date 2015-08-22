var groupID = document.getElementById("groupID").getAttribute("value");


var GSMSingleGroup = React.createClass({displayName: "GSMSingleGroup",

	render: function() {
		return(
			React.createElement("p", null, "UYa")
		);
	}

});

React.render(React.createElement(GSMSingleGroup, {rootGroupID: groupID}), document.getElementById("gsmSingleGroup"));