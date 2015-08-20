var MessageThreadRow = React.createClass({displayName: "MessageThreadRow",

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
			React.createElement("li", null, fullName, ": ", infoText)

		);
	}

})

var MessageThreads = React.createClass({displayName: "MessageThreads",
	getInitialState: function() {
		return({threads:[]});
	},
	componentDidMount: function() {
		this.loadInitialThreads();
	},
	loadInitialThreads: function() {
		$.ajax({
			url: this.props.url,
			dataType: 'json',
			cache: false,
			success: function(arrayOfThreads){
				console.log(arrayOfThreads);
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
			arrayOfRows.push(React.createElement(MessageThreadRow, {fullName: thread.fullName, 
												unseenMessageCount: thread.unseenMessageCount}));
		}

		return(
			React.createElement("ul", null, 
				arrayOfRows
			)
		);
	}
});


React.render(React.createElement(MessageThreads, {url: "/api/messages/"}), document.getElementById("messageThreads"));