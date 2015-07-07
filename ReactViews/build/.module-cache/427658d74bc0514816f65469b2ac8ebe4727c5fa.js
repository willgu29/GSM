var UserProfile = React.createClass({displayName: "UserProfile",
	
	getInitialState: function() {
		return ({

			interesting: "",
            contactIf:  "",
            personality: [],
            skills: [],
            wants: [],
            canOffer: []

		});
	},
	componentDidMount: function() {
		console.log("URL:"+ this.props.url);
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
                            skills: userData.identity.skills,
                            canOffer: userData.identity.canOffer,
                            wants: userData.identity.wants
                                
                            
                });
      		}
      		}.bind(this),
      		error: function(xhr,status,err){
        		console.error(status, err.toString());
      		}.bind(this)
      	});
	},

	render: function () {

		return(
			React.createElement("div", null, 
				React.createElement("p", null, this.state.interesting), 
				React.createElement("p", null, this.state.skills), 
				React.createElement("p", null, this.state.personality), 
				React.createElement("p", null, this.state.canOffer), 
				React.createElement("p", null, this.state.wants)
			)

		);
	}

});

var urlCall = "/api" + window.location.pathname;
React.render(React.createElement(UserProfile, {url: urlCall}), document.getElementById("gmsUserProfile"));