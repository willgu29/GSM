var alt = require("../alt");
var GroupAPI = require('../utils/GroupAPI');

class GroupsActions {
	constructor() {
		this.generateActions(
			'groupsReceived',
		);
	}
  	
  	getGroupsByCategory(categoryName) {
  		GroupAPI.getGroupsByCategory(categoryName).then((result) => {
        this.actions.groupsReceived(result);
  		}).catch(function(error) {

  		});

  	}

  




}

module.exports = alt.createActions(GroupsActions);