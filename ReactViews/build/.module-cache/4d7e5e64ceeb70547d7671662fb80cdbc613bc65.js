var CreateAccountForm = React.createClass({displayName: "CreateAccountForm",

	render: function() {
		return(	
			React.createElement("div", null, 
			React.createElement("h4", null, "Create Account"), 
			 React.createElement("form", {className: "createAccountForm", method: "post", action: "createAccount"}, 
             	"first name: ", React.createElement("input", {type: "text", name: "firstName"}), " ", React.createElement("br", null), 
                "last name: ", React.createElement("input", {type: "text", name: "lastName"}), " ", React.createElement("br", null), 
                "email: ", React.createElement("input", {type: "email", name: "email"}), " ", React.createElement("br", null), 
                "phone number: ", React.createElement("input", {type: "number", name: "phoneNumber"}), " ", React.createElement("br", null), 
                "password: ", React.createElement("input", {type: "password", name: "password"}), " ", React.createElement("br", null), 
                React.createElement("br", null), 
                React.createElement("input", {type: "submit", value: "create account", id: "createAccount"})
            )
            )
             
		);
	} 
});

React.render(React.createElement(CreateAccountForm, {url: "/createAccount"}), document.getElementById("createAccountForm"));


