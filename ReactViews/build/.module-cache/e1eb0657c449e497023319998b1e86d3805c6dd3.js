var groupID = document.getElementById("groupID").getAttribute("value");
var groupName = document.getElementById("groupName").getAttribute("value");

var GSMSingleGroup = React.createClass({displayName: "GSMSingleGroup",

	render: function() {
		return(
			React.createElement("p", null, this.props.rootGroupName)
		);
	}

});

React.render(React.createElement(GSMSingleGroup, {rootGroupID: groupID, rootGroupName: groupName}), document.getElementById("gsmSingleGroup"));