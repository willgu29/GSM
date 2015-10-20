var LoginActions = require('../actions/LoginActions');
var axios = require('axios');


var LoginSource = {
	tryLogin: {
			remote(data) {
					//TODO: Simulate server call
					axios.post("/login", {
						email: data.email,
						password: data.password
					})
					.then(function (response) {
						console.log(response);
						return response;
					})
					.catch(function (response) {
						console.log(reponse);
						return response;
					});

			},
			success: LoginActions.login,
			error: LoginActions.loginFailed
	}
}

module.exports = LoginSource;