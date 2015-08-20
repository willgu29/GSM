var MessageThreadRow = React.createClass({displayName: "MessageThreadRow",

	render: function() {
		var fullName = this.props.fullName;
		var participantNames = this.props.participants;
		var otherParticipant = participantNames[1];
		var infoText = this.props.messageCount + " messages in conversation";

		var convoURL = this.props.url + this.props.convoID;
		return(
			React.createElement("li", null, React.createElement("a", {href: "/messages/ "}, otherParticipant, ": ", infoText))

		);
	}

})

var MessageThreads = React.createClass({displayName: "MessageThreads",
	getInitialState: function() {
		return({threads:[]});
	},
	componentDidMount: function() {
		$.ajax({
			url: this.props.url,
			dataType: 'json',
			cache: false,
			success: function(arrayOfThreads){
				console.log(arrayOfThreads);
				this.setState({threads:arrayOfThreads});
			}.bind(this),
			error: function(xhr,status,err){
        		console.error(status, err.toString());
      		}.bind(this)
		});	
	},
	render: function() {

		var arrayOfThreads = this.state.threads;
		var arrayOfRows = [];
		for (var i = 0; i < arrayOfThreads.length; i++) {
			var thread = arrayOfThreads[i];
			arrayOfRows.push(React.createElement(MessageThreadRow, {fullName: thread.fullName, 
												participants: thread.participant_fullNames, 
												messageCount: thread.messageCount, 
												url: "/messages/", 
												convoID: thread._id}));
		}
		return(
			React.createElement("ul", null, 
				arrayOfRows
			)
		);
	}
});


React.render(React.createElement(MessageThreads, {url: "/api/messages/"}), document.getElementById("messageThreads"));