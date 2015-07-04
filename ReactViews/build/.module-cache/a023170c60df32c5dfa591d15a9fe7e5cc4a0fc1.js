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
             	React.createElement("input", {type: "text", style: styleInput, name: "firstName", placeholder: "first name"}), 
                React.createElement("input", {type: "text", style: styleInput, name: "lastName", placeholder: "last name"}), 
                React.createElement("input", {type: "text", style: styleInput, name: "email", placeholder: "email"}), 
                React.createElement("input", {type: "password", style: styleInput, name: "password", placeholder: "password"}), 
                React.createElement("input", {type: "submit", style: styleInput, value: "Unlock", id: "unlock"})
            )
             
		);
	} 
});