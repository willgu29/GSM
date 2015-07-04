var EditAccountForm = React.createClass({displayName: "EditAccountForm",

	render: function() {
		return(	
			React.createElement("div", null, 
			React.createElement("h4", null, "Edit Account"), 
			 React.createElement("form", {className: "editAccountForm", method: "post", action: "editAccount"}, 
             	"Add skills: ", React.createElement("input", {type: "text", name: "skills", placeholder: "separate with commas only (no spaces)"}), " ", React.createElement("br", null), 
                "Add personality traits: ", React.createElement("input", {type: "text", name: "personality", placeholder: "separate with commas only (no spaces)"}), " ", React.createElement("br", null), 
                "Add what you are looking for: ", React.createElement("input", {type: "text", name: "lastName", placeholder: "separate with commas only (no spaces)"}), " ", React.createElement("br", null), 
                "Tell us something interesting about yourself: ", React.createElement("textarea", {name: "interesting", cols: "60", row: "5"}), " ", React.createElement("br", null), 
                React.createElement("br", null), 
                React.createElement("input", {type: "submit", value: "edit account", id: "editAccount"})
            )
            )
             
		);
	} 
});

React.render(React.createElement(CreateAccountForm, {url: "/editAccount"}), document.getElementById("editAccountForm"));


