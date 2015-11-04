var axios = require('axios');

const LoginAPI = {

	tryLogin: function(email, password) {
		return axios.post("/login", {
						email: email,
						password: password
					})
					.then(function (response) {
						console.log(response);
						return response.data;
					})
					.catch(function (response) {
						console.log(response);
						return response.data;
					});
	},
	logout: function() {
		return axios.get("/logout")
					.then(function (response) {
						console.log(response);
						return response.data;
					})
					.catch(function (response) {
						console.log(response);
						return response.data;
					});
	},
	updateLoginDate: function() {
		return axios.post("/api/updateLoginDate")
					.then(function (response) {
						console.log(response);
						return response.data;
					})
					.catch(function (response) {
						console.log(response);
						return response.data;
					});
	},
	createUserAccount: function(email, password, phoneNumber, firstName, lastName, initialGroupCode) {
		return axios.post("/createAccount", {
						email: email,
						password: password,
						phoneNumber: phoneNumber,
						firstName: firstName,
						lastName: lastName,
						initialGroupCode: initialGroupCode
					})
					.then(function (response) {
						console.log(response);
						return response.data;
					})
					.catch(function (response) {
						console.log(response);
						return response.data;
					});

	}

};

module.exports = LoginAPI;