var alt = require("../alt");
var LoginAPI = require('../utils/LoginAPI');

class LoginActions {
	constructor() {
		this.generateActions(
			'loginSuccess',
			'loginFailed',
      'loginStatusUpdated',
      'newAccountCreated'

		);
	}
  	createAccount(email, password, phoneNumber, firstName, lastName, initialGroupCode) {
      LoginAPI.createUserAccount(email, password, phoneNumber, firstName, lastName, initialGroupCode).then((result) => {
        this.actions.newAccountCreated(result);
      }).catch(function(error) {

      });
    }
  	tryLogin(email, password) {
  		LoginAPI.tryLogin(email, password).then((result) => {
        //How to return result from here?
        if (result.info == "success") {
          this.actions.loginSuccess(result.user);          
        } else {
          this.actions.loginFailed(result.info);
        }
  		}).catch(function(error) {

  		});
      //Problem is tryLogin is being received as an action, then no received action b/c of callback
      // this.dispatch(email);
  	}

    updateLoginDate() {
      LoginAPI.updateLoginDate().then((result) => {
        this.actions.loginStatusUpdated();
      }).catch(function(error) {

      });
    }

    logout() {
      LoginAPI.logout().then((result) => {
        this.dispatch();
      }).catch(function(error) {

      });
    }



}

module.exports = alt.createActions(LoginActions);
