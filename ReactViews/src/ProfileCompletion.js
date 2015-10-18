var profileComp = {
	float: "right",
	display: "inline",
	marginTop: "10px",
	
	fontWeight: "bold",
	fontSize: "16px"
}


var ProfileCompletion = React.createClass({
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
			profileCompletionPercent++;
		} 
		if (this.state.canOffer != ""){
			profileCompletionPercent++;
		}
		if (this.state.topFiveTime != undefined && this.state.topFiveTime != ""){
			profileCompletionPercent++;
		}
		
		
		console.log("What " + profileCompletionPercent);
		var profileCompletionString = (profileCompletionPercent/3)*100;
		var profileCompletion = Math.floor(profileCompletionString) + "%";

		return(
			<div style={profileComp}>Profile {profileCompletion} Complete</div>
		);
	}

});


React.render(<ProfileCompletion url="/api/users/me" />, document.getElementById("profileCompletion"));