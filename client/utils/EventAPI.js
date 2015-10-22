var axios = require("axios");

const EventAPI = {

	getAllEvents: function() {
		return axios.get("/api/events/all")
					.then(function (response) {
						console.log(response);
						return response.data;
					})
					.catch(function (response) {
						console.log(response);
						return response.data;
					});
	},
	getEventsForCurrentUser: function() {
		return axios.get("/api/events")
					.then(function (response) {
						console.log(response);
						return response.data;
					})
					.catch(function (response) {
						console.log(response);
						return response.data;
					});
	}


}

module.exports = EventAPI;