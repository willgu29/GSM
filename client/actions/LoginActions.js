var alt = require("../alt");
var LoginAPI = require('../utils/LoginAPI');

class LoginActions {
	constructor() {
		this.generateActions(
			'loginSuccess',
			'loginFailed'

		);
	}
  	
  	tryLogin(email, password) {
  		LoginAPI.tryLogin(email, password).then((result) => {
  			console.log("NEW RESULT: "+ JSON.stringify(result));
        //How to return result from here?
        if (result == "/") {
          this.actions.loginSuccess(result);          
        } else {
          this.actions.loginFailed(result);
        }
  		}).catch(function(error) {

  		});
      //Problem is tryLogin is being received as an action, then no received action b/c of callback
      // this.dispatch(email);
  	}

    logout() {
      LoginAPI.logout().then((result) => {
        this.dispatch();
      });.catch(function(error) {

      });
    }



}

module.exports = alt.createActions(LoginActions);
