var firstTimeLogin = document.getElementById("isFirstTimeLogin").getAttribute("value");

var LoginUpdate = React.createClass({

	componentDidMount: function() {
		//TODO: Update timestamp
		if (firstTimeLogin) {
			//TOOD: Join group via API and group ID code
		} else {
			//Do nothing
		}
	},
	render: function() {
		return (
			<p>Nothing here</p>
		);
	}

});