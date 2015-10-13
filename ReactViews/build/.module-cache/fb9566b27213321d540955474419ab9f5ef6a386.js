var JoinGroupForm = React.createClass({displayName: "JoinGroupForm",

	render: function() {
		return(	
			React.createElement("div", null, 
			React.createElement("h4", null, "Join Group"), 
			 React.createElement("form", {className: "joinGroupForm", method: "post", action: "/api/joinGroup"}, 
                "organization id: ", React.createElement("input", {type: "text", name: "orgID"}), " ", React.createElement("br", null), 

                React.createElement("br", null), 
                React.createElement("input", {type: "submit", value: "join group", id: "joinGroup"})
            )
            )
             
		);
	} 
});

React.render(React.createElement(JoinGroupForm, {url: "/api/joinGroup/"}), document.getElementById("joinGroupForm"));