var UserProfile = React.createClass({
	
	getInitialState: function() {
		return ({
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


		return(
			<div>
				<h3>About {this.state.fullName}</h3>
				<p>Interesting Info: {this.state.interesting}</p>
				<p>Skills: {skillsArray}</p>
				<p>Personality: {personalityArray}</p>
				<p>Can Offer: {canOfferArray}</p>
				<p>Wants: {wantsArray}</p>
				<p>Contact If: {this.state.contactIf}</p>
			</div>

		);
	}

});

var urlCall = "/api" + window.location.pathname;
React.render(<UserProfile url={urlCall} />, document.getElementById("gsmUserProfile"));