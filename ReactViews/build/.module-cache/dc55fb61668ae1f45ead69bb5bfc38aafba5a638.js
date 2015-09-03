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
		var profileCompletionPercent = 0;

		console.log(this.state.wants);
		console.log(this.state.canOffer);
		console.log(this.state.topFiveTime);


		if (this.state.wants != ""){
			console.log("FM");
			profileCompletionPercent++;
		} 
		if (this.state.canOffer != ""){
			console.log("Feel");
			profileCompletionPercent++;
		}
		if (this.state.topFiveTime != undefined){
			console.log("sicl");
			profileCompletionPercent++;
		}
		
		
		console.log("What " + profileCompletionPercent);
		var profileCompletionString = (profileCompletionPercent/3)*100 + "%";
		var profileString = Math.round(profileCompletionString);
		console.log(profileString);

		return(
			React.createElement("p", null, "Profile ", profileString, " Complete")
		);
	}

});


React.render(React.createElement(ProfileCompletion, {url: "/api/users/me"}), document.getElementById("profileCompletion"));