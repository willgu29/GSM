
var DeleteUserAccount = React.createClass({
	getInitialState: function() {
    	return {value: ''};
  	},
  	handleChange: function(event) {
   		this.setState({value: event.target.value});
  	},
	handleClick: function(e) {
		e.preventDefault()
		$.ajax({
    		url: this.props.url + this.state.value,
    		type: 'DELETE',
    		success: function(result) {
        		// Do something with the result
        		console.log(result);
        		
    		}
		});
	},
	render: function() {
		return(
			<div>
				<h3>Delete User: </h3>
					User ID: <br />
					<input id="userID" name="userID" type="text" value={this.state.value} onChange={this.handleChange} />
					<input onClick={this.handleClick} type="submit" value="delete user" id="deleteUser" />


		
			</div>
		);
	}

});

// React.render(<DeleteUserAccount url="/api/user/" />, document.getElementById("deleteUserAccount"));