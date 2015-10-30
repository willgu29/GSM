var axios = require('axios');

const UserAPI = {

	getUserByID: function(id) {
		return axios.get("localhost:3000/api/users/" + id)
					.then(function (response) {
						console.log(response);
						return response.data;
					})
					.catch(function (response) {
						console.log(response);
						return response.data;
					});
	},
	getAllUsers: function() {
		return axios.get("/api/users/")
					.then(function (response) {
						console.log(response);
						return response.data;
					})
					.catch(function (response) {
						console.log(response);
						return response.data;
					});
	},
	keywordSearchUsers: function(searchText) {
		return axios.get("/api/searchUsers/" + searchText)
					.then(function (response) {
						return response.data;
					})
					.catch(function (response) {
						return response.data;
					})
	},

	updateProfile: function(topFiveTime, wantsArray, canOfferArray) {
		return axios.post("/api/users/me", {
						topFiveTime: topFiveTime,
						wants: wantsArray,
						canOffer: canOfferArray
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

module.exports = UserAPI;