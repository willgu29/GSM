var ProfileCompletion = React.createClass({displayName: "ProfileCompletion",
	getInitialState: function() {
		return({user: {}});
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
        		this.setState({user:user});
      		}
      		}.bind(this),
      		error: function(xhr,status,err){
        		console.error(status, err.toString());
      		}.bind(this)
		});
	},
	render: function() {
		var profileCompletionPercent = 0;
		if (user.identity.wants != []){
			profileCompletionPercent++;
		} 
		if (user.identity.canOffer != []){
			profileCompletionPercent++;
		}
		if (user.identity.topFiveTime != ""){
			profileCompletionPercent++;
		}

		var profileCompletionString = profileCompletion/3 + "%";

		return(
			React.createElement("p", null, profileCompletionString)
		);
	}

});


React.render(React.createElement(ProfileCompletion, {url: "/api/users/me"}), document.getElementById("profileCompletion"));