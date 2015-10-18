"use strict";

var firstTimeLogin = document.getElementById("isFirstTimeLogin").getAttribute("value");

var LoginUpdate = React.createClass({
	displayName: "LoginUpdate",

	componentDidMount: function componentDidMount() {
		if (firstTimeLogin) {
			//Join group based on code
			$.ajax({
				type: "POST",
				url: "/api/joinGroup/code",
				dataType: 'json',
				cache: false,
				success: (function (response) {
					console.log(response);
				}).bind(this),
				error: (function (xhr, status, err) {
					console.error(status, err.toString());
				}).bind(this)

			});
			//update time stamp last login
			$.ajax({
				type: "POST",
				url: "/api/updateLoginDate",
				dataType: 'json',
				cache: false,
				success: (function (response) {
					console.log(response);
				}).bind(this),
				error: (function (xhr, status, err) {
					console.error(status, err.toString());
				}).bind(this)

			});
		} else {
			//Do nothing
		}
	},
	render: function render() {
		return React.createElement("p", null);
	}

});

React.render(React.createElement(LoginUpdate, null), document.getElementById("loginUpdate"));