var EditAccountForm = React.createClass({displayName: "EditAccountForm",
    getInitialState: function() {
        return ({
            
            interesting: "",
            contactIf:  "",
            personality: [],
            skills: []

    
            
        });
    },
    componentDidMount: function() {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: function(userData){
            if (this.isMounted()){
                this.setState({
                                interesting: userData.identity.interesting,
                                contactIf: userData.identity.contactIf,
                                personality: userData.identity.personality,
                                skills: userData.identity.skills
                                
                            
                        });
            }
            }.bind(this),
            error: function(xhr,status,err){
                console.error(status, err.toString());
            }.bind(this)
        });
     },
    handleChange: function(event) {
        if (event.target.id == "interesting") {
            this.setState({interesting: event.target.interesting});
        } else if (event.target.id == "contactIf") {
            this.setState({contactIf: event.target.contactIf});
        } else if (event.target.id == "skills") {
            this.setState({skills: event.target.skills});
        } else if (event.target.id == "personality") {
            this.setState({personality: event.target.personality});
        } else {
            //???
        }
    },
	render: function() {

        var personalityArray = this.state.personality;
        var personalityDisplay = [];
        var skillsDisplay = "";

        for (var i=0; i < personalityArray.length; i++) {
            var personalityTrait = personalityArray[i];
            personalityDisplay.push(personalityTrait+" ");
        }
        for (var i=0; i < this.state.skills.length; i++) {
            var skillsTrait = this.state.skills[i];
            skillsDisplay = skillsDisplay + " " + skillsTrait;
        }
  

		return(	
            React.createElement("div", null, 
			 React.createElement("h4", null, "Edit Account"), 
			  React.createElement("form", {className: "editAccountForm", method: "post", action: "api/users/me"}, 
                 	"Add skills: (separate with commas only (no spaces)) ", React.createElement("br", null), 
                    React.createElement("input", {id: "skills", size: "60", type: "text", name: "skills", value: skillsDisplay, onChange: this.handleChange}), " ", React.createElement("br", null), 
                    React.createElement("br", null), 
                    "Add personality traits: (separate with commas only (no spaces))  ", React.createElement("br", null), 
                    React.createElement("input", {id: "personality", size: "60", type: "text", name: "personality", value: personalityDisplay, onChange: this.handleChange}), " ", React.createElement("br", null), 
                    React.createElement("br", null), 
                    "Why should someone contact you? (things you want/things you can give perhaps) ", React.createElement("br", null), 
                    React.createElement("textarea", {id: "contactIf", name: "contactIf", value: this.state.contactIf, onChange: this.handleChange, cols: "60", row: "10"}), " ", React.createElement("br", null), React.createElement("br", null), 
                    React.createElement("br", null), 
                    "Tell us something interesting about yourself: ", React.createElement("br", null), 
                    React.createElement("textarea", {id: "interesting", name: "interesting", value: this.state.interesting, onChange: this.handleChange, cols: "60", row: "10"}), " ", React.createElement("br", null), 
                    React.createElement("br", null), 
                    React.createElement("input", {type: "submit", value: "edit account", id: "editAccount"})
                )
            ) 
		);
	} 
});

React.render(React.createElement(EditAccountForm, {url: "/api/users/me"}), document.getElementById("editAccountForm"));


