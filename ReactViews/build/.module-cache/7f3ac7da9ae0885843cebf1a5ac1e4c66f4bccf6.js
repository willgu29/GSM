var EditAccountForm = React.createClass({displayName: "EditAccountForm",

	render: function() {
		return(	
			React.createElement("div", null, 
			React.createElement("h4", null, "Edit Account"), 
			 React.createElement("form", {className: "editAccountForm", method: "post", action: "api/users/me"}, 
             	"Add skills: ", React.createElement("input", {size: "60", type: "text", name: "skills", placeholder: "separate with commas only (no spaces)"}), " ", React.createElement("br", null), 
                "Add personality traits: ", React.createElement("input", {size: "60", type: "text", name: "personality", placeholder: "separate with commas only (no spaces)"}), " ", React.createElement("br", null), 
                "Why should someone contact you? (things you want/things you can give perhaps) ", React.createElement("input", {size: "60", type: "text", name: "contactIf", placeholder: "separate with commas only (no spaces)"}), " ", React.createElement("br", null), 
                "Tell us something interesting about yourself: ", React.createElement("textarea", {name: "interesting", cols: "60", row: "5"}), " ", React.createElement("br", null), 
                React.createElement("br", null), 
                React.createElement("input", {type: "submit", value: "edit account", id: "editAccount"})
            )
            )
             
		);
	} 
});

React.render(React.createElement(EditAccountForm, {url: "/api/users/me"}), document.getElementById("editAccountForm"));


