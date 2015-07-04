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
             	"First name: ", React.createElement("input", {type: "text", name: "firstName"}), 
                "Last name: ", React.createElement("input", {type: "text", name: "lastName"}), 
                "Email: ", React.createElement("input", {type: "text", name: "email"}), 
                "Password: ", React.createElement("input", {type: "password", name: "password"}), 
                React.createElement("input", {type: "submit", value: "createAccount", id: "createAccount"})
            )
             
		);
	} 
});