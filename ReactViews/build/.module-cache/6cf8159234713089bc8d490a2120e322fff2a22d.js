
var DeleteUserAccount = React.createClass({displayName: "DeleteUserAccount",

	render: function() {
		return(
			React.createElement("div", null, 
				React.createElement("h3", null, "Delete User: "), 
				React.createElement("form", {method: "delete", action: this.props.url}, 
					"User ID: ", React.createElement("input", {type: "text", id: "userID", name: "userID"}), " ", React.createElement("br", null), 
			
					React.createElement("input", {type: "submit", value: "delete user", id: "deleteUser"})


				)
		
			)
		);
	}

});

React.render(React.createElement(DeleteUserAccount, {url: "/api/user/none"}), document.getElementById("deleteUserAccount"));