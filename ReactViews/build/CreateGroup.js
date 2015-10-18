"use strict";

var CreateGroup = React.createClass({
	displayName: "CreateGroup",

	render: function render() {
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
				"Description: ",
				React.createElement("input", { type: "text", id: "description", name: "description" }),
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
	displayName: "CreateSubGroup",

	getInitialState: function getInitialState() {
		return { rootGroupID: "", actionURL: "" };
	},
	handleChange: function handleChange(event) {
		var actionURL = this.props.url + event.target.value;
		this.setState({ rootGroupID: event.target.value, actionURL: actionURL });
	},
	render: function render() {
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
			"Description: ",
			React.createElement("input", { type: "text", id: "description", name: "description" }),
			" ",
			React.createElement("br", null),
			React.createElement("input", { type: "submit", value: "create sub-group", id: "createSubGroup" })
		);
	}
});

React.render(React.createElement(CreateGroup, { url: "/api/groups/" }), document.getElementById("createGroup"));