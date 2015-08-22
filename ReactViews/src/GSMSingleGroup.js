var groupID = document.getElementById("groupID").getAttribute("value");


var GSMSingleGroup = React.createClass({

	render: function() {
		return(
			<p>UYa</p>
		);
	}

});

React.render(<GSMSingleGroup rootGroupID={groupID} />, document.getElementById("gsmSingleGroup"));