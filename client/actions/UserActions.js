var alt = require("../alt");
var LoginAPI = require('../utils/LoginAPI');

class UserActions {
  constructor() {
    this.generateActions(
      'usersReceived',
      'userReceived'

    );
  }
    
    getUser(id) {
      LoginAPI.tryLogin(email, password).then((result) => {
        console.log("NEW RESULT: "+ JSON.stringify(result));
        //How to return result from here?
        this.actions.usersReceived(result);
      }).catch(function(error) {

      });
      //Problem is tryLogin is being received as an action, then no received action b/c of callback
      // this.dispatch(email);
    }
    getAllUsers() {

    }




}

module.exports = alt.createActions(UserActions);


