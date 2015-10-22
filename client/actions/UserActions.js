var alt = require("../alt");
var UserAPI = require('../utils/UserAPI');

class UserActions {

  constructor() {
    this.generateActions(
      'usersReceived',
      'userReceived'

    );
  }
    
    getUser(id) {
      UserAPI.getUserByID(id).then((result) => {
        console.log("NEW RESULT: "+ JSON.stringify(result));
        this.actions.userReceived(result);
      }).catch(function(error) {

      });

    }

    getAllUsers() {
      UserAPI.getAllUsers().then((result) => {
          console.log("NEW RESULT: "+ JSON.stringify(result));
          this.actions.usersReceived(result);
      }).catch(function(error) {

      });
    }

    searchUsersByKeyword(searchText) {
      UserAPI.keywordSearchUsers(searchText).then((result) => {
          console.log("NEW RESULT: "+ JSON.stringify(result));
          this.actions.usersReceived(result);
      }).catch(function(error) {

      });
    }




}

module.exports = alt.createActions(UserActions);


