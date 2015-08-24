
var CreateGroup = React.createClass({displayName: "CreateGroup",

	render: function() {
		return(
			React.createElement("form", {method: "post", action: "/api/groups/", onSubmit: this.submitForm}, 
				"Group Name: ", React.createElement("input", {type: "text", id: "groupName", name: "groupName"}), " ", React.createElement("br", null), 
				"Description: ", React.createElement("input", {type: "text", id: "description", name: "description"}), " ", React.createElement("br", null), 
				"Level: (input 1) ", React.createElement("input", {type: "text", id: "level", name: "level"}), " ", React.createElement("br", null), 
			
				React.createElement("input", {type: "submit", value: "create group", id: "createGroup"})


			)
		);
	}

});

var CreateSubGroup = React.createClass({displayName: "CreateSubGroup",
	getInitialState: function() {
		return ({rootGroupID:"", actionURL:""});
	},
	handleChange: function(event) {
		var actionURL = "/api/groups/" + event.target.value;
    	this.setState({rootGroupID: event.target.value,actionURL:actionURL});
  	},
	render: function() {
		return(
			React.createElement("form", {method: "post", action: "/api/groups/", onSubmit: this.submitForm}, 
				"Root Group ID: ", React.createElement("input", {onChange: this.handleChange, value: this.state.rootGroupID, type: "text", id: "rootGroupID", name: "rootGroupID"}), " ", React.createElement("br", null), 
				"Group Name: ", React.createElement("input", {type: "text", id: "groupName", name: "groupName"}), " ", React.createElement("br", null), 
				"Description: ", React.createElement("input", {type: "text", id: "description", name: "description"}), " ", React.createElement("br", null), 
			
				React.createElement("input", {type: "submit", value: "create sub-group", id: "createSubGroup"})


			)
		);
	}
});


React.render(React.createElement(CreateGroup, null), document.getElementById("createGroup"));