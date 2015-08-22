
var CreateGroup = React.createClass({displayName: "CreateGroup",

	render: function() {
		return(
			React.createElement("form", {method: "post", action: "/api/groups/", submitHanlder: this.submitForm}, 
				"Group Name: ", React.createElement("input", {type: "text", id: "groupName", name: "groupName"}), " ", React.createElement("br", null), 
				"Description: ", React.createElement("input", {type: "text", id: "description", name: "description"}), " ", React.createElement("br", null), 
				"Level: (input 1) ", React.createElement("input", {type: "text", id: "level", name: "level"}), " ", React.createElement("br", null), 
			
				React.createElement("input", {type: "submit", value: "create group", id: "createGroup"})


			)
		);
	}

});


React.render(React.createElement(CreateGroup, null), document.getElementById("createGroup"));