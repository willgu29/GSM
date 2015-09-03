var ProfileCompletion = React.createClass({displayName: "ProfileCompletion",
	getInitialState: function() {
		return({wants:[],
				canOffer:[],
				topFiveTime: ""});
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
        		this.setState({wants: user.identity.wants,
        						canOffer: user.identity.canOffer,
        						topFiveTime: user.identity.topFiveTime});
      		}
      		}.bind(this),
      		error: function(xhr,status,err){
        		console.error(status, err.toString());
      		}.bind(this)
		});
	},
	render: function() {
		var profileCompletionPercent = 0.0;

		if (this.state.wants != []){
			profileCompletionPercent++;
		} 
		if (this.state.canOffer != []){
			profileCompletionPercent++;
		}
		if (this.state.topFiveTime != ""){
			profileCompletionPercent++;
		}
		
		

		var profileCompletionString = (profileCompletionPercent/3.0)*100 + "%";

		return(
			React.createElement("p", null, "Profile ", profileCompletionString, " Complete")
		);
	}

});


React.render(React.createElement(ProfileCompletion, {url: "/api/users/me"}), document.getElementById("profileCompletion"));