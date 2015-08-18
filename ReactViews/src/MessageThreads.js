var MessageThreadRow = React.createClass({

	render: function() {
		var fullName = this.props.fullName;
		var unseenMessageCount = this.props.unseenMessageCount;
		var infoText;
		if (unseenMessageCount = 0) {
			infoText = "No new messages";
		} else {
			infoText = unseenMessageCount + " new messages";
		}
		return(
			<li>{fullName}: {infoText}</li>

		);
	}

})

var MessageThreads = React.createClass({
	getInitialState: function() {
		return({threads:[]});
	},
	loadInitialThreads: function() {
		$.ajax({
			url: this.props.url,
			dataType: 'json',
			cache: false,
			success: function(arrayOfThreads){
				if (this.isMounted()) {
					this.setState({threads:arrayOfThreads})
				}
			}.bind(this),
			error: function(xhr,status,err){
        		console.error(status, err.toString());
      		}.bind(this)
		});
	},

	render: function() {

		var arrayOfThreads = this.state.threads;
		var arrayOfRows = [];
		for (var i = 0; i < arrayOfThreads; i++) {
			var thread = arrayOfThreads[i];
			arrayOfRows.push(<MessageThreadRow fullName={thread.fullName} 
												unseenMessageCount={thread.unseenMessageCount} />);
		}

		return(
			<ul>
				{arrayOfRows}
			</ul>
		);
	}
});


React.render(<MessageThreads url="/api/messages/" />, document.getElementById("messageThreads"));