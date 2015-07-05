var EditAccountForm = React.createClass({displayName: "EditAccountForm",
    getInitialState: function() {
        return ({
            user:{
                identity: {

                    interesting: "",
                    contactIf:  "",
                    personality: [],
                    skills: []

                }   
            }
        });
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

        var personalityDisplay = "";
        var skillsDisplay = "";
        // var contactIfDisplay = "";
        // var interestingDisplay = "";

        console.log("LOOK FUCKER: " + JSON.stringify(this.state.user));

        if (this.state.user.identity.contactIf == "") {
            //Do nothing
        } else {
            console.log("DOING COOL THINGS");
            var userData = this.state.user;
            
            var personalityArray = userData.identity.personality;
            var skillsArray = userData.identity.skills;

            for (var i=0; i < personalityArray.length; i++) {
                var personalityTrait = personalityArray[i];
                personalityDisplay = personalityDisplay + " " + personalityTrait;
            }
            for (var i=0; i < skillsArray.length; i++) {
                var skillsTrait = skillsArray[i];
                skillsDisplay = skillsDisplay + " " + skillsTrait;
            }

            var contactIfDisplay = userData.identity.contactIf;
            var interestingDisplay = userData.identity.interesting;
        }

		return(	
			React.createElement("div", null, 
			React.createElement("h4", null, "Edit Account"), 
			 React.createElement("form", {className: "editAccountForm", method: "post", action: "api/users/me"}, 
             	"Add skills: (separate with commas only (no spaces)) ", React.createElement("br", null), 
                React.createElement("input", {size: "60", type: "text", name: "skills", defaultValue: skillsDisplay}), " ", React.createElement("br", null), 
                React.createElement("br", null), 
                "Add personality traits: (separate with commas only (no spaces))  ", React.createElement("br", null), 
                React.createElement("input", {size: "60", type: "text", name: "personality", defaultValue: personalityDisplay}), " ", React.createElement("br", null), 
                React.createElement("br", null), 
                "Why should someone contact you? (things you want/things you can give perhaps) ", React.createElement("br", null), 
                React.createElement("textarea", {name: "contactIf", defaultValue: contactIfDisplay, cols: "60", row: "10"}), " ", React.createElement("br", null), React.createElement("br", null), 
                React.createElement("br", null), 
                "Tell us something interesting about yourself: ", React.createElement("br", null), 
                React.createElement("textarea", {name: "interesting", defaultValue: interestingDisplay, cols: "60", row: "10"}), " ", React.createElement("br", null), 
                React.createElement("br", null), 
                React.createElement("input", {type: "submit", value: "edit account", id: "editAccount"})
            )
            )
             
		);
	} 
});

React.render(React.createElement(EditAccountForm, {url: "/api/users/me"}), document.getElementById("editAccountForm"));


