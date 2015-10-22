var axios = require('axios');

const GroupAPI = {

	//currently only level 1 is available (root groups)
	//currently server only returns groups request user is part of
	getGroupsAtLevelForCurrentUsers: function(level) {
		return axios.get("/api/groups?level=" + level)
					.then(function (response) {
						console.log(response);
						return response.data;
					})
					.catch(function (response) {
						console.log(response);
						return response.data;
					});
	}
	getGroupByID: function(groupID) {
		return axios.get("/api/groups/" +groupID)
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


module.exports = GroupAPI;