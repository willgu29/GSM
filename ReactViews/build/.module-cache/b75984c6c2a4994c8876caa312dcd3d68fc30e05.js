var MessageThreadRow = React.createClass({displayName: "MessageThreadRow",

	render: function() {
		return(
			React.createElement("li", null, "Hi")

		);
	}

})

var MessageThreads = React.createClass({displayName: "MessageThreads",
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
			arrayOfRows.push(React.createElement(MessageThreadRow, null));
		}

		return(
			React.createElement("ul", null, 
				arrayOfRows
			)
		);
	}
});


React.render(React.createElement(MessageThreads, {url: "api/messages/me"}), document.getElementById("messageThreads"));