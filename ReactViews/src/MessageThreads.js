var MessageThreadRow = React.createClass({

	render: function() {
		return(
			<li>Hi</li>

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
			arrayOfRows.push(<MessageThreadRow />);
		}

		return(
			<ul>
				{arrayOfRows}
			</ul>
		);
	}
});


React.render(<MessageThreads url="/api/messages/" />, document.getElementById("messageThreads"));