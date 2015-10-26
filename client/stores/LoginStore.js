var alt = require('../alt');
var LoginActions = require('../actions/LoginActions');

class LoginStore {
  constructor() {
    this.isLoggedIn = false;
    this.currentUserID = "";
    this.bindListeners({
      onLoginSuccess: LoginActions.loginSuccess,
      onLoginFailed: LoginActions.loginFailed,
      onLogout: LoginActions.logout
    });


  }

  onLoginSuccess(result) {
  	console.log("Store: login: " + result);
  	this.isLoggedIn = true;
    this.currentUserID = result._id;
  
  }
  onLoginFailed(isLoggedIn) {
  	console.log("Store; login failed");
  }
  onLogout() {
  	this.isLoggedIn = false;
  }

}

module.exports = alt.createStore(LoginStore, 'LoginStore');
