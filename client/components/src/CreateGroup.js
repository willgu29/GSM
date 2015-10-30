
var CreateGroup = React.createClass({

	render: function() {
		return(
			<div>
				<h3>Create root group</h3>
				<form method="post" action={this.props.url}>
					Group Name: <input type="text" id="groupName" name="groupName" /> <br />
					Description: <input type="text" id="description" name="description" /> <br />
					Level: (input 1) <input type="text" id="level" name="level" /> <br />
			
					<input type="submit" value="create group" id="createGroup" />


				</form>
				<h3>Create sub group</h3>
				<CreateSubGroup url={this.props.url} />
			</div>
		);
	}

});

var CreateSubGroup = React.createClass({
	getInitialState: function() {
		return ({rootGroupID:"", actionURL:""});
	},
	handleChange: function(event) {
		var actionURL = this.props.url + event.target.value;
    	this.setState({rootGroupID: event.target.value,actionURL:actionURL});
  	},
	render: function() {
		return(
			<form method="post" action={this.state.actionURL}>
				Root Group ID: <input onChange={this.handleChange} value={this.state.rootGroupID} type="text" id="rootGroupID" name="rootGroupID" /> <br />
				Group Name: <input type="text" id="groupName" name="groupName" /> <br />
				Description: <input type="text" id="description" name="description" /> <br />
			
				<input type="submit" value="create sub-group" id="createSubGroup" />


			</form>
		);
	}
});


// React.render(<CreateGroup url="/api/groups/" />, document.getElementById("createGroup"));