
var CreateGroup = React.createClass({displayName: "CreateGroup",

    //Track opens default yes, track clicks default yes, auto_text default yes,
    //preserve_recipients NO, merge_language Handlebars, 
	render: function() {
		return(
			React.createElement("form", {method: "post", method_action: "/api/groups/"}, 
				"Group Name: ", React.createElement("input", {type: "text", id: "groupName", name: "groupName"}), " ", React.createElement("br", null), 
				"Description: ", React.createElement("input", {type: "text", id: "description", name: "description"}), " ", React.createElement("br", null), 
				"Level: (input 1) ", React.createElement("input", {type: "number", id: "level", name: "level"}), " ", React.createElement("br", null), 
			
				React.createElement("input", {type: "submit", value: "create group", id: "createGroup"})


			)
		);
	}

});


React.render(React.createElement(CreateGroup, null), document.getElementById("createGroup"));