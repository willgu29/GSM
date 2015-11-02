

var CreateEvent = React.createClass({

	render: function() {
		return(
			<div className="CreateEvent">
				<h3>Create Event</h3>
				<form method="post" action={this.props.url}>
					Event Name: <input type="text" id="name" name="name" /> <br />
					Description: <input type="text" id="description" name="description" /> <br />
					Start Time: <input type="datetime-local" id="startTime" name="startTime" /> <br />
					End Time: <input type="datetime-local" id="endTime" name="endTime" /> <br />
					Group ID to Invite: <input type="text" id="groupID" name="groupID" /> <br />
					<input type="submit" value="create event" id="createEvent" />


				</form>
			</div>
		);
	}

});

ReactDOM.render(<CreateEvent url="/api/events/" />, document.getElementById("createEvent"));