var alt = require('../alt');
var UserAPI = require('../utils/UserAPI');

class TableActions {

	constructor() {

		this.generateActions(
			"userArrayReceived",
      "dataFetchFailed"
		);
	}

	getAllUsers() {
      UserAPI.getAllUsers().then((result) => {
          this.actions.userArrayReceived(result);
      }).catch(function(error) {

      });
    }


    searchUsersByKeyword(searchText) {
      UserAPI.keywordSearchUsers(searchText).then((result) => {
          this.actions.userArrayReceived(result);
      }).catch(function(error) {

      });
    }



}

module.exports = alt.createActions(TableActions);