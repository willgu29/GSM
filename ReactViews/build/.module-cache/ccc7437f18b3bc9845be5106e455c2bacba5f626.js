var EditAccountForm = React.createClass({displayName: "EditAccountForm",
    getInitialState: function() {
        return ({user:{}})
    },
    componentDidMount: function() {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: function(userData){
            if (this.isMounted()){
                this.setState({user:userData});
            }
            }.bind(this),
            error: function(xhr,status,err){
                console.error(status, err.toString());
            }.bind(this)
        });
     },
	render: function() {

        var userData = this.state.user.identity;
        var userString = JSON.stringify(userData);
        // var personality = JSON.stringify(userData.personality);
        // var contactIf = userData.contactIf;
        var email = this.state.user.email;
		return(	
			React.createElement("div", null, 
			React.createElement("h4", null, "Edit Account"), 
			 React.createElement("form", {className: "editAccountForm", method: "post", action: "api/users/me"}, 
             	"Add skills: ", React.createElement("br", null), 
                React.createElement("input", {size: "60", type: "text", name: "skills", value: email, placeholder: "separate with commas only (no spaces)"}), " ", React.createElement("br", null), 
                React.createElement("br", null), 
                "Add personality traits: ", React.createElement("br", null), 
                React.createElement("input", {size: "60", type: "text", name: "personality", value: "hi", placeholder: "separate with commas only (no spaces)"}), " ", React.createElement("br", null), 
                React.createElement("br", null), 
                "Why should someone contact you? (things you want/things you can give perhaps) ", React.createElement("br", null), 
                React.createElement("textarea", {name: "contactIf", cols: "60", row: "10"}), " ", React.createElement("br", null), React.createElement("br", null), 
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


