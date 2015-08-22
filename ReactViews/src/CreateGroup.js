
var CreateGroup = React.createClass({

	render: function() {
		return(
			<form method="post" action="/api/groups/" submitHanlder={this.submitForm}>
				Group Name: <input type="text" id="groupName" name="groupName" /> <br />
				Description: <input type="text" id="description" name="description" /> <br />
				Level: (input 1) <input type="text" id="level" name="level" /> <br />
			
				<input type="submit" value="create group" id="createGroup" />


			</form>
		);
	}

});


React.render(<CreateGroup />, document.getElementById("createGroup"));