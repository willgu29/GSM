
var CreateGroup = React.createClass({

	render: function () {
		return React.createElement(
			"div",
			null,
			React.createElement(
				"h3",
				null,
				"Create root group"
			),
			React.createElement(
				"form",
				{ method: "post", action: this.props.url },
				"Group Name: ",
				React.createElement("input", { type: "text", id: "groupName", name: "groupName" }),
				" ",
				React.createElement("br", null),
				"Group Short Name: ",
				React.createElement("input", { type: "text", id: "shortGroupName", name: "shortGroupName" }),
				" ",
				React.createElement("br", null),
				"Category: ",
				React.createElement("input", { type: "text", id: "category", name: "category" }),
				" ",
				React.createElement("br", null),
				"Description: ",
				React.createElement("input", { type: "text", id: "description", name: "description" }),
				" ",
				React.createElement("br", null),
				"Membership Model: ",
				React.createElement("input", { type: "text", id: "membershipModel", name: "membershipModel" }),
				" ",
				React.createElement("br", null),
				"URLS: ",
				React.createElement("input", { type: "text", id: "urls", name: "urls" }),
				" ",
				React.createElement("br", null),
				"Level: (input 1) ",
				React.createElement("input", { type: "text", id: "level", name: "level" }),
				" ",
				React.createElement("br", null),
				React.createElement("input", { type: "submit", value: "create group", id: "createGroup" })
			),
			React.createElement(
				"h3",
				null,
				"Create sub group"
			),
			React.createElement(CreateSubGroup, { url: this.props.url })
		);
	}

});

var CreateSubGroup = React.createClass({
	getInitialState: function () {
		return { rootGroupID: "", actionURL: "" };
	},
	handleChange: function (event) {
		var actionURL = this.props.url + event.target.value;
		this.setState({ rootGroupID: event.target.value, actionURL: actionURL });
	},
	render: function () {
		return React.createElement(
			"form",
			{ method: "post", action: this.state.actionURL },
			"Root Group ID: ",
			React.createElement("input", { onChange: this.handleChange, value: this.state.rootGroupID, type: "text", id: "rootGroupID", name: "rootGroupID" }),
			" ",
			React.createElement("br", null),
			"Group Name: ",
			React.createElement("input", { type: "text", id: "groupName", name: "groupName" }),
			" ",
			React.createElement("br", null),
			"Group Short Name: ",
			React.createElement("input", { type: "text", id: "shortGroupName", name: "shortGroupName" }),
			" ",
			React.createElement("br", null),
			"Category: ",
			React.createElement("input", { type: "text", id: "category", name: "category" }),
			" ",
			React.createElement("br", null),
			"Description: ",
			React.createElement("input", { type: "text", id: "description", name: "description" }),
			" ",
			React.createElement("br", null),
			"Membership Model: ",
			React.createElement("input", { type: "text", id: "membershipModel", name: "membershipModel" }),
			" ",
			React.createElement("br", null),
			"URLS: ",
			React.createElement("input", { type: "text", id: "urls", name: "urls" }),
			" ",
			React.createElement("br", null),
			React.createElement("input", { type: "submit", value: "create sub-group", id: "createSubGroup" })
		);
	}
});

ReactDOM.render(React.createElement(CreateGroup, { url: "/api/groups/" }), document.getElementById("createGroup"));