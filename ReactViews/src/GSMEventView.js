var EventRow = React.createClass({

	render: function(){
		return(
			<div>
				<h3>{this.props.name}: {this.props.startTime} - {this.props.endTime}</h3>
				<p>{this.props.description}</p>
			</div>
		);
	}
});

var GSMEventView = React.createClass({
	getInitialState: function(){
		return({events:[]});
	},
	componentDidMount: function(){
		this.loadInitialEvents();
	},
	loadInitialEvents: function(){

		$.ajax({
			url: this.props.url,
			dataType: 'json',
			cache: false,
			success: function(events) {
        		this.setState({events:events});
      		}.bind(this),
      		error: function(xhr,status,err){
        		console.log("Error: ", err);
      		}.bind(this)
		});
	},
	render: function() {

		console.log(this.state.events);

		var arrayOfEvents = this.state.events;
		var eventDisplay = [];
		for (var i = 0; i < arrayOfEvents.length; i++){
			var event = arrayOfEvents[i];
			var eventRow = (<EventRow _id={event._id}
										name={event.name} 
										description={event.description} 
										startTime={event.startTime}
										endTime={event.endTime} />);
			
			eventDisplay.push(eventRow);
		}
		if (eventDisplay == "") {
			eventDisplay = "No events currently.";
		}

		return(
			<ul>
				{eventDisplay}
			</ul>
		);
	}
});

React.render(<GSMEventView url="/api/events" />, document.getElementById("gsmEventView"));