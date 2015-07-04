var CreateAccountForm = React.createClass({displayName: "CreateAccountForm",

	handleSubmit: function(e) {
		if (!this.validate) {
			e.preventDefault();
		} 
		alert("HI");
	},

	render: function() {
		return(
			 React.createElement("form", {className: "createAccountForm", onsubmit: this.handleSubmit, method: "post"}, 
             	"First name: ", React.createElement("input", {type: "text", name: "firstName"}), " ", React.createElement("br", null), 
                "Last name: ", React.createElement("input", {type: "text", name: "lastName"}), " ", React.createElement("br", null), 
                "Email: ", React.createElement("input", {type: "text", name: "email"}), " ", React.createElement("br", null), 
                "Password: ", React.createElement("input", {type: "password", name: "password"}), " ", React.createElement("br", null), 
                React.createElement("input", {type: "submit", value: "Create Account", id: "createAccount"})
            )
             
		);
	} 
});

React.render(React.createElement(CreateAccountForm, null), document.body);