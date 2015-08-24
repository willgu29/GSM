
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
		return ({rootGroupID:""});
	},
	submitForm: function(e) {
		e.preventDefault();


		var rootGroupID = this.state.rootGroupID;
		var urlPOST = this.props.url + "/" + rootGroupID;
		$.ajax({
			url: urlPOST,
			type: "POST",
			dataType: "json",


		});
	},
	handleChange: function(event) {
    	this.setState({rootGroupID: event.target.value});
  	},
	render: function() {
		return(
			React.createElement("form", {method: "post", action: "/api/groups/", onSubmit: this.submitForm}, 
				"Root Group ID: ", React.createElement("input", {onChange: this.handleChange, type: "text", id: "rootGroupID", name: "rootGroupID"}), " ", React.createElement("br", null), 
				"Group Name: ", React.createElement("input", {type: "text", id: "groupName", name: "groupName"}), " ", React.createElement("br", null), 
				"Description: ", React.createElement("input", {type: "text", id: "description", name: "description"}), " ", React.createElement("br", null), 
			
				React.createElement("input", {type: "submit", value: "create sub-group", id: "createSubGroup"})


			)
		);
	}
});


React.render(React.createElement(CreateGroup, null), document.getElementById("createGroup"));