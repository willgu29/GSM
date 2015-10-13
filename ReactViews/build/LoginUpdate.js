var firstTimeLogin = document.getElementById("isFirstTimeLogin").getAttribute("value");

var LoginUpdate = React.createClass({displayName: "LoginUpdate",

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
			React.createElement("p", null, "Nothing here")
		);
	}

});