var alt = require("../alt");
var UserAPI = require('../utils/UserAPI');

class UserActions {

  constructor() {
    this.generateActions(
      'userReceived'

    );
  }
    
    //Id = me to get current User
    getUser(id) {
      UserAPI.getUserByID(id).then((result) => {
        this.actions.userReceived(result);
      }).catch(function(error) {

      });

    }

 



}

module.exports = alt.createActions(UserActions);


