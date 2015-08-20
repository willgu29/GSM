var NewMessage = React.createClass({displayName: "NewMessage",
	

	createNewMessageThread: function() {
		var data = {
			email: this.props.email,
			fullName: this.props.fullName
		};

		$.ajax({
			url: this.props.url,
			dataType: 'json',
			data: data,
			type: "POST",
			success: function(info){
     			if (this.isMounted()){
     				console.log(info);
  					if (info.info == "success") {
  						//TODO: segue to messages page
  						var url = "/messages/" + info._id;
  						console.log(url);
     					window.location.href(url);
     				} else {
     					alert("There was an error. Please try again in a minute.");
     				}
      			}
      		}.bind(this),
      		error: function(xhr,status,err){
      			console.log(err);
      		}.bind(this)


		});
	},

	buttonClick: function(e) {
		e.preventDefault();
		this.createNewMessageThread();
	},

	render: function() {
		
		return(
			React.createElement("button", {onClick: this.buttonClick}, "Send Message")

		);
	}

});


var UserProfile = React.createClass({displayName: "UserProfile",
	
	getInitialState: function() {
		return ({
			email: "",
			fullName: "",
			interesting: "",
            contactIf:  "",
            personality: [],
            skills: [],
            wants: [],
            canOffer: [],
            contactIf: ""

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
        					email: userData.email,
        					fullName: userData.fullName,
                            interesting: userData.identity.interesting,
                            contactIf: userData.identity.contactIf,
                            personality: userData.identity.personality,
                            skills: userData.identity.skills,
                            canOffer: userData.identity.canOffer,
                            wants: userData.identity.wants,
                            contactIf: userData.identity.contactIf
                                
                            
                });
      		}
      		}.bind(this),
      		error: function(xhr,status,err){
        		console.error(status, err.toString());
      		}.bind(this)
      	});
	},

	render: function () {

		var skillsArray = this.state.skills.join(", ");
		var personalityArray = this.state.personality.join(", ");
		var canOfferArray = this.state.canOffer.join(", ");
		var wantsArray = this.state.wants.join(", ");

		var fullName = this.state.fullName;

		return(
			React.createElement("div", null, 
				React.createElement("h3", null, "About ", fullName), 
				React.createElement("p", null, "Interesting Info: ", this.state.interesting), 
				React.createElement("p", null, "Skills: ", skillsArray), 
				React.createElement("p", null, "Personality: ", personalityArray), 
				React.createElement("p", null, "Can Offer: ", canOfferArray), 
				React.createElement("p", null, "Wants: ", wantsArray), 
				React.createElement("p", null, "Contact If: ", this.state.contactIf), 

				React.createElement(NewMessage, {url: "/api/messages/", fullName: fullName, email: this.state.email})
			)

		);
	}

});

var urlCall = "/api" + window.location.pathname;
React.render(React.createElement(UserProfile, {url: urlCall}), document.getElementById("gsmUserProfile"));