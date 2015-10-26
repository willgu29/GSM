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
        console.log("NEW RESULT: "+ JSON.stringify(result));
        this.actions.userReceived(result);
      }).catch(function(error) {

      });

    }

 



}

module.exports = alt.createActions(UserActions);


