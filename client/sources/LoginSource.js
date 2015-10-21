var LoginActions = require('../actions/LoginActions');
var axios = require('axios');


var LoginSource = {
	tryLogin() {
		return{
			remote(data) {
					console.log("Source : try login");
					//TODO: Simulate server call
					return axios.post("/login", {
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
			error: LoginActions.loginFailed,
			loading: LoginActions.tryLogin
		}
	}
}

module.exports = LoginSource;