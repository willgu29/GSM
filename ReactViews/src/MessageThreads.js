var MessageThreadRow = React.createClass({

	render: function() {
		var fullName = this.props.fullName;
		var participantNames = this.props.participants;
		var participants = participantNames.join(", ");
		var infoText = this.props.messageCount + " messages in conversation";

		var convoURL = this.props.url + this.props.convoID + "?convoTitle=" + participantNames;
		return(
			<li><a href={convoURL}>{participants}: {infoText}</a></li>

		);
	}

})

var MessageThreads = React.createClass({
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
			arrayOfRows.push(<MessageThreadRow fullName={thread.fullName} 
												participants={thread.participant_fullNames}
												messageCount={thread.messageCount} 
												url="/messages/"
												convoID={thread._id}/>);
		}

		if (arrayOfRows.length == 0) {
			arrayOfRows = (<li>No conversations started yet. Browse members and click more info
				to send individuals a message!</li>);
		}
		return(
			<ul>
				{arrayOfRows}
			</ul>
		);
	}
});


React.render(<MessageThreads url="/api/messages/" />, document.getElementById("messageThreads"));