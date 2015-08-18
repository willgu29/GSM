var NewMessage = React.createClass({
	

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
  					if (info == "success") {
  						//TODO: segue to messages page
  						var url = "/messages/" + info._id;
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
			<button onClick={this.buttonClick}>Send Message</button>

		);
	}

});


var UserProfile = React.createClass({
	
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
			<div>
				<h3>About {fullName}</h3>
				<p>Interesting Info: {this.state.interesting}</p>
				<p>Skills: {skillsArray}</p>
				<p>Personality: {personalityArray}</p>
				<p>Can Offer: {canOfferArray}</p>
				<p>Wants: {wantsArray}</p>
				<p>Contact If: {this.state.contactIf}</p>

				<NewMessage url="/api/messages/" fullName={fullName} email={this.state.email} />
			</div>

		);
	}

});

var urlCall = "/api" + window.location.pathname;
React.render(<UserProfile url={urlCall} />, document.getElementById("gsmUserProfile"));