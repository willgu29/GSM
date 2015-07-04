var CreateAccountForm = React.createClass({displayName: "CreateAccountForm",

	handleSubmit: function(e) {
		if (!this.validate) {
			console.log(JSON.stringify(e));
			e.preventDefault();
			$.ajax({
    		  url: this.props.url,
      		  dataType: 'json',
      		  type: 'POST',
      		  data: e,
      		  success: function(data) {
      		  	console.log("SUCCESS");
      		  }.bind(this),
      		  error: function(xhr, status, err) {
        		console.error(this.props.url, status, err.toString());
      		  }.bind(this)
    		});
		}  else {
			alert("Error");
		}
	},

	render: function() {
		return(	
			React.createElement("div", null, 
			React.createElement("h4", null, "Create Account"), 
			 React.createElement("form", {className: "createAccountForm", onsubmit: this.handleSubmit, method: "post"}, 
             	"first name: ", React.createElement("input", {type: "text", name: "firstName"}), " ", React.createElement("br", null), 
                "last name: ", React.createElement("input", {type: "text", name: "lastName"}), " ", React.createElement("br", null), 
                "email: ", React.createElement("input", {type: "text", name: "email"}), " ", React.createElement("br", null), 
                "password: ", React.createElement("input", {type: "password", name: "password"}), " ", React.createElement("br", null), 
                React.createElement("br", null), 
                React.createElement("input", {type: "submit", value: "create account", id: "createAccount"})
            )
            )
             
		);
	} 
});

React.render(React.createElement(CreateAccountForm, {url: "/createAccount"}), document.getElementById("createAccountForm"));