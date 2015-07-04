var EditAccountForm = React.createClass({displayName: "EditAccountForm",

	render: function() {
		return(	
			React.createElement("div", null, 
			React.createElement("h4", null, "Edit Account"), 
			 React.createElement("form", {className: "editAccountForm", method: "put", action: "api/users/me"}, 
             	"Add skills: ", React.createElement("br", null), 
                React.createElement("input", {size: "60", type: "text", name: "skills", placeholder: "separate with commas only (no spaces)"}), " ", React.createElement("br", null), 
                React.createElement("br", null), 
                "Add personality traits: ", React.createElement("br", null), 
                React.createElement("input", {size: "60", type: "text", name: "personality", placeholder: "separate with commas only (no spaces)"}), " ", React.createElement("br", null), 
                React.createElement("br", null), 
                "Why should someone contact you? (things you want/things you can give perhaps) ", React.createElement("br", null), 
                React.createElement("input", {size: "60", type: "text", name: "contactIf", placeholder: "separate with commas only (no spaces)"}), " ", React.createElement("br", null), 
                React.createElement("br", null), 
                "Tell us something interesting about yourself: ", React.createElement("br", null), 
                React.createElement("textarea", {name: "interesting", cols: "60", row: "10"}), " ", React.createElement("br", null), 
                React.createElement("br", null), 
                React.createElement("input", {type: "submit", value: "edit account", id: "editAccount"})
            )
            )
             
		);
	} 
});

React.render(React.createElement(EditAccountForm, {url: "/api/users/me"}), document.getElementById("editAccountForm"));


