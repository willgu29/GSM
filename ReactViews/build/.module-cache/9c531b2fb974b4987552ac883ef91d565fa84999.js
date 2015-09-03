var ProfileCompletion = React.createClass({displayName: "ProfileCompletion",
	getInitialState: function() {
		return({profileCompletion:0});
	},
	componentDidMount: function() {
		this.loadProfileStatus();
	},
	loadProfileStatus: function() {
		$.ajax({
			url: this.props.url,
    		dataType: 'json',
      		cache: false,
      		success: function(user){
      		if (this.isMounted()){
      			var profileCompletionPercent = 0.0;

				if (user.identity.wants != null){
					profileCompletionPercent++;
				}	 
				if (user.identity.canOffer != null){
					profileCompletionPercent++;
				}
				if (user.identity.topFiveTime != ""){
					profileCompletionPercent++;
				}
        		this.setState({profileCompletion:profileCompletionPercent});
      		}
      		}.bind(this),
      		error: function(xhr,status,err){
        		console.error(status, err.toString());
      		}.bind(this)
		});
	},
	render: function() {
		
		console.log("What " + this.state.profileCompletion);
		var profileCompletionString = (this.state.profileCompletion/3)*100 + "%";

		return(
			React.createElement("p", null, "Profile ", profileCompletionString, " Complete")
		);
	}

});


React.render(React.createElement(ProfileCompletion, {url: "/api/users/me"}), document.getElementById("profileCompletion"));